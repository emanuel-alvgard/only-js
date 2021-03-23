"use strict";

// TODO
// setup set_text function and other text functions
// put curve into animation_slide (10 checkpoints ?)
// set_z should also have "root" as a parameter


let DOM_window_width = window.innerWidth;
let DOM_window_height = window.innerHeight;

// DOM HEAD
let DOM_head = document.head;
let google_fonts = document.createElement("link");
google_fonts.rel = "preconnect"; 
google_fonts.href = "https://fonts.gstatic.com";
DOM_head.append(google_fonts);

function load_google_font(name, url) {
    
    let font = document.createElement("link");
    font.rel = "stylesheet";
    font.type= "text/css";
    font.href = url;
    DOM_head.append(font);
    return name;

}

function load_server_font() {}

function create_meta() {} // ??



// DOM BODY
let DOM_body = document.body;
DOM_body.style.margin = "0px";
DOM_body.style.left = "0px";
DOM_body.style.top = "0px";
//DOM_body.style.backgroundColor = "lightgray";

// DOM ROOT
let DOM_root = document.createElement("div");
DOM_root.id = "0";
DOM_root.style.position = "absolute";
DOM_root.style.margin = "0px";
DOM_root.style.padding = "0px";
DOM_root.style.border = "none";
DOM_root.style.left = "0px";
DOM_root.style.top = "0px";
DOM_root.style.width = DOM_window_width + "px";
DOM_root.style.height = DOM_window_height + "px";
DOM_root.style.zIndex = "0";
DOM_root.style.backgroundColor = "rgba(225, 225, 225, 1.0)";
DOM_body.append(DOM_root);

// DEFINE VIRTUAL

// Static Arrays
// Elements
let root = 0;
let element_count = 1;
let element_id;

// Position
let element_x;
let element_y;
let element_z;
let element_rotation;

// Dimension
let element_width;
let element_height;
let element_scale_x;
let element_scale_y;
let element_skew_x;
let element_skew_y;

// Style
let element_background_color_red;
let element_background_color_green;
let element_background_color_blue;
let element_background_color_alpha;
    
let element_shadow_color_red;
let element_shadow_color_green;
let element_shadow_color_blue;
let element_shadow_color_alpha;

let element_shadow_x;
let element_shadow_y;
let element_shadow_blur;
let element_border_radius;

// Update
let DOM_element_update;
let DOM_element_transform_update;
let DOM_element_z_update;
let DOM_element_width_update;
let DOM_element_height_update;
let DOM_element_shadow_update;
let DOM_element_background_color_update;
let DOM_element_border_style_update;
let DOM_element_border_radius_update;
let DOM_element_text_content_update;

// Events
let element_mousedown;

// Animations
let element_slide_x;
let element_slide_x_progress;
let element_slide_x_checkpoint;

// Dynamic Arrays
let DOM_element;
let element_border_style;
let element_text_content;


// CREATE VIRTUAL
function create_virtual(elements) {

    // Static arrays
    element_id = new Uint8Array(elements);
    element_x = new Float32Array(elements);
    element_y = new Float32Array(elements);
    element_z = new Float32Array(elements);
    element_rotation = new Int16Array(elements);

    // Dimension
    element_width = new Float32Array(elements);
    element_height = new Float32Array(elements);
    element_scale_x = new Float32Array(elements);
    element_scale_y = new Float32Array(elements);
    element_skew_x = new Float32Array(elements);
    element_skew_y = new Float32Array(elements);

    // Style
    element_background_color_red = new Uint8Array(elements);
    element_background_color_green = new Uint8Array(elements);
    element_background_color_blue = new Uint8Array(elements);
    element_background_color_alpha = new Float32Array(elements);
    
    element_shadow_color_red = new Uint8Array(elements);
    element_shadow_color_green = new Uint8Array(elements);
    element_shadow_color_blue = new Uint8Array(elements);
    element_shadow_color_alpha = new Float32Array(elements);
    
    element_shadow_x = new Float32Array(elements);
    element_shadow_y = new Float32Array(elements);
    element_shadow_blur = new Float32Array(elements);
    element_border_radius = new Float32Array(elements);

    // Update
    DOM_element_update = new Uint8Array(elements);
    DOM_element_transform_update = new Uint8Array(elements);
    DOM_element_width_update = new Uint8Array(elements);
    DOM_element_height_update = new Uint8Array(elements);
    DOM_element_shadow_update = new Uint8Array(elements);
    DOM_element_background_color_update = new Uint8Array(elements);
    DOM_element_border_style_update = new Uint8Array(elements);
    DOM_element_border_radius_update = new Uint8Array(elements);
    DOM_element_text_content_update = new Uint8Array(elements);

    // Events
    element_mousedown = new Uint8Array(elements);

    // Animations 
    element_slide_x = new Float32Array(elements);
    element_slide_x_progress = new Float32Array(elements);
    element_slide_x_checkpoint = new Float32Array(elements);

    // Dynamic Arrays
    DOM_element = [DOM_root];
    element_border_style = ["none"];
    element_text_content = [""];

    return;
}

