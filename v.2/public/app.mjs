import * as runtime_module from "./runtime/runtime.mjs";
import * as test_system from "./systems/test_system.mjs";

const CONTEXT = {}

runtime_module.setup(CONTEXT);

CONTEXT.runtime.system("test", test_system.update);

main.element("test");

console.log(CONTEXT.runtime.view("main"));


//runtime_module.run(CONTEXT);

