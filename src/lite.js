"use strict";

// NOTES
// this api is structured as follows:
// create, get/set (individual properties), update, clear

// TODO
// create all the SET functions
// create all the UPDATE functions
// add pushing to dynamic arrays in create_element() function
// update the create_element function
// setup set_text function and other text functions
// add + before 64bit floats and |0 after 32bit ints
// consider changing all 1/0 arrays from Uint to Int instead?
// put global counters inside functions instead (these are allocated on the stack)





/*-------------
    DOM HEAD
---------------*/
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





/*-------------
    DOM BODY
---------------*/
let DOM_body = document.body;
DOM_body.style.margin = "0px";
DOM_body.style.left = "0px";
DOM_body.style.top = "0px";

// ROOT ELEMENT
let DOM_ROOT = document.createElement("div");
DOM_ROOT.id = "0";
DOM_ROOT.style.position = "absolute";
DOM_ROOT.style.margin = "0px";
DOM_ROOT.style.padding = "0px";
DOM_ROOT.style.border = "none";
DOM_ROOT.style.left = "0px";
DOM_ROOT.style.top = "0px";
DOM_ROOT.style.width = "100%";
DOM_ROOT.style.height = "100%";
DOM_ROOT.style.zIndex = "0";
DOM_ROOT.style.backgroundColor = "rgba(225, 225, 225, 1.0)";
DOM_body.append(DOM_ROOT);















/*-------------------
    DEFINE PROPERTY
---------------------*/
// GLOBAL
let mouse_x = 0.0;
let mouse_y = 0.0;
let keyboard;

// STATIC ARRAYS
// Element
const ROOT = 0;
let create_count = 1;
let clear_count = 0;
let element_id;

// Visibility
let element_opacity;

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

// Background
let element_background_opacity;

// Shadow
let element_shadow_x;
let element_shadow_y;
let element_shadow_blur;
let element_border_radius;    
let element_shadow_opacity;

// Border
let element_border_width;
let element_border_radius;
let element_border_opacity;

// Event
let element_mousemove;
let element_mousedown;
let element_mouseup;

// Animation
// slide
let element_slide_x;
let element_slide_x_progress;
let element_slide_x_checkpoint;
let element_slide_y;
let element_slide_y_progress;
let element_slide_y_checkpoint;
// fade
let element_fade_in;
let element_fade_in_progress;
let element_fade_in_checkpoint;
let element_fade_out;
let element_fade_out_progress;
let element_fade_out_checkpoint;
// zoom
let element_zoom_in;
let element_zoom_in_progress;
let element_zoom_in_checkpoint;
let element_zoom_out;
let element_zoom_out_progress;
let element_zoom_out_checkpoint;

// Filter
let element_filter_blur; // (px)
let element_filter_grayscale; // contrast, grayscale etc. (%)

// Text
let element_text_size;
let element_text_weight;
let element_text_spacing;
let element_text_indent;
let element_text_opacity;

// DYNAMIC ARRAYS
// Element
let DOM_element = [DOM_ROOT];
let clear_element = [0];

// Misc
let element_cursor_style = [""];
let element_overflow = [""];
let element_clip = [""];

// Visibility
let element_visibility = [""];

// Background
let element_background_image = [""];
let element_background_position = [""];
let element_background_repeat = [""];
let element_background_attachment = [""];
let element_background_color = [[0, 0, 0]];

// Shadow
let element_shadow_color = [[0, 0, 0]];

// Border
let element_border_style = [""];
let element_border_color = [[0, 0, 0]];

// Filter
let element_filter_url = [""];

// Text
let element_text_align = [""];
let element_text_content = [""];
let element_text_font = [""];
let element_text_variant = [""];
let element_text_style = [""];
let element_text_decoration = [""];
let element_text_color = [[0, 0, 0]];









