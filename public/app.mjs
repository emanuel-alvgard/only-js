import { setup } from "./runtime/runtime.mjs";
import test from "./components/test.mjs";

const context = {}

const runtime = setup(context);

runtime.component("test", test);

runtime.run();