// Element
function create_element(type) {

    let fragment = document.createDocumentFragment();
    let element = document.createElement(type);

    // DOM
    element.style.position = "absolute";
    element.style.margin = "0px";
    element.style.padding = "0px";
    
    fragment.append(element);
    DOM_root.append(fragment);
    
    // VIRTUAL
    // Element
    let id = element_count;
    element_id[id] = id;
    let id_string = id + "";
    element.id = id_string;

    // Dimensions
    element_scale_x[id] = 1.0;
    element_scale_y[id] = 1.0;

    // Style
    element_background_color_red[id] = 255;
    element_background_color_green[id] = 255;
    element_background_color_blue[id] = 255;
    element_background_color_alpha[id] = 1.0;

    element_shadow_color_alpha[id] = 1.0;
    
    
    // Dynamic Arrays
    DOM_element.push(element);
    element_border_style.push("none");
    element_text_content.push("test");

    // Update
    DOM_element_update[id] = 1;
    DOM_element_transform_update[id] = 1;
    DOM_element_width_update[id] = 1;
    DOM_element_height_update[id] = 1;
    DOM_element_shadow_update[id] = 1;
    DOM_element_background_color_update[id] = 1;
    DOM_element_border_style_update[id] = 1;
    DOM_element_border_radius_update[id] = 1;
    DOM_element_text_content_update[id] = 1;

    element_count += 1;
    return id;
}














function update_DOM_element(id) {
    if (DOM_element_transform_update[id] === 1) {
        DOM_element[id].style.transform = "matrix("
            + (element_scale_x[id] + ", ")
            + (element_skew_x[id] + ", ") 
            + (element_skew_y[id] + ", ") 
            + (element_scale_y[id] + ", ")  
            + (element_x[id] + ", ") 
            + element_y[id] + ")";
        DOM_element[id].style.zIndex = element_z[id] + "";
        DOM_element_transform_update[id] = 0;
    }
    if (DOM_element_width_update[id] === 1) {
        DOM_element[id].style.width = element_width[id] + "px";
        DOM_element_width_update[id] = 0;
    }
    if (DOM_element_height_update[id] === 1) {
        DOM_element[id].style.height = element_height[id] + "px";
        DOM_element_height_update[id] = 0;
    }
    if (DOM_element_shadow_update[id] === 1) {
        DOM_element[id].style.boxShadow = (element_shadow_x[id] + "px ") 
            + (element_shadow_y[id] + "px ") 
            + (element_shadow_blur[id] + "px ") 
            + "rgba("
            + (element_shadow_color_red[id] + ", ")
            + (element_shadow_color_green[id] + ", ")
            + (element_shadow_color_blue[id] + ", ")
            + (element_shadow_color_alpha[id] + ")");  
        DOM_element_shadow_update[id] = 0;
    }
    if (DOM_element_background_color_update[id] === 1) {
        DOM_element[id].style.backgroundColor = "rgba("
        + (element_background_color_red[id] + ", ")
        + (element_background_color_green[id] + ", ")
        + (element_background_color_blue[id] + ", ")
        + (element_background_color_alpha[id] + ")");
        DOM_element_background_color_update[id] = 0;
    }
    if (DOM_element_border_style_update[id] === 1) {
        DOM_element[id].style.border = element_border_style[id];
        DOM_element_border_style_update[id] = 0;
    }
    if (DOM_element_border_radius_update[id] === 1) {
        DOM_element[id].style.borderRadius = element_border_radius[id] + "px";
        DOM_element_border_radius_update[id] = 0;
    }
    if (DOM_element_text_content_update[id] === 1) {
        DOM_element[id].textContent = element_text_content[id];
        DOM_element_text_content_update[id] = 0;
    }
    return;
}


