        // @DONE
        function lerp(p0, p1, i) {
            return ((p1 - p0) * i) + p0; 
        }

        // @DONE
        function quad(p0, p1, p2, i) {
            let l0 = lerp(p0, p1, i);
            let l1 = lerp(p1, p2, i);
            return lerp(l0, l1, i);
        }

        // @DONE
        function cube(p0, p1, p2, p3, i) {
            let q0 = quad(p0, p1, p2, i);
            let q1 = quad(p1, p2, p3, i);
            return lerp(q0, q1, i);
        }

        // @
        function anim(t, s, p, start, end, time, delay, curve, event) {

            t.ast[p][s] = start;
            t.aen[p][s] = end;
            t.ati[p][s] = time;
            t.ade[p][s] = delay;
            t.acu[p][s] = curve;
            t.aev[p][s] = event;
            
            t.aa[p][s] = 1;
            t.ar[p][s] = 0;
            t.ae[p][s] = 0;
            t.ad[p][s] = 0.0;
            t.ap[p][s] = 0.0;
            t.f32_c[p][s] = start;
        }

        function _anim(t, s, p) {
            if (t.aa[p][s] === 1) { t.aa[p][s] = 0; }
            else { t.aa[p][s] = 1; }
        }

        // @HERE
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


        function round(n) {
            return n + (n>0?0.5:-0.5) << 0;
        }