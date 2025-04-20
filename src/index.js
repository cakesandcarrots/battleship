// Import necessary functions and objects
import { gamedisplay, setupPlacementUI, showPlacementScreen } from "./DOM.js"; // Removed DOMcreator import
import {  jack, john, SHIP_TYPES } from "./logic.js"; // Import SHIP_TYPES

// --- Game Setup ---

// 1. Create the basic HTML structure (includes placement area and main game area structure, but grids are empty)
gamedisplay();

// 2. Initialize the game boards (data only)
jack.initializeBoard();
john.initializeBoard();

// 3. Setup the Placement UI elements (inventory, buttons)
setupPlacementUI(SHIP_TYPES);

// 4. Start the placement phase for the first player (Jack)
showPlacementScreen("Jack", jack.board);

// --- Main game grids (jackclass, johnclass) will be populated by startGame() in DOM.js ---
// --- Attacking phase starts after both players confirm placement ---