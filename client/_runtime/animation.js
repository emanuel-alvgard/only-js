const l = function(string) { console.log(string) }

// @DONE
const _clamp = (num, min, max) => Math.min(Math.max(num, min), max)

// @DONE
function _line(p0, p1, i) {
    return ((p1 - p0) * i) + p0
}

// @DONE
function _quad(p0, p1, p2, i) {
    let l0 = _line(p0, p1, i)
    let l1 = _line(p1, p2, i)
    return _line(l0, l1, i)
}

// @DONE
function _cube(p0, p1, p2, p3, i) {
    let q0 = _quad(p0, p1, p2, i)
    let q1 = _quad(p1, p2, p3, i)
    return _line(q0, q1, i)
}


// @DONE
export function anim(context, id, property, start, end, time, curve, delay) {

    let a = {

        RUN: false,
        PAUSE: false,
        STOP: false,
        DONE: false,

        _id: id,

        // STATIC
        _start: start,
        _end: end,
        _time: time,
        _delay: delay,
        _curve: curve,
        
        _direction: 1,
        _distance: 0.0,
        _speed: 0.0,
        _curve_func: null,

        // DTYNAMIC
        _delay_timer: 0.0,
        _run_timer: 0.0,
        _progress: 0.0,
        _status: "stop", // @EDIT so that each status is an EVENT that set and reset each frame

        run() {
            if (a._status === "run") { return }
            a._status = "run"
            return a
        },
        stop() {
            if (a._status === "stop") { return a }
            a._delay_timer = 0.0
            a._run_timer = 0.0
            a._progress = 0.0
            a._status = "stop"
            return a
        },
        pause() {
            if (a._status === "pause") { return a }
            a._status = "pause"
            return a
        },
        update() {

            if (a._status !== "run") { return }            
            let delta = context.delta

            // DELAY
            a._delay_timer += delta * 1000
            if (a._delay_timer < a._delay) { return }
        
            // DONE
            if (a._run_timer >= a._time || a._progress >= a._distance) {
                property(a._end)
                a._status = "done"
                return 
            }

            // PROGRESS
            a._progress += (a._speed * a._curve_func(a._curve, (a._run_timer / a._time))) * delta
            property(a._start + (a._progress * a._direction))
            a._run_timer += delta * 1000

            return

        },
        status() { return a._status },
        remove() {
            // use id to remove
        }
    }

    if (end < start) { 
        a._direction = -1
        a._distance = start - end
    }
    else {
        a._direction = 1 
        a._distance = end - start
    }

    a._speed = (a._distance / a._time) * 1000

    switch (curve.length) {
        case 2: a._curve_func = function(curve, i) { return _line(curve[0], curve[1], _clamp(i, 0, 1)) }; break
        case 3: a._curve_func = function(curve, i) { return _quad(curve[0], curve[1], curve[2], _clamp(i, 0, 1)) }; break
        case 4: a._curve_func = function(curve, i) { return _cube(curve[0], curve[1], curve[2], curve[3], _clamp(i, 0, 1)) }; break
    }

    return a
}