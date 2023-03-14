# only.js (ALPHA)

JavaScript only web framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage. To contribute one can read the code and submit issues. Help with
automated testing, documentation etc. will probably be needed in the near future.

**Features**
------
+ Small runtime (~5KB minified & gzipped)
+ Only (1) external dependency (ESBuild)
+ Low amount of garbage collection
+ Builtin animation system
+ Convenient asset loading
+ Hot reload / rebuild

**Counter example**
------
```javascript

let counter = 0

// GETS CALLED EVERY FRAME
export default (app) => {
    
    // CREATING VIEW & ELEMENTS
    const _window = app.view("window", "dom")
    const title = _window.element("title", "h1")
    const increment = _window.element("increment", "button")

    // LOADING ASSETS
    if (app.SETUP) {
        _window.visible(false) 
        app.font("roboto", "roboto.woff2") 
    }

    // STYLING
    title
        .text("The count is: " + count)
        .text_color([200,200,200,1])
        .text_font(app.font("roboto"))

    increment
        .text("Increment")
        .text_font(app.font("roboto"))

    // EVENTS
    if (increment.CLICK) { counter ++ }

    // SHOW VIEW WHEN ASSETS LOADED
    if (app.font("roboto").DONE) { 
        _window.visible(true) 
    }
}

```
**Routing example**
------
```javascript

// GETS CALLED EVERY FRAME
export default (app) => {
    
    // CREATING VIEW & ELEMENTS
    const _window = app.view("window", "dom")
    const location = _window.element("location", "button")

    // CHANGE LOCATION
    if (location.CLICK) {
        app.location("/other-component")
    }

    // ROUTING
    app.router("/this-component",
        () => { // INCOMING
            _window.visible(false)
        },
        () => { // OUTGOING
            _window.visible(true)
        }
    ) 
}

```

**Vision**
------
*To create web framework with as little performance bottlenecks as possible, where 
JavaScript, HTML and CSS are unified into a coherent and developer friendly interface.*
