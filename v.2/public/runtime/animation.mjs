const l = function(string) { console.log(string) }



// @DONE
function round(n) {
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
            
            let delta = context.runtime.delta;
            
            // DELAY
            this._delay_timer += delta;
            if (this._delay_timer < this._delay) { return; }

            // PROGRESS
            

            // DONE
            if ((element[property]() >= this._progress) || this._run_timer >= this.time) {
                // reset this
                // trigger event if not null
            }

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

    //this[key] = _anim; // add this object into element._anim object.

    return _anim;
}


l("test")



// @HERE
// iterates over every elements anim_array and updates animations accordingly.
function update_anims(t) {

    for (let i = 0; i < t.aa.length; i++) {
        for (let j = 0; j < t.aa[i].length; j++) {

            if (t.aa[i][j] === 0) { continue; }
            
            // INVERT
            let dir = 1;
            let st = t.ast[i][j];
            let en = t.aen[i][j];
            if (en < st) { st = t.aen[i][j]; en = t.ast[i][j]; dir = -1; }
            let di = en - st;

            // DELAY
            t.ad[i][j] += delta;
            if (t.ad[i][j] < t.ade[i][j]) { continue; }
            
            // CALCULATE
            let pt = t.at[i][j] / t.ati[i][j];
            t.at[i][j] += delta;
            let cu = 0.0;
            if (t.acu[i][j].length === 2) { cu = lerp(t.acu[i][j][0], t.acu[i][j][1], pt); } 
            else if (t.acu[i][j].length === 3) { cu = quad(t.acu[i][j][0], t.acu[i][j][1], t.acu[i][j][2], pt); }
            else if (t.acu[i][j].length === 4) { cu = cube(t.acu[i][j][0], t.acu[i][j][1], t.acu[i][j][2], t.acu[i][j][3], pt); }
            let pr = ((di / t.ati[i][j]) * cu) * delta;
            t.ap[i][j] += pr;
            t.f32_c[i][j] += (pr * dir);

            // DONE
            if (t.ap[i][j] >= di || t.at[i][j] >= t.ati[i][j]) { 
                t.f32_c[i][j] = t.aen[i][j];
                t.aa[i][j] = 0;
                t.ar[i][j] = 0;
                t.ae[i][j] = t.aev[i][j];
                console.log(t.at[i][j]);
            }
        }
    }
}

// @DONE
function clear_anims(t) {
    for (let i = 0; i < t.ae.length; i++) {
        for (let j = 0; j < t.ae[i].length; j++) {
            t.ae[i][j] = 0;
        }
    }
}

// @DONE
function _round(n) {
    return n + (n>0?0.5:-0.5) << 0;
}


let e = document.createElement("div");
e.style.position = "absolute";
e.style.backgroundColor = "black";
e.style.width = "100px";
e.style.height = "100px";
document.body.append(e);

let e_left = 0.0;

const tot_time = 1000;
let distance = 50.0
let speed = (distance / tot_time) * 1000;

let delta = 0.0;
let prev_time = performance.now();

let timer = 0.0;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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
    e_left += (speed * _cube(0.0, 2.0, 2.0, 0.0, clamp(timer / tot_time, 0, 1))) * delta; 
    e.style.transform = "translate("+ e_left + "px,0px)";

    //l(e_left)

    //l(timer)

    window.requestAnimationFrame(test);
}

test();