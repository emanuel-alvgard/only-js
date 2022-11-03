# only.js 
Data Oriented Web Framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage.

**Examples**
------
```javascript

let assets_loaded = 0

export default (runtime) => {
    
    // CREATING VIEW AND ELEMENTS
    let home = runtime.view("home")
    let hero = home.element("hero", "img")
    let b1 = home.element("b1", "button")
    let b2 = home.element("b2", "button")

    if (runtime.SETUP) {
        home.hide()
        hero.hide()
        b1.hide()
        b2.hide()
    }

    // ONLY SHOW WHEN LOADED
    if (assets_loaded > 1) {
        home.show()
        hero.show()
        b1.show()
        b2.show()
    }

    // LOADING ASSETS
    runtime.image("hero", "/public/assets/hero.svg", (result) => { assets_loaded ++ })
    runtime.font("standard", "/public/assets/font.woff2", (result) => { assets_loaded ++ })

    // STYLING
    hero.
        image(runtime.image("hero")).
        center_x(home.width / 2)

    b1.
        w(100).
        h(25).
        r(home.width - 100).
        t(100).
        text("click me").
        font(24, runtime.font("standard"))

    b2.
        w(100).
        h(25).
        r(b1.l() - 10)
        t(100).
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
