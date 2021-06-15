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
let virtual_size = 0;
let DOM_element = [];
let update;

let id;
let width;
let height;

let translation_x;
let translation_y;
let rotation;


function create_virtual(size) {

    virtual_size = size;
    update = new Int8Array(size);

    id = new Int32Array(size);
    width = new Int32Array(size);
    height = new Int32Array(size);
    translation_x = new Int32Array(size);
    translation_y = new Int32Array(size);
    rotation = new Int32Array(size);

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
    while (i < virtual_size) { height[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { translation_x[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { translation_y[i] = 0; i += 1; } i = 0;
    while (i < virtual_size) { rotation[i] = 0; i += 1; } i = 0;

    while (i < virtual_size) { update[i] = 1; i += 1; }
}



function update_DOM() {

    let i = 0;
    while (i < virtual_size) {
        if (update[i] === 1) { 
            DOM_element[i].style.width = width[i] + "px";  
        } i += 1;
    } i = 0;
    while (i < virtual_size) {
        if (update[i] === 1) { 
            DOM_element[i].style.height = height[i] + "px"; 
        } i += 1;
    } i = 0;
    while (i < virtual_size) {
        if (update[i] === 1) { 
            DOM_element[i].style.transform = "translate(" 
            + translation_x[i] + "px, "
            + translation_y[i] + "px) "
            + "rotate(" + rotation[i] + "deg)"; 
        } i += 1;
    } i = 0;

    while (i < virtual_size) { update[i] = 0; i += 1; }
}

create_virtual(100);

let box_1 = 0;
let DOM_box_1 = DOM_element[box_1];
width[box_1] = 300;
height[box_1] = 300;
translation_x[box_1] = -25;
translation_y[box_1] = 25;
rotation[box_1] = 23;
DOM_box_1.style.backgroundColor = "rgb(60, 120, 185)";
DOM_box_1.style.boxShadow = "10px 10px 20px rgb(130, 130, 130)";
DOM_box_1.style.borderRadius = "50px";
update[box_1] = 1;

let box_2 = 1;
let DOM_box_2 = DOM_element[box_2];
width[box_2] = 700;
height[box_2] = 700;
translation_x[box_2] = 700;
translation_y[box_2] = -350;
rotation[box_2] = 50;
DOM_box_2.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_2.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_2.style.borderRadius = "150px";
update[box_2] = 1;

let box_3 = 2;
let DOM_box_3 = DOM_element[box_3];
width[box_3] = 200;
height[box_3] = 200;
translation_x[box_3] = 0;
translation_y[box_3] = 900;
rotation[box_3] = 15;
DOM_box_3.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_3.style.boxShadow = "10px 10px 25px rgb(175, 175, 175)";
DOM_box_3.style.borderRadius = "25px";
update[box_3] = 1;


let box_4 = 3;
let DOM_box_4 = DOM_element[box_4];
width[box_4] = 2000;
height[box_4] = 75;
DOM_box_4.style.zIndex = "2";
DOM_box_4.style.backgroundColor = "rgb(255, 255, 255)";
DOM_box_4.style.boxShadow = "1px 0px 10px rgb(75, 75, 75)";
update[box_4] = 1;


function lite() {

    update_DOM();
    return window.requestAnimationFrame(lite);
}

lite();

