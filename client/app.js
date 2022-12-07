import { setup } from "./_runtime/context.js"
import dashboard from "./systems/dashboard.js"

const context = setup()

context.system("dashboard", dashboard)

context.start()