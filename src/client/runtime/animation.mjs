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

function anim(runtime, element, id, property, start, end, time, delay, curve, event) {

    let a = {

        _id: id,
        
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
            a._pause = false;
            a._stop = false;
            return a;
        },
        stop() { 
            a._pause = false;
            a._stop = true;
            return a;
        },
        pause() {
            a._pause = true;
            return a;
        },
        update() {

            // @ADD start, stop, pause, and reset anim data on stop or done
            
            let delta = runtime.delta;
            
            // DELAY
            a._delay_timer += delta * 1000;
            if (a._delay_timer >= a._delay) { return; }
        
            // DONE
            if (a.run_timer >= a._time) { 
                element[property](a._end);
                if (a._event !== null) {
                    element[a._event] = true;
                }
                return; 
            }

            // PROGRESS
            a._progress += (a._speed * a._curve_func(a._curve, (a.run_timer / a._time))) * delta; 
        },
        remove() {
            // use id to remove
        }
    }

    if (end < start) { 
        a._direction = -1; 
        a._distance = start - end;
    }
    else {
        a._direction = 1; 
        a._distance = end - start;
    }

    a._speed = (a._distance / a._time) * 1000;

    switch (curve.length) {
        case 2: a._curve_func = function(curve, i) { _line(curve[0], curve[1], _clamp(i, 0, 1)); }; break;
        case 3: a._curve_func = function(curve, i) { _quad(curve[0], curve[1], curve[2], _clamp(i, 0, 1)); }; break;
        case 4: a._curve_func = function(curve, i) { _cube(curve[0], curve[1], curve[2], curve[3], _clamp(i, 0, 1)); }; break;
    }

    return a;
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