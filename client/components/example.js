import grid from "../layouts/grid.js"

let main = [100,99,110,1]
let accent = [255,255,255,1]

export default (app) => {

    const dashboard = app.view("dashboard")
    const side_nav = dashboard.element("side_nav")
    const card = dashboard.element("card")

    const root = dashboard.root
    root.color([250, 250, 250, 1])

    side_nav
        .t(root.t())
        .l(root.l())
        .extend_b(root.b())
        .w(200)
        .z(1)
        .color(main)
        .shadow(0,5,25)
        .shadow_color([150,150,150,1])

    card
        .x(root.x())
        .y(root.y())
        .w(300)
        .h(400)
        .color(accent)
        .border_radius(15,15,15,15)
        .shadow(0,5,25)
        .shadow_color([220,220,220,1])

    let boxes = [ 
        
        [
            dashboard.element("box_1"),
            dashboard.element("box_2"),
            dashboard.element("box_3")
        ],
        [
            dashboard.element("box_4"),
            dashboard.element("box_5"),
            dashboard.element("box_6")
        ]
    ]

    const grid_container = dashboard.element("grid")

    grid(
        grid_container,
        boxes,
        [],
        [],
        10,
        10
    )
    

    //input.real().style.boderStyle = ""

}