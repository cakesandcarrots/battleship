/**
 * Factory function to create a ship object.
 * @param {number} length - The length of the ship.
 * @param {number} hitcounter - Initial number of hits (usually 0).
 * @param {string} orientation - 'vertical' or 'horizontal'.
 * @returns {object} A ship object with properties and methods.
 */
export function ship(length, hitcounter, orientation) {
    return {
        length,
        hitcounter,
        orientation,
        /**
         * Increments the hit counter for the ship.
         */
        hits() {
            this.hitcounter += 1;
        },
        /**
         * Checks if the ship is sunk (hits equal length).
         * @returns {boolean} True if sunk, false otherwise.
         */
        isSunk() {
            // Simplified check
            return this.hitcounter >= this.length;
        },
        // Removed 'alive' property as isSunk provides the status
    };
}


/**
 * Factory function for creating a game board and managing game logic.
 * @returns {object} A gameboard object.
 */
export function gameboards() {
    let board = []; // 2D array representing the game board
    let ships = []; // Array to store ships placed on the board

    return {
        board,
        ships, // Renamed from placedships
        /**
         * Places a ship on the board at the specified coordinates.
         * @param {object} ship - The ship object to place.
         * @param {number} x - The starting row coordinate.
         * @param {number} y - The starting column coordinate.
         * @returns {string|boolean} A message indicating success or failure, or true if successful.
         */
        placement(ship, x, y) {
            // Ensure coordinates are numbers
            x = parseInt(x, 10);
            y = parseInt(y, 10);

            // Check bounds and overlaps
            if (ship.orientation === 'vertical') {
                if (x + ship.length > 10) { // Use > instead of >= for 0-indexed array
                    return 'Ship placement out of bounds (vertical)';
                }
                // Check for existing ships in the path
                for (let i = x; i < x + ship.length; i++) {
                    if (this.board[i]?.[y] != null) { // Added optional chaining for safety
                        return 'Cannot place ship: Overlaps another ship';
                    }
                }
                // Place the ship
                for (let i = x; i < x + ship.length; i++) {
                    this.board[i][y] = ship;
                }
            } else { // Horizontal placement
                if (y + ship.length > 10) { // Use > instead of >=
                    return 'Ship placement out of bounds (horizontal)';
                }
                // Check for existing ships in the path
                for (let i = y; i < y + ship.length; i++) {
                    if (this.board[x]?.[i] != null) { // Added optional chaining
                        return 'Cannot place ship: Overlaps another ship';
                    }
                }
                // Place the ship
                for (let i = y; i < y + ship.length; i++) {
                    this.board[x][i] = ship;
                }
            }
            // Add ship to the list and return success
            this.ships.push(ship);
            return true; // Indicate successful placement
        },

        /**
         * Processes an attack on the board at given coordinates.
         * @param {number} x - The row coordinate of the attack.
         * @param {number} y - The column coordinate of the attack.
         * @returns {string} "hit", "miss", or "already_attacked".
         */
        receiveAttack(x, y) {
            // Ensure coordinates are numbers
            x = parseInt(x, 10);
            y = parseInt(y, 10);

            const target = this.board[x]?.[y]; // Use optional chaining

            if (target === 'T' || target === 'X') {
                return "already_attacked"; // Cell already attacked
            }

            if (target != null) { // It's a ship part
                target.hits(); // Register the hit on the ship object
                this.board[x][y] = 'T'; // Mark the board cell as 'Hit' (T for Target?)
                // Check if the hit sunk the ship (optional, can be checked via allshipssunk)
                // if (target.isSunk()) {
                //     console.log("A ship was sunk!");
                // }
                return "hit";
            } else { // It's water
                this.board[x][y] = 'X'; // Mark the board cell as 'Miss'
                return "miss";
            }
        },

        /**
         * Checks if all ships placed on the board have been sunk.
         * @returns {boolean} True if all ships are sunk, false otherwise.
         */
        allshipssunk() {
            if (this.ships.length === 0) return false; // No ships placed yet
            // Use Array.every to check if all ships are sunk
            return this.ships.every(ship => ship.isSunk());
        },

        /**
         * Initializes or resets the game board to an empty 10x10 grid.
         * Clears the ships array.
         */
        initializeBoard() {
            this.board = []; // Reset board
            this.ships = []; // Reset ships list
            for (let i = 0; i < 10; i++) {
                const row = [];
                for (let j = 0; j < 10; j++) {
                    row.push(null); // Initialize cells as empty
                }
                this.board.push(row);
            }
            // No need to return board length, the method modifies the object's state
        }
    };
}


// Initializing game boards for Jack and John
export let jack = gameboards(); // Renamed from player1
export let john = gameboards(); // Renamed from player2

/**
 * Handles a player's attack turn.
 * @param {number} x - The row coordinate of the attack.
 * @param {number} y - The column coordinate of the attack.
 * @param {string} targetBoardClass - Identifier for the board that was clicked ("jackclass" or "johnclass").
 * @returns {string} The result of the attack ("hit", "miss", "already_attacked").
 */
export function coords(x, y, targetBoardClass) { // Renamed parameter
    let targetBoard;
    // Determine which board to attack based on the class of the board that was clicked.
    if (targetBoardClass === "johnclass") { // Clicked on John's board, so Jack is attacking John
        targetBoard = john;
    } else { // Clicked on Jack's board, so John is attacking Jack
        targetBoard = jack;
    }

    const result = targetBoard.receiveAttack(x, y);
    return result;
}