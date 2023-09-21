import { gamedisplay, DOMcreator, boardcontrol } from "./DOM";
import { ship, gameboards, user, computer, coords } from "./logic"
import "./styles.css";
let toggle = true
gamedisplay()
user.resetarrays()
computer.computerplayitems.resetarrays();
DOMcreator()
DOMcreator.initialize(user.board, "userclass")
DOMcreator.initialize(computer.computerplayitems.board, "computerclass")
const usership1 = ship(3, 0, "vertical")
const usership2 = ship(4, 0, "horizontal")
const usership3 = ship(3, 0, "vertical")
const usership4 = ship(2, 0, "horizontal")
user.placement(usership1, 0, 1)
user.placement(usership2, 2, 4)
user.placement(usership3, 5, 1)
user.placement(usership4, 5, 4)
const compship1 = ship(3, 0, "vertical")
const compship2 = ship(3, 0, "horizontal")
const compship3 = ship(2, 0, "vertical")
const compship4 = ship(4, 0, "horizontal")
computer.computerplayitems.placement(compship1, 1, 1)
computer.computerplayitems.placement(compship2, 3, 3)
computer.computerplayitems.placement(compship3, 5, 2)
computer.computerplayitems.placement(compship4, 8, 4)
console.log(computer.computerplayitems.board)
console.log(user.board)




console.log("hi")
const val = document.querySelector(".turndisplay")

if (toggle) {
    val.textContent = "Player's turn"
    boardcontrol("usercell", true)
    boardcontrol("computercell", false)
    toggle = false
}
else {
    val.textContent = "Computer's turn"
    boardcontrol("usercell", false)
    boardcontrol("computercell", true)
    toggle = true

}
