# only.js

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage.

**Examples**
------
```javascript

// COMPONENT
let ASSETS = 0

export default (runtime) => {
    
    // CREATING VIEW, ELEMENTS AND GROUPS
    let home = runtime.view("home").hide()
    let hero = home.element("hero", "img")
    let b1 = home.element("b1", "button")
    let b2 = home.element("b2", "button")
    let buttons = home.group("buttons")
    
    let buttons = [b1, b2]

    home.root.opacity(0)
    let loaded = home.root.anim("load", "opacity", 0, 1, 100, quad_curve(0.0, 0.0, 1.0, 3.0))

    if (ASSETS > 1) {
        home.show()
        loaded.start()
        ASSETS = 0
    }

    // LOADING ASSETS
    let hero_img = runtime.image("hero", "/public/assets/hero.svg", (result) => { ASSETS ++ })
    let font_std = runtime.font("standard", "/public/assets/font.woff2", (result) => { ASSETS ++ })

    // STYLING
    hero.
        image(hero_img).
        x(home.root.x())

    b1.
        w(100).
        h(25).
        r(home.root.w() - 100).
        t(100)

    b2.
        w(100).
        h(25).
        r(b1.l() - 10)
        t(100)

    // SIMILAR TO CSS CLASS
    buttons.forEach((button) => {
        button.
            text("click me").
            font(font_std).
            font_size(24).
            font_color(50,50,50)
    })

    if (b1.MOUSE_DOWN || b2.MOUSE_DOWN) { console.log("A button was clicked!") }
}

```
**Features**
------
+ Only (2) dependencies: Node.js and ESBuild
+ Very low amount of garbage collection

**Vision**
------
*To create a data oriented web framework 
with as little performance bottlenecks as possible, where 
JavaScript, HTML and CSS are unified into a coherent and readable interface.*
