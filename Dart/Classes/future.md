## Future

```
import 'dart:html';

void main () {
  
  print("The main program starts");
  printFileContent();
  print('The main program: ends');
}

printFileContent() {
  Future<String> fileContent = downloadFile();
  fileContent.then((resultString) {
    print('The contemt on the file is ->> $resultString');
  }).catchError((error) => print("The file not Found"));
}

Future<String> downloadFile() {
  Future<String> result = Future.delayed(Duration(seconds: 5), () {
    return HttpRequest.getString('Https://dart/f/dailyNewsDigest.txt');
  });
  
  return result;
}
```