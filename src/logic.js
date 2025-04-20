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

    // --- Power-up State ---
    let hasClusterMissile = true;
    let hasRandomSalvo = true;

    // Helper to check if coords are valid and unattacked
    const isCoordValidAndUnattacked = (x, y, currentBoard) => {
        return x >= 0 && x < 10 && y >= 0 && y < 10 &&
               currentBoard[x]?.[y] !== 'T' && currentBoard[x]?.[y] !== 'X';// HIT is X and mISS is T
    };

    return {
        board,
        ships, 
        // --- Power-up Getters (for UI checks) ---
        get hasCluster() { return hasClusterMissile; },
        get hasSalvo() { return hasRandomSalvo; },

        /**
         * Places a ship on the board at the specified coordinates.
         * @param {object} ship - The ship object to place.
         * @param {number} x - The starting row coordinate.
         * @param {number} y - The starting column coordinate. * Shows the placement screen for the specified player.
 * @param {string} playerName - "Jack" or "John".
 * @param {Array<Array<any>>} playerBoardData - The player's board data.
         * @returns {string|boolean} A message indicating success or failure, or true if successful.
         */
        placement(ship, x, y) {
            // Ensure coordinates are numbers
            x = parseInt(x, 10);
            y = parseInt(y, 10);

            // Check bounds and overlaps
            if (ship.orientation === 'vertical') {
                if (x + ship.length > 10) { 
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
                this.board[x][y] = 'T'; // Mark the board cell as 'Hit' (T for Target)
                return "hit";
            } else { // It's water
                this.board[x][y] = 'X'; // Mark the board cell as 'Miss'
                return "miss";
            }
        },

        // --- Power-up Activation Methods ---

        /**
         * Activates the Cluster Missile power-up.
         * @param {number} x - Center row coordinate.
         * @param {number} y - Center column coordinate.
         * @returns {Array|null} An array of attack results [{x, y, result}, ...] or null if unavailable.
         */
        activateClusterMissile(x, y) {
            if (!hasClusterMissile) return null; // Power-up already used

            hasClusterMissile = false; // Mark as used
            const results = [];
            const coordsToAttack = [
                { x: x, y: y },     // Center
                { x: x - 1, y: y }, // Top
                { x: x + 1, y: y }, // Bottom
                { x: x, y: y - 1 }, // Left
                { x: x, y: y + 1 }  // Right
            ];

            coordsToAttack.forEach(coord => {
                // Check bounds before attacking
                if (coord.x >= 0 && coord.x < 10 && coord.y >= 0 && coord.y < 10) {
                    const result = this.receiveAttack(coord.x, coord.y);
                    results.push({ x: coord.x, y: coord.y, result });
                }
            });
            console.log("Cluster Missile results:", results);
            return results;
        },

        /**
         * Activates the Random Salvo power-up.
         * @returns {Array|null} An array of attack results [{x, y, result}, ...] or null if unavailable.
         */
        activateRandomSalvo() {
            if (!hasRandomSalvo) return null; // Power-up already used

            const availableCoords = [];
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (isCoordValidAndUnattacked(i, j, this.board)) {
                        availableCoords.push({ x: i, y: j });
                    }
                }
            }

            if (availableCoords.length === 0) {
                 hasRandomSalvo = false; // Mark as used  if no valid targets left
                 return []; // No cells to attack
            }

            hasRandomSalvo = false; // Mark as used
            const results = [];
            const targetsToAttack = 3;

            for (let i = 0; i < targetsToAttack && availableCoords.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableCoords.length);
                const randomCoord = availableCoords.splice(randomIndex, 1)[0]; // Remove chosen coord
                const result = this.receiveAttack(randomCoord.x, randomCoord.y);
                results.push({ x: randomCoord.x, y: randomCoord.y, result });
            }
            console.log("Random Salvo results:", results);
            return results;
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
            // Reset power-ups
            hasClusterMissile = true;
            hasRandomSalvo = true;
        }
    };
}


// Define standard ships
export const SHIP_TYPES = [
    { name: 'Carrier', length: 4 },
    { name: 'Battleship', length: 3 },
    { name: 'Cruiser', length: 3 },
    { name: 'Destroyer', length: 2 }
];

// Initializing game boards for Jack and John
export let jack = gameboards();
export let john = gameboards();

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