function update_DOM() {

    let i;
    for (i = 0; i < element_count; i ++) {
        if (DOM_element_update[i] === 0) {}
        else { 
            update_DOM_element(i);
            DOM_element_update[i] = 0; 
        }
    }
    return;
}















// PROPERTY WRAPPER
// Visibility
function show(id) {}
function hide(id) {}

// Position
function set_x(id, origin, x) {
    element_x[id] = element_x[origin] + x;
    DOM_element_transform_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_y(id, origin, y) {
    element_y[id] = element_y[origin] + y;
    DOM_element_transform_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_z(id, origin, z) {
    element_z[id] = element_z[origin] + z;
    DOM_element_transform_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_rotation(id, degrees) {
    DOM_element_transform_update[id] = 1;
}

// Dimensions
function set_width(id, width) {
    element_width[id] = width;
    DOM_element_width_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_height(id, height) {
    element_height[id] = height;
    DOM_element_height_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_scale_x(id, scale) {
    DOM_element_transform_update[id] = 1;
}
function set_scale_y(id, scale) {
    DOM_element_transform_update[id] = 1;
}
function set_skew_x(id, scale) {
    DOM_element_transform_update[id] = 1;
}
function set_skew_y(id, scale) {
    DOM_element_transform_update[id] = 1;
}


// Style
function set_opacity() {}

function set_shadow(id, x, y, blur, color) { // change to new rgba
    element_shadow_x[id] = x;
    element_shadow_y[id] = y;
    element_shadow_blur[id] = blur;
    element_shadow_color_red[id] = color[0];
    element_shadow_color_green[id] = color[1];
    element_shadow_color_blue[id] = color[2];
    element_shadow_color_alpha[id] = color[3];
    DOM_element_shadow_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

function set_border_style() {
    DOM_element_border_style_update[id] = 1;
}

function set_border_radius(id, radius) {
    element_border_radius[id] = radius;
    DOM_element_border_radius_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

// Text
function set_text_content(id, text) {
    element_text_content[id] = text;
    DOM_element_text_content_update[id] = 1;
    DOM_element_update[id] = 1;
    return;
}

/*
function set_text_align(origin) {
    if (origin === "left") {}
    else if (origin === "center") {}
    else if (origin === "right") {}
    else {}
    return;
}
function set_text_font(id, font) {
    let element = document.getElementById(id + "");
    element.style.fontFamily = font;
    return;
}

function set_text_size() {}
function set_text_color() {}
function set_text_style() {}
*/















// Events
function event_mousedown(event) {
    let DOM_id = event["srcElement"]["id"];
    element_mousedown[+DOM_id] = 1;
    console.log(DOM_id);
    return;
}

function add_event_mousedown(id) {
    DOM_element[id].addEventListener("mousedown", event_mousedown);
    return;
}

function remove_event_mousedown(id) {
    return;
}


// UTILITY FUNCTIONS
// Position
function center_to_center(id, ref) {
    let ref_center_x = element_x[ref] + (element_width[ref] / 2);
    let ref_center_y = element_y[ref] + (element_height[ref] / 2);
    let new_x = ref_center_x - (element_width[id] / 2);
    let new_y = ref_center_y - (element_height[id] / 2);
    set_x(id, root, new_x);
    set_y(id, root, new_y);
    return;
}

function infront() {}
function behind() {}



















// ANIMATION FUNCTIONS
// Position



const CURVE_LINEAR = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]; // change to typed array
//const CURVE_EASE_IN;
const CURVE_SMOOTH = [0.5, 1.0, 1.5, 2.0, 1.75, 1.5, 1.0, 0.5, 0.25, 0.1];


function animation(checkpoint, progress, curve, func, id, delta, speed, property) {
   
    if (progress < checkpoint * 1) {
        func(id, root, element_x[id] + ((speed * delta) * curve[0]));
        element_slide_x_progress[id] += ((speed * delta) * curve[0]);
    }
}


function animation_slide_x(delta, id, start, end, speed, curve) { // finish this function and then paste it's code into animation() to there generalize it
    
    if (element_slide_x[id] === 1) { 
        if (end > start) {
            if (element_x[id] < end) {

                element_slide_x_checkpoint[id] = (end - start) / 10;

                if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 1) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[0]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[0]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 2) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[1]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[1]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 3) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[2]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[2]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 4) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[3]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[3]);
                }   
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 5) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[4]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[4]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 6) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[5]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[5]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 7) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[6]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[6]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 8) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[7]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[7]);
                }
                else if (element_slide_x_progress[id] < element_slide_x_checkpoint[id] * 9) {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[8]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[8]);
                }
                else {
                    set_x(id, root, element_x[id] + ((speed * delta) * curve[9]));
                    element_slide_x_progress[id] += ((speed * delta) * curve[9]);
                    
                    if (element_x[id] >= end) {
                        set_x(id, root, end); //change
                        element_slide_x[id] = 0;
                        element_slide_x_progress[id] = 0.0;
                    }
                }
            }
            else {
                //set_x(id, root, end);
                //element_slide_x[id] = 0;
                //element_slide_x_progress[id] = 0.0;
            }
        }
        else if (end < start) {
            if (element_x[id] > end) {
                set_x(id, root, element_x[id] - (speed * delta));
            }
            else {
                set_x(id, root, end);
                element_slide_x[id] = 0;
            }
        }
    }    
    else { 
        element_slide_x[id] = 1;
        set_x(id, root, start);
    }
    return;
}


