let CONTEXT;
let start;
let button;

export function setup(context) {

    CONTEXT = context;
    start = context.runtime.view("start");
    button = start.element("button", "button");
}

export function update() {

    if (button.mouse_down) { console.log("click"); }

    button.
        width(100).
        height(100).
        right(start.width - 100).
        top(100)

}

