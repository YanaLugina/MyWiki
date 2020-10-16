# Для начала запомнить

У всех виджетов имеется свой build метод, который вызывается по цепочке начиная с корневого stateless виджета.

Used MaterialApp widget:
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp( // Cupertino
        home: Center(
          child: Scaffold(
            backgroundColor: Colors.white,
            appBar: AppBar(
              title: Text('My Flutter'),
              centerTitle: true,
            ),
            body: Center(
                child: Text(
                    'This home page',
                  style: TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Colors.blueGrey,
                  )
                ),
            )
          ),
        ),
    ),
  );
}/**/
``` 

Для чего нужен key: 
 - Если этот ключ и RuntimeType нового виджета равны ( == ) старому виджету, то он обновится (update), в противном случае старый виджет удаляется и элемент заполняет новый виджет;
 - Если key не определен, то сравниваются только RuntimeType и также при нахождении "одинаковых" виджетов происходит удаление старого виджета из дерева с последующим созданием на его месте нового, даже если у них разные children;
 - Если определен GlobalKey то можно перемещать виджеты по дереву элементов без потери состояния, то есть менять его предков-родителей;
 - Если у родительского элемента только один child то он (ребенок) не нуждается в явном key.
 
 
 Stateless widget 
  - StatelessWidget - абстрактный класс для реализации виджета без состояния.
  - Для его использования необходимо унаследоваться и реализовать функцию build 
  - все поля в унаследованном классе должны быть final
 
 
 ```dart
import 'package:flutter/material.dart';

void main() {
  runApp(AppForSave());
}

class AppForSave extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.amberAccent,
        appBar: AppBar(
          title: Text("My App for Save"),
          centerTitle: true,
        ),
        body: Center(
          child: Container(
            padding: EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget> [
                  LinearProgressIndicator(value: 23),
                  Text(
                      "23 %",
                      style: TextStyle(
                          color: Colors.grey,
                          fontSize: 20
                      )
                  ),
                  Text(
                      "Press button to download",
                      style: TextStyle(
                          color: Colors.grey,
                          fontSize: 20
                      )
                  ),

                ]
            )
          )
        ),
          floatingActionButton: FloatingActionButton(
            onPressed: null,
            child: Icon(
              Icons.cloud_download
            ),
          ),
      ),
    );
  }
}
```