function animation_fade_in() {}
function animation_fade_out() {}
function animation_zoom_in() {}
function animation_zoom_out() {}



















// APP 
let font_1 = load_google_font(
    "Roboto", "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    );
let font_2 = load_google_font(
    "Lato", "http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext"
    );

create_virtual(100);    

// header
let header = create_element("div");
let header_home = create_element("button");
let header_about = create_element("button");
let header_news = create_element("button");
let box_1 = create_element("div");
let box_2 = create_element("div");

function create_page_home() {
    set_width(header, DOM_window_width);
    set_height(header, 75);
    set_shadow(header, 0.1, 0.1, 10, [200, 200, 200, 1.0]);

    set_x(header_home, root, 100);
    set_y(header_home, root, 25);
    set_z(header_home, root, 1.0);
    set_width(header_home, 75);
    set_height(header_home, 25);
    set_shadow(header_home, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_home, 5);

    set_x(header_about, root, 200);
    set_y(header_about, root, 25);
    set_z(header_about, root, 1.0);
    set_width(header_about, 75);
    set_height(header_about, 25);
    set_shadow(header_about, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_about, 5);

    set_x(header_news, root, 300);
    set_y(header_news, root, 25);
    set_z(header_news, root, 1.0);
    set_width(header_news, 75);
    set_height(header_news, 25);
    set_shadow(header_news, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_news, 5);

    set_x(box_1, root, 50); 
    set_y(box_1, root, 125);
    set_width(box_1, 200);
    set_height(box_1, 300);
    set_border_radius(box_1, 5);
    set_shadow(box_1, 0.1, 0.1, 10, [200, 200, 200, 1.0]);
    add_event_mousedown(box_1);

    set_x(box_2, root, 600); 
    set_y(box_2, root, 125);
    set_width(box_2, 200);
    set_height(box_2, 300);
    set_border_radius(box_2, 5);
    set_shadow(box_2, 0.1, 0.1, 10, [200, 200, 200, 1.0]);

    add_event_mousedown(box_2);
}

function root_resized() {
    if (window.innerWidth !== element_width[root]) { return 1; }
    else if (window.innerHeight !== element_height[root]) { return 1; }
    else { return 0; } 
}

function root_mousedown() {} // check if mousedown on root. If 1 then check which element.


let time = performance.now();
let delta = 0.0

function set_delta() {
    delta = (performance.now() - time) / 10.0;
    time = performance.now();
    return;
}

create_page_home();


// *TEST*
function animate_element_on_click(id) {
    if (element_mousedown[id] === 1) {
        animation_slide_x(delta, id, 100, 300, 7.5, CURVE_SMOOTH);
        
        if (element_slide_x[id] === 0) {
            element_mousedown[id] = 0;
        }
    }
    //console.log(element_animation_slide[id]);
    return;
}


function main() {
    
    set_delta();
    //console.log(delta);

    // window size dependent elements
    if (root_resized() === 1) {
        set_width(root, window.innerWidth);
        set_height(root, window.innerHeight);

        set_width(header, element_width[root]);
        center_to_center(header_news, root);
        center_to_center(header_about, box_2);
    }


    animate_element_on_click(box_1);
    center_to_center(header_home, box_1);

    update_DOM();
    
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