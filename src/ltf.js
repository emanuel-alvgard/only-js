"use strict";

// This is a parser for the "lite format" (ltf).

// belongs to the caller
let ltf_data = "(u8:1,2,3,0x7)(f32:1.0,2.0,0.0x8)";
let reciever;

// this belongs to this module
let length;
let id_count;
let c;

// utils
let util_string = "";

// array
let array_start;
let array_length;


// int
let int_start;
let int_end;
let int_result;




function is_u8(data) {
    if (data[c] == "u" && data[c+1] === "8") { c += 3; return 1; }
    else { return 0; }
}


function is_digit(data) {

    switch (data[c]) {
        case "0":
            return 1;
        case "1":
            return 1;
        case "2":
            return 1;
        case "3":
            return 1;
        case "4":
            return 1;
        case "5":
            return 1;
        case "6":
            return 1;
        case "7":
            return 1;
        case "8":
            return 1;
        case "9":
            return 1;
        default:
            return 0;
    }
}

/*
let int_counter;
function is_integer(data) {
    int_counter = 0;
    while (data[c] {

    }
}
*/

function u8(reciever, data) {
    array_start = c;
    while (1) {
        if (is_digit()) { c ++; }
        else if (data[c] === ",") { array_length += 1; c ++; }
        else if (data[c] === "x") {
            c ++;
            while (1) {
                if (is_digit()) { util_string += data[c]; c ++; }
                else { 
                    array_length += +util_string; 
                    util_string = "";
                    c++;
                    break;
                }
            }
        }
        else if (data[c] === ")") { break; }
    } 
    reciever = new Uint8Array(array_length);
}






function load(array, data, id) {
    
    length = data.length;
    id_count = 0;
    c = 0;

    for (c; c < length; c ++) {
        if (data[c] === "(") { id_count ++; }
        if (id_count === id) { c ++; break; }
    }

    if (is_u8(data)) { u8(reciever, data); console.log(reciever); return; }
}



load(reciever, ltf_data, 1);