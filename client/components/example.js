import grid from "../layouts/grid.js"

let main = [100,99,110,1]
let accent = [255,255,255,1]

//let debounce_frames = 10
//let counter = 0

export default (context) => {
    
    /* DEBOUNCING EXAMPLE
    if (counter !== debounce_frames) { counter ++; return }
    counter = 0
    */

    const dashboard = context.view("dashboard")
    const root = dashboard.root
    root.color([250, 250, 250, 1])

    const side_nav = dashboard.element("side_nav")
        .t(root.t())
        .l(root.l())
        .extend_b(root.b())
        .w(200)
        .z(1)
        .color(main)
        .shadow(0,5,25)
        .shadow_color([150,150,150,1])

    const card = dashboard.element("card")
        .x(root.x())
        .y(root.y())
        .w(300)
        .h(400)
        .color(accent)
        .border_radius(15,15,15,15)
        .shadow(0,5,25)
        .shadow_color([220,220,220,1])

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

    //input.real().style.boderStyle = ""

}