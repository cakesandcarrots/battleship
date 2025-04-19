import { gamedisplay, DOMcreator, boardcontrol } from "./DOM.js";
// Renamed imports
import { ship, jack, john } from "./logic.js"; // Removed coords as it's not directly used here

// --- Game Setup ---

// 1. Create the basic HTML structure
gamedisplay();

// 2. Initialize the game boards
jack.initializeBoard();
john.initializeBoard();

// 3. Create the visual representation (DOM elements) for the boards
DOMcreator();
DOMcreator.createBoardGrid(jack.board, "jackclass"); // Use jackclass
DOMcreator.createBoardGrid(john.board, "johnclass"); // Use johnclass

// 4. Define and place ships for Jack
const jackship1 = ship(3, 0, "vertical");    // Renamed variables
const jackship2 = ship(4, 0, "horizontal");
const jackship3 = ship(3, 0, "vertical");
const jackship4 = ship(2, 0, "horizontal");
jack.placement(jackship1, 0, 1);
jack.placement(jackship2, 2, 4);
jack.placement(jackship3, 5, 1);
jack.placement(jackship4, 5, 4);
// TODO: Add error handling

// 5. Define and place ships for John
const johnship1 = ship(3, 0, "vertical");    // Renamed variables
const johnship2 = ship(3, 0, "horizontal");
const johnship3 = ship(2, 0, "vertical");
const johnship4 = ship(4, 0, "horizontal");
john.placement(johnship1, 1, 1);
john.placement(johnship2, 3, 3);
john.placement(johnship3, 5, 2);
john.placement(johnship4, 8, 4);
// TODO: Add error handling

// 6. Initial board control setup: Jack starts.
// Jack needs to click on John's board.
boardcontrol("jackcell", true); // Disable clicks on Jack's own board
boardcontrol("johncell", false); // Enable clicks on John's board (target for Jack)
document.querySelector(".turndisplay").textContent = "Jack's Turn"; // Set initial turn display