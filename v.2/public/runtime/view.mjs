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



// @DONE
function _layout(context, func, format=null) {
    context.view._layout.format.push(format);
    context.view._layout.func.push(func);
    return;
}


// @DONE
function _html(context, id, type) {
    
    let html = context.view._html;
    let exist = html.id.indexOf(id);
    if (exist !== -1) { return html.object[exist]; }

    let root = context.view.root;
    exist = root.getElementsByClassName(id);
    let object;

    if (exist.length === 0) { 
        object = document.createElement(type);
        object.classList.add(id);
        root.append(object);
    }
    else {
        object = exist[0];
    }

    html.id.push(id);
    html.object.push(object);

    return object; 

}


// @DONE
function _element(context, id, type="div") {

    let element = context.view._element;
    let exist = element.id.indexOf(id);
    if (exist !== -1) { return element.object[exist]; }

    _html(context, id, type);

    let html = context.view._html.object;
    let index = element.object.length;

    element.id.push(id);
    element.object.push({
        
        // EVENTS
        mouse_hover: 0,
        mouse_down: 0,
        mouse_up: 0,

        // DATA
        _tag: { id: [] },
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
        tag(object) { this._tag.id.push(object.id); return this; },

        // dimension
        width(w=null, min=null, max=null) {
            if (w !== null) { 
                this._width = w; 
                _min(this, "_width", min);
                _max(this, "_width", max);
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
                return this; 
            }
            if (this._height === 0) { return html[index].clientHeight; }
            else { return this._height; }
        },

        // position
        left(l=null, min=null, max=null) { 
            if (l !== null) { this._left = l; return this; } 
            return this._left; 
        },
        top(t=null, min=null, max=null) { 
            if (t !== null) { this._top = t; return this; }
            return this._top; 
        },
        right(r=null, min=null, max=null) {
            if (r !== null) { this._left = r - this.width(); return this; }
            return this._left + this.width(); 
        },
        bottom(b=null, min=null, max=null) {
            if (b !== null) { this._top = b - this.height(); return this; }
            return this._top + this.height(); 
        },

        // extension
        extend_bottom(y=null, min=null, max=null) {
            if (y !== null) { this.height(y - this.top(), min, max);}
            return this.height();
        },
        
        extend_right(r=null, min=null, max=null) {
            if (r !== null) { this.width(r - this.left(), min, max);}
            return this.width();
        },

        // local
        mid_x() { return this.width() / 2; },
        mid_y() { return this.height() / 2; },

        // global
        center_x(x=null, min=null, max=null) {
            if (x !== null) { this._left = x - this.mid_x(); } 
            return this._left + this.mid_x(); 
        },
        center_y(y=null, min=null, max=null) { 
            if (y !== null) { this._top = y - this.mid_y(); }
            return this._top + this.mid_y(); 
        },


        // text
        padding(left=null, right=null, top=null, bottom=null) {
            if (left !== null) { this._padding_left = left; }
            if (right !== null) { this._padding_right = right; }
            if (top !== null) { this._padding_top = top; }
            if (bottom !== null) { this._padding_bottom = bottom; }
        },

        font(size=null, type=null, min=null, max=null) {
            if (size !== null) { this._font_size = size; }
            if (type !== null) { this._font_type = type; }
            _min(this, "_font_size", min);
            _max(this, "_font_size", max);
        },

        // visibility
        show() { html[index].style.display = "initial"; return this; },
        hide() { html[index].style.display = "none"; return this; }

    });

    html[index].onmouseover = () => { element.object[index].mouse_hover = 1; }
    html[index].onmouseleave = () => {  element.object[index].mouse_hover = 0; }
    html[index].onmousedown = () => { element.object[index].mouse_down = 1; }
    html[index].onmouseup = () => { element.object[index].mouse_up = 1; }

    return element.object[index];

}



// @
function _tag(context, id) {

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