/*-------------------
    CREATE PROPERTY
---------------------*/
function create(size) {
    
    let elements = size + 1;
    let color = new Uint8Array(3);

    // Element
    element_id = new Uint8Array(elements);

    // Visibility
    element_opacity = new Float32Array(elements);
    
    // Position
    element_x = new Float32Array(elements);
    element_y = new Float32Array(elements);
    element_z = new Int32Array(elements);
    element_rotation = new Int16Array(elements);

    // Dimension
    element_width = new Float32Array(elements);
    element_height = new Float32Array(elements);
    element_scale_x = new Float32Array(elements);
    element_scale_y = new Float32Array(elements);
    element_skew_x = new Float32Array(elements);
    element_skew_y = new Float32Array(elements);

    // Background
    element_background_opacity = new Float32Array(elements);
    
    // Shadow
    element_shadow_x = new Float32Array(elements);
    element_shadow_y = new Float32Array(elements);
    element_shadow_blur = new Float32Array(elements);
    element_border_radius = new Float32Array(elements);
    element_shadow_opacity = new Float32Array(elements);

    // Border
    element_border_width = new Float32Array(elements);
    element_border_radius = new Float32Array(elements);
    element_border_opacity = new Float32Array(elements);

    // Events
    element_mousemove = new Uint8Array(elements);
    element_mousedown = new Uint8Array(elements);
    element_mouseup = new Uint8Array(elements);

    // Animations 
    // slide
    element_slide_x = new Float32Array(elements);
    element_slide_x_progress = new Float32Array(elements);
    element_slide_x_checkpoint = new Float32Array(elements);
    element_slide_y = new Float32Array(elements);
    element_slide_y_progress = new Float32Array(elements);
    element_slide_y_checkpoint = new Float32Array(elements);
    // fade
    element_fade_in = new Float32Array(elements);
    element_fade_in_progress = new Float32Array(elements);
    element_fade_in_checkpoint = new Float32Array(elements);
    element_fade_out = new Float32Array(elements);
    element_fade_out_progress = new Float32Array(elements);
    element_fade_out_checkpoint = new Float32Array(elements);
    // zoom
    element_zoom_in = new Float32Array(elements);
    element_zoom_in_progress = new Float32Array(elements);
    element_zoom_in_checkpoint = new Float32Array(elements);
    element_zoom_out = new Float32Array(elements);
    element_zoom_out_progress = new Float32Array(elements);
    element_zoom_out_checkpoint = new Float32Array(elements);

    // Filter
    element_filter_blur = new Uint8Array(elements);
    element_filter_grayscale = new Float32Array(elements);

    // Text
    element_text_size = new Uint8Array(elements);
    element_text_weight = new Uint8Array(elements);
    element_text_spacing = new Float32Array(elements);
    element_text_indent = new Float32Array(elements);
    element_text_opacity = new Uint8Array(elements);
}







/*-------------------
    CLEAR PROPERTY
---------------------*/
function clear() {
    // clears the whole virtual buffer to zero
    // can be efficient to use when loading a new page
}






/*-----------------
    GET PROPERTY
-------------------*/
// Misc
function get_cursor_style(id) { return element_cursor_style[id]; }
function get_overflow(id) { return element_overflow[id]; }
function get_clip(id) { return element_clip[id]; }

// Visibility
function get_visibility(id) { return element_visibility[id]; }
function get_opacity(id) { return element_opacity[id]; }

// Position
function get_x(id) { return element_x[id]; }
function get_y(id) { return element_y[id]; }
function get_z(id) { return element_z[id]; }
function get_rotation(id) { return element_rotation[id]; }

// Dimensions
function get_width(id) { return element_width[id]; }
function get_height(id) { return element_height[id]; }
function get_scale_x(id) { return element_scale_x[id]; }
function get_scale_y(id) { return element_scale_y[id]; }
function get_skew_x(id) { return element_skew_x[id]; }
function get_skew_y(id) { return element_skew_y[id]; }

