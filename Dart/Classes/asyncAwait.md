#$ Async - await

```
import 'dart:html';

void main () {
  
  print("The main program starts");
  printFileContent();
  print('The main program: ends');
}

printFileContent() async {
  try {
    String time = await getTimeServer();
    print(time);
    
    String fileContent = await downloadFile();
    print('The contemt on the file is ->> $fileContent');
    
    String time2 = await getTimeServer();
    print(time2);
    
  } catch (error) {
    print('Catching error $error');
  }
  
}

Future<String> downloadFile() {
  Future<String> result = Future.delayed(Duration(seconds: 5), () {
    return HttpRequest.getString('https://dart/f/dailyNewsDigest.txt');
  });
  
  return result;
}

Future<String> getTimeServer() {
  Future<String> result = Future(() {
    return HttpRequest.getString('https://rebounce.online/api/time');
  });
  
  return result;
}
```