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
let DOM_ROOT = document.createElement("div");
DOM_ROOT.id = "ROOT";
DOM_ROOT.style.position = "absolute";
DOM_ROOT.style.margin = "0px";
DOM_ROOT.style.padding = "0px";
DOM_ROOT.style.border = "none";
DOM_ROOT.style.left = "0px";
DOM_ROOT.style.top = "0px";
DOM_ROOT.style.width = "100%";
DOM_ROOT.style.height = "100%";
DOM_ROOT.style.zIndex = "0";
DOM_ROOT.style.backgroundColor = "white";
DOM_body.append(DOM_ROOT);


// ELEMENT
let DOM_element = [];
let virtual_size = 0;
let id;

let width;
let width_u;

let height;
let height_u;

let x;
let y;
let rotation;
let matrix_u;



function get_width(id) { return width[id]; }
function set_width(id, value) { width[id] = value; width_u[id] = 1; }

function get_height(id) { return height[id]; }
function set_height(id, value) { height[id] = value; height_u[id] = 1; }

function get_x(id) { return x[id]; }
function set_x(id, value) { x[id] = value; matrix_u[id] = 1; }

function get_y(id) { return y[id]; }
function set_y(id, value) { y[id] = value; matrix_u[id] = 1; }

function get_rotation(id) { return rotation[id]; }
function set_rotation(id, value) { rotation[id] = value; matrix_u[id] = 1; }



function create_virtual(size) {

    virtual_size = size;
    id = new Int32Array(size);

    width = new Int32Array(size);
    width_u = new Int8Array(size);
    
    height = new Int32Array(size);
    height_u = new Int8Array(size);
    
    x = new Int32Array(size);
    y = new Int32Array(size);
    rotation = new Int32Array(size);
    matrix_u = new Int8Array(size);

    let i = 0;
    while (i < size) { DOM_element[i] = document.createElement("div"); i += 1; } i = 0;
    while (i < size) { DOM_element[i].style.position = "absolute"; i += 1; } i = 0;
    while (i < size) { DOM_element[i].style.zIndex = "1"; i += 1; } i = 0;
    while (i < size) { DOM_element[i].id = i; i += 1; } i = 0;
    while (i < size) { id[i] = i; i += 1; } i = 0;
    while (i < size) { ROOT.append(DOM_element[i]); i += 1; } i = 0;
}



function clear_virtual() {
    
    let i = 0;
    while (i < virtual_size) { width[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { width_u[i] = 1; i += 1; } i = 0;

    while (i < virtual_size) { height[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { height_u[i] = 1; i += 1; } i = 0;

    while (i < virtual_size) { x[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { y[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { rotation[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { matrix_u[i] = 1; i += 1; } i = 0;
}



function update_DOM() {

    let i; 
    
    i = 0;
    while (i < virtual_size) {
        if (width_u[i] === 1) { 
            DOM_element[i].style.width = width[i] + "px";
            width_u[i] = 0;  
        } i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (height_u[i] === 1) { 
            DOM_element[i].style.height = height[i] + "px";
            height_u[i] = 0; 
        } i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (matrix_u[i] === 1) { 
            DOM_element[i].style.transform = "translate(" 
            + x[i] + "px, "
            + y[i] + "px) "
            + "rotate(" + rotation[i] + "deg)";
            matrix_u[i] = 0; 
        } i += 1;
    } i = 0;
}



create_virtual(100);

let box_1 = 0;
let DOM_box_1 = DOM_element[box_1];
set_width(box_1, 300);
set_height(box_1, 300);
set_x(box_1, -25);
set_y(box_1, 25);
set_rotation(box_1, 23);
DOM_box_1.style.backgroundColor = "rgb(60, 120, 185)";
DOM_box_1.style.boxShadow = "10px 10px 20px rgb(130, 130, 130)";
DOM_box_1.style.borderRadius = "50px";

let box_2 = 1;
let DOM_box_2 = DOM_element[box_2];
set_width(box_2, 700);
set_height(box_2, 700);
set_x(box_2, 700);
set_y(box_2, -350);
set_rotation(box_2, 50);
DOM_box_2.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_2.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_2.style.borderRadius = "150px";

let box_3 = 2;
let DOM_box_3 = DOM_element[box_3];
set_width(box_3, 200);
set_height(box_3, 200);
set_x(box_3, 0);
set_y(box_3, 900);
set_rotation(box_3, 15);
DOM_box_3.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_3.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_3.style.borderRadius = "25px";

let box_4 = 3;
let DOM_box_4 = DOM_element[box_4];
set_width(box_4, 2000);
set_height(box_4, 75);
DOM_box_4.style.zIndex = "2";
DOM_box_4.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_4.style.boxShadow = "1px 0px 10px rgb(75, 75, 75)";



function translate_x() {}
function translate_y() {}
function rotate() {}


function lite() {

    update_DOM();
    return window.requestAnimationFrame(lite);
}

lite();

