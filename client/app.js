import { setup } from "./_runtime/context.js"
import view from "./systems/view.js"

const context = setup()

context.system("view", view)

// add views here instead
// rename systems to views

context.start()