// Background
function get_background_opacity(id) { return element_background_opacity[id]; }
function get_background_image(id) { return element_background_image[id]; }
function get_background_position(id) { return element_background_position[id]; }
function get_background_attachment(id) { return element_background_attachment[id]; }
function get_background_repeat(id) { return element_background_repeat[id]; }
function get_background_color(id) {return element_background_color[id]; }

// Shadow
function get_shadow_x(id) { return element_shadow_x[id]; }
function get_shadow_y(id) { return element_shadow_y[id]; }
function get_shadow_radius(id) { return element_shadow_radius[id]; }
function get_shadow_blur(id) { return element_shadow_blur[id]; }
function get_shadow_color(id) { return element_shadow_color[id]; }
function get_shadow_opacity(id) {return element_shadow_opacity[id]; }

// Border
function get_border_style(id) { return element_border_style[id]; }
function get_border_width(id) { return element_border_width[id]; }
function get_border_radius(id) { return element_border_radius[id]; }
function get_border_color(id) { return element_border_color[id]; }
function get_border_opacity(id) { return element_border_opacity[id]; }

// Filter
function get_filter_url(id) { return element_filter_url[id]; }
function get_filter_blur(id) { return element_filter_blur[id]; }
function get_filter_grayscale(id) { return element_filter_grayscale[id]; }

// Text
function get_text_content(id) { return element_text_content[id]; }
function get_text_font(id) { return element_text_font[id]; }
function get_text_align(id) { return element_text_align[id]; }
function get_text_size(id) { return element_text_size[id]; }
function get_text_weight(id) { return element_text_weight[id]; }
function get_text_variant(id) { return element_text_variant[id]; }
function get_text_style(id) { return element_text_style[id]; }
function get_text_decoration(id) { return element_text_decoration[id]; }
function get_text_indent(id) { return element_text_indent[id]; }
function get_text_spacing(id) { return element_text_spacing[id]; }
function get_text_color(id) { return element_text_color[id]; }
function get_text_opacity(id) { return element_text_opacity[id]; }










/*------------------
    CREATE ELEMENT
--------------------*/
let new_id;
let new_fragment;
let new_element;

function create_element(type) {

    new_fragment = document.createDocumentFragment();
    new_element = document.createElement(type);

    // DOM
    new_element.style.position = "absolute";
    new_element.style.margin = "0px";
    new_element.style.padding = "0px";
    new_element.style.outline = "none";
    
    new_fragment.append(new_element);
    DOM_ROOT.append(new_fragment);
    
    // VIRTUAL
    // Element  
    if (clear_count === 0) {
        new_id = create_count;
        element_id[new_id] = new_id;
        DOM_element.push(new_element);
        create_count += 1;
    }
    else {
        new_id = clear_element[clear_count];
        DOM_element[new_id] = new_element;
        clear_element.pop();
        clear_count -= 1;
    }
    
    new_element.id = new_id + "";
    
    // STATIC ARRAYS
    // Dimensions
    element_scale_x[new_id] = 1.0;
    element_scale_y[new_id] = 1.0;
    
    // DYNAMIC ARRAYS
    element_border_style.push("none");
    element_text_content.push("test");
    // add all dynamic arrays here and push a value onto the array

    return new_id;
}






/*-----------------
    CLEAR ELEMENT
-------------------*/
let empty = document.createElement("div");
function clear_element(id) {
    DOM_element[id] = empty;
    // clear all properties to 0
    clear_element.push(id);
    clear_count += 1;
}





/*------------------
    UPDATE ELEMENT
--------------------*/
function udate_DOM_element_width() {
    for (i = 0; i < element_count; i ++) {
        DOM_element[i].style.width = element_width[i] + "px";
    }
}
function udate_DOM_element_height() {
    for (i = 0; i < element_count; i ++) {
        DOM_element[i].style.height = element_height[i] + "px";
    }
}
function udate_DOM_element_height() {
    for (i = 0; i < element_count; i ++) {
        DOM_element[i].style.height = element_height[i] + "px";
    }
}
function udate_DOM_element_height() {
    for (i = 0; i < element_count; i ++) {
        DOM_element[i].style.height = element_height[i] + "px";
    }
}
function udate_DOM_element_height() {
    for (i = 0; i < element_count; i ++) {
        DOM_element[i].style.height = element_height[i] + "px";
    }
}



