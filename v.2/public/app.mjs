import "./utils/loading.mjs";
import { setup, run } from "./runtime/runtime.mjs";
import * as test from "./systems/test.mjs";

const CONTEXT = {}

setup(CONTEXT);
const system = CONTEXT.runtime.system;

system("test", test);

run(CONTEXT);

