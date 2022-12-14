import { setup } from "./_runtime/context.js"
import side_nav from "./components/side_nav.js"
import dashboard from "./components/dashboard.js"
import customer from "./components/customer.js"

const context = setup()

context.component("side_nav", side_nav)
context.component("dashboard", dashboard)
context.component("customer", customer)

context.font("alexandria_400", "alexandria_400.woff2")

context.view("window", "dom")
context.location("dashboard")

context.start()