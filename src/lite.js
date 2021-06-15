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
DOM_ROOT.style.size_x = "100%";
DOM_ROOT.style.size_y = "100%";
DOM_ROOT.style.zIndex = "-1";
DOM_ROOT.style.backgroundColor = "white";
DOM_body.append(DOM_ROOT);


// ELEMENT
let DOM_element = [];
let virtual_size = 0;
let id;

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



function translate_x() {}
function translate_y() {}
function rotate_z() {}
function translate_z() {}
function scale_x() {}
function scale_y() {}


function create_virtual(size) {

    virtual_size = size;
    id = new Int32Array(size);

    size_x = new Int32Array(size);
    size_x_u = new Int8Array(size);
    
    size_y = new Int32Array(size);
    size_y_u = new Int8Array(size);
    
    x = new Int32Array(size);
    y = new Int32Array(size);
    rotation_z = new Int32Array(size);
    transform_u = new Int8Array(size);

    z = new Int32Array(size);
    z_u = new Int8Array(size);

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
}



function update_DOM() {

    let i; 
    
    i = 0;
    while (i < virtual_size) {
        if (size_x_u[i] === 1) { 
            DOM_element[i].style.width = size_x[i] + "px";
            size_x_u[i] = 0;  
        } i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (size_y_u[i] === 1) { 
            DOM_element[i].style.height = size_y[i] + "px";
            size_y_u[i] = 0; 
        } i += 1;
    } 
    
    i = 0;
    while (i < virtual_size) {
        if (transform_u[i] === 1) { 
            DOM_element[i].style.transform = "translate(" 
            + x[i] + "px, "
            + y[i] + "px) "
            + "rotate(" + rotation_z[i] + "deg)";
            transform_u[i] = 0; 
        } i += 1;
    } i = 0;

    i = 0;
    while (i < virtual_size) {
        if (z_u[i] === 1) { 
            DOM_element[i].style.zIndex = z[i] + "";
            z_u[i] = 0; 
        } i += 1;
    } 
}



create_virtual(100);

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



function lite() {

    update_DOM();
    return window.requestAnimationFrame(lite);
}

lite();

