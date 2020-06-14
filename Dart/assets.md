Flutter uses the pubspec.yaml file, located at the root of your project, to identify assets required by an app.

Here is an example:

content_copy
```javascript
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

To include all assets under a directory, specify the directory name with the / character at the end:

content_copy
```javascript
flutter:
  assets:
    - directory/
    - directory/subdirectory/
```


