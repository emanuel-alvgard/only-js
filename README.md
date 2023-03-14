# only.js (ALPHA)

JavaScript only web framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage. To contribute one can read the code and submit issues. Help with
automated testing, documentation etc. will probably be needed in the near future.

**Features**
------
+ NO BUILD STEP
+ Small runtime (~5KB minified & gzipped)
+ Only (1) external dependency (ESBuild)
+ Low amount of garbage collection
+ Builtin animation system
+ Convenient asset loading
+ Hot reload / rebuild

**Examples**
------
```javascript

// GETS CALLED EVERY FRAME
export default (app) => {
    
    // CREATING VIEW & ELEMENTS
    const _window = app.view("window", "dom").visible(false)
    const title = _window.element("title", "h1")

    // STYLING
    title
        .text("Hello World!")
        .text_color([200,200,200,1])

    // LOADING ASSETS AND SETTING EVENTS
    if (app.SETUP) {
        app.image("logo", "logo.svg")
        app.image("social", "social.svg")

        title.real().onclick = () => {
            console.log("Title got clicked!")
        }

    }

    // SHOW VIEW WHEN ASSETS LOADED
    if (app.image("logo").DONE && app.image("social").DONE) {
        _window.visible(true)
    }
}

```

**Vision**
------
*To create web framework with as little performance bottlenecks as possible, where 
JavaScript, HTML and CSS are unified into a coherent and developer friendly interface.*
