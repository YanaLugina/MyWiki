// v8 <- internal/fs/utils.js


// Получим действительный путь
const getValidatedPath = hideStackFrames((fileURLOrPath, propName = 'path') => {
    const path = toPathIfFileURL(fileURLOrPath);
    validatePath(path, propName);
    return path;
});

// toPathIfFileURL <- internal/url.js

function toPathIfFileURL(fileURLOrPath) {
    if (fileURLOrPath == null || !fileURLOrPath[searchParams] ||
        !fileURLOrPath[searchParams][searchParams])
        return fileURLOrPath;
    return fileURLToPath(fileURLOrPath);
}

// hideStackFrames <- internal/errors.js

/*-------------*/
let excludedStackFn;

// This function removes unnecessary frames from Node.js core errors.
// Эта функция удаляет ненужные конструкции из ошибок ядра Node.js.
function hideStackFrames(fn) {
    return function hidden(...args) {
        // Make sure the most outer `hideStackFrames()` function is used.
        //Убедитесь, что используется самая внешняя функция hideStackFrames ().
        let setStackFn = false;
        if (excludedStackFn === undefined) {
            excludedStackFn = hidden;
            setStackFn = true;
        }
        try {
            return fn(...args);
        } finally {
            if (setStackFn === true) {
                excludedStackFn = undefined;
            }
        }
    };
}
/*------------*/

// fileURLToPath <- internal/url.js

function fileURLToPath(path) {
    if (typeof path === 'string')
        path = new URL(path);
    else if (path == null || !path[searchParams] ||
        !path[searchParams][searchParams])
        throw new ERR_INVALID_ARG_TYPE('path', ['string', 'URL'], path);
    if (path.protocol !== 'file:')
        throw new ERR_INVALID_URL_SCHEME('file');
    return isWindows ? getPathFromURLWin32(path) : getPathFromURLPosix(path);
}

// isWindows <- internal/url.js
const { platform } = process;
const isWindows = platform === 'win32';

// validatePath <- internal/fs/utils.js

const validatePath = hideStackFrames((path, propName = 'path') => {
    if (typeof path !== 'string' && !isUint8Array(path)) {
        throw new ERR_INVALID_ARG_TYPE(propName, ['string', 'Buffer', 'URL'], path);
    }

    const err = nullCheck(path, propName, false);

    if (err !== undefined) {
        throw err;
    }
});

// isUint8Array <- internal/util/types.js

function isUint8Array(value) {
    return TypedArrayProto_toStringTag(value) === 'Uint8Array';
}

// getPathFromURLWin32 <- internal/url.js

function getPathFromURLWin32(url) {
    const hostname = url.hostname;
    var pathname = url.pathname;
    for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === '%') {
            var third = pathname.codePointAt(n + 2) | 0x20;
            if ((pathname[n + 1] === '2' && third === 102) || // 2f 2F /
                (pathname[n + 1] === '5' && third === 99)) {  // 5c 5C \
                throw new ERR_INVALID_FILE_URL_PATH(
                    'must not include encoded \\ or / characters'
                );
            }
        }
    }
    pathname = pathname.replace(forwardSlashRegEx, '\\');
    pathname = decodeURIComponent(pathname);

    /* Метод decodeURIComponent() декодирует управляющие последовательности символов в компоненте
    * Uniform Resource Identifier (URI), созданные с помощью метода encodeURIComponent или
    * другой подобной процедуры.
    */

    if (hostname !== '') {
        // If hostname is set, then we have a UNC path
        // Pass the hostname through domainToUnicode just in case
        // it is an IDN using punycode encoding. We do not need to worry
        // about percent encoding because the URL parser will have
        // already taken care of that for us. Note that this only
        // causes IDNs with an appropriate `xn--` prefix to be decoded.
        /*
        * Если имя хоста установлено, то у нас есть UNC-путь
        * Передайте имя хоста через domainToUnicode на всякий случай
        * это IDN, использующий кодировку punycode. Нам не нужно беспокоиться
        * о процентах кодирования, потому что анализатор URL будет иметь
        * уже позаботился об этом для нас. Обратите внимание, что это только
        * заставляет IDN с соответствующим префиксом `xn -` декодироваться.
        * */
        return `\\\\${domainToUnicode(hostname)}${pathname}`;
    } else {
        // Otherwise, it's a local path that requires a drive letter
        // В противном случае это локальный путь, который требует буквы диска
        var letter = pathname.codePointAt(1) | 0x20;
        /*
        * Метод codePointAt() возвращает неотрицательное целое число, являющееся
        * закодированным в UTF-16 значением кодовой точки.
        *
        * */

        var sep = pathname[2];
        if (letter < CHAR_LOWERCASE_A || letter > CHAR_LOWERCASE_Z ||   // a..z A..Z
            (sep !== ':')) {
            throw new ERR_INVALID_FILE_URL_PATH('must be absolute');
        }
        return pathname.slice(1);
    }
}

// domainToUnicode <- internal/url.js

function domainToUnicode(domain) {
    if (arguments.length < 1)
        throw new ERR_MISSING_ARGS('domain');

    // toUSVString is not needed.
    return _domainToUnicode(`${domain}`);
}

// getPathFromURLPosix <-

function getPathFromURLPosix(url) {
    if (url.hostname !== '') {
        throw new ERR_INVALID_FILE_URL_HOST(platform);
    }
    const pathname = url.pathname;
    for (var n = 0; n < pathname.length; n++) {
        if (pathname[n] === '%') {
            var third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === '2' && third === 102) {
                throw new ERR_INVALID_FILE_URL_PATH(
                    'must not include encoded / characters'
                );
            }
        }
    }
    return decodeURIComponent(pathname);

}