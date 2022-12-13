import { setup } from "./_runtime/context.js"
import side_nav from "./components/side_nav.js"
import dashboard from "./components/dashboard.js"
import customer from "./components/customer.js"

const context = setup()

context.component("side_nav", side_nav)
context.component("dashboard", dashboard)
context.component("customer", customer)

context.view("window", "dom")

context.start()