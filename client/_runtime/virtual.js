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


// @
export function element(context, view, id) {

    let e = {
        
        // EVENTS
        UPDATE: true,
        MOUSE_HOVER: false,
        MOUSE_DOWN: false,
        MOUSE_UP: false,

        // DATA
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

        _color_r: 200,
        _color_g: 200,
        _color_b: 200,

        _text: "",

        _font: null,
        _font_size: 0,
        _font_red: 0,
        _font_green: 0,
        _font_blue: 0,

        _padding_l: 0,
        _padding_r: 0,
        _padding_t: 0,
        _padding_b: 0,

        _border: "none",

        _border_color_r: 0,
        _border_color_g: 0,
        _border_color_b: 0,

        _border_radius_lt: 0,
        _border_radius_rt: 0,
        _border_radius_rb: 0,
        _border_radius_lb: 0,

        _shadow_x: 0,
        _shadow_y: 0,
        _shadow_blur: 0,

        _shadow_r: 0,
        _shadow_g: 0,
        _shadow_b: 0,

        // INTERFACE
        real() {},

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
            if (l !== null) { 
                e.w(l - e.r(), min, max);
                e.l(l);
                e.UPDATE = true;
                return e; }
            return e.b();
        },

        extend_t(t=null, min=null, max=null) {
            if (t !== null) { 
                e.h(t - e.b(), min, max); 
                e.t(t);
                e.UPDATE = true;
                return e; 
            }
            return e.b();
        },

        extend_r(r=null, min=null, max=null) {
            if (r !== null) { e.w(r - e.l(), min, max); e.UPDATE = true; return e; }
            return e.r();
        },

        extend_b(b=null, min=null, max=null) {
            if (b !== null) { e.h(b - e.t(), min, max); e._auto_h = false; e.UPDATE = true; return e; }
            return e.b();
        },

        // fixed??
        fixed_t() {},
        fixed_l() {},
        fixed_b() {},
        fixed_r() {},

        // global
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
        image(asset, type) {},

        color(r, g, b) { 
            if (r !== e._color_r) { e._color_r = r; e.UPDATE = true }
            if (g !== e._color_g) { e._color_g = g; e.UPDATE = true }
            if (b !== e._color_b) { e._color_b = b; e.UPDATE = true }
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

        // padding
        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { e._padding_l = left; e.UPDATE = true; }
            if (right !== null) { e._padding_r = right; e.UPDATE = true; }
            if (top !== null) { e._padding_t = top; e.UPDATE = true; }
            if (bottom !== null) { e._padding_b = bottom; e.UPDATE = true; }
            return e
        },

        // font
        font(type=null, size=null, min=null, max=null) { // only sets the font type
            if (size !== null) { e._font_size = size; e.UPDATE = true; }
            if (type !== null) { e._font = type; e.UPDATE = true; }
            _min(e, "_font_size", min);
            _max(e, "_font_size", max);
        },
        font_color() {},

        // border ?????
        border(type=null, size=null) {
            if (type === e._border) { return e }
            if (type !== null) { e._border = type; e.UPDATE = true; return e; }
            return e._border
        },

        border_color() {},

        border_radius(lt=null, rt=null, rb=null, lb=null) {
            if (lt !== null) { e._border_radius_lt = lt; e.UPDATE = true; }
            if (rt !== null) { e._border_radius_rt = rt; e.UPDATE = true; }
            if (rb !== null) { e._border_radius_rb = rb; e.UPDATE = true; }
            if (lb !== null) { e._border_radius_lb = lb; e.UPDATE = true; }
            return e
        },


        // SHADOW
        shadow(x=null, y=null, blur=null) {
            if (x !== null) { e._shadow_x = x; e.UPDATE = true; }
            if (y !== null) { e._shadow_y = y; e.UPDATE = true; }
            if (blur !== null) { e._shadow_blur = blur; e.UPDATE = true; }
            return e
        },
        shadow_color(r=null, g=null, b=null) {
            if (r !== null) { e._shadow_r = r; e.UPDATE = true; }
            if (g !== null) { e._shadow_g = g; e.UPDATE = true; }
            if (b !== null) { e._shadow_b = b; e.UPDATE = true; }
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