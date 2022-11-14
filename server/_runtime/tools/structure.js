'use strict';

// @DONE
function str_create(string) {

    let str = {
        pointer: 0,
        length: 0,
        string: string
    }

    str.length = string.length;

    return str;
}

// @DONE
function str_add(string, str) {

    str.string += string;
    str.length += string.length;

    return;
}

// @DONE
function str_set(str, string) {

    str.string = string;
    str.length = string.length;

    return;
}

// @DONE
function queue_create(size) {

    let queue = {
        data: '',
        start: 0,
        end: 0,
        count: 0
    }

    let data = new Array(size);
    let i = 0;
    while (i < size) {
        data[i] = null;
        i += 1;
    }

    queue.data = data;

    return queue;
}

// @DONE
function queue_add(subject, target) {

    let len = target.data.length;
    let start = target.start;
    let end = target.end;
    let count = target.count;

    if (end === start && count !== 0) { return false; }

    target.data[end] = subject;
    target.count += 1;
    end += 1;

    if (end === len) { target.end = 0; }
    else { target.end = end; }

    return true;
}

// @DONE
function queue_remove(target) {

    let len = target.data.length;
    let start = target.start;
    let end = target.end;
    let count = target.count;

    if (start === end && count === 0) { return false; }

    let result = target.data[start];
    target.data[start] = null;
    target.count -= 1;
    start += 1;

    if (start === len) { target.start = 0; }
    else { target.start = start; }

    return result;
}   

// @ADD
// queue_get
// queue_set


// @EXPORT
exports.str_create = str_create;
exports.str_add = str_add;
exports.str_set = str_set;

exports.queue_create = queue_create;
exports.queue_add = queue_add;
exports.queue_remove = queue_remove;



/* @TEST
let test_str = str_create('hello');
if (test_str.pointer !== 0) { console.log('[FAIL]: str.pointer'); }
if (test_str.length !== 5) { console.log('[FAIL]: str.length'); }
if (test_str.string !== 'hello') { console.log('[FAIL]: str.string'); }

str_add(' world', test_str);
if (test_str.pointer !== 0) { console.log('[FAIL]: str.pointer'); }
if (test_str.length !== 11) { console.log('[FAIL]: str.length'); }
if (test_str.string !== 'hello world') { console.log('[FAIL]: str.string'); }

str_set(test_str, 'hello');
if (test_str.pointer !== 0) { console.log('[FAIL]: str.pointer'); }
if (test_str.length !== 5) { console.log('[FAIL]: str.length'); }
if (test_str.string !== 'hello') { console.log('[FAIL]: str.string'); }

let test_queue = queue_create(5);
if (test_queue.start !== 0) { console.log('[FAIL]: queue.start'); }
if (test_queue.end !== 0) { console.log('[FAIL]: queue.end'); }
if (test_queue.count !== 0) { console.log('[FAIL]: str.count'); }
if (Array.isArray(test_queue.data) === false ) { console.log('[FAIL]: queue.array'); }

let add;
let remove;

add = queue_add(1, test_queue);
if (add === false) { console.log('[FAIL]: queue_add'); }
add = queue_add(1, test_queue);
if (add === false) { console.log('[FAIL]: queue_add'); }
add = queue_add(1, test_queue);
if (add === false) { console.log('[FAIL]: queue_add'); }
add = queue_add(1, test_queue);
if (add === false) { console.log('[FAIL]: queue_add'); }
add = queue_add(1, test_queue);
if (add === false) { console.log('[FAIL]: queue_add'); }

add = queue_add(1, test_queue);
if (add === true) { console.log('[FAIL]: queue_add'); }

remove = queue_remove(test_queue);
if (remove !== 1) { console.log('[FAIL]: queue_remove'); }
remove = queue_remove(test_queue);
if (remove !== 1) { console.log('[FAIL]: queue_remove'); }
remove = queue_remove(test_queue);
if (remove !== 1) { console.log('[FAIL]: queue_remove'); }
remove = queue_remove(test_queue);
if (remove !== 1) { console.log('[FAIL]: queue_remove'); }
remove = queue_remove(test_queue);
if (remove !== 1) { console.log('[FAIL]: queue_remove'); }

remove = queue_remove(test_queue);
if (remove !== false) { console.log('[FAIL]: queue_remove'); }

*/
