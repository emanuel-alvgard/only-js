# only.js 
Data Oriented Web Framework.

**Disclaimers**
------
+ This project is currently being developed by a single person and will continue to be so until
it has passed it's most experimental stage.

**Examples**
------
```javascript

export default (context) => {
    
    let home = context.runtime.view("home")
    let b1 = home.element("b1", "button")
    let b2 = home.element("b2", "button")

    b1.
        w(100).
        h(25).
        r(home.width - 100).
        t(100).
        text("click me")

    b2.
        w(100).
        h(25).
        r(b1.l() - 10)
        t(100).
        text("click me")

    if (b1.MOUSE_DOWN || b2.MOUSE_DOWN) {
        console.log("A button was clicked!")
    }
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
