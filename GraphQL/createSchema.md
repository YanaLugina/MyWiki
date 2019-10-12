# Определение типов

Пользовательские типы приложения PhotoShare
Основные пользовательские типы: Users и Photo.

Если нам не зватает стандартных скалярных типов - создаем свои, например ```DataTime```


Знак ```!``` означает, что поле обязательно для заполнения, не нулевое.

Для создания перечислений создаем типы enum - является скалярным типом.

```[AnyName!]!```  список, не содержит нулевых полей и поле со списком обязательно для заполнения.

## Один к одному

При создании связи (ребра) между объектами (вершинами) выделяем дополнительный тип ```postedBy``` связь **один к одному**.

Пример:
```
type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    created: DateTime!
    category: PhotoCategory!
    postedBy: User!
}
```

## Один ко многим

Соединение **один ко многим**, когда один объект с направлением ребер ко многим объектам: определяем поле ```postedPhotos``` будет возвращать список типов.

Ребра нужно делать ненаправленными, создавая возможность перемещения по ребру в обоих направлениях, тогда перемещение по узлам графа будет гибким.

В данном примере мы от типа Photo сделали связь один к одному до узла User, и в обратную сторону от User сделали связь один ко многим до узла Photo.

Пример: 
```
type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
}
```

## Многие ко многим

