"use strict";

var window_width = window.innerWidth;
var window_height = window.innerHeight;

// HEAD
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
    head.append(font);
    return name;

}

function load_server_font() {}

function create_meta() {}



// BODY
var body = document.body;
body.style.margin = "0px";
body.style.left = "0px";
body.style.top = "0px";

// ROOT
var DOM_root = document.createElement("div");
DOM_root.id = "0";
DOM_root.style.position = "absolute";
DOM_root.style.margin = "0px";
DOM_root.style.padding = "0px";
DOM_root.style.border = "none";
DOM_root.style.left = "0px";
DOM_root.style.top = "0px";
DOM_root.style.zIndex = "0";
DOM_root.style.backgroundColor = "white";
body.append(DOM_root);

// VIRTUAL DOM
// Elements
var element_count = 1;
var element_id = [0];
var element_update = [0];
var DOM_element = [DOM_root];

// Position
var element_x = [0];
var element_y = [0];
var element_z_index = [0];

// Dimension
var element_width = [0];
var element_height = [0];

// Style
var element_shadow_x = [0];
var element_shadow_y = [0];
var element_shadow_blur = [0];
var element_shadow_color = ["black"];

var element_background_color = ["white"];
var element_border_radius = [0];

var root = 0;

// Element
function create_element(type) {

    var fragment = document.createDocumentFragment();
    var element = document.createElement(type);

    // Dom
    element.style.position = "absolute";
    element.style.margin = "0px";
    element.style.padding = "0px";
    element.style.border = "none";

    element.style.left = "0px";
    element.style.top = "0px";
    element.style.zIndex = "0";

    element.style.width = "0px";
    element.style.height = "0px";

    element.style.boxShadow = "0px 0px 0px lightgray";
    element.style.backgroundColor = "white";

    fragment.append(element);
    DOM_root.append(fragment);
    
    // Virtual
    DOM_element.push(element);
    var id = element_count;
    element_id.push(id);
    var DOM_id = id + "";
    element.id = DOM_id;

    element_update.push(0);
    element_x.push(0);
    element_y.push(0);
    element_z_index.push(0);
    element_width.push(0);
    element_height.push(0);
    element_shadow_x.push(0);
    element_shadow_y.push(0);
    element_shadow_blur.push(0);
    element_shadow_color.push("lightgray");
    element_background_color.push("white");
    element_border_radius.push(0);

    element_count += 1;
    return id;
}


function update_element(id) {
    DOM_element[id].style.left = element_x[id] + "px";
    DOM_element[id].style.top = element_y[id] + "px";
    DOM_element[id].style.zIndex = element_z_index[id] + "px";
    DOM_element[id].style.width = element_width[id] + "px";
    DOM_element[id].style.height = element_height[id] + "px";
    DOM_element[id].style.boxShadow = (element_shadow_x[id] + "px ") 
        + (element_shadow_y[id] + "px ") 
        + (element_shadow_blur[id] + "px ") 
        + element_shadow_color[id];
    DOM_element[id].style.backgroundColor = element_background_color[id];
    DOM_element[id].style.borderRadius = element_border_radius[id] + "px";
    return;
}


function update() {

    var i;
    var length = element_update.length;

    for (i = 0; i < length; i ++) {
        if (element_update[i] === 0) {}
        else { 
            update_element(i);
            element_update[i] = 0; 
        }
    }
    return;
}



// PROPERTY WRAPPER
// Position
function set_x(id, origin, x) {
    element_x[id] = element_x[origin] + x;
    element_update[id] = 1;
    return;
}

function set_y(id, origin, y) {
    element_y[id] = element_y[origin] + y;
    element_update[id] = 1;
    return;
}

function set_z_index(id, z_index) {
    element_z_index[id] = z_index;
    element_update[id] = 1;
    return;
}

// Dimensions
function set_width(id, width) {
    element_width[id] = width;
    element_update[id] = 1;
    return;
}

