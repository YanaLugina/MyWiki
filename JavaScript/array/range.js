//Create function which create array and may has 3 arguments
// Array start from first argument, and the end to second argument and his step is equal to the third argument

// Result
function range (first, last, num) {
    if (typeof first !== "number" || typeof last !== "number") {
        if ((num !== undefined) && (typeof num !== "number")) {
            console.log('Arguments type must be a number.');
        }
        console.log('Arguments type must be a number.');
        return NaN;
    } else {
        const arr = [];
        let n = num;
        if (n === undefined) {
            n = 1;
        }
        for(let i = first; i <= last; i = i + n) {
            arr.push(i);
        }
        return arr;
    }
}

function sum (arr) {
    // arr === Array?
    const toString = {}.toString;
    if(toString.call(arr).slice(8, -1) === 'Array'){
        return arr.reduce((a, b) => a + b, 0);
    }
    console.log('In function sum argument mast be Array');
    return NaN;
}

console.log(range(4, 6));  // [4, 5, 6]
console.log(sum(range(1, 10))); // 55

console.log(sum('range(1, 10)'));   // In function sum argument mast be Array
                                        // NaN