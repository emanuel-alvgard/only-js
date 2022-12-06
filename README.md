# only.js (ALPHA)

JavaScript only web framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage. To contribute one can read the code and submit issues. Help with
automated testing, documentation etc. will probably be needed in the near future.

**Features**
------
+ NO BUILD STEP!
+ Small runtime! 10KB (minify & gzip)
+ Only (2) dependencies: Node.js & ESBuild
+ Very low amount of garbage collection
+ Builtin animations
+ No HTML or CSS, only JS structure & styling
+ Simple progressive hydration
+ Convenient asset loading

**Examples**
------
```javascript

// COMPONENT
let ASSETS = 0

export default (runtime) => {
    
    // CREATING VIEW & ELEMENTS
    let home = runtime.view("home")
    let root = home.root
    let hero = home.element("hero", "img")
    let b1 = home.element("b1", "button")
    let b2 = home.element("b2", "button")
    let buttons = home.group("buttons")
    
    let buttons = [b1, b2]

    home.root.opacity(0)
    let loaded = home.root.anim("load", "opacity", 0, 1, 100, quad_curve(0.0, 0.0, 1.0, 3.0))

    // SHOW VIEW WHEN ASSETS LOADED
    if (home.SETUP) { root.hide() }
    
    if (ASSETS > 1) {
        root.show()
        loaded.start()
        ASSETS = 0
    }

    // LOADING ASSETS
    let hero_img = runtime.image("hero", "/public/assets/hero.svg", (result) => { ASSETS ++ })
    let font_std = runtime.font("standard", "/public/assets/font.woff2", (result) => { ASSETS ++ })

    // STYLING
    hero.
        image(hero_img).
        x(root.x())

    b1.
        w(100).
        h(25).
        r(root.width() - 100).
        t(100)

    b2.
        w(100).
        h(25).
        r(b1.left() - 10)
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

**Vision**
------
*To create web framework with as little performance bottlenecks as possible, where 
JavaScript, HTML and CSS are unified into a coherent and developer friendly interface.*
