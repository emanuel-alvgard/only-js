import { setup } from "./_runtime/context.js"
import example from "./systems/example.js"

const context = setup()

context.system("example", example)

context.start()