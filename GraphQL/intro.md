# GraphQL

### Применение

Использовать если необходимо:

 - работать со сложной распределенной системой
 - уменьшение количества передаваемых данных клиенту и "хождения" лишнего траффика
 - подписываться на изменения в источнике данных

Особенности:

- Самодокументация
- Работа с графами


### Инструменты для тестирования через API:
 - GraphiQL 
 - GraphQL Playground
 
Настольная версия GraphQL Playground устанавливается:
 ```javascript
brew cask install graphql-playground
``` 
или с репозитория:
https://github.com/prisma-labs/graphql-playground/releases

 
###Открытые Api GraphQL:
 - SWAPI (the Star Wars API) (https://graphql.org/swapi-graphql) проект Facebook надстройка над API SWAPI REST
 - GitHub API (https://developer.github.com/v4/explorer/)
 - Yelp (https://www.yelp.com/developers/graphiql)
 
 Другие: https://github.com/APIs-guru/graphql-apis
 
 Для тестирования: snowtooth.moonhighway.com/


## Основы

Пример простого запроса:
 ```javascript
 query {
   allLifts {
     name
     status
   }
 }
```


Пример трех запросов в одном:
```javascript
query liftsAndTrails {
    liftCount(status: HOLD)
    allLifts {
        name
        status
      }
      
    allTrails {
        name
        difficulty
      }
} 
```


Пример с указанием псевдонимов (слева - псевдоним, справа - реальные данные):
```javascript
query liftsAndTrails {
  open: liftCount(status: OPEN)
  chairlifts: allLifts{
    liftName: name
    status
  }
  skiSlopes: allTrails {
    name
    difficulty
  }
} 
```

###Типы данных

- скалярные
- типы объектов

Скалярные: Int, Float, String, Boolean, ID

### Корневые типы

- **query**           запрос на получение данных
- **mutation**        запрос на модификация, создание, удаление
- **subscription**    запрос на подписку после изменения данных

### Выборки
Все что находится в фигурных скобках  {} называется **выборками**. Вложенности выборок поддерживается.
Ответ на запрос приходит в формате JSON в том виде, в котором был произведен запрос.

### Аргументы
**Аргументы** запроса перечисляются в круглых скобках () в формате ключ: "значение". Данные ответа фильтруются в соответствии с указанными аргументами.


Пример сортировки по статусу:
```javascript
query closedLifts {
  allLifts(status: CLOSED) {
    name
    status
  }
} 
```

Пример выборки по id:
```javascript
query jazzCatStatus {
  Lift(id: "jazz-cat") {
    name
    status
    night
    elevationGain
  }
} 
```

## Фрагменты

Часть выборки мы можем поместить в переменную - фрагмент для дальнейшей подстановки в запрос при повторном использовании.
Фрагменты - это выборки определенных типов, поэтому обязательно указание типа объекта, которому принадлежит фрагмент.

Пример использования фрагментов:
```javascript
query jazzCatStatus {
  Lift(id: "jazz-cat") {
    ...liftIntro
    trailAccess {
      ...trailIntro
    }
  }
  Trail(id: "river-run") {
    ...trailIntro
    accessedByLifts {
      ...liftIntro
    }
  }
}

#Фрагмент типа объекта Lift
fragment liftIntro on Lift {
  name
  status
  capacity
  night
  elevationGain
}

#Фрагмент типа объекта Trail
fragment trailIntro on Trail {
  name
  difficulty
}
```

Пример комбинирования фрагментов 
```javascript
query jazzCatStatus {
  Trail(id: "river-run") {
    ...trailStatus
    ...trailDetails
  }
}

#Фрагмент типа объекта Trail для определения статуса
fragment trailStatus on Trail {
  name
  status
}

#Фрагмент типа объекта Trail для определения подробной информации
fragment trailDetails on Trail {
  groomed
  trees
  night
}
```


### Объединения

Для объединения результатов запроса разных типов можно использовать объединения:
```javascript
query schedule {
  agenda {
    ...on Workout {
      name
      reps
    }
    ...on StudyGroup {
      name
      subject
      students
    }
  }
}
```

Здесь используются встроенные фрагменты, он не используют имени

Тот же пример, но с использованием именованных фрагментов:

```javascript
query schedule {
  agenda {
    ...study
    ...workout
  }
}

fragment workout on Workout {
  name
  reps
}

fragment study on StudyGroup {
  name
  subject
  student
}
```

### Интерфейсы

Интерфейсы - еще один вариант раобты с несколькими типами данных. Абстрактный тип, устанавливающий список полей, которые долдны быть реализованны в похожих типах объектов:

```javascript
query schedule {
  agenda {
    name
    start
    end
  }
}
```

## Мутации
