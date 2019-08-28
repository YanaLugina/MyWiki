# File System API

## Using fs.writeFile() with File Descriptors
Когда file есть дескриптор файла, поведение почти идентично прямому вызову ```fs.write()``` вроде:

```js
fs.write(fd, Buffer.from(data, options.encoding), callback);
```

Отличие от прямого вызова ```fs.write()``` состоит в том, что при некоторых необычных условиях fs.write()может записываться только часть буфера, и потребуется повторная попытка записи оставшихся данных, тогда как повторная попытка fs.writeFile() будет повторять до тех пор, пока данные не будут полностью записаны (или не произойдет ошибка).

Последствия этого являются распространенным источником путаницы. В случае файлового дескриптора файл не заменяется! Данные не обязательно записываются в начало файла, и исходные данные файла могут оставаться до и/или после вновь записанных данных.

Например, если fs.writeFile() вызывается дважды подряд, сначала для записи строки 'Hello', затем для записи строки ', World', файл будет содержать 'Hello, World' и может содержать некоторые исходные данные файла (в зависимости от размера исходного файла и положения дескриптора файла). Если вместо дескриптора было использовано имя файла, файл гарантированно будет содержать только ', World'.


## fs.writeFileSync

Синхронное добавление файла в файловую систему.

Пример создания файла с содержимым:
```js
const fs = require('fs');


/* Сохраняем Данные второго аргумента в файл указанный в первом аргументе.
*  Если вайл не существует, то он будет создан с текстом Hello from Node.js
* */

fs.writeFileSync('Hello.txt', 'Hello from Node.js');
   ```

Под капотом:

```js
function writeFileSync(path, data, options) {
  options = getOptions(options, { encoding: 'utf8', mode: 0o666, flag: 'w' });
  const flag = options.flag || 'w';

  const isUserFd = isFd(path); // File descriptor ownership
  const fd = isUserFd ? path : fs.openSync(path, flag, options.mode);

  if (!isArrayBufferView(data)) {
    data = Buffer.from('' + data, options.encoding || 'utf8');
  }
  let offset = 0;
  let length = data.byteLength;
  let position = (/a/.test(flag) || isUserFd) ? null : 0;
  try {
    while (length > 0) {
      const written = fs.writeSync(fd, data, offset, length, position);
      offset += written;
      length -= written;
      if (position !== null) {
        position += written;
      }
    }
  } finally {
    if (!isUserFd) fs.closeSync(fd);
  }
}
```

## fs.write

// usage:
fs.write(fd, buffer[, offset[, length[, position]]], callback);

// OR:
fs.write(fd, string[, position[, encoding]], callback);

Описание аргументов:

- fd < integer >
- buffer < Buffer > | < TypedArray > | < DataView >
- offset < integer >
- length < integer >
- position < integer >
- callback < Function >
  - err < Error>
  - bytesWritten < integer >
  - buffer < Buffer > | < TypedArray > | < DataView >
  
Записывает то, что находится в ```buffer``` в указанный файл ```fd```. Если файл не существует, то сначала создает файл, потом записывает.

```offset``` определяет часть буфера для записи, and ```length``` это целое число, определяющее максимальный размер в байтах для записи. Это необязательные параметры.

```position``` указывает смещение от начала файла ```fd```, в который будет записываться содержимое ```buffer``` Если тип данных ```position``` !== 'number', данные будут записываться в конец файла the data will be written at the current position. See pwrite(2).

Что происходит под капотом этого метода:

```js
function write(fd, buffer, offset, length, position, callback) {
  function wrapper(err, written) {
    // Retain a reference to buffer so that it can't be GC'ed too soon.
    callback(err, written || 0, buffer);
  }

  validateUint32(fd, 'fd');

  const req = new FSReqCallback();
  req.oncomplete = wrapper;

  if (isArrayBufferView(buffer)) {
    callback = maybeCallback(callback || position || length || offset);
    if (typeof offset !== 'number')
      offset = 0;
    if (typeof length !== 'number')
      length = buffer.length - offset;
    if (typeof position !== 'number')
      position = null;
    validateOffsetLengthWrite(offset, length, buffer.byteLength);
    return binding.writeBuffer(fd, buffer, offset, length, position, req);
  }

  if (typeof buffer !== 'string')
    buffer += '';
  if (typeof position !== 'function') {
    if (typeof offset === 'function') {
      position = offset;
      offset = null;
    } else {
      position = length;
    }
    length = 'utf8';
  }
  callback = maybeCallback(position);
  return binding.writeString(fd, buffer, offset, length, req);
}
```