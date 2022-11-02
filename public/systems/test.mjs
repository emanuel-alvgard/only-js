export default (context) => {

    start = context.runtime.view("start");
    b = start.element("b", "button");

    b.
        w(100).
        h(100).
        r(start.width - 100).
        t(100).
        color(200,200,200). 
        border("solid").
        border_color(200,0,0).
        text("click me").
        text_color(100,100,100).
        font(24, "oswald_bold").
        padding(10,0,0,0);

    if (b.MOUSE_DOWN) { console.log("click"); }
    
}

