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
function _state(anim, state) {
    const states = ["RUN", "PAUSE", "RESET", "DONE"]
    for (let i=0; i < states.length; i++) {
        if (states[i] === state) { anim[states[i]] = true }
        else { anim[states[i]] = false }
    }
}


// @DONE
export function anim(element, id, property, start, end, time, curve, delay) {

    let a
    let reload = false

    if (id in element._anims) { 
        
        a = element._anims[id]
        
        if (property !== null) { 
            a._property = property 
            reload = true
        }
        if (start !== null) {
            a._start = start 
            reload = true
        }
        if (end !== null) { 
            a._end = end
            reload = true
        }
        if (time !== null) { 
            a._time = time
            reload = true
        }
        if (curve !== null) { 
            if (curve.length === a._curve.length) {
                for (let i=0; i < curve.length; i++) { a._curve[i] = curve[i] }
            }
            else { a._curve = curve }
            reload = true 
        }
        if (delay !== null) { 
            a._delay = delay 
            reload = true
        }
    }

    else {

        reload = true

        a = {

            RUN: false,
            PAUSE: false,
            RESET: true,
            DONE: false,

            _id: id,

            // STATIC
            _property: property,
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

            run() {
                if (a.RUN) { return }
                _state(a, "RUN")
                return a
            },
            reset() {
                if (a.RESET) { return a }
                a._delay_timer = 0.0
                a._run_timer = 0.0
                a._progress = 0.0
                _state(a, "RESET")
                return a
            },
            pause() {
                if (a.PAUSE) { return a }
                _state(a, "PAUSE")
                return a
            },
            update() {

                if (!a.RUN) { return }            
                let delta = element.context().delta

                // DELAY
                a._delay_timer += delta * 1000
                if (a._delay_timer < a._delay) { return }
            
                // DONE
                if (a._run_timer >= a._time || a._progress >= a._distance) {
                    a._property(a._end)
                    _state(a, "DONE")
                    return 
                }

                // PROGRESS
                a._progress += (a._speed * a._curve_func(a._curve, (a._run_timer / a._time))) * delta
                a._property(a._start + (a._progress * a._direction))
                a._run_timer += delta * 1000

                return

            },
            remove() {
                // use id to remove
            }
        }

        if (property === null) { a._property = () => {} }
        if (start === null) { a._start = 0 }
        if (end === null) { a._end = 0 }
        if (time === null) { a._time = 0 }
        if (curve === null) { a._curve = [1.0,1.0] }
        if (delay === null) { a._delay = 0 }

    }


    if (reload) {
        if (a._end < a._start) { 
            a._direction = -1
            a._distance = a._start - a._end
        }
        else {
            a._direction = 1 
            a._distance = a._end - a._start
        }

        a._speed = (a._distance / a._time) * 1000

        const _curve = a._curve
        switch (_curve.length) {
            case 2: a._curve_func = (_curve, i) => { return _line(_curve[0], _curve[1], _clamp(i, 0, 1)) }; break
            case 3: a._curve_func = (_curve, i) => { return _quad(_curve[0], _curve[1], _curve[2], _clamp(i, 0, 1)) }; break
            case 4: a._curve_func = (_curve, i) => { return _cube(_curve[0], _curve[1], _curve[2], _curve[3], _clamp(i, 0, 1)) }; break
        }
    }

    return a
}
