import { setup } from "./runtime/runtime.mjs";
import example from "./components/example.mjs";

const context = setup();

context.component("example", example);

context.run();