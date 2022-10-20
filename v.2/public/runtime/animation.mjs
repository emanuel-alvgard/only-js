const l = function(string) { console.log(string) }

// @DONE
const _clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// @DONE
function _round(n) {
    return n + (n>0?0.5:-0.5) << 0;
}

// @DONE
function _line(p0, p1, i) {
    return ((p1 - p0) * i) + p0; 
}

// @DONE
function _quad(p0, p1, p2, i) {
    let l0 = _line(p0, p1, i);
    let l1 = _line(p1, p2, i);
    return _line(l0, l1, i);
}

// @DONE
function _cube(p0, p1, p2, p3, i) {
    let q0 = _quad(p0, p1, p2, i);
    let q1 = _quad(p1, p2, p3, i);
    return _line(q0, q1, i);
}

// @
// create a pool of anim objects. This function allocates an anim object and pushes it into the elements anim array.
// example: 
// const CURVE = cube_curve(1.0, 1.0, 1.0);
// button.anim("1", "left", 0, 100, 100, 0, CURVE, "test");
// button.anim("1").start();
// button.anim("1").stop();
// button.anim("1").pause();
// button.anim("1").update();
// button.anim("1").remove();

function anim(element, key, property, start, end, time, delay=null, curve=null, event=null) {

    if (key in this._anim) {
        return _anim[key];
    }

    let _anim = {
        
        _start: start,
        _end: end,
        _time: time,
        _delay: delay,
        _curve: curve,
        _event: event,
        
        _direction: 0,
        _distance: 0.0,
        _speed: 0.0,
        _curve_func: null,

        _delay_timer: 0.0,
        _run_timer: 0.0,
        _progress: 0.0,

        _pause: false,
        _stop: true,

        start() {
            this._pause = false;
            this._stop = false;
            return this;
        },
        stop() { 
            this._pause = false;
            this._stop = true;
            return this;
        },
        pause() {
            this._pause = true;
            return this;
        },
        update() {

            // @ADD start, stop, pause, and reset anim data on stop or done
            
            let delta = context.runtime.delta;
            
            // DELAY
            this._delay_timer += delta * 1000;
            if (this._delay_timer >= this._delay) { return; }
        
            // DONE
            if (this.run_timer >= this._time) { 
                element[property](this._end);
                if (this._event !== null) {
                    element[this._event] = true;
                }
                return; 
            }

            // PROGRESS
            this._progress += (this._speed * this._cruve_func(this._curve, (this.run_timer / this._time))) * delta; 
        },
        remove() {}
    }

    if (end < start) { 
        _anim._direction = -1; 
        _anim._distance = start - end;
    }
    else {
        _anim._direction = 1; 
        _anim._distance = end - start;
    }

    _anim._speed = (_anim._distance / _anim._time) * 1000;

    switch (curve.length) {
        case 2: _anim._curve_func = function(curve, i) { _line(curve[0], curve[1], _clamp(i, 0, 1)); }; break;
        case 3: _anim._curve_func = function(curve, i) { _quad(curve[0], curve[1], curve[2], _clamp(i, 0, 1)); }; break;
        case 4: _anim._curve_func = function(curve, i) { _cube(curve[0], curve[1], curve[2], curve[3], _clamp(i, 0, 1)); }; break;
    }

    element._anim[key] = _anim;

    return _anim;
}



















// @TEST
let e = document.createElement("div");
e.style.position = "absolute";
e.style.backgroundColor = "black";
e.style.width = "100px";
e.style.height = "100px";
document.body.append(e);

let e_left = 0.0;

const tot_time = 1000;
let distance = 100.0
let speed = (distance / tot_time) * 1000;

let delta = 0.0;
let prev_time = performance.now();

let timer = 0.0;


function test() {

    //if (counter === 10) { return; }

    let time = performance.now();
    delta = (time - prev_time) / 1000;
    timer += (time - prev_time)
    prev_time = time;

    if (timer >= tot_time) { l(e_left); 
        e_left = distance;
        e.style.transform = "translate("+ e_left + "px,0px)";
        return; 
    }
    e_left += (speed * _cube(0.0, 0.0, 3.5, 0.5, _clamp(timer / tot_time, 0, 1))) * delta; 
    e.style.transform = "translate("+ e_left + "px,0px)";

    window.requestAnimationFrame(test);
}

test();