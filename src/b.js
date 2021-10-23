'use strict';





/* PARAMETER vs. LOCAL VARIABLE
let test = new Int32Array(10000000);

function t1(local) {
    local[0] = 1;
}

function t2() {
    let local = test;
    local[0] = 1|0;
}


let s1 = performance.now();

let i = 0;
while (i < 100000000) { t1(test); i ++; }

let e1 = performance.now();


let s2 = performance.now();

let j = 0|0;
while ((j|0) < 100000000) { t2(); j = (j+1)|0; }

let e2 = performance.now();
*/



/* EXPLICIT INT32
let s1 = performance.now();

let i = 0;
while (i < 100000000) { i ++; }

let e1 = performance.now();


let s2 = performance.now();

let j = 0|0;
while ((j|0) < 100000000) { j = (j+1)|0; }

let e2 = performance.now();
*/

let b1 = e1 - s1;
let b2 = e2 - s2;

console.log(b1);
console.log(b2);