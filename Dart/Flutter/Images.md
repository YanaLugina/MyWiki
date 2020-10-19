#Подключение  картинок

Подключение статических изображений:
 - Добавляем в pubspec.yaml пути до файлов
 ```yaml
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  assets:
    - assets/images/bg459246.jpeg
    - assets/icons/logo_96.png
```
 
 - В приложении используем widget Image для подключения
 ```dart
import 'dart:async';

import 'package:flutter/material.dart';

void main() {
  runApp(AppForSave());
}

class AppForSave extends StatefulWidget {

  @override
  State<StatefulWidget> createState() {
    return _MyAppForSaveState();
  }
}

class _MyAppForSaveState extends State<AppForSave> {
  bool _loading;
  double _progressValue;

  @override
  void initState() {
    _loading = false;
    _progressValue = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'IndieFlower',
      ),
      home: Scaffold(
        backgroundColor: Colors.amberAccent,
        appBar: AppBar(
          title: Text("My App for Save"),
          centerTitle: true,
        ),
        body: Center(
          child: Container(
            padding: EdgeInsets.fromLTRB( 16, 20, 16, 20),
            child: _loading
                ?  Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget> [
                    LinearProgressIndicator(value: _progressValue),
                    Text(
                        '${(_progressValue * 100).round()} %',
                        style: TextStyle(
                            color: Colors.grey,
                            fontSize: 20
                        )
                    ),
                  ]
                )
                :
                  Stack(
                    fit: StackFit.expand,
                    alignment: Alignment.center,
                    children: <Widget> [
                      Image(
                        image: AssetImage('assets/images/bg459246.jpeg'),
                      ),
                      Image.asset('assets/icons/logo_96.png'),
                      Positioned(
                        top: 20,
                        child: Text(
                            "Press button to download",
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 20,
                            )
                        ),
                      ),
                    ],
                  )
          )
        ),
          floatingActionButton: FloatingActionButton(
            onPressed: () {
              setState(() {
                _loading = !_loading;
                _updateProgress();
              });
            },
            child: Icon(
              Icons.cloud_download
            ),
          ),
      ),
    );
  }

  void _updateProgress() {
    const oneSec = const Duration(seconds: 1);

    Timer.periodic(oneSec, (Timer t) {
      setState(() {
        _progressValue += 0.2;

        if(_progressValue.toStringAsFixed(1) == '1.0' ) {
          _loading = false;
          t.cancel();
          _progressValue = 0.0;
          return;
        }
      });
    });
  }
}


```