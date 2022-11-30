import grid from "../layouts/grid.js"
import slider from "../layouts/slider.js"

let main = [220,220,220,1]
let accent = [255,255,255,1]
let shadow = [220,220,220,1]

//let debounce_frames = 10
//let counter = 0

let loaded = false
let img_loaded = false

export default (app) => {
    
    /* DEBOUNCING EXAMPLE
    if (counter !== debounce_frames) { counter ++; return }
    counter = 0
    */

    let oswald_bold = app.font("oswald_bold", "oswald_bold.woff2", () => { loaded = true })
    let roboto_300 = app.font("roboto_300", "roboto_300.woff2", () => { loaded = true })
    let img = app.image("img", "img.jpg", () => { img_loaded = true })

    if (loaded) { loaded = false }
    if (img_loaded) { img_loaded = false }

    const dashboard = app.view("dashboard")
    dashboard.root.color([250, 250, 250, 1])

    const side_nav = dashboard.element("side_nav")
    const card = dashboard.element("card")
    const mode_slider = dashboard.element("mode_slider")
    const search = dashboard.element("search", "input")

    const all = [side_nav, card, search]

    side_nav
        .t(dashboard.root.t())
        .l(dashboard.root.l())
        .extend_b(dashboard.root.b())
        .w(dashboard.root.w() / 3, 100, 300)
        .z(1)
        .color(accent)
        .border("solid")
        .border_size(1)
        .border_color(main)
        .shadow([0,1,5])
        .shadow_color(shadow)

    card
        .l(side_nav.r() + 50)
        .extend_r(dashboard.root.r() - 50)
        .t(dashboard.root.t() + 25)
        .extend_b(dashboard.root.b() - 50)
        .color(accent)
        .border("solid")
        .border_size(1)
        .border_color(main)
        .border_radius([3,3,3,3])
        .shadow([0,1,5])
        .shadow_color(shadow)
        .z(1)
        .image(img)
        //.image_fit("cover")


    mode_slider
        .l(card.l() + 10)
        .t(card.t() + 10)
        .w(50)
        .h(25)
        .z(2)

        slider(mode_slider)

    search
        .x(card.x())
        .t(card.t() + 50)
        .w(card.w() / 3)
        .h(card.w() / 25)
        .color([247,247,247,1])
        .border("solid")
        .border_size(1)
        .border_color(main)
        .border_radius([3,3,3,3])
        .z(2)
        //.padding([10,0,0,0])

    /*
    let boxes = [ 
        dashboard.element("box_1"),
        dashboard.element("box_2"),
        dashboard.element("box_3"),
        dashboard.element("box_4"),
        dashboard.element("box_5"),
        dashboard.element("box_6")
    ]

    boxes.forEach(box => {
        box.color([245, 245, 245, 1])
    })

    const customer_grid = dashboard.element("grid")
        .x(card.x())
        .y(card.y())
        .z(1)
        .color([0,0,0,1])
        .border("solid")
        .border_size(1)

    grid(
        customer_grid,
        [
            [boxes[0], boxes[1], boxes[2]], 
            [boxes[3], boxes[4], boxes[5]]
        ],
        [50,50],
        [75,75,75],
        1,
        1
    )
    */

    //input.real().style.boderStyle = ""

}