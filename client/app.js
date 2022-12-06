import { setup } from "./_runtime/context.js"
import example from "./systems/dashboard.js"

const context = setup()

context.system("dashboard", example)

context.start()