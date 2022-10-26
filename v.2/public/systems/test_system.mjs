let runtime;
let view;

export function update(context) {
    
    if (context.SETUP) {
        runtime = context.runtime;
        view = runtime.view("test", "dom");
    }


}