// this will be removed in favor of the above implementation
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

// this function will run all the individual update functions above
let _counter0;
function update_DOM() {

    for (_counter0 = 1; _counter0 < element_count; _counter0 ++) {
        if (DOM_element_update[_counter0] === 0) {}
        else { 
            update_DOM_element(_counter0);
            DOM_element_update[_counter0] = 0; 
        }
    }
    _counter0 = 0;
    return;
}















/*-----------------
    SET PROPERTY
-------------------*/
// Misc
function set_visibility(id) {} // uses the DOM display property (none)
function set_cursor_style() {}
function set_overflow() {}
function set_clip() {}
function set_opacity() {}



// Position
function set_x(id, origin, x) {
    element_x[id] = element_x[origin] + x;
}
function set_y(id, origin, y) {
    element_y[id] = element_y[origin] + y;
}
function set_z(id, origin, z) {
    element_z[id] = element_z[origin] + z;
}
function set_rotation(id, degrees) {}



// Dimension
function set_width(id, width) {
    element_width[id] = width;
}
function set_height(id, height) {
    element_height[id] = height;
}
function set_scale_x(id, scale) {}
function set_scale_y(id, scale) {}
function set_skew_x(id, scale) {}
function set_skew_y(id, scale) {}



// Background
function set_background_color(id, color) {
    element_background_color_red[id] = color[0];
    element_background_color_green[id] = color[1];
    element_background_color_blue[id] = color[2];
    element_background_color_alpha[id] = color[3];
}
function set_background_image() {}
function set_background_position() {}
function set_background_attachment() {}
function set_background_repeat() {}



// Shadow
function set_shadow_x() {}
function set_shadow_y() {}
function set_shadow_color(id, color) {
    element_shadow_color_red[id] = color[0];
    element_shadow_color_green[id] = color[1];
    element_shadow_color_blue[id] = color[2];
    element_shadow_color_alpha[id] = color[3];
}
function set_shadow_blur() {}



// Border
function set_border_color() {}
function set_border_width() {}
function set_border_style() {}
function set_border_radius(id, radius) {
    element_border_radius[id] = radius;
}



// Filter
function set_filter_url() {} // (string)
function set_filter_blur() {} // (px)
function set_filter_color() {} // contrast, grayscale etc. (%)



// Text
function set_text_content(id, text) {
    element_text_content[id] = text;
}
function set_text_align(origin) {
    if (origin === "left") {}
    else if (origin === "center") {}
    else if (origin === "right") {}
}
function set_text_font(id, font) {
    let element = document.getElementById(id + "");
    element.style.fontFamily = font;
}
function set_text_size() {}
function set_text_weight() {}
function set_text_variant() {}
function set_text_color() {}
function set_text_style() {}
function set_text_decoration() {}
function set_text_indent() {}
function set_text_spacing() {}









// EVENTS
// Mouse
function event_mousemove(event) {
    element_mousemove[ROOT] = 1;
    mouse_x = event["clientX"];
    mouse_y = event["clientY"];
    element_mousemove[+event["srcElement"]["id"]] = 1;
}
function reset_mousemove() {
    for (let i = 0; i < element_count; i ++) {
        element_mousemove[i] = 0;
    }
}
function event_mousedown(event) {
    element_mousedown[ROOT] = 1;
    element_mousedown[+event["srcElement"]["id"]] = 1;
}
function reset_mousedown() {
    for (let i = 0; i < element_count; i ++) {
        element_mousedown[i] = 0;
    }
}
function event_mouseup(event) {
    element_mouseup[ROOT] = 1;
    element_mouseup[+event["srcElement"]["id"]] = 1;
}
function reset_mouseup() {
    for (let i = 0; i < element_count; i ++) {
        element_mouseup[i] = 0;
    }
}



