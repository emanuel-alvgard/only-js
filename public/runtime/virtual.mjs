import * as animation from "animation.mjs";

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
export function element(runtime, id) {

    let e = {
        
        // EVENTS
        UPDATE: false,
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
        _auto_w: true,
        _auto_h: true,

        _font: null,
        _font_size: 0,
        _font_red: 0,
        _font_green: 0,
        _font_blue: 0,

        _padding_l: 0,
        _padding_r: 0,
        _padding_t: 0,
        _padding_b: 0,

        _shadow_red: 0,
        _shadow_green: 0,
        _shadow_blue: 0,

        // INTERFACE
        // @DONE
        anim(id, property, start, end, time, delay=null, curve=null, event=null) { 
            if (id in e._anims) { return e._anims[id]; }
            e._anims[id] = animation.anim(runtime, e, id, property, start, end, time, delay, curve, event);
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
            _number();
            if (r === e._l + e.w()) { return e; } 
            if (r !== null) { e._l = r - e.w(); e.UPDATE = true; return e; }
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
            if (b !== null) { e.h(b - e.t(), min, max); e.UPDATE = true; return e; }
            return e.b();
        },

        // fixed??
        fixed_t() {},
        fixed_l() {},
        fixed_b() {},
        fixed_r() {},

        // global
        x(x=null, min=null, max=null) {
            if (x !== null) { e._l = x - (e.w() / 2); e.UPDATE = true; return e; } 
            return e._l + (e.w() / 2); 
        },
        y(y=null, min=null, max=null) { 
            if (y !== null) { e._t = y - (e.h() / 2); e.UPDATE = true; return e; }
            return e._t + (e.h() / 2); 
        },

        // BACKGROUND
        image(asset, type) {},
        color() {},
        color_red() {},
        color_green() {},
        color_blue() {},

        // TEXT
        text() {},

        // padding
        padding_t(t) {},
        padding_l(l) {},
        padding_b(b) {},
        padding_r(r) {},

        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { e._padding_l = left; e.UPDATE = true; }
            if (right !== null) { e._padding_r = right; e.UPDATE = true; }
            if (top !== null) { e._padding_t = top; e.UPDATE = true; }
            if (bottom !== null) { e._padding_b = bottom; e.UPDATE = true; }
        },

        // font
        font(size=null, type=null, min=null, max=null) { // only sets the font type
            if (size !== null) { e._font_size = size; e.UPDATE = true; }
            if (type !== null) { e._font = type; e.UPDATE = true; }
            _min(e, "_font_size", min);
            _max(e, "_font_size", max);
        },

        font_size() {},
        font_color() {},

        // border ?????
        border() {}, // only sets the border type
        border_size_t() {},
        border_size_l() {},
        border_size_b() {},
        border_size_r() {},
        border_radius_tl() {},
        border_radius_tr() {},
        border_radius_bl() {},
        border_radius_br() {},

        // shadow
        shadow_color() {},
        shadow_red() {},
        shadow_green() {},
        shadow_blue() {},

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