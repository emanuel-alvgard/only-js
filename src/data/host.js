"use strict";

let ROOT = document.createElement("div");
ROOT.id = "ROOT";
ROOT.style.position = "absolute";
ROOT.style.margin = "0px";
ROOT.style.padding = "0px";
ROOT.style.border = "none";
ROOT.style.left = "0px";
ROOT.style.top = "0px";
ROOT.style.width = "100%";
ROOT.style.height = "100%";
ROOT.style.zIndex = "0";
ROOT.style.backgroundColor = "white";
DOM_body.append(ROOT);

let ROOT_mousemove = 0;
let ROOT_mouse_x = 0;
let ROOT_mouse_y = 0;
let ROOT_mouse_x_previous = 0;
let ROOT_mouse_y_previous = 0;
let ROOT_mousedown = 0;
let ROOT_mouseup = 0;

let ROOT_touchstart = 0;
let ROOT_touchmove = 0;
let ROOT_touch_x = 0;
let ROOT_touch_y = 0;
let ROOT_touch_x_previous = 0;
let ROOT_touch_y_previous = 0;
let ROOT_touchend = 0;

let ROOT_keydown = new Int32Array(100);
let ROOT_keyup = new Int32Array(100);

// MOUSE
function ROOT_event_mousemove(event) { 
    ROOT_mousemove = 1;
    ROOT_mouse_x_previous = ROOT_mouse_x;
    ROOT_mouse_y_previous = ROOT_mouse_y;
    ROOT_mouse_x = event.clientX;
    ROOT_mouse_y = event.clientY;
}
function ROOT_event_mousedown(event) { ROOT_mousedown = 1; }
function ROOT_event_mouseup(event) { ROOT_mouseup = 1; }

ROOT.addEventListener("mousemove", ROOT_event_mousemove);
ROOT.addEventListener("mousedown", ROOT_event_mousedown);
ROOT.addEventListener("mouseup", ROOT_event_mouseup);

// TOUCH
function ROOT_event_touchstart(event) { 
    ROOT_touchstart = 1;
    ROOT_touch_x_previous = event.touches[0].clientX;
    ROOT_touch_y_previous = event.touches[0].clientY;
    ROOT_touch_x = event.touches[0].clientX;
    ROOT_touch_y = event.touches[0].clientY; 
}
function ROOT_event_touchmove(event) {
    ROOT_touchmove = 1;
    ROOT_touch_x_previous = ROOT_touch_x;
    ROOT_touch_y_previous = ROOT_touch_y;
    ROOT_touch_x = event.touches[0].clientX;
    ROOT_touch_y = event.touches[0].clientY;
}
function ROOT_event_touchend(event) { 
    ROOT_touchend = 1;
    ROOT_touch_x_previous = 0;
    ROOT_touch_y_previous = 0;
    ROOT_touch_x = 0;
    ROOT_touch_y = 0; 
 }

ROOT.addEventListener("touchstart", ROOT_event_touchstart);
ROOT.addEventListener("touchmove", ROOT_event_touchmove);
ROOT.addEventListener("touchend", ROOT_event_touchend);

// @ADD
// KEYBOARD
function ROOT_event_keydown(event) {
    switch (event.key) {
        
        // DIGITS
        case "0": ROOT_keydown[0] = 1; break;
        case "1": ROOT_keydown[1] = 1; break;
        case "2": ROOT_keydown[2] = 1; break;
        case "3": ROOT_keydown[3] = 1; break;
        case "4": ROOT_keydown[4] = 1; break;
        case "5": ROOT_keydown[5] = 1; break;
        case "6": ROOT_keydown[6] = 1; break;
        case "7": ROOT_keydown[7] = 1; break;
        case "8": ROOT_keydown[8] = 1; break;
        case "9": ROOT_keydown[9] = 1; break;
        
        //LOWER
        case "a": ROOT_keydown[10] = 1; break;
        case "b": ROOT_keydown[11] = 1; break;
        case "c": ROOT_keydown[12] = 1; break;
        case "d": ROOT_keydown[13] = 1; break;
        case "e": ROOT_keydown[14] = 1; break;
        case "f": ROOT_keydown[15] = 1; break;
        case "g": ROOT_keydown[16] = 1; break;
        case "h": ROOT_keydown[17] = 1; break;
        case "i": ROOT_keydown[18] = 1; break;
        case "j": ROOT_keydown[19] = 1; break;
        case "k": ROOT_keydown[20] = 1; break;
        case "l": ROOT_keydown[21] = 1; break;
        case "m": ROOT_keydown[22] = 1; break;
        case "n": ROOT_keydown[23] = 1; break;
        case "o": ROOT_keydown[24] = 1; break;
        case "p": ROOT_keydown[25] = 1; break;
        case "q": ROOT_keydown[26] = 1; break;
        case "r": ROOT_keydown[27] = 1; break;
        case "s": ROOT_keydown[28] = 1; break;
        case "t": ROOT_keydown[29] = 1; break;

    }
}

document.addEventListener("keydown", ROOT_event_keydown);