import * as animation from "./animation.js";

// @DONE
function _min(object, property, value=null) {
    if (value !== null) {
        if (object[property] < value) {
            object[property] = value; 
        }
    }
}

// @DONE
function _max(object, property, value=null) {
    if (value !== null) {
        if (object[property] > value) {
            object[property] = value; 
        }
    }
}


// @
function _number(e, p, v=null, min=null, max=null, v_offset=0) {
    
    if (v === e[p]) { return e; }
    if (v !== null) {
        e[p] = v + v_offset; 
        _min(e, p, min);
        _max(e, p, max);
        e.UPDATE = true;
        return e;
    } 
    else { return e[p]; }

}

function _rgba(e, property) {}


// @
export function element(context, view, bounds, id) {

    let e = {
        
        // EVENTS
        UPDATE: true,
        MOUSE_HOVER: false,
        MOUSE_DOWN: false,
        MOUSE_UP: false,

        // DATA
        _context: context,
        _view: view,
        _bounds: bounds,
        _id: id,
        _anims: {},

        _visible: true,
        _l: 0,
        _t: 0,
        _w: 0,
        _h: 0,
        _z_index: 0,
        _auto_w: true,
        _auto_h: true,

        _image: null,
        _image_position: "center",
        _image_fit: "cover",

        _color_r: 200,
        _color_g: 200,
        _color_b: 200,
        _color_a: 1,

        _text: null,
        _text_font: null,
        _text_size: null,
        _text_red: 0,
        _text_green: 0,
        _text_blue: 0,

        _padding_l: 0,
        _padding_t: 0,
        _padding_r: 0,
        _padding_b: 0,

        _border: "none",
        _border_size: 0,

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

        // INTERFACE
        view() { return e._view },
        real() {
            if (id in view._real) { return view._real[id] }
        },
        remove() {
            try {
                e.real().remove()
                delete view._virtual[id]
            }
            catch (error) {}
        },

        // @DONE
        anim(id, property, start, end, time, delay=null, curve=null, event=null) { 
            if (id in e._anims) { return e._anims[id]; }
            e._anims[id] = animation.anim(context, e, id, property, start, end, time, delay, curve, event);
            return e._anims[id];
        },

        // dimension
        w(v=null, min=null, max=null) {
            if (v !== null) { e._auto_w = false; } 
            return _number(e, "_w", v, min, max);
        },

        h(v=null, min=null, max=null) {
            if (v !== null) { e._auto_h = false; } 
            return _number(e, "_h", v, min, max);
        },

        auto_w() { e._auto_w = true; },
        auto_h() { e._auto_h = true; },

        // position
        l(v=null, min=null, max=null) { return _number(e, "_l", v, min, max) },
        t(v=null, min=null, max=null) { return _number(e, "_t", v, min, max) },

        r(v=null, min=null, max=null) {
            if (v === e._l + e.w()) { return e; } 
            if (v !== null) { e._l = v - e.w(); e.UPDATE = true; return e; }
            return e._l + e.w(); 
        },
        b(b=null, min=null, max=null) {
            if (b === e._t + e.h()) { return e; } 
            if (b !== null) { e._t = b - e.h(); e.UPDATE = true; return e; }
            return e._t + e.h(); 
        },

        // extension
        extend_l(l=null, min=null, max=null) {
            if (l === e.w() + e.r()) { return e }
            if (l !== null) { 
                e.w(l - e.r(), min, max);
                e.l(l);
                e.UPDATE = true;
                return e; }
            return e.b();
        },

        extend_t(t=null, min=null, max=null) {
            if (t === e.h() + e.b()) { return e }
            if (t !== null) { 
                e.h(t - e.b(), min, max); 
                e.t(t);
                e.UPDATE = true;
                return e; 
            }
            return e.b();
        },

        extend_r(r=null, min=null, max=null) {
            if (r === e.w() + e.l()) { return e }
            if (r !== null) { e.w(r - e.l(), min, max); e.UPDATE = true; return e; }
            return e.r();
        },

        extend_b(b=null, min=null, max=null) {
            if (b === e.h() + e.t()) { return e }
            if (b !== null) { e.h(b - e.t(), min, max); e._auto_h = false; e.UPDATE = true; return e; }
            return e.b();
        },


        // 
        x(x=null, min=null, max=null) {
            if (x === e._l) { return e }
            if (x !== null) { e._l = x - (e.w() / 2); e.UPDATE = true; return e; } 
            return e._l + (e.w() / 2); 
        },
        y(y=null, min=null, max=null) { 
            if (y === e._t) { return e }
            if (y !== null) { e._t = y - (e.h() / 2); e.UPDATE = true; return e; }
            return e._t + (e.h() / 2); 
        },
        z(v=null) {
            if (v === e._z_index) { return e }
            if (v !== null) { e._z_index = v; e.UPDATE = true; return e; }
            return e._z_index
        },

        // BACKGROUND
        image(v=null) {
            if (v === e._image) { return e }
            if (v !== null) { e._image = v; e.UPDATE = true; return e; }
            return e._image
        },
        image_position() {},
        image_fit(v=null) {
            if (v === e._image_fit) { return e }
            if (v !== null) { e._image_fit = v; e.UPDATE = true; return e; }
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
            if (v !== null) { e._text = v; e.UPDATE = true; return e; }
            return e._text
        },

        text_font(v=null) {
            if (v === e._text_font) { return e }
            if (v !== null) { e._text_font = v; e.UPDATE = true; return e; }
            return e._text_font
        },
        text_size() {},
        text_color() {},

        // PADDING
        padding(v) {
            if (v[0] !== e._padding_l) { e._padding_l = v[0]; e.UPDATE = true; }
            if (v[1] !== e._padding_t) { e._padding_t = v[1]; e.UPDATE = true; }
            if (v[2] !== e._padding_r) { e._padding_r = v[2]; e.UPDATE = true; }
            if (v[3] !== e._padding_b) { e._padding_b = v[3]; e.UPDATE = true; }
            return e
        },

        // BORDER
        border(v=null) {
            if (v === e._border) { return e }
            if (v !== null) { e._border = v; e.UPDATE = true; return e; }
            return e._border
        },

        border_size(v=null, min=null, max=null) { return _number(e, "_border_size", v, min, max) },

        border_color(rgba) {
            if (rgba[0] !== e._border_r) { e._border_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._border_g) { e._border_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._border_b) { e._border_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._border_a) { e._border_a = rgba[3]; e.UPDATE = true }
            return e
        },

        border_radius(v) {
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
            if (v[2] !== e._shadow_blur) { e._shadow_blur = v[2]; e.UPDATE = true; }
            return e
        },
        shadow_color(rgba) {
            if (rgba[0] !== e._shadow_r) { e._shadow_r = rgba[0]; e.UPDATE = true }
            if (rgba[1] !== e._shadow_g) { e._shadow_g = rgba[1]; e.UPDATE = true }
            if (rgba[2] !== e._shadow_b) { e._shadow_b = rgba[2]; e.UPDATE = true }
            if (rgba[3] !== e._shadow_a) { e._shadow_a = rgba[3]; e.UPDATE = true }
            return e
        },

        // visibility
        show() { 
            if (e._visible) { return e; }
            e._visible = true; 
            e.UPDATE = true; 
            return e; 
        },
        hide() {
            if (!e._visible) { return e; }
            e._visible = false; 
            e.UPDATE = true; 
            return e; 
        }

    }
    return e;
}