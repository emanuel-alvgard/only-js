import { setup } from "./runtime/runtime.mjs";
import test from "./systems/test.mjs";

const context = {}

const runtime = setup(context);

runtime.system("test", test);

runtime.run();

