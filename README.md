# only.js 
Data Oriented Web Framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage.

**Examples**
------
```javascript

let ASSETS = 0

export default (runtime) => {
    
    // CREATING VIEW, ELEMENTS AND GROUPS
    let home = runtime.view("home").hide()
    let hero = home.element("hero", "img")
    let b1 = home.element("b1", "button")
    let b2 = home.element("b2", "button")
    let buttons = home.group("buttons")
    
    buttons.
        add(b1).
        add(b2)

    if (ASSETS > 1) {
        home.show()
        ASSETS = 0
    }

    // LOADING ASSETS
    runtime.image("hero", "/public/assets/hero.svg", (result) => { ASSETS ++ })
    runtime.font("standard", "/public/assets/font.woff2", (result) => { ASSETS ++ })

    // STYLING
    hero.
        image(runtime.image("hero")).
        center_x(home.root.w() / 2)

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
    buttons.
        text("click me").
        font(24, runtime.font("standard"))
    

    if (b1.MOUSE_DOWN || b2.MOUSE_DOWN) { console.log("A button was clicked!") }
}

```
**Features**
------
+ Lightweight runtime (10KB, minify + gzip)
+ Superb runtime performance
+ Pure JavaScript (no template syntax)
+ Zero dependencies
+ Very low amount of garbage collection
+ Virtual DOM with a flat hierarchy

**Vision**
------
*To create a data oriented web framework 
with as little performance bottlenecks as possible, where 
JavaScript, HTML and CSS are unified into a coherent and readable interface.*
