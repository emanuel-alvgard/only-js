import * as animation from "./animation.js";

// @DONE
function _number(e, p, v=null, min=null, max=null, v_offset=0) {

    if (v === null) { return e[p] }
    let new_v
    if (v < min && min !== null) { new_v = min }
    else if (v > max && max !== null) { new_v = max }
    else { new_v = v + v_offset}

    if (new_v !== e[p]) { 
        e[p] = new_v 
        e.UPDATE = true
    }
    return e
}

// @
function _string() {

}

function _rgba(e, property) {

}


// @
export function element(context, view, bounds, id) {

    let e = {
        
        // EVENTS
        SETUP: true,
        UPDATE: true,
        HOVER: false,
        LEAVE: false,
        CLICK: false,

        // DATA
        _context: context,
        _view: view,
        _bounds: bounds,
        _id: id,
        _anims: {},

        _visible: true,
        _opacity: 1.0,
        _left: 0,
        _top: 0,
        _width: 0,
        _height: 0,
        _z_index: 0,
        _auto_width: true,
        _auto_height: true,

        _image: null,
        _image_position: "center",
        _image_fit: "cover",

        _color_r: 0,
        _color_g: 0,
        _color_b: 0,
        _color_a: 0,

        _text: null,
        _text_font: null,
        _text_size: null,
        _text_r: 0,
        _text_g: 0,
        _text_b: 0,

        _padding_left: 0,
        _padding_top: 0,
        _padding_right: 0,
        _padding_bottom: 0,

        _border_left: "none",
        _border_top: "none",
        _border_right: "none",
        _border_bottom: "none",

        _border_size: 1,

        _border_r: 0,
        _border_g: 0,
        _border_b: 0,
        _border_a: 1,

        _border_lt: 0,
        _border_rt: 0,
        _border_rb: 0,
        _border_lb: 0,

        _shadow_x: 0,
        _shadow_y: 0,
        _shadow_blur: 0,

        _shadow_r: 0,
        _shadow_g: 0,
        _shadow_b: 0,
        _shadow_a: 1,

        _overflow_x: "hidden",
        _overflow_y: "hidden",

        _brightness: 1.0,

        // INTERFACE
        context() { return e._context },
        view() { return e._view },
        element(id, type="div") { return view.element(id, type, e) },
        bounds() { return e._bounds },
        id() { return e._id },
        real() {
            if (id in view._real) { return view._real[id] }
        },
        remove() {
            try {
                e.real().remove()
                delete view._virtual[id]
                delete view._virtual_prev[id]
            }
            catch (error) {}
        },

        // @DONE
        anim(id, property, start, end, time, curve=[1.0,1.0], delay=0.0) {
            if (id in e._anims) { 
                // check if any of the arguments diff and update object accordingly
                return e._anims[id]
            }
            e._anims[id] = animation.anim(context, id, property, start, end, time, curve, delay);
            return e._anims[id];
        },

        // DIMENSION
        width(v=null, min=null, max=null) {
            if (v !== null) { e._auto_width = false } 
            return _number(e, "_width", v, min, max)
        },

        height(v=null, min=null, max=null) {
            if (v !== null) { e._auto_height = false; } 
            return _number(e, "_height", v, min, max);
        },

        auto_width() { e._auto_width = true; },
        auto_height() { e._auto_height = true; },

        // POSITION
        left(v=null, min=null, max=null) { return _number(e, "_left", v, min, max) },
        top(v=null, min=null, max=null) { return _number(e, "_top", v, min, max) },

        right(v=null, min=null, max=null) {
            if (v === e._left + e.width()) { return e } 
            if (v !== null) { e._left = v - e.width(); e.UPDATE = true; return e }
            return e._left + e.width() 
        },
        bottom(b=null, min=null, max=null) {
            if (b === e._top + e.height()) { return e } 
            if (b !== null) { e._top = b - e.height(); e.UPDATE = true; return e }
            return e._top + e.height() 
        },

        // EXTENSTION
        extend_left(l=null, min=null, max=null) {
            if (l === e.width() + e.right()) { return e }
            if (l !== null) { 
                e.width(l - e.right(), min, max)
                e.left(l)
                e.UPDATE = true
                return e
            }
            return e.bottom()
        },

        extend_top(t=null, min=null, max=null) {
            if (t === e.height() + e.bottom()) { return e }
            if (t !== null) { 
                e.height(t - e.bottom(), min, max); 
                e.top(t);
                e.UPDATE = true;
                return e; 
            }
            return e.bottom();
        },

        extend_right(r=null, min=null, max=null) {
            if (r === e.width() + e.left()) { return e }
            if (r !== null) { e.width(r - e.left(), min, max); e.UPDATE = true; return e }
            return e.right();
        },

        extend_bottom(b=null, min=null, max=null) {
            if (b === e.height() + e.top()) { return e }
            if (b !== null) { e.height(b - e.top(), min, max); e._auto_height = false; e.UPDATE = true; return e }
            return e.bottom();
        },


        // 
        x(x=null, min=null, max=null) {
            if (x === e._left + (e.width() / 2)) { return e }
            if (x !== null) { e._left =x - (e.width() / 2); e.UPDATE = true; return e }
            return e._left + (e.width() / 2)
        },
        y(y=null, min=null, max=null) {
            if (y === e._top + (e.height() / 2)) { return e }
            if (y !== null) { e._top = y - (e.height() / 2); e.UPDATE = true; return e }
            return e._top + (e.height() / 2)
        },
        z(v=null) {
            if (v === e._z_index) { return e }
            if (v !== null) { e._z_index = v; e.UPDATE = true; return e }
            return e._z_index
        },

        // BACKGROUND
        image(v=null) {
            if (v !== null && "data" in v) {
                if (v.data === e._image) { return e } 
                e._image = v.data; e.UPDATE = true; return e 
            }
            return e._image
        },
        image_position() {},
        image_fit(v=null) {
            if (v === e._image_fit) { return e }
            if (v !== null) { e._image_fit = v; e.UPDATE = true; return e }
            return e._image_fit
        },

        color(rgba) { 
            if (rgba[0] !== e._color_r) { e._color_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._color_g) { e._color_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._color_b) { e._color_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._color_a) { e._color_a = rgba[3]; e.UPDATE = true }
            return e
        },

        color_red() {},
        color_green() {},
        color_blue() {},

        // TEXT
        text(v=null) {
            if (v === e._text) { return e }
            if (v !== null) { e._text = v; e.UPDATE = true; return e }
            return e._text
        },

        text_font(v=null) {
            if (v !== null && "data" in v) {
                if (v.data === e._text_font) { return e } 
                e._text_font = v.data; e.UPDATE = true; return e 
            }
            return e._text_font
        },
        text_size() {},
        text_color(rgba) {
            if (rgba[0] !== e._text_r) { e._text_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._text_g) { e._text_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._text_b) { e._text_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._text_a) { e._text_a = rgba[3]; e.UPDATE = true }
            return e
        },

        // PADDING
        padding(v=null) {
            if (v === null) { return e }
            if (v[0] !== e._padding_left) { e._padding_left = v[0]; e.UPDATE = true }
            if (v[1] !== e._padding_top) { e._padding_top = v[1]; e.UPDATE = true }
            if (v[2] !== e._padding_right) { e._padding_right = v[2]; e.UPDATE = true }
            if (v[3] !== e._padding_bottom) { e._padding_bottom = v[3]; e.UPDATE = true }
            return e
        },

        // BORDER
        border(v=null) {
            if (v === null) { return e }
            if (v !== e._border_left) { e._border_left = v; e.UPDATE = true }
            if (v !== e._border_top) { e._border_top = v; e.UPDATE = true }
            if (v !== e._border_right) { e._border_right = v; e.UPDATE = true }
            if (v !== e._border_bottom) { e._border_bottom = v; e.UPDATE = true }
            return e
        },

        border_bottom(v=null) {
            if (v === e._border_bottom) { return e }
            if (v !== null) { e._border_bottom = v; e.UPDATE = true; return e }
            return e._border_bottom
        },

        border_size(v=null, min=null, max=null) { return _number(e, "_border_size", v, min, max) },

        border_color(rgba) { // @HERE this needs to handle all borders
            if (rgba[0] !== e._border_r) { e._border_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._border_g) { e._border_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._border_b) { e._border_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._border_a) { e._border_a = rgba[3]; e.UPDATE = true }
            return e
        },

        border_radius(v=null) { // v = []
            if (v === null) { return e }
            if (v[0] !== e._border_lt) { e._border_lt = v[0]; e.UPDATE = true; }
            if (v[1] !== e._border_rt) { e._border_rt = v[1]; e.UPDATE = true; }
            if (v[2] !== e._border_rb) { e._border_rb = v[2]; e.UPDATE = true; }
            if (v[3] !== e._border_lb) { e._border_lb = v[3]; e.UPDATE = true; }
            return e
        },


        // SHADOW
        shadow(v) {
            if (v[0] !== e._shadow_x) { e._shadow_x = v[0]; e.UPDATE = true; }
            if (v[1] !== e._shadow_y) { e._shadow_y = v[1]; e.UPDATE = true; }
            if (v[2] !== e._shadow_blur) { e._shadow_blur = v[2]; e.UPDATE = true }
            return e
        },
        shadow_color(rgba) {
            if (rgba[0] !== e._shadow_r) { e._shadow_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._shadow_g) { e._shadow_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._shadow_b) { e._shadow_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._shadow_a) { e._shadow_a = rgba[3]; e.UPDATE = true }
            return e
        },

        // VISIBILITY
        opacity(v=null, min=null, max=null) { return _number(e, "_opacity", v, min, max) },

        show() { 
            if (e._visible === true) { return e }
            e._visible = true 
            e.UPDATE = true 
            return e 
        },
        hide() {
            if (e._visible === false) { return e }
            e._visible = false 
            e.UPDATE = true 
            return e 
        },

        // OVERFLOW
        overflow_x(v=null) { 
            if (v === e._overflow_x) { return e }
            if (v !== null) { e._overflow_x = v; e.UPDATE = true; return e; }
            return e._overflow_x
        },
        overflow_y(v=null) {
            if (v === e._overflow_y) { return e }
            if (v !== null) { e._overflow_y = v; e.UPDATE = true; return e; }
            return e._overflow_y
        },

        // FILTER
        brightness(v=null, min=null, max=null) { return _number(e, "_brightness", v, min, max) },

        // MOUSE
        click() {},
        hover() {},
        cursor() {},

    }
    
    return e
}