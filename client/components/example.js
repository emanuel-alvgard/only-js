import grid from "../layouts/grid.js"

let main = [200,200,200,1]
let accent = [255,255,255,1]
let shadow = [220,220,220,1]

//let debounce_frames = 10
//let counter = 0

let loaded = false

export default (app) => {
    
    /* DEBOUNCING EXAMPLE
    if (counter !== debounce_frames) { counter ++; return }
    counter = 0
    */

    let oswald_bold = app.font("oswald_bold", "oswald_bold.woff2", () => { loaded = true })
    let roboto_300 = app.font("roboto_300", "roboto_300.woff2", () => { loaded = true })

    if (loaded) { console.log(oswald_bold); loaded = false }

    const dashboard = app.view("dashboard")
    const root = dashboard.root
    root.color([250, 250, 250, 1])

    const side_nav = dashboard.element("side_nav")
        .t(root.t())
        .l(root.l())
        .extend_b(root.b())
        .w(root.w() / 3, 100, 300)
        .z(1)
        .color(accent)
        .shadow(0,5,25)
        .shadow_color(shadow)

    const card = dashboard.element("card")
        .l(side_nav.r() + 50)
        .extend_r(root.r() - 50)
        .t(root.t() + 25)
        .extend_b(root.b() - 50)
        .color(accent)
        .border_radius(15,15,15,15)
        .shadow(0,5,25)
        .shadow_color(shadow)
        .z(1)
        .text("hello")
        .font(roboto_300) //text_font()
        //text_color()
        //text_spacing_x()
        //text_spacing_y()
        //text_size()

    const search = dashboard.element("search", "input")
        .x(card.x())
        .t(card.t() + 50)
        .w(card.w() / 3)
        .h(card.w() / 25)
        .color(accent)
        .border("solid")
        .border_size(2)
        .border_color(main)
        .border_radius(25, 25, 25, 25)
        .z(2)

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

    const _grid = dashboard.element("grid")
        .x(card.x())
        .y(card.y())
        .z(1)
        .color([0,0,0,1])
        .border("solid")
        .border_size(1)

    grid(
        _grid,
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