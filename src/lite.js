"use strict";

/*-------------
    DOM BODY
---------------*/
let DOM_body = document.body;
DOM_body.style.margin = "0px";
DOM_body.style.left = "0px";
DOM_body.style.top = "0px";


/*------------------------------
    DEFINE VIRTUAL PROPERTIES
--------------------------------*/
// ROOT
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
let ROOT_mouse_x_previous = 0;
let ROOT_mouse_y_previous = 0;
let ROOT_mouse_x = 0;
let ROOT_mouse_y = 0;

let ROOT_mousedown = 0;
let ROOT_mouseup = 0;

function ROOT_event_mousemove(event) { 
    ROOT_mousemove = 1;
    ROOT_mouse_x_previous = ROOT_mouse_x;
    ROOT_mouse_y_previous = ROOT_mouse_y;
    ROOT_mouse_x = event["clientX"];
    ROOT_mouse_y = event["clientY"];
}
function ROOT_event_mousedown(event) { ROOT_mousedown = 1; }
function ROOT_event_mouseup(event) { ROOT_mouseup = 1; }

ROOT.addEventListener("mousemove", ROOT_event_mousemove);
ROOT.addEventListener("mousedown", ROOT_event_mousedown);
ROOT.addEventListener("mouseup", ROOT_event_mouseup);



// ELEMENT
let DOM_element = [];
let virtual_size = 0;
let id;

// PROPERTY
let size_x;
let size_x_u;

let size_y;
let size_y_u;

let x;
let y;
let rotation_z;
let transform_u;

let z;
let z_u;

// EVENT
let mousemove;
let mousedown;
let mouseup;

// ACTION
let drag;



// GET/SET PROPERTY
function get_size_x(id) { return size_x[id]; }
function set_size_x(id, value) { size_x[id] = value; size_x_u[id] = 1; }

function get_size_y(id) { return size_y[id]; }
function set_size_y(id, value) { size_y[id] = value; size_y_u[id] = 1; }

function get_x(id) { return x[id]; }
function set_x(id, value) { x[id] = value; transform_u[id] = 1; }

function get_y(id) { return y[id]; }
function set_y(id, value) { y[id] = value; transform_u[id] = 1; }

function get_rotation_z(id) { return rotation_z[id]; }
function set_rotation_z(id, value) { rotation_z[id] = value; transform_u[id] = 1; }

function get_z(id) { return z[id]; }
function set_z(id, value) { z[id] = value; z_u[id] = 1; }



// GET EVENT
function get_mousemove(id) { return mousemove[id]; }
function get_mousedown(id) { return mousedown[id]; }
function get_mouseup(id) { return mouseup[id]; }

// GET ACTION
function get_drag(id) { return drag[id]; }



// EVENT
function event_mousemove(event) { mousemove[+event["srcElement"]["id"]] = 1; }
function event_mousedown(event) { mousedown[+event["srcElement"]["id"]] = 1; }
function event_mouseup(event) { mouseup[+event["srcElement"]["id"]] = 1; }

function add_event_mousemove(id) { DOM_element[id].addEventListener("mousemove", event_mousemove); }
function add_event_mousedown(id) { DOM_element[id].addEventListener("mousedown", event_mousedown); }
function add_event_mouseup(id) { DOM_element[id].addEventListener("mouseup", event_mouseup); }

function remove_event_mousemove(id) { DOM_element[id].removeEventListener("mousemove", event_mousemove); }
function remove_event_mousedown(id) { DOM_element[id].removeEventListener("mousedown", event_mousedown); }
function remove_event_mouseup(id) { DOM_element[id].removeEventListener("mouseup", event_mouseup); }



function create_virtual(size) {

    virtual_size = size;
    id = new Int32Array(size);

    // PROPERTY
    size_x = new Int32Array(size);
    size_x_u = new Int32Array(size);
    
    size_y = new Int32Array(size);
    size_y_u = new Int32Array(size);
    
    x = new Int32Array(size);
    y = new Int32Array(size);
    rotation_z = new Int32Array(size);
    transform_u = new Int32Array(size);

    z = new Int32Array(size);
    z_u = new Int32Array(size);

    // EVENT
    mousemove = new Int32Array(size);
    mousedown = new Int32Array(size);
    mouseup = new Int32Array(size);

    // ACTION
    drag = new Int32Array(size);

    let i = 0;
    while (i < size) { DOM_element[i] = document.createElement("div"); i += 1; } i = 0;
    while (i < size) { DOM_element[i].style.position = "absolute"; i += 1; } i = 0;
    while (i < size) { DOM_element[i].id = i; i += 1; } i = 0;
    while (i < size) { id[i] = i; i += 1; } i = 0;
    while (i < size) { ROOT.append(DOM_element[i]); i += 1; } i = 0;
}