// Reset
function reset_events() {
    if (element_mousemove[ROOT] === 1) { reset_mousemove(); }
    if (element_mousedown[ROOT] === 1) { reset_mousedown(); }
    if (element_mouseup[ROOT] === 1) { reset_mouseup(); }
}



// Add / Remove
function add_event(event, id) {
    if (event === "mousemove") { DOM_element[id].addEventListener("mousemove", event_mousemove); return; }    
    if (event === "mousedown") { DOM_element[id].addEventListener("mousedown", event_mousedown); return; }
    if (event === "mouseup") { DOM_element[id].addEventListener("mouseup", event_mouseup); return; }
}
function remove_event(id, event) {}











// UTILITY FUNCTIONS
// Position
function center_to_center(id, ref) {
    let ref_center_x = element_x[ref] + (element_width[ref] / 2); // remove local allocations
    let ref_center_y = element_y[ref] + (element_height[ref] / 2);
    let new_x = ref_center_x - (element_width[id] / 2);
    let new_y = ref_center_y - (element_height[id] / 2);
    set_x(id, ROOT, new_x);
    set_y(id, ROOT, new_y);
    return;
}

function center_to_point(id, x, y) {
    return; 
}

function infront() {}
function behind() {}



















// ANIMATION FUNCTIONS
// Position


// curves can be any number of steps depending on target precision
const CURVE_LINEAR = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]; // change to typed array
//const CURVE_EASE_IN;
const CURVE_SMOOTH = [0.5, 1.0, 1.5, 2.0, 1.75, 1.5, 1.0, 0.5, 0.25, 0.1];


let animation_curve_checkpoint;
function animation_curve(checkpoint, progress) {
   
    animation_curve_checkpoint = 1;
    
    // check if current checkpoint is negative
    // if so check if progress > checkpiont * animation_curve_checkpoint
    
    while (1) {
        if (progress < checkpoint * animation_curve_checkpoint) {
            break;
        }
        else { animation_curve_checkpoint += 1; }
    } 
    return animation_curve_checkpoint - 1;
}


let animation_slide_x_checkpoint;
function animation_slide_x(id, delta, start, end, speed, curve) {

    if (element_slide_x[id] === 1) { 
        if (end > start) {

            element_slide_x_checkpoint[id] = (end - start) / curve.length;
            animation_slide_x_checkpoint = animation_curve(
                element_slide_x_checkpoint[id], 
                element_slide_x_progress[id]
            );

            if (element_x[id] < end) {
                set_x(id, ROOT, element_x[id] + ((speed * delta) * curve[animation_slide_x_checkpoint]));
                element_slide_x_progress[id] += ((speed * delta) * curve[animation_slide_x_checkpoint]);      
            }
            else {
                set_x(id, ROOT, end);
                element_slide_x[id] = 0;
                element_slide_x_progress[id] = 0.0;
            }
        }
        else if (end < start) {

            element_slide_x_checkpoint[id] = (start - end) / curve.length;
            animation_slide_x_checkpoint = animation_curve(
                element_slide_x_checkpoint[id], 
                element_slide_x_progress[id]
            );

            if (element_x[id] > end) {
                set_x(id, ROOT, element_x[id] - ((speed * delta) * curve[animation_slide_x_checkpoint]));
                element_slide_x_progress[id] += ((speed * delta) * curve[animation_slide_x_checkpoint]);      
            }
            else {
                set_x(id, ROOT, end);
                element_slide_x[id] = 0;
                element_slide_x_progress[id] = 0.0;
            }
        }
    }
    else { 
        element_slide_x[id] = 1;
        set_x(id, ROOT, start);   
    }
    return;
}
function animation_slide_y() {}

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

create(100);
add_event("mousemove", ROOT);

// create an element_pool() function?? 
let header = create_element("div");
let header_home = create_element("button");
let header_about = create_element("button");
let header_news = create_element("button");
let box_1 = create_element("div");
let box_2 = create_element("div");
let input = create_element("input");
let pointer = create_element("div");