Соединение **многие ко многим** осуществляется с помощью создания списков как к узлам первого типа , так и у второго типа:
(

Пример: 
```
type Photo {  
    ...
    taggedUser: [User!]!
}

type User {
    ...
    inPhotos: [Photo!]!
}
```

## Сквозные типы

Существуют **сквозные типы** для сохранения некоторой информации о связи. Определяем ребро, как тип, получаем еще один узел для соединения двух узлов.

Пример:

Вместо обычного поля со связью с объектами User, мы создаем промежуточный тип Friendship 
```
//Обычная связь
type User {
    friends: [User!]!
}

//сквозной тип для связи многие ко многим
type User {
    friends: [Friendship!]!
}

//связь и некоторая информация о связи
type Friendship {
    friend_a: User!
    friend_b: User!
    howLong: Int!
    whereWeMet: Location
}
```

Для улучшения дизайна типа Friendship и расширения возможности объединять несколько подобных объектов User
```
type Friendship {
    friends: [User!]!
    how_long: Int!
    where_we_met: Location
}
```

## Списки разных типов

Пример: Расписание студентов состоит из разных событий (пользовательских типов данных), каждое из которых имеет общие и различные поля.

### Объединения

Для вызова запроса такого типа:
```
query schedule {
    agenda {
        ...on Workout {
            name
            resp
        }
        ...on StudyGroup {
            name
            subject
            students
        }
    }
}
```
необходимо составить схему таким образом:

```
union AgendaItem = StudyGroup | Workout

type StudyGroup {
    name: String!
    subject: String
    students: [User!]! 
}

type Workout {
    name: String!
    resp: Int!
}

type Query {
    agenda: [AgendaItem!]!
}

```

Для объединения разных типов пользовательских данных в одно объединение (один тип) необходимо использовать вертикальную черту ```|```

### Интерфейсы

Интерфейсы - абстрактные типы, которые могут быть представлены как типы. Они объединяют данные не по типам, а по набору полей определяющие тип.
Например запрос на получение расписания (состоящее из разных типов событий), может выглядеть так:

```
query schedule {
    agenda {
        name
        start
        end
        ...on Workout {
            resp
        }
    }
}
```

реализовать такое решение можно так:

```
scalar DateTime

interface AgendaItem {
    name: String!
    start: DateTime!
    end: DateTime!
}

type StudyGroup implements AgendaItem {
    name: String!
    start: DateTime!
    end: DateTime!
    participants: [User!]!
    topic: String!
}

type Worout implements AgendaItem {
    name: String!
    start: DateTime!
    end: DateTime!
    resp: Int!
}

type Query {
    agenda: [AgendaItem!]!
}

```

### Когда использовать Объединения, а когда - Интерфейсы?

Если типы данных содержат разные поля - используем объединения. 

Если типы данных содержат опрределенные обязательные одинаковые поля - используем Интерфейсы.


## Аргументы

Аргументы - могут быть добавлены в любое поле, позволяют получать более точные результаты запроса и мутаций.

Например, если нам нужно получить определенную фоторгафию или определенного пользователя, мы должны указать возможность такого запроса:

```
type Query {
    ...
    User(githubLogin: ID!): User!
    Photo(id: ID!): Photo!
     
    
}
```
После этого можно делать запросы для получения данных пользователя:

```
query {
    User(githubLogin: "MoonTahoe") {
        name
        avatar
    }
}
```

для получения фотографии:

```
query {
    Photo(id: "14TH5B6NS4KIG3H4S") {
        name
        description
        url
    }
}
```

Если в для данных запросов не предоставлять id и githubLogin парсер GraphQL выдаст ошибку.

Сортировку и фильтрацию (любые аргументы) можно применять не только к полям типа Query. 
Например, добавление фильтра пагинации позволяет уменьшить объем данных, который возвращает запрос:

```
type User {
    postedPhotos(
        first: Int = 25
        start: Int = 0
        sort: SortDirection = DESCENDING
        sortBy: SortablePhotoField = created
        category: PhotoCategory
    ): [Photo!]!
}
```

### Фильтрация данных

Можно отфильтровать результат запроса по необязательным аргументам:

```
type Query {
    ...
    allPhotos(category: PhotoCategory): [Photo!]!
}
```

при этом получим возможность создать такой запрос на все фотографии с указанной категорией:

```
query {
    allPhotos(category: "SELFIE") {
        name
        description
        url
    }
}
```

### Пагинация

Пагинация используется для разбиения большого количества данных на страницы, для этого тоже используются аргументы.

Для реализации добавляем два необязательных аргумента first - определяет количество записей на странице, start - определяет начальную позицию или индекс первой записи для возврата.

Пример создания типов для запросов:

```
type Query {
    ...
    allUsers(first: Int=50 start: Int=0): [User!]!
    allPhotos(first: Int=25 start: Int=0): [Photo!]!
}
```

```Int=50``` означает, что по-умолчанию будет предоставлено только 50 элементов, если в аргументе запроса не указано другое число. 


Например, когда надо выбрать пользователей с номерами от 80 до 100:

```
query {
    allUsers(first: 20 start: 80) {
        name
        avatar
    }
}
```

Можно вычислить общее количество страниц данных, разделив общее количество элементов на размер одной страницы:

```
//pageSize в нашем случае определяется аргументом first
pages = pageSize/total
```

### Сортировка 

Для реализации сортировки списков записей можно создать скалярный тип enum и перечислить, какие поля использовать для сортиривки:

```
// Порядки сортировки
enum SortDirection {
    ASCENDING
    DESCENDING
}

// Перечисление полей для сортировки
enum SortablePhotoField {
    name
    description
    category
    created
}

// Нисходящий порядок (от большего к меньшему) сортировки по дате создания
Query {
    allPhotos(
        sort: SortDirection = DESCENDING
        sortBy: SortablePhotoField = created
    ): [Photo!]!
}
```

## Мутации

Мутации - как глаголы, они должны что-то делать. Составляем список того, что может делать пользователь с сервисом.
Созданный список всех действий, которые может делать пользователь - скорее всего, это и будут все ваши мутации.

Пример: войти в систему, опубликовать, установить теги на фотографии. Все эти действия меняют состояние приложения.

Для возможности публикации фотографии необходимо создать тип:

```
type Mutation {
    postPhoto (
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    ): Photo!
}

schema {
    query: Query
    mutqtion: Mutation
}
```

После этого пользовательможет сделать следующее:

```
mutation {
    postPhoto(name: "Sending the Palisandes") {
        id
        url
        created
        postedBy {
            name
        }
    }
}
```

Если использовать переменные, создание типа будет выглядеть так:

```
mutation postPhoto(
    $name
    $description
    $category: PhotoCategory
) {
    postPhoto(
        name: $name
        description: $description
        cetegory: $category
    ) {
        id 
        name
        email
    }
}
```

## Типы ввода

Типы ввода нужны только для аргументов, улучшают читабельность и их можно повторно испольщовать в определении разных типов.
Помогают правильной организации и написанию четкой схемы GraphQL.

Улучшаем мутацию:

```
input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory=PORTRAIT
}

type Mutation {
    postPhoto (input: PostPhotoInput!): Photo!
}

schema {
    query: Query
    mutqtion: Mutation
}
```

Улучшенная отправка мутации выглядит так:
```
mutation NewPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
        id 
        url 
        created
    }
}
```
### Возвращаемые типы

Возвращаемые типы - передают нам дополнительную информацию по результату запроса в дополнение к полезной нагрузке, например:

- время выполнения запроса 
- сколько результатов было получено

### Тип подписки

Подписки помогают получать новые или измененные данные в режиме реального времени. Для них мы тоже четко прописываем типы:

```
// Определение типов подписки
type Subscription {
    newPhoto(category: PhotoCategory): Photo!
    newUser: User!
}

// Добавление типов запросов на подписку в общую схему
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}

// Запрос клиента на подписку
subscription {
    newPhoto(category: "ACTION") {
        id
        name
        url
        postedBy {
            name
        }
    }
}

```

## Схема приложения PhotoShare

```
"""
Scalar types
"""

scalar DataTime
scalar Location

// emum тоже скалярный тип

enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
}

enum SortDirection {
    ASCENDING
    DESCENDING
}

enum SortablePhotoField {
    name
    description
    category
    created
}


"""
Input types
"""

inpit PhotoFilter {
    category: PhotoCategory
    createdBetween: DateRange
    taggedUsers: [ID!]
    searchText: String
}

input DateRange {
    start: DateTime!
    end: DateTime!
}

input DataPage {
    first: Int = 25
    start: Int = 0
}

input DataSort {
    sort: SortDirection = DESCENDING
    sortBy: SortablePhotoField = created
}


"""
Users types
"""
type Friendship {
    friends: [User!]!
    howLong: Int
    whereWeMet: Location
}

type User {
    githubLogin: ID!
    name: String
    avatar: String
    "---Published photos from User"
    postedPhotos(
        filter: PhotoFilter
        paging: DataPage
        sorting: DataSort
    ): [Photo!]!
    "---Tagged in the photos"
    inPhotos(
        filter: PhotoFilter 
        paging: DataPage 
        sorting: DataSort
    ): [Photo!]!
    friends: [Friendship!]!
}


type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    created: DateTime!
    category: PhotoCategory!
    postedBy: User!
    taggedUsers(sorting: DataSort): [User!]!
}

"""
Определяем тип допустимого кода для отправки мутации githubAuth для авторизации на GitHub
"""
type AuthPayload {
    user: User!
    token: String!
}


"""
Определение типов запросов на получение информации
"""
type Query {
    ...
    totalPhotos: Int!
    allPhotos(
        filter: PhotoFilter
        paging: DataPage
        sorting: DataSort
        ): [Photo!]!
    totalUsers: Int!
    allUsers(
        paging: DataPage
        sorting: DataSort
        ): [User!]!
    User(githubLogin: ID!): User!
    Photo(id: ID!): Photo!
}



"""
The input sent with the postPhoto Mutation
"""
input PostPhotoInput {
    "The name of the new photo"
    name: String!
    
    "(optional) A brief description of the photo"
    description: String
    
    "(optional) The category that defines the photo"
    category: PhotoCategory=PORTRAIT
}


"""
Определение типов мутаций
"""
type Mutation {
    """
    Autorizes a GitHub User
    """
    gitHubAuth(
        "The unic code from GitHub that is sent to autorize the user"
        code: String!
    ): AuthPayload!
    
    """
    Posted Photo
    """
    newPhoto($input: PostPhotoInput!) {
        postPhoto (
            "input: The name, description and category for a new photo"
            input: $input
        ): Photo!
    }
    
}

"""
Определение типов подписок
"""
type Subscription {
    newPhoto(category: PhotoCategory): Photo!
    newUser: User!
}


"""
Общая схема основных типов
"""
schema {
    """
    Запросы на получение данных
    """
    query: Query
    
    """
    Запросы на создание/изименение данных
    """
    mutation: Mutation
    
    """
    Запросы на подписку на создания/изменения данных
    """
    subscription: Subscription
}

```