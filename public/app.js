import { setup } from "./runtime/runtime.js";
import test from "./systems/test.js";

// this gets added to the runtime
const context = {}

const runtime = setup(context);

runtime.system("test", test);

runtime.run();

