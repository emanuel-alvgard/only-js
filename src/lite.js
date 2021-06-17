/* 
@ TAGS
ERROR
ADD
EXPLORE
*/

"use strict";

// DEVICE
let device_touch = 0;

function device_information() {
    if (navigator.maxTouchPoints > 0) { device_touch = 1; }
}

device_information();


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
        case "a": ROOT_keydown[10] = 1; break;
        case "b": ROOT_keydown[11] = 1; break;
    }
}

document.addEventListener("keydown", ROOT_event_keydown);



// PAGE
let page = new Int32Array(100);
let page_history = 0;
let page_creation = 1;
let router_creation = 1;

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

let touchstart;
let touchmove;
let touchend;

// LINKED
let link_x;
let link_x_current;
let link_x_previous;


// ANIMATION

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

function get_touchstart(id) { return touchstart[id]; }
function get_touchmove(id) { return touchmove[id]; }
function get_touchend(id) { return touchend[id]; }

// GET LINKED

// GET ANIMATION

// GET ACTION
function get_drag(id) { return drag[id]; }



// EVENT
function event_mousemove(event) { mousemove[event.srcElement.id] = 1; }
function event_mousedown(event) { mousedown[event.srcElement.id] = 1; }
function event_mouseup(event) { mouseup[event.srcElement.id] = 1; }

function add_event_mousemove(id) { DOM_element[id].addEventListener("mousemove", event_mousemove); }
function add_event_mousedown(id) { DOM_element[id].addEventListener("mousedown", event_mousedown); }
function add_event_mouseup(id) { DOM_element[id].addEventListener("mouseup", event_mouseup); }

function remove_event_mousemove(id) { DOM_element[id].removeEventListener("mousemove", event_mousemove); }
function remove_event_mousedown(id) { DOM_element[id].removeEventListener("mousedown", event_mousedown); }
function remove_event_mouseup(id) { DOM_element[id].removeEventListener("mouseup", event_mouseup); }

function event_touchstart(event) { touchstart[event.srcElement.id] = 1; }
function event_touchmove(event) { touchmove[event.srcElement.id] = 1; }
function event_touchend(event) { touchend[event.srcElement.id] = 1; }

function add_event_touchstart(id) { DOM_element[id].addEventListener("touchstart", event_touchstart); }
function add_event_touchmove(id) { DOM_element[id].addEventListener("touchmove", event_touchmove); }
function add_event_touchend(id) { DOM_element[id].addEventListener("touchend", event_touchend); }

