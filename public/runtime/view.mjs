//import * as animation from "animation.mjs";

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


// switch "this" for "e"
// @
export function element(view, id) {

    let e = {
        
        // EVENTS
        update: false,
        mouse_hover: false,
        mouse_down: false,
        mouse_up: false,

        // DATA
        _tag: { id: [] },
        _anims: {},

        _visible: true,
        _left: 0,
        _top: 0,
        _width: 0,
        _height: 0,
        _font_size: 0,
        _font_type: null,
        _padding_left: 0,
        _padding_right: 0,
        _padding_top: 0,
        _padding_bottom: 0,

        // INTERFACE
        tag(object) { this._tag.id.push(object.id); return this; }, // @NOT
        anim(id) { 
            if (id in this._anims) { return this._anims[id]; }
            return animation.anim(this); 
        },

        // dimension
        width(w=null, min=null, max=null) {
            if (w !== null) { 
                this._width = w; 
                _min(this, "_width", min);
                _max(this, "_width", max);
                this.update = true;
                return this;
            } 
            if (this._width === 0) { return html[index].clientWidth; }
            else { return this._width; }
        },
        height(h=null, min=null, max=null) { 
            if (h !== null) { 
                this._height = h; 
                _min(this, "_height", min);
                _max(this, "_height", max);
                this.update = true;
                return this; 
            }
            if (this._height === 0) { return html[index].clientHeight; }
            else { return this._height; }
        },

        // position
        left(l=null, min=null, max=null) { 
            if (l !== null) { this._left = l; this.update = true; return this; } 
            return this._left; 
        },
        top(t=null, min=null, max=null) { 
            if (t !== null) { this._top = t; this.update = true; return this; }
            return this._top; 
        },
        right(r=null, min=null, max=null) {
            if (r !== null) { this._left = r - this.width(); this.update = true; return this; }
            return this._left + this.width(); 
        },
        bottom(b=null, min=null, max=null) {
            if (b !== null) { this._top = b - this.height(); this.update = true; return this; }
            return this._top + this.height(); 
        },

        // extension
        extend_left(l=null, min=null, max=null) {
            if (l !== null) { 
                this.width(l - this.right(), min, max);
                this.left(l);
                this.update = true;
                return this; }
            return this.bottom();
        },

        extend_top(t=null, min=null, max=null) {
            if (t !== null) { 
                this.height(t - this.bottom(), min, max); 
                this.top(t);
                this.update = true;
                return this; 
            }
            return this.bottom();
        },

        extend_right(r=null, min=null, max=null) {
            if (r !== null) { this.width(r - this.left(), min, max); this.update = true; return this; }
            return this.right();
        },

        extend_bottom(b=null, min=null, max=null) {
            if (b !== null) { this.height(b - this.top(), min, max); this.update = true; return this; }
            return this.bottom();
        },

        // fixed
        fixed_top() {},
        fixed_left() {},

        // local
        mid_x() { return this.width() / 2; },
        mid_y() { return this.height() / 2; },

        // global
        center_x(x=null, min=null, max=null) {
            if (x !== null) { this._left = x - this.mid_x(); this.update = true; return this; } 
            return this._left + this.mid_x(); 
        },
        center_y(y=null, min=null, max=null) { 
            if (y !== null) { this._top = y - this.mid_y(); this.update = true; return this; }
            return this._top + this.mid_y(); 
        },


        // text
        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { this._padding_left = left; this.update = true; }
            if (right !== null) { this._padding_right = right; this.update = true; }
            if (top !== null) { this._padding_top = top; this.update = true; }
            if (bottom !== null) { this._padding_bottom = bottom; this.update = true; }
        },

        font(size=null, type=null, min=null, max=null) {
            if (size !== null) { this._font_size = size; this.update = true; }
            if (type !== null) { this._font_type = type; this.update = true; }
            _min(this, "_font_size", min);
            _max(this, "_font_size", max);
        },

        // visibility
        show() { this._visible = true; this.update = true; return this; },
        hide() { this._visible = false; this.update = true; return this; }

    }

    view._elements[id] = e;
    return e;
}


// @TEST @NOT
function _tag_property(elements, property) {
    
    for (let i=0; i < elements.length; i++) {

        let j = elements[i]._tag.id.indexOf(this.id);
        if (j === -1) { continue; }
        
        elements[i][property]();
        
    }
}


// @NOT
export function tag(context, view, id) {

    // check if tag exists, if not create new object, else return existing object

    let tag = context.view._tag;
    let elements = context.view._element.object;

    let index = tag.object.length;

    tag.id.push(id);
    tag.object.push({
        
        id: id,

        padding(left=null, right=null, top=null, bottom=null) {

            for (let i=0; i < elements.length; i++) {

                let j = elements[i]._tag.id.indexOf(this.id);
                if (j === -1) { continue; }
                
                if (left !== null) { elements[i]._padding_left = left; }
                if (right !== null) { elements[i]._padding_right = right; }
                if (top !== null) { elements[i]._padding_top = top; }
                if (bottom !== null) { elements[i]._padding_bottom = bottom; }
                
            }
        },
    });
    
    return tag.object[index];
}