"use strict";

var element_count = 0;
var element_id = [];

// POSITION
var element_x = [];
var element_y = [];
var element_z_index = [];

// DIMENSIONS
var element_width = [];
var element_height = [];

// STYLE
var element_shadow_x = [];
var element_shadow_y = [];
var element_shadow_blur = [];
var element_border_radius = [];


// SETUP
var body = document.body;
body.style.margin = "0px";
body.style.height = "1000px";
var window_width = window.innerWidth;
var window_height = window.innerHeight;


function create_element(type, text) {
    
    var fragment = document.createDocumentFragment();
    var element = document.createElement(type);
    
    if (text == null) {}
    else { 
        var element_text = document.createTextNode(text);
        element.append(element_text);
    }

    // DOM
    element.style.position = "absolute";
    element.style.margin = "0px";
    element.style.padding = "0px";
    element.style.border = "none";

    element.style.left = "0px";
    element.style.top = "0px";
    element.style.zIndex = "0px";

    element.style.width = "0px";
    element.style.height = "0px";


    fragment.append(element);
    body.append(fragment);

    // JS
    var id = element_count;
    element_id.push(id);
    var dom_id = id + "";
    element.id = dom_id;

    element_x.push(0);
    element_y.push(0);
    element_z_index.push(0);
    element_width.push(100);
    element_height.push(100);

    element_count += 1;
    return id;
}




function append() {
    // changed element/text position type to relative.
}


// POSITION
function set_x(id, x) {
    var element = document.getElementById(id + "");
    element.style.left = x + "px";
    element_x[id] = x;
    return;
}

function set_y(id, y) {
    var element = document.getElementById(id + "");
    element.style.top = y + "px";
    element_y[id] = y;
    return;
}

function set_z_index(id, z_index) {
    var element = document.getElementById(id + "");
    element.style.zIndex = z_index + "";
    element_z_index[id] = z_index;
    return;
}

// DIMENSIONS
function set_width(id, width) {
    var element = document.getElementById(id + "");
    element.style.width = width + "px";
    element_width[id] = width;
    return;
}

function set_height(id, height) {
    var element = document.getElementById(id + "");
    element.style.height = height + "px";
    element_height[id] = height;
    return;
}


// STYLE
function set_shadow(id, x, y, blur, color) {
    var element = document.getElementById(id + "");
    var shadow_x = x + "px ";
    var shadow_y = y + "px ";
    var shadow_blur = blur + "px ";
    element.style.boxShadow = shadow_x + shadow_y + shadow_blur + color;
    return;
}

function set_border_radius(id, radius) {
    var element = document.getElementById(id + "");
    element.style.borderRadius = radius + "px";
    element_border_radius[id] = radius;
    return;
}

// TEXT
function set_text_font() {}
function set_text_size() {}
function set_text_color() {}
function set_text_style() {}




// header
var header = create_element("div", null);
set_width(header, window_width);
set_height(header, 75);
set_shadow(header, 0.1, 0.1, 5, "lightgray");

var header_home = create_element("button", "HOME");
set_x(header_home, 50);
set_y(header_home, 25);
var header_about = create_element("button", "ABOUT");
set_x(header_about, 100);
set_y(header_about, 25);
var header_news = create_element("button", "NEWS");
set_x(header_news, 150);
set_y(header_news, 25);

// boxes
var box_1 = create_element("div", null);
set_x(box_1, 50); 
set_y(box_1, 125);
set_width(box_1, 200);
set_height(box_1, 300);
set_border_radius(box_1, 5);
set_shadow(box_1, 0.1, 0.1, 3, "lightgray");

var box_2 = create_element("div", "Hello World!");
set_x(box_2, 300); 
set_y(box_2, 125);
set_width(box_2, 200);
set_height(box_2, 300);
set_border_radius(box_2, 5);
set_shadow(box_2, 0.1, 0.1, 3, "lightgray");



function main() {
    var window_width = window.innerWidth;
    var window_height = window.innerHeight;

    console.log(window_width);

    set_width(header, window_width);

    return window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);
