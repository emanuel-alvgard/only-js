import { setup } from "./_runtime/context.js"

const context = setup()

context.view("window", "dom")
context.location("window")

context.start()