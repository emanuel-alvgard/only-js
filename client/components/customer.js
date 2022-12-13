import * as color from "../tools/color.js"


// @DONE
function hover(element) {
    
    if (element.SETUP) {

        console.log("setup")

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


export default (app) => {

    app.image("back", "back.svg")

    const _window = app.view("window")
    const side_nav = _window.element("side_nav")
    const customer = _window.element("customer")
    const back = _window.element("back", "div", customer)
    const title = _window.element("title", "h1", customer) // customer.element("title")

    customer
        .top(_window.bounds().top() + 10)
        .left(side_nav.right() + 10)
        .extend_right(_window.bounds().right() - 10)
        .extend_bottom(_window.bounds().bottom() - 10)
        .color(color.main)
        .border_size(1)
        .border_color(color.background)
        .border_radius([3,3,3,3])
        .shadow([0,3,7])
        .shadow_color(color.shadow)
        .z(_window.bounds().z() + 1)
        

    back
        .image(app.image("back"))
        .width(25)
        .height(25)
        .top(customer.top() + 25)
        .left(customer.left() + 25)
        .z(customer.z() + 1)
        .real().onclick = () => { app.location.switch("dashboard") }

    hover(back)


    title
        .x(customer.x())
        .top(customer.top() + 50)
        .text("CUSTOMER")
        .text_font(app.font("alexandria_400"))


    let fade_in = customer.anim(
        "fade_in", 
        customer.opacity, 
        0.0, 
        1.0, 
        200, 
        [0,0,0,4]
    )

    let fade_out = customer.anim(
        "fade_out", 
        customer.opacity, 
        1.0, 
        0.0, 
        100, 
        [0,0,0,4]
    )


    //if (fade_out.status() === "done") { customer.hide() }
    
    if (app.location.SWITCH) { // @CHECK if this can be a tool "location" with a export function fade() ??
        
        if (app.location.path === "customer") {
            console.log("customer")
            fade_in.run()
            customer.show()
        }
        else {
            if (app.SETUP) { customer.hide() }
            else { /*fade_out.run()*/ customer.hide() }
        }
        
    }

}