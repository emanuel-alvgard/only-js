let slide_down_delay = 2000

export default (app) => {

    if (app.SETUP) {
        app.popup = {
            type: "none",
            message: "",
        }
    }

    const window = app.view("window")
    const bounds = window.bounds()
    const popup = window.element("pupup", "div")
    const message = popup.element("message", "div")

    popup
        .width(bounds.width())
        .height(75)
        .z(10)

    popup.anim("slide_up")
    popup.anim("slide_down")

    
    if (popup.anim("slide_up").RESET || popup.anim("slide_down").DONE) { popup.top(bounds.bottom()) }
    

    message
        .x(popup.x())
        .y(popup.y())
        .text_font(app.font("inter_700"))


    if (app.popup.type !== "none") {
        
        if (app.popup.type === "success") {
            message.text_color([67,192,65,1])
            popup.color([223,255,223,1])
            slide_down_delay = 2000
        }
        else if (app.popup.type === "fail") {
            message.text_color([192,65,65,1])
            popup.color([255,223,223,1])
            slide_down_delay = 2000
        }

        else if (app.popup.type === "wait") {
            message.text_color([192,140,65,1])
            popup.color([255,255,223,1])
            slide_down_delay = 20_000
        }

        else { return }

        message.text(app.popup.message)
        
        popup.anim(
            "slide_up", 
            popup.top, 
            bounds.bottom(), 
            bounds.bottom() - popup.height(), 100
        ).reset().run()

        popup.anim(
            "slide_down", 
            popup.top, 
            bounds.bottom() - popup.height(), 
            bounds.bottom(), 100, [1,1], 
            slide_down_delay
        ).reset().run()

        app.popup.type = "none"
    }
}