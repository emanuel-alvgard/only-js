import { setup } from "./_runtime/context.js"
import example from "./components/example.js"

const context = setup()

context.component("example", example)

context.start()