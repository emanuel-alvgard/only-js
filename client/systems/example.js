import grid from "../layouts/grid.js"
import toggle from "../layouts/toggle.js"

let CONTEXT
let DASHBOARD

let mode = "light"
let background = [220,220,220,1]
let main = [255,255,255,1]
let second = [250, 250, 250, 1]
let shadow = [220,220,220,1]
let transparent = [255,255,255,0]

// shadow = { y:1, blur:5 }
// item_border = {b:"solid"}
// item_border_color = { b:second }


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

// @DONE
function hover(element) {
    
    if (DASHBOARD.SETUP) {

        let hover = element.anim(
            "hover", 
            element.opacity,
            1.0,
            0.5,
            100
        )
    
        let leave = element.anim(
            "leave", 
            element.opacity,
            0.5,
            1.0,
            100
        )

        element.real().onmouseover = () => { hover.run() }
        element.real().onmouseleave = () => { leave.run() }
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
    let _img_logo = context.image("img_logo", "logo_white.svg", () => { img_loaded = true })
    let _img_logout = context.image("img_logout", "logout_white.svg", () => { img_loaded = true })
    let _img_search = context.image("img_search", "search_black.svg", () => { img_loaded = true })

    if (loaded) { loaded = false }
    if (img_loaded) { img_loaded = false }

    const dashboard = context.view("dashboard")
    dashboard.bounds.color(second)
    const e = dashboard.element

    const side_nav = e("side_nav")
    const img_logo = e("img_logo")
    const img_logout = e("img_logout")
    const version = e("version")

    const card = e("card")
    const img_search = e("img_search")
    const mode_toggle = e("mode_toggle")
    const search = e("search", "input")
    const customer_grid = e("customer_grid")

    const all = [side_nav, card, search]



    if (context.SETUP) { 
        CONTEXT = context 
        DASHBOARD = dashboard
    }




    side_nav
        .t(dashboard.bounds.t())
        .l(dashboard.bounds.l())
        .extend_b(dashboard.bounds.b())
        .w(75)
        .z(1)
        .color([55,60,65,1])
        .shadow([0,3,7]) 
        .shadow_color([50,50,50,1])

    img_logo
        .t(25)
        .h(25)
        .w(img_logo.h() * 0.708)
        .x(side_nav.x())
        .image(_img_logo)
        .z(side_nav.z() + 1)
        .color(transparent)

    version
        .x(side_nav.x())
        .b(side_nav.b())
        .text("v.0.1")
        .text_color([240,240,240,1])
        .z(side_nav.z() + 1)

    //console.log(version.l())

    img_logout
        .w(25)
        .h(25)
        .b(version.t() - 15)
        .x(side_nav.x())
        .z(side_nav.z() + 1)
        .image(_img_logout)
        .color(transparent)

    hover(img_logout)
    




    card
        .l(side_nav.r() + 10)
        .extend_r(dashboard.bounds.r() - 10)
        .t(dashboard.bounds.t() + 10)
        .extend_b(dashboard.bounds.b() - 10)
        .color(main)
        //.border("solid") //
        .border_size(1) //
        .border_color(background)
        .border_radius([3,3,3,3])
        .shadow([0,3,7])
        .shadow_color(shadow) // shadow_color()
        .z(1)


    /*Ämode_toggle
        .l(card.l() + 10)
        .t(card.t() + 10)
        .w(50)
        .h(25)
        .z(2)

        toggle(mode_toggle, color_mode)*/

    search
        .x(card.x())
        .t(card.t() + 50)
        .w(card.w() / 3, 300, 1000)
        .h(50)
        .color(second)
        .border("solid")
        .border_size(1) // border_size({top:1}) check if object
        .border_color(background)
        .border_radius([3,3,3,3])
        .z(2)
        .padding([10,0,45,0])

    if (dashboard.SETUP) {
        search.real().placeholder = "Sök kund"
    }

    //hover(search)

    img_search
        .w(25)
        .h(25)
        .z(search.z() + 1)
        .image(_img_search)
        .color(transparent)
        .r(search.r() - 10)
        .y(search.y())


    customer_grid // @CHECK if this needs to get created in grid.js
        .w(card.w() - 100)
        .extend_b(card.b() - 50)
        .x(card.x())
        .z(card.z() + 1)
        .color(background)
        .border("solid") //
        .border_size(1)
        .border_color(background)
        .border_radius([3,3,3,3])
        .real().style.overflowY = "scroll"
        
    
    let down = customer_grid.anim("down", customer_grid.t, search.b() + 25, 500, 1000, [4, 0, 0, 0])
    let up = customer_grid.anim("up", customer_grid.t, 500, search.b() + 25, 3000, [4, 0, 0, 0])
        

    let items = []
    let columns = [500]
    let rows = []

    for (let i=0; i < 100; i++) {
        let item = e("item_" + i, "div", customer_grid)
            .color(second)

        hover(item)

        items.push([item])
        rows.push(40)
    }

      
    grid( // @EDIT so that columns are equally devided
    // grid() does not set width and height of input element
    // only overflow y is allowed
        customer_grid,
        items,
        1,
        1,
        rows,
        columns,
    )
    

    if (dashboard.SETUP) {

        customer_grid.t(search.b() + 25)
        side_nav.real().onclick = () => { down.pause() }
        img_logo.real().onclick = () => { down.run() }
    }

}