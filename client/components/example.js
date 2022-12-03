import grid from "../layouts/grid.js"
import slider from "../layouts/slider.js"

let mode = "light"
let background = [220,220,220,1]
let main = [255,255,255,1]
let second = [245, 245, 245, 1]
let shadow = [220,220,220,1]
let transparent = [255,255,255,0]

// shadow = { y:1, blur:5 }
// item_border = {b:"solid"}
// item_border_color = { b:second }

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
        shadow = [220,220,220,1]
        mode = "light"
    }
}

//let debounce_frames = 10
//let counter = 0

let loaded = false
let img_loaded = false

export default (context) => {
    
    /* DEBOUNCING EXAMPLE
    if (counter !== debounce_frames) { counter ++; return }
    counter = 0
    */

    let _oswald_bold = context.font("oswald_bold", "oswald_bold.woff2", () => { loaded = true })
    let _roboto_300 = context.font("roboto_300", "roboto_300.woff2", () => { loaded = true })
    let _img_logo = context.image("img_logo", "logo.png", () => { img_loaded = true })
    let _img_logout = context.image("img_logout", "logout.png", () => { img_loaded = true })
    let _img_search = context.image("img_search", "search.png", () => { img_loaded = true })

    if (loaded) { loaded = false }
    if (img_loaded) { img_loaded = false }

    const dashboard = context.view("dashboard")
    dashboard.bounds.color(second)
    const e = dashboard.element

    const side_nav = e("side_nav")
    const img_logo = e("img_logo")
    const img_logout = e("img_logout")

    const card = e("card")
    const img_search = e("img_search")
    const mode_slider = e("mode_slider")
    const search = e("search", "input")
    const customer_grid = e("customer_grid")

    const all = [side_nav, card, search]

    side_nav
        .t(dashboard.bounds.t())
        .l(dashboard.bounds.l())
        .extend_b(dashboard.root.b())
        .w(dashboard.bounds.w() / 3, 100, 300)
        .z(1)
        .color(main)
        .border("solid")
        .border_size(1)
        .border_color(background)
        .shadow([0,1,5]) 
        /* .shadow({y: 1, blur: 5})
        */
        .shadow_color(shadow)

    img_logo
        .t(side_nav.t() - 50)
        .l(side_nav.l() + 35)
        .extend_r(side_nav.r() - 45)
        .h(img_logo.w())
        .image(_img_logo)
        .z(side_nav.z() + 1)

    img_logout
        .w(25)
        .h(25)
        .b(side_nav.b() - 25)
        .l(side_nav.l() + 25)
        .z(side_nav.z() + 1)
        .image(_img_logout)
        .color(transparent)

    card
        .l(side_nav.r() + 10)
        .extend_r(dashboard.bounds.r() - 10)
        .t(dashboard.bounds.t() + 10)
        .extend_b(dashboard.bounds.b() - 10)
        .color(main)
        .border("solid") //
        .border_size(1) //
        .border_color(background)
        .border_radius([3,3,3,3])
        .shadow([0,1,5])
        .shadow_color(shadow) // shadow_color()
        .z(1)


    mode_slider
        .l(card.l() + 10)
        .t(card.t() + 10)
        .w(50)
        .h(25)
        .z(2)

        slider(mode_slider, color_mode)

    search
        .x(card.x())
        .t(card.t() + 50)
        .w(card.w() / 3, 300, 1000)
        .h(card.w() / 25, 50, 100)
        .color([247,247,247,1])
        .border("solid")
        .border_size(1) // border_size({top:1}) check if object
        .border_color(background)
        .border_radius([3,3,3,3])
        .z(2)
        .padding([10,0,45,0])

    img_search
        .w(25)
        .h(25)
        .z(search.z() + 1)
        .image(_img_search)
        .color(transparent)
        .r(search.r() - 10)
        .y(search.y())

    
    let items = []
    let columns = [500]
    let rows = []

    for (let i=0; i < 10; i++) {
        let item = e("item_" + i)
            .color(second)

        items.push([item])
        rows.push(40)
    }


    customer_grid
        .x(card.x())
        .t(search.b() + 25)
        .z(card.z() + 1)
        .color(main)
        //.border("solid") //
        //.border_size(1)
        //.border_color(background)
        //.border_radius([5, 5, 5, 5])

      
    grid( // @EDIT so that columns are equally devided
    // grid() does not set width and height of input element
    // only overflow y is allowed
        customer_grid,
        items,
        2,
        1,
        rows,
        columns,
    )
    
}