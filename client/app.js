import { setup } from "./_runtime/runtime.js";
import example from "./components/example.js";

const context = setup();

context.component("example", example);

context.run();