// @DONE
function digit(c) { // digit("1");
    let i = c.charCodeAt(0);
    if (i < 48) { return false; }
    if (i > 57) { return false; }
    return true;
}

// @DONE
function lower(c) { // lower("a");
    let i = c.charCodeAt(0);
    if (i < 97) { return false; }
    if (i > 122) { return false; }
    return true;
}

// @DONE
function upper(c) { // upper("A");
    let i = c.charCodeAt(0);
    if (i < 65) { return false; }
    if (i > 90) { return false; }
    return true;
}

// @DONE
function symbol(c, s) { // symbol("&", ["&", ":", "/"]);
    if (s.includes(c)) { return true; }
    return false;
}

// @DONE
function string(s, t, p={position:0,previous:0}) { // string("simple test", "simple", {position:0, previous:0});

    let i = p.position;
    let j = 0;
    
    while (j < t.length) {
        if (i >= s.length) { return false; }
        if (s[i] !== t[j]) { return false; }
        i ++; j ++;
    }

    p.previous = p.position; 
    p.position = i;

    return true;
}

// @DONE
function longest(a) { // longest(["short", "longest"]);
    let l = [];
    for (let i=0; i < a.length; i++) {
        l.push(a[i].length);
    }
    return l.indexOf(Math.max(...l));
}











// @DONE
function value_i(s, p={position:0,previous:0}) { 
    
    let result = "";
    let i = p.position;
    
    while (i < s.length) {
        if (digit(s[i]) === false) { break; }
        result += s[i];
        i++;
    }

    if (result.length < 2) {}
    else if (result[0] === "0") { return ""; }
    
    p.previous = p.position; 
    p.position = i;

    return result;
}

// @DONE
function value_f(s, p={position:0,previous:0}) {
    
    let result = "";
    let i = p.position;
    
    while (i < s.length) {
        if (digit(s[i]) === false) { 
            result += s[i];
            i++; 
            break; }
        result += s[i];
        i++;
    }

    if (result[result.length-1] !== ".") { return "";}
    if (result[0] === "0" && result.length > 2) { return ""; }

    while (i < s.length) {
        if (digit(s[i]) === false) { break; }
        result += s[i];
        i++;
    }

    if (result[result.length-1] === ".") { return "";}
    
    p.previous = p.position; 
    p.position = i;

    return result;
}

// @DONE
function value_label(s, p={position:0,previous:0}) {
    
    let result = "";
    let i = p.position;
    
    if (digit(s[i])) { return result; }

    while (i < s.length) {
        if (lower(s[i])) { result += s[i]; i++; continue; }
        if (upper(s[i])) { result += s[i]; i++; continue; }
        if (digit(s[i])) { result += s[i]; i++; continue; }
        if (symbol(s[i], ["_"])) { result += s[i]; i++; continue; }
        break;
    }

    p.previous = p.position; 
    p.position = i;
    
    return result;
}

// @DONE
function value_str_fmt(s, p={position:0,previous:0}) {
    
    let result = "";
    let i = p.position;
    
    if (s[i] !== '"') { return result; }
    i++;

    while (i < s.length) {
        if (s[i] === '"') { i ++; break; }
        result += s[i];
        i++;
    }
    
    p.previous = p.position; 
    p.position = i;
    
    return result;
}





















// @DONE
function q_create(l, v) {

    let q = {
        data: [],
        start: 0,
        end: 0,
        count: 0,
        value: v
    }

    let data = new Array(l);
    let i = 0;
    while (i < l) {
        data[i] = v;
        i += 1;
    }

    q.data = data;

    return q;
}


// @DONE
function q_add(v, q) {

    if (q.count >= q.data.length) { return -1; }

    q.data[q.end] = v;
    q.count += 1;
    q.end += 1;

    if (q.end === q.data.length) { q.end = 0; }

    return q.end - 1;
}

// @DONE
function q_remove(q) {

    if (q.count === 0) { return -1; }

    let result = q.data[q.start];
    q.data[q.start] = q.value;
    q.count -= 1;
    q.start += 1;

    if (q.start === q.data.length) { q.start = 0; }

    return result;
}

// @DONE
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// @DONE
async function wait(task, error, condition=(t)=>{}) {

    // result = { done: 0, fail: 0}

    let p = await new Promise(function (resolve, reject){
        let i = setInterval(function () {

            condition(task);

            if (task.done === 1) {
                resolve();
                clearInterval(i);
                return;
            }
            if (task.fail === 1) {
                reject(error);
                clearInterval(i);
                return;
            }
        });
    });
}

// @DONE
function filetype(s) {
    for (let i = (s.length -1); i > 0; i--) {
        if (s[i] === ".") {
            return s.substring(i, s.length);
        }
    }
    return "unknown";
}

// @DONE
function format_url(input) {

    let result = "/";

    let len = input.length;
    let i = 0;
    if (input[0] === "/") { i = 1; }
    while (i < len) {
        let char = input.charCodeAt(i);
        if (char < 58 && char > 47) { result += input[i]; } // digit
        else if (char < 123 && char > 96) { result += input[i]; } // lower
        else if (char < 91 && char > 64) { result += String.fromCharCode(char + 32); } // upper
        else if (input[i] === "-") { result += input[i]; }
        else if (char === 229 || char === 228) { result += "a"; } // ��
        else if (char === 197 || char === 196) { result += "a"; } // ��
        else if (char === 246) { result += "o"; } // �
        else if (char === 214) { result += "o"; } // �
        else if (input[i] === "/" || input[i] === "_" || input[i] === " ") { result += "-"; }
        else { }
        i += 1;
    }
    return result;
}