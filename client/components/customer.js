import * as color from "../tools/color.js"
import Chart from "../node_modules/chart.js/auto/auto.js"



const data = {
    labels: ["Ruben", "Emanuel", "Christian"],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
}

const config = {
    type: 'line',
    data: data,
}




// @DONE
function hover(element) {
    
    if (element.SETUP) {

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

        element.real().style.cursor = "pointer"
        element.real().onmouseover = () => { hover.run() }
        element.real().onmouseleave = () => { leave.run() }
    }
}


// @ TEST

let mock_data = {
    services: {
        pe: {
            title: "PE Accounting"
        },
        office_365: {
            title: "Office 365"
        }
    }
}


export default (app) => {

    app.image("back", "back.svg")

    const _window = app.view("window")
    const side_nav = _window.element("side_nav")
    const customer = _window.element("customer")
    const chart = customer.element("chart")
    const back = customer.element("back")
    const title = customer.element("title", "h1")

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
        .real().onclick = () => { app.location("dashboard") }

    hover(back)


    title
        .x(customer.x())
        .top(customer.top() + 50)
        .text_font(app.font("alexandria_400"))


    chart
        .width(500)
        .height(250)
        .top(title.bottom() + 100)
        .left(customer.left() + 50)
        .z(customer.z() + 1)


    if(app.SETUP) {
        let canvas = document.createElement("canvas")
        chart.real().append(canvas)
        new Chart(canvas, config)
    }

    let top = chart.bottom() + 50
    for (const service in mock_data.services) {
        
        customer.element(service + "_title", "h2")
            .text(mock_data.services[service].title)
            .text_font(app.font("alexandria_400"))
            .border_bottom("solid")
            .border_size(2)
            .left(customer.left() + 50)
            .top(top)
            .z(customer.z() + 1)
        
            top += 100
    } 
    



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


    //if (fade_out.DONE) { customer.hide() }
    
    if (app.location().SWITCH) { // @CHECK if this can be a tool "location" with a export function fade() ??
        
        if (app.location().path === "customer") {
            title.text(app.location().data.name)
            fade_in.run()
            customer.show()
        }
        else {
            if (app.SETUP) { customer.hide() }
            else { /*fade_out.run()*/ customer.hide() }
        }
        
    }

}