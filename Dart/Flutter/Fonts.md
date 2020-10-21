#Шрифты

Подключение шрифтов происходит таким же образом как и все стстические файлы:
 - добавляем в pubspec.yaml
 ```yaml
flutter:
 ...
  # To add custom fonts to your application, add a fonts section here,
  # in this "flutter" section. Each entry in this list should have a
  # "family" key with the font family name, and a "fonts" key with a
  # list giving the asset and other descriptors for the font. For
  # example:
  fonts:
    - family: IndieFlower
      fonts:
        - asset: fonts/IndieFlower-Regular.ttf
 ...
```
 - испоользуем либо в MaterialApp для всего приложения,
 ```dart
 ...
    MaterialApp(
      theme: ThemeData(
        fontFamily: 'IndieFlower',
      ),
 ...
```
 - либо конкретно в определенном виджете Text (fontFamily: 'название шрифта'')