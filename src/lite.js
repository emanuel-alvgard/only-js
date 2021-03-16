"use strict";


// DOM_HEAD
var head = document.head;
var google_fonts = document.createElement("link");
google_fonts.rel = "preconnect"; 
google_fonts.href = "https://fonts.gstatic.com";
head.append(google_fonts);

function load_google_font(name, url) {
    
    var font = document.createElement("link");
    font.rel = "stylesheet";
    font.type= "text/css";
    font.href = url;
    DOM_head.append(font);
    return name;

}

function load_server_font() {}

function create_meta() {}



// BODY
var body = document.body;
body.style.margin = "0px";
body.style.height = "1000px";
body.style.left = "0px";
body.style.top = "0px";
var window_width = window.innerWidth;
var window_height = window.innerHeight;

// v stands for virtual
var v_element_count = 0;
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

// ELEMENT
function create_element(type) {

    var fragment = document.createDocumentFragment();
    var element = document.createElement(type);

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

    element.style.backgroundColor = "white";

    fragment.append(element);
    body.append(fragment);

    // JS
    var id = v_element_count;
    element_id.push(id);
    var DOM_id = id + "";
    element.id = DOM_id;

    element_x.push(0);
    element_y.push(0);
    element_z_index.push(0);
    element_width.push(0);
    element_height.push(0);

    v_element_count += 1;
    return id;
}






// POSITION
function set_x(id, x, origin) {
    var element = document.getElementById(id + "");
    var new_x = element_x[origin] + x;
    element.style.left = new_x + "px";
    element_x[id] = new_x;
    return;
}

function set_y(id, y, origin) {
    var element = document.getElementById(id + "");
    var new_y = element_y[origin] + y;
    element.style.top = new_y + "px";
    element_y[id] = new_y;
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
function create_text() { // wrap text in a div
     // TEXT
     element.style.textAlign = "center";
     element.style.wordWrap = "break-word";
     element.style.wordBreak = "keep-all";
}



function set_text_origin(origin) {
    if (origin == "left") {}
    else if (origin == "center") {}
    else if (origin == "right") {}
    else {}
    return;
}


function set_text_font(id, font) {
    var element = document.getElementById(id + "");
    element.style.fontFamily = font;
    return;
}





function set_text_size() {}
function set_text_color() {}
function set_text_style() {}



/*
function place_at_origin(id, target) {}
function place_at_center(id, target) {}
function place_at_bottom(id, target) {}
function place_at_top(id, target) {}
*/








// APP 
var font_1 = load_google_font(
    "Roboto", "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    );
var font_2 = load_google_font(
    "Lato", "http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
    );


// header
var header = create_element("div");
set_width(header, DOM_width);
set_height(header, 75);
set_shadow(header, 0.1, 0.1, 5, "lightgray");

var header_home = create_element("button");
set_x(header_home, 100, body);
set_y(header_home, 25, body);
set_width(header_home, 75);
set_height(header_home, 25);
set_shadow(header_home, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_home, 5);
//set_text_font(header_home, font_1);

var header_about = create_element("button");
set_x(header_about, 200, body);
set_y(header_about, 25, body);
set_width(header_about, 75);
set_height(header_about, 25);
set_shadow(header_about, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_about, 5);
//set_text_font(DOM_header_about, font_1);

var header_news = create_element("button");
set_x(header_news, 300, body);
set_y(header_news, 25, body);
set_width(header_news, 75);
set_height(header_news, 25);
set_shadow(header_news, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_news, 5);
//set_text_font(DOM_header_news, font_1);

// boxes
var box_1 = create_element("div");
set_x(box_1, 50, body); 
set_y(box_1, 125, body);
set_width(box_1, 200);
set_height(box_1, 300);
set_border_radius(box_1, 5);
set_shadow(box_1, 0.1, 0.1, 3, "lightgray");

var box_2 = create_element("div");
set_x(box_2, 300, body); 
set_y(box_2, 125, body);
set_width(box_2, 200);
set_height(box_2, 300);
set_border_radius(box_2, 5);
set_shadow(box_2, 0.1, 0.1, 3, "lightgray");



function main() {
    var DOM_width = window.innerWidth;
    var DOM_height = window.innerHeight;

    //console.log(DOM_width);

    set_width(DOM_header, DOM_width);

    return window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);
