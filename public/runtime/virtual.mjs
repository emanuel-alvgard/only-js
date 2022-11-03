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
        _font_size: 0,
        _font_type: null,
        _padding_l: 0,
        _padding_r: 0,
        _padding_t: 0,
        _padding_b: 0,

        // INTERFACE
        // @DONE
        anim(id, property, start, end, time, delay=null, curve=null, event=null) { 
            if (id in e._anims) { return e._anims[id]; }
            e._anims[id] = animation.anim(runtime, e, id, property, start, end, time, delay, curve, event);
            return e._anims[id];
        },

        // dimension
        w(w=null, min=null, max=null) {
            if (w === e._w) { return e; }
            if (w !== null) {
                e._auto_w = false; 
                e._w = w; 
                _min(e, "_w", min);
                _max(e, "_w", max);
                e.UPDATE = true;
                return e;
            } 
            else { return e._w; }
        },

        h(h=null, min=null, max=null) {
            if (h === e._h) { return e; } 
            if (h !== null) {
                e._auto_h = false; 
                e._h = h; 
                _min(e, "_h", min);
                _max(e, "_h", max);
                e.UPDATE = true;
                return e; 
            }
            else { return e._h; }
        },

        auto_w() { e._auto_w = true; },
        auto_h() { e._auto_h = true; },

        // position
        l(l=null, min=null, max=null) {
            if (l === e._l) { return e; }  
            if (l !== null) { 
                e._l = l; 
                _min(e, "_l", min);
                _max(e, "_l", max);
                e.UPDATE = true; 
                return e; } 
            return e._l; 
        },

        t(t=null, min=null, max=null) {
            if (t === e._t) { return e; }  
            if (t !== null) { 
                e._t = t; 
                _min(e, "_t", min);
                _max(e, "_t", max);
                e.UPDATE = true; 
                return e; }
            return e._t; 
        },

        r(r=null, min=null, max=null) {
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

        // fixed
        fixed_t() {},
        fixed_l() {},
        fixed_b() {},
        fixed_r() {},

        // local
        mid_x() { return e.w() / 2; },
        mid_y() { return e.h() / 2; },

        // global
        center_x(x=null, min=null, max=null) {
            if (x !== null) { e._l = x - e.mid_x(); e.UPDATE = true; return e; } 
            return e._l + e.mid_x(); 
        },
        center_y(y=null, min=null, max=null) { 
            if (y !== null) { e._t = y - e.mid_y(); e.UPDATE = true; return e; }
            return e._t + e.mid_y(); 
        },


        // text
        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { e._padding_l = left; e.UPDATE = true; }
            if (right !== null) { e._padding_r = right; e.UPDATE = true; }
            if (top !== null) { e._padding_t = top; e.UPDATE = true; }
            if (bottom !== null) { e._padding_b = bottom; e.UPDATE = true; }
        },

        font(size=null, type=null, min=null, max=null) {
            if (size !== null) { e._font_size = size; e.UPDATE = true; }
            if (type !== null) { e._font_type = type; e.UPDATE = true; }
            _min(e, "_font_size", min);
            _max(e, "_font_size", max);
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




// @
export function group(runtime, id) {

    let g = {
        _elements: {},

        add(element) {
            if (element._id in g._elements) { return; }
            g._elements[id] = element; 
        },
        remove(element) {}
    }
    return g;
}