function set_height(id, height) {
    element_height[id] = height;
    element_update[id] = 1;
    return;
}


// Style
function set_shadow(id, x, y, blur, color) {
    element_shadow_x[id] = x;
    element_shadow_y[id] = y;
    element_shadow_blur[id] = blur;
    element_shadow_color[id] = color;
    element_update[id] = 1;
    return;
}

function set_border_radius(id, radius) {
    element_border_radius[id] = radius;
    element_update[id] = 1;
    return;
}


function set_text() {}








// UTILITY FUNCTIONS
// Position
function center_to_center(id, ref) {
    var ref_center_x = element_x[ref] + (element_width[ref] / 2);
    var ref_center_y = element_y[ref] + (element_height[ref] / 2);
    var new_x = ref_center_x - (element_width[id] / 2);
    var new_y = ref_center_y - (element_height[id] / 2);
    set_x(id, root, new_x);
    set_y(id, root, new_y);
    return;
}

function infront() {}
function behind() {}





// ANIMATION FUNCTIONS
// Position

const CURVE_LINEAR = [0.0, 1.0, 2.0, 3.0, 4.0];

function move_interpolated() {}

function animation_pop_out(delta, id, duration, curve) {
    
}





// APP 
var font_1 = load_google_font(
    "Roboto", "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    );
var font_2 = load_google_font(
    "Lato", "http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
    );

// header
var header = create_element("div");
set_width(header, window_width);
set_height(header, 75);
set_shadow(header, 0.1, 0.1, 5, "lightgray");

var header_home = create_element("button");
set_x(header_home, root, 100);
set_y(header_home, root, 25);
set_width(header_home, 75);
set_height(header_home, 25);
set_shadow(header_home, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_home, 5);
//set_text_font(header_home, font_1);

var header_about = create_element("button");
set_x(header_about, root, 200);
set_y(header_about, root, 25);
set_width(header_about, 75);
set_height(header_about, 25);
set_shadow(header_about, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_about, 5);
//set_text_font(header_about, font_1);

var header_news = create_element("button");
set_x(header_news, root, 300);
set_y(header_news, root, 25);
set_width(header_news, 75);
set_height(header_news, 25);
set_shadow(header_news, 0.1, 0.1, 3, "lightgray");
set_border_radius(header_news, 5);
//set_text_font(header_news, font_1);

// boxes
var box_1 = create_element("div");
set_x(box_1, root, 50); 
set_y(box_1, root, 125);
set_width(box_1, 200);
set_height(box_1, 300);
set_border_radius(box_1, 5);
set_shadow(box_1, 0.1, 0.1, 3, "lightgray");

var box_2 = create_element("div");
set_x(box_2, root, 300); 
set_y(box_2, root, 125);
set_width(box_2, 200);
set_height(box_2, 300);
set_border_radius(box_2, 5);
set_shadow(box_2, 0.1, 0.1, 3, "lightgray");




var time = Date.now()
var delta = 0.0

function main() {
    
    delta = time - Date.now();
    time = Date.now();
    //console.log(delta);

    element_width[root] = window.innerWidth;
    element_height[root] = window.innerHeight;

    set_width(header, element_width[root]);
    center_to_center(header_news, root);
    set_z_index(header_news, 1);

    update();
    
    return window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);


/* ADD THIS LATER
export {
    create_element,
    update_element
};

and indert type="module" in the html script tag
*/


/*
function create_text() { // wrap text in a div
     // TEXT
     element.style.textAlign = "center";
     element.style.wordWrap = "break-word";
     element.style.wordBreak = "keep-all";
}

function set_text_origin(origin) {
    if (origin === "left") {}
    else if (origin === "center") {}
    else if (origin === "right") {}
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

function place_at_origin(id, target) {}
function place_at_center(id, target) {}
function place_at_bottom(id, target) {}
function place_at_top(id, target) {}
*/
