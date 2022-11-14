// @DONE
export function queue_create(size) {

    let queue = {
        data: null,
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
export function queue_add(item, queue) {

    let len = queue.data.length;
    let start = queue.start;
    let end = queue.end;
    let count = queue.count;

    if (end === start && count !== 0) { return false; }

    queue.data[end] = item;
    queue.count += 1;
    end += 1;

    if (end === len) { queue.end = 0; }
    else { queue.end = end; }

    return true;
}

// @DONE
export function queue_remove(queue) {

    let len = queue.data.length;
    let start = queue.start;
    let end = queue.end;
    let count = queue.count;

    if (start === end && count === 0) { return false; }

    let result = queue.data[start];
    queue.data[start] = null;
    queue.count -= 1;
    start += 1;

    if (start === len) { queue.start = 0; }
    else { queue.start = start; }

    return result;
}

// @DONE
export function buffer_create(size) {

    let buffer = { 
        queue: queue_create(size),
        data: new Array(size)
    }
    
    let i = 0;
    while (i < size) {
        queue_add(i, buffer.queue);
        buffer.data[i] = null;
        i += 1;
    }
    
    return buffer;
}

// @DONE
export async function buffer_add(item, buffer) {

    let index = null;

    await new Promise(function (resolve, reject){
        let i = setInterval(function () {

            index = queue_remove(buffer.queue);

            if (index !== false) {
                resolve();
                clearInterval(i);
            }
        });
    });

    buffer.data[index] = item;
    return index;

}

// @DONE
export function buffer_remove(index, buffer) {
    
    buffer.data[index] = null;
    let result = queue_add(index, buffer.queue);
    if (result === false) { return false; }
    return true;
}



// @ADD
// queue_get
// queue_set



/* @TEST
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



async function tester() {
    let test = buffer_create(10);
    console.log(test);
    let index = await buffer_add({hello:42}, test);
    console.log(test);
    console.log(index);
    let index_ = await buffer_add({hello:42}, test);
    console.log(test);
    console.log(index_);
    buffer_remove(index_, test);
    console.log(test);
}

tester();


*/
