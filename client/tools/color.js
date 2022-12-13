export let background = [220,220,220,1]
export let main = [255,255,255,1]
export let second = [250, 250, 250, 1]
export let shadow = [220,220,220,1]
export let transparent = [255,255,255,0]


// @DONE
function color_mode() {
    if (mode === "light") {
        background = [120,120,120,1]
        main = [50,50,50,1]
        second = [150, 150, 150, 1]
        shadow = [120,120,120,1]
        mode = "dark"
    }
    else if (mode === "dark") {
        background = [220,220,220,1]
        main = [255,255,255,1]
        second = [245, 245, 245, 1]
        shadow = [100,100,100,1]
        mode = "light"
    }
}