function clear_virtual() {
    
    let i = 0;
    while (i < virtual_size) { size_x[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { size_x_u[i] = 1; i += 1; } i = 0;

    while (i < virtual_size) { size_y[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { size_y_u[i] = 1; i += 1; } i = 0;

    while (i < virtual_size) { x[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { y[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { rotation_z[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { transform_u[i] = 1; i += 1; } i = 0;

    while (i < virtual_size) { z[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { z_u[i] = 1; i += 1; } i = 0;
    
    while (i < virtual_size) { mousemove[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mousedown[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mouseup[i] = 0; i += 1; } i = 0;

    while (i < virtual_size) { drag[i] = 0; i += 1; } i = 0;

    while (i < virtual_size) { remove_event_mousemove(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_mousedown(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_mouseup(i); i += 1; } i = 0;
}



function update_DOM() {

    let i; 
    
    i = 0;
    while (i < virtual_size) {
        if (size_x_u[i] === 0) { i += 1; continue; } 
        DOM_element[i].style.width = size_x[i] + "px";
        size_x_u[i] = 0;  
        i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (size_y_u[i] === 0) { i += 1; continue; } 
        DOM_element[i].style.height = size_y[i] + "px";
        size_y_u[i] = 0; 
        i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (transform_u[i] === 0) { i += 1; continue; } 
        DOM_element[i].style.transform = "translate(" 
        + x[i] + "px, "
        + y[i] + "px) "
        + "rotate(" + rotation_z[i] + "deg)";
        transform_u[i] = 0; 
        i += 1;
    }

    i = 0;
    while (i < virtual_size) {
        if (z_u[i] === 0) { i += 1; continue; } 
        DOM_element[i].style.zIndex = z[i] + "";
        z_u[i] = 0; 
        i += 1;
    } 

    
    i = 0;
    while (i < virtual_size) { mousemove[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mousedown[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mouseup[i] = 0; i += 1; } 
    ROOT_mousemove = 0;
    ROOT_mousedown = 0;
    ROOT_mouseup = 0;
}





// ANIMATION
function animation() {}
function animation_x() {}
function animation_y() {}
function animation_rotation_z() {}
function animate_z() {}




// ACTION
function action_drag() {    
    
    let _x = ROOT_mouse_x - ROOT_mouse_x_previous;
    let _y = ROOT_mouse_y - ROOT_mouse_y_previous;
    
    let i = 0;
    while (i < virtual_size) {
        if (drag[i] === 0) { i += 1; continue; }
        if (mousedown[i] === 1) { drag[i] = 2; }
        if (drag[i] === 2 && ROOT_mousemove === 1) {
            set_x(i, x[i] + _x);
            set_y(i, y[i] + _y);
        }
        if (ROOT_mouseup === 1) { drag[i] = 1; }
        i += 1;
    }
}

function add_action_drag(id) { drag[id] = 1; }

function remove_action_drag(id) { drag[id] = 0; }

function update_ACTION() {
    action_drag();
}







create_virtual(10000);



let box_1 = 0;
let DOM_box_1 = DOM_element[box_1];
set_size_x(box_1, 300);
set_size_y(box_1, 300);
set_x(box_1, -25);
set_y(box_1, 25);
set_rotation_z(box_1, 23);
DOM_box_1.style.backgroundColor = "rgb(60, 120, 185)";
DOM_box_1.style.boxShadow = "10px 10px 20px rgb(130, 130, 130)";
DOM_box_1.style.borderRadius = "50px";
add_event_mousedown(box_1);
add_action_drag(box_1);

let box_2 = 1;
let DOM_box_2 = DOM_element[box_2];
set_size_x(box_2, 700);
set_size_y(box_2, 700);
set_x(box_2, 700);
set_y(box_2, -350);
set_rotation_z(box_2, 50);
DOM_box_2.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_2.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_2.style.borderRadius = "150px";
add_event_mousedown(box_2);
add_action_drag(box_2);

let box_3 = 2;
let DOM_box_3 = DOM_element[box_3];
set_size_x(box_3, 200);
set_size_y(box_3, 200);
set_x(box_3, 0);
set_y(box_3, 900);
set_rotation_z(box_3, 15);
DOM_box_3.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_3.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_3.style.borderRadius = "25px";

let box_4 = 3;
let DOM_box_4 = DOM_element[box_4];
set_size_x(box_4, 2000);
set_size_y(box_4, 75);
set_z(box_4, 1);
DOM_box_4.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_4.style.boxShadow = "1px 0px 10px rgb(75, 75, 75)";

let drag_test = 0;

function lite() {

    /* TEST DRAG
    
    if (mousedown[box_1] === 1) { drag_test = 1; }
    if (drag_test === 1 && ROOT_mousemove === 1) {
        let new_x = ROOT_mouse_x - ROOT_mouse_x_previous;
        let new_y = ROOT_mouse_y - ROOT_mouse_y_previous;
        set_x(box_1, get_x(box_1) + new_x);
        set_y(box_1, get_y(box_1) + new_y);
    }
    if (ROOT_mouseup === 1) { drag_test = 0; }
    */

    update_ACTION();
    update_DOM();
    return window.requestAnimationFrame(lite);
}

lite();