function create_home_page() {
    set_width(header, element_width[ROOT]);
    set_height(header, 75);
    set_shadow(header, 0.1, 0.1, 10, [200, 200, 200, 1.0]);

    set_x(header_home, ROOT, 100);
    set_y(header_home, ROOT, 25);
    set_z(header_home, ROOT, 1.0);
    set_width(header_home, 75);
    set_height(header_home, 25);
    set_shadow(header_home, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_home, 5);

    set_x(header_about, ROOT, 200);
    set_y(header_about, ROOT, 25);
    set_z(header_about, ROOT, 1.0);
    set_width(header_about, 75);
    set_height(header_about, 25);
    set_shadow(header_about, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_about, 5);

    set_x(header_news, ROOT, 300);
    set_y(header_news, ROOT, 25);
    set_z(header_news, ROOT, 1.0);
    set_width(header_news, 75);
    set_height(header_news, 25);
    set_shadow(header_news, 0.1, 0.1, 5, [225, 225, 225, 1.0]);
    set_border_radius(header_news, 5);

    set_x(box_1, ROOT, 50); 
    set_y(box_1, ROOT, 125);
    set_width(box_1, 200);
    set_height(box_1, 300);
    set_border_radius(box_1, 5);
    set_shadow(box_1, 0.1, 0.1, 10, [200, 200, 200, 1.0]);
    add_event("mousedown", box_1);

    set_x(box_2, ROOT, 300); 
    set_y(box_2, ROOT, 125);
    set_width(box_2, 200);
    set_height(box_2, 300);
    set_border_radius(box_2, 5);
    set_shadow(box_2, 0.1, 0.1, 10, [200, 200, 200, 1.0]);
    add_event("mousedown", box_2);

    set_x(input, ROOT, 200);
    set_y(input, ROOT, 700);
    set_z(input, ROOT, 1);
    set_width(input, 75);
    set_height(input, 25);

    set_x(pointer, ROOT, 25);
    set_y(pointer, ROOT, 200);
    set_width(pointer, 50);
    set_height(pointer, 50);
    set_z(pointer, ROOT, -1.0);
    add_event("mousemove", pointer);
}


function update_home_page() {}



function page_router() {} // routes to pages on certain events






// *TEST*
function custom_pointer() {
    if (element_mousemove[ROOT] === 1) {
        //center_to_center(pointer, );
        set_x(pointer, ROOT, mouse_x)
        set_y(pointer, ROOT, mouse_y)
    }
}

let time = performance.now();
let delta = 0.0

function set_delta() {
    delta = (performance.now() - time) / 10.0;
    time = performance.now();
    return;
}

create_home_page();


// *TEST*
function animate_element_on_click(id, start, end) {
    if (element_mousedown[id] === 1 && element_slide_x[id] === 0) {
        animation_slide_x(id, delta, start, end, 7.5, CURVE_SMOOTH);
        return;
    }
    if (element_slide_x[id] === 1) {
        animation_slide_x(id, delta, start, end, 7.5, CURVE_SMOOTH);
        return;
    }
    return;
}


// *TEST*
function main() {
    
    set_delta();

    set_width(ROOT, DOM_body.clientWidth); // does not work
    set_height(ROOT, DOM_body.clientHeight);

    set_width(header, element_width[ROOT]);
    center_to_center(header_news, ROOT);
    center_to_center(header_about, box_2);

    animate_element_on_click(box_1, 50.0, 200.0);
    animate_element_on_click(box_2, 300.0, 450.0);

    center_to_center(header_home, box_1);
    set_text_content(box_1, DOM_element[input].value);

    custom_pointer();

    reset_events();
    update_DOM();
    
    return window.requestAnimationFrame(main);
}

main();


/* ADD THIS LATER
export {
    create_element,
    update_element
};

and indert type="module" in the html script tag
*/