function remove_event_touchstart(id) { DOM_element[id].removeEventListener("touchstart", event_touchstart); }
function remove_event_touchmove(id) { DOM_element[id].removeEventListener("touchmove", event_touchmove); }
function remove_event_touchend(id) { DOM_element[id].removeEventListener("touchend", event_touchend); }


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

    touchstart = new Int32Array(size);
    touchmove = new Int32Array(size);
    touchend = new Int32Array(size);

    // LINKED
    link_x = new Int32Array(size);
    link_x_current = new Int32Array(size);
    link_x_previous = new Int32Array(size);

    // ANIMATION

    // ACTION
    drag = new Int32Array(size);

    let i = 0;
    while (i < size) { DOM_element[i] = document.createElement("div"); i += 1; } i = 0;
    while (i < size) { DOM_element[i].style.position = "absolute"; i += 1; } i = 0;
    while (i < size) { DOM_element[i].style.display = "none"; i += 1; } i = 0;
    while (i < size) { DOM_element[i].id = i; i += 1; } i = 0;
    while (i < size) { id[i] = i; i += 1; } i = 0;
    while (i < size) { link_x[i] = -1; i += 1; } i = 0;
    while (i < size) { drag[i] = -1; i += 1; } i = 0;
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

    while (i < virtual_size) { touchstart[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { touchmove[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { touchend[i] = 0; i += 1; } i = 0;

    while (i < virtual_size) { link_x[i] = -1; i += 1; } i = 0;
    while (i < virtual_size) { link_x_current[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { link_x_previous[i] = 0; i += 1; } i = 0;

    // @ADD animation

    while (i < virtual_size) { drag[i] = -1; i += 1; } i = 0;

    while (i < virtual_size) { remove_event_mousemove(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_mousedown(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_mouseup(i); i += 1; } i = 0;

    while (i < virtual_size) { remove_event_touchstart(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_touchmove(i); i += 1; } i = 0;
    while (i < virtual_size) { remove_event_touchend(i); i += 1; } i = 0;
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

    // CLEAR EVENTS
    i = 0;
    while (i < virtual_size) { mousemove[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mousedown[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { mouseup[i] = 0; i += 1; } i = 0;
    
    while (i < virtual_size) { touchstart[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { touchmove[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { touchend[i] = 0; i += 1; } i = 0;

    ROOT_mousemove = 0;
    ROOT_mousedown = 0;
    ROOT_mouseup = 0;

    ROOT_touchstart = 0;
    ROOT_touchmove = 0;
    ROOT_touchend = 0;

    page_creation = 0;
}



// LINKED
function linked_x() {
    
    if (page_creation === 1) { 
        let i = 0;
        while (i < virtual_size) {    
            link_x_previous[i] = x[link_x[i]];
            link_x_current[i] = x[link_x[i]];
            i += 1;
        }
        return;
    }

    let i = 0;
    while (i < virtual_size) {
        if (link_x[i] === -1) { i += 1; continue; }
        link_x_previous[i] = link_x_current[i];
        link_x_current[i] = x[link_x[i]];
        if (link_x_current[i] === link_x_previous[i]) { i += 1; continue; }
        let _x = link_x_current[i] - link_x_previous[i];
        set_x(i, x[i] + _x);
        i += 1;
    }
}

function add_link_x(id, target) { link_x[id] = target; }

function remove_link_x(id) { link_x[id] = -1; }

function update_LINKED() {
    linked_x();
}




// ANIMATION
function animation() {}
function animation_x() {}
function animation_y() {}
function animation_rotation_z() {}
function animate_z() {}



// ACTION
function action_drag() {    
    
    let _x = 0;
    let _y = 0;

    if (device_touch === 0) {
        _x = ROOT_mouse_x - ROOT_mouse_x_previous;
        _y = ROOT_mouse_y - ROOT_mouse_y_previous;
    }
    else {
        _x = ROOT_touch_x - ROOT_touch_x_previous;
        _y = ROOT_touch_y - ROOT_touch_y_previous;
    }

    let i = 0;
    while (i < virtual_size) {
        if (device_touch === 1) { break; }
        if (drag[i] === -1) { i += 1; continue; }
        
        if (mousedown[i] === 1) { drag[i] = 1; }
        if (drag[i] === 1 && ROOT_mousemove === 1) {
            set_x(i, x[i] + _x);
            set_y(i, y[i] + _y);
        }
        if (ROOT_mouseup === 1) { drag[i] = 0; }
        i += 1;
    }

    i = 0
    while (i < virtual_size) {
        if (device_touch === 0) { break; }
        if (drag[i] === -1) { i += 1; continue; }

        if (touchstart[i] === 1) { drag[i] = 1; }
        if (drag[i] === 1 && ROOT_touchmove === 1) {
            set_x(i, x[i] + _x);
            set_y(i, y[i] + _y);
        }
        if (ROOT_touchend === 1) { drag[i] = 0; }
        i += 1;
    }
}

function add_action_drag(id) { drag[id] = 0; }

function remove_action_drag(id) { drag[id] = -1; }

function update_ACTION() {
    action_drag();
}





create_virtual(100);

function create_home_page() {
    
    clear_virtual();
    
    let box_1 = 0;
    let DOM_box_1 = DOM_element[box_1];
    let box_2 = 1;
    let DOM_box_2 = DOM_element[box_2];
    let box_3 = 2;
    let DOM_box_3 = DOM_element[box_3];
    let box_4 = 3;
    let DOM_box_4 = DOM_element[box_4];

    // box_1
    DOM_box_1.style.display = "initial";
    set_size_x(box_1, 300);
    set_size_y(box_1, 300);
    set_x(box_1, 0);
    set_y(box_1, 0);
    set_rotation_z(box_1, 23);
    DOM_box_1.style.backgroundColor = "rgb(60, 120, 185)";
    DOM_box_1.style.boxShadow = "10px 10px 20px rgb(130, 130, 130)";
    DOM_box_1.style.borderRadius = "50px";
    add_event_mousedown(box_1);
    add_event_touchstart(box_1);
    add_action_drag(box_1);
    add_link_x(box_1, box_2);

    // box_2
    DOM_box_2.style.display = "initial";
    set_size_x(box_2, 700);
    set_size_y(box_2, 700);
    set_x(box_2, 500);
    set_y(box_2, -350);
    set_rotation_z(box_2, 50);
    DOM_box_2.style.backgroundColor = "rgb(255, 255, 255)";
    DOM_box_2.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
    DOM_box_2.style.borderRadius = "150px";
    add_event_mousedown(box_2);
    add_event_touchstart(box_2);
    add_action_drag(box_2);

    // box_3
    DOM_box_3.style.display = "initial";
    set_size_x(box_3, 200);
    set_size_y(box_3, 200);
    set_x(box_3, 0);
    set_y(box_3, 400);
    set_rotation_z(box_3, 15);
    DOM_box_3.style.backgroundColor = "rgb(255, 255, 255)";
    DOM_box_3.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
    DOM_box_3.style.borderRadius = "25px";

    /* box_4
    DOM_box_4.style.display = "initial";
    set_size_x(box_4, 2000);
    set_size_y(box_4, 75);
    set_z(box_4, 1);
    DOM_box_4.style.backgroundColor = "rgb(255, 255, 255)";
    DOM_box_4.style.boxShadow = "1px 0px 10px rgb(75, 75, 75)";
    */
}

function create_other_page() {
    clear_virtual();

    let box_1 = 0;
    let DOM_box_1 = DOM_element[box_1];

    // box_1
    DOM_box_1.style.display = "initial";
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
}



// ROUTER
function router_history(event) { 
    page[history.state.page_id] = 1;
    page_history = 1; 
}

window.onpopstate = router_history;

function router() {

    if (router_creation === 1) {
        page_creation = 1;
        create_home_page();
        page[0] = 0;
        history.pushState({'page_id': 0}, "", "");
        router_creation = 0; 
        return; 
    }
    if (page[0] === 1) {
        page_creation = 1;
        create_home_page();
        page[0] = 0;
        if (page_history === 1) { page_history = 0; return; }
        history.pushState({'page_id': 0}, "", ""); 
        return; 
    }
    if (page[1] === 1) {
        page_creation = 1;
        create_other_page(); 
        page[1] = 0;
        if (page_history === 1) { page_history = 0; return; }
        history.pushState({'page_id': 1}, "", "");  
        return; 
    }
}


function lite() {

    router();
    update_ACTION();
    update_LINKED();
    update_DOM();
    return window.requestAnimationFrame(lite);
}

lite();

