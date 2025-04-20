import { coords, jack, john, SHIP_TYPES, ship } from "./logic";

// --- State Variables ---
let currentPlayerName = "Jack";
let gameState = "placement_jack";
let shipsToPlace = [];
let draggedShip = null;
let placedShipCount = 0;
let isClusterModeActive = false; // Track if cluster missile is armed
let touchedShip = null; // Store info about the ship being touched
let touchStartX = 0; // Initial touch X
let touchStartY = 0; // Initial touch Y
let shipClone = null; // Optional: Visual element following the finger

// --- DOM Element References ---
let placementScreenEl;
let placementHeaderEl;
let shipInventoryEl;
let placementGridContainerEl;
let confirmPlacementBtn;
let playDisplayEl;
let boardOwnerWrapperEl;
let modalOverlayEl; // Reference for the modal overlay
let modalMessageEl; // Reference for the message inside the modal
let modalRestartBtn; // Reference for the restart button
// Power-up Buttons
let jackClusterBtn, jackSalvoBtn, johnClusterBtn, johnSalvoBtn;

/**
 * Creates the main HTML structure including placement screen.
 */
export function gamedisplay() {
    // --- Main Play Area (Initially hidden) ---
    const playarea = document.createElement("div");
    playarea.classList.add("playarea");

    const turndisplay = document.createElement("div");
    turndisplay.classList.add("turndisplay");
    turndisplay.textContent = "Setup Phase"; // Set initial text for setup
    playarea.appendChild(turndisplay);

    // Modify Board Owner Wrapper to include power-up buttons
    boardOwnerWrapperEl = document.createElement("div");
    boardOwnerWrapperEl.classList.add("boardownerwrapper");

    // Jack's Area
    const jackOwnerArea = document.createElement("div");
    jackOwnerArea.classList.add("boardowner-area"); // New container
    const boardowner1 = document.createElement("div");
    boardowner1.classList.add("boardowner");
    boardowner1.textContent = "Jack's Board";
    const jackPowerups = document.createElement("div");
    jackPowerups.classList.add("powerup-controls");
    jackClusterBtn = document.createElement("button");
    jackClusterBtn.id = "jack-cluster-btn";
    jackClusterBtn.classList.add("powerup-btn", "cluster-btn");
    jackClusterBtn.textContent = "Cluster (1)";
    jackClusterBtn.disabled = true; // Start disabled until game starts
    jackSalvoBtn = document.createElement("button");
    jackSalvoBtn.id = "jack-salvo-btn";
    jackSalvoBtn.classList.add("powerup-btn", "salvo-btn");
    jackSalvoBtn.textContent = "Salvo (1)";
    jackSalvoBtn.disabled = true; // Start disabled until game starts
    jackPowerups.appendChild(jackClusterBtn);
    jackPowerups.appendChild(jackSalvoBtn);
    jackOwnerArea.appendChild(boardowner1);
    jackOwnerArea.appendChild(jackPowerups);

    // John's Area
    const johnOwnerArea = document.createElement("div");
    johnOwnerArea.classList.add("boardowner-area"); // New container
    const boardowner2 = document.createElement("div");
    boardowner2.classList.add("boardowner");
    boardowner2.textContent = "John's Board";
    const johnPowerups = document.createElement("div");
    johnPowerups.classList.add("powerup-controls");
    johnClusterBtn = document.createElement("button");
    johnClusterBtn.id = "john-cluster-btn";
    johnClusterBtn.classList.add("powerup-btn", "cluster-btn");
    johnClusterBtn.textContent = "Cluster (1)";
    johnClusterBtn.disabled = true; // Start disabled until game starts
    johnSalvoBtn = document.createElement("button");
    johnSalvoBtn.id = "john-salvo-btn";
    johnSalvoBtn.classList.add("powerup-btn", "salvo-btn");
    johnSalvoBtn.textContent = "Salvo (1)";
    johnSalvoBtn.disabled = true; // Start disabled until game starts
    johnPowerups.appendChild(johnClusterBtn);
    johnPowerups.appendChild(johnSalvoBtn);
    johnOwnerArea.appendChild(boardowner2);
    johnOwnerArea.appendChild(johnPowerups);

    boardOwnerWrapperEl.appendChild(jackOwnerArea);
    boardOwnerWrapperEl.appendChild(johnOwnerArea);
    playarea.appendChild(boardOwnerWrapperEl);

    playDisplayEl = document.createElement("div");
    playDisplayEl.classList.add("playdisplay");
    const jackarea = document.createElement("div");
    jackarea.classList.add("jackarea");
    const jackclass = document.createElement("div");
    jackclass.classList.add("jackclass", "grid-container");
    jackarea.appendChild(jackclass);
    const johnarea = document.createElement("div");
    johnarea.classList.add("johnarea");
    const johnclass = document.createElement("div");
    johnclass.classList.add("johnclass", "grid-container");
    johnarea.appendChild(johnclass);
    playDisplayEl.appendChild(jackarea);
    playDisplayEl.appendChild(johnarea);
    playarea.appendChild(playDisplayEl);

    document.body.appendChild(playarea);

    // --- Placement Screen (Overlay) ---
    placementScreenEl = document.createElement("div");
    placementScreenEl.classList.add("placement-screen", "hidden"); // Start hidden

    placementHeaderEl = document.createElement("h2");
    placementHeaderEl.classList.add("placement-header");
    placementScreenEl.appendChild(placementHeaderEl);

    const placementContent = document.createElement("div");
    placementContent.classList.add("placement-content");

    shipInventoryEl = document.createElement("div");
    shipInventoryEl.classList.add("ship-inventory");
    placementContent.appendChild(shipInventoryEl);

    // Container to hold the grid during placement
    placementGridContainerEl = document.createElement("div");
    placementGridContainerEl.classList.add("placement-grid-container");
    placementContent.appendChild(placementGridContainerEl);

    const placementControls = document.createElement("div");
    placementControls.classList.add("placement-controls");
    confirmPlacementBtn = document.createElement("button");
    confirmPlacementBtn.id = "confirm-placement-btn";
    confirmPlacementBtn.textContent = "Confirm Placement";
    confirmPlacementBtn.disabled = true; // Disabled until all ships are placed
    placementControls.appendChild(confirmPlacementBtn);
    placementContent.appendChild(placementControls);

    placementScreenEl.appendChild(placementContent);
    document.body.appendChild(placementScreenEl); // Append overlay to body

    // --- Game Over Modal (Overlay) ---
    modalOverlayEl = document.createElement('div');
    modalOverlayEl.classList.add('modal-overlay', 'hidden'); // Start hidden

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalMessageEl = document.createElement('h3');
    modalMessageEl.classList.add('modal-message');
    modalContent.appendChild(modalMessageEl); // Add message element

    modalRestartBtn = document.createElement('button');
    modalRestartBtn.classList.add('modal-restart-btn');
    modalRestartBtn.textContent = 'Play Again?';
    modalContent.appendChild(modalRestartBtn); // Add button

    modalOverlayEl.appendChild(modalContent);
    document.body.appendChild(modalOverlayEl); // Append modal to body

    // Add listener for the restart button
    modalRestartBtn.addEventListener('click', () => {
        location.reload(); // Simple way to restart: reload the page
    });

    // --- Add Power-up Button Listeners ---
    jackClusterBtn.addEventListener('click', () => handleActivateClusterMode('Jack'));
    jackSalvoBtn.addEventListener('click', () => handleActivateRandomSalvo('Jack'));
    johnClusterBtn.addEventListener('click', () => handleActivateClusterMode('John'));
    johnSalvoBtn.addEventListener('click', () => handleActivateRandomSalvo('John'));
}

/**
 * Sets up the static UI elements for placement (buttons, etc.).
 * @param {Array} shipTypes - Array of ship definitions ({ name, length }).
 */
function setupPlacementUI(shipTypes) {
    confirmPlacementBtn.addEventListener('click', handleConfirmPlacement);

    // Populate initial shipsToPlace (used later by showPlacementScreen)
    // Create distinct ship objects for placement tracking
    shipsToPlace = shipTypes.map((type, index) => ({
        ...type,
        id: `ship-${type.name}-${index}`, // Give a base ID
        placed: false,
        orientation: 'horizontal' // Default orientation per ship
    }));
}

/**
 * Shows the placement screen for the specified player.
 * @param {string} playerName - "Jack" or "John".
 * @param {Array<Array<any>>} playerBoardData - The player's board data.
 */
function showPlacementScreen(playerName, playerBoardData) {  // --- Add Power-up Button Listeners ---
    jackClusterBtn.addEventListener('click', () => handleActivateClusterMode('Jack'));
    jackSalvoBtn.addEventListener('click', () => handleActivateRandomSalvo('Jack'));
    johnClusterBtn.addEventListener('click', () => handleActivateClusterMode('John'));
    johnSalvoBtn.addEventListener('click', () => handleActivateRandomSalvo('John'));
    console.log(`Showing placement screen for: ${playerName}`); // Debug log
    currentPlayerName = playerName;
    // Reset shipsToPlace for the current player based on SHIP_TYPES
    // Ensure fresh ship objects are created for placement logic
    shipsToPlace = SHIP_TYPES.map((type, index) => ({
        ...type,
        id: `${playerName.toLowerCase()}-${type.name}-${index}`, // Unique ID might be useful
        placed: false,
        orientation: 'horizontal' // Reset to default horizontal
    }));

    gameState = `placement_${playerName.toLowerCase()}`;
    placedShipCount = 0; // Reset count for the new player
    confirmPlacementBtn.disabled = true; // Ensure button is disabled initially

    placementHeaderEl.textContent = `${playerName}, place your ships!`;

    // Reset and Populate Ship Inventory
    shipInventoryEl.innerHTML = ''; // Clear previous inventory
    shipsToPlace.forEach((shipData, index) => {
        const shipEl = createDraggableShipElement(shipData, index);
        shipInventoryEl.appendChild(shipEl);
    });

    // Create/Show Placement Grid
    placementGridContainerEl.innerHTML = ''; // Clear previous grid
    const gridEl = document.createElement('div');
    const boardClass = playerName === 'Jack' ? 'jackclass' : 'johnclass';
    gridEl.classList.add(boardClass, 'grid-container');
    placementGridContainerEl.appendChild(gridEl);
    // Ensure the board data passed is the *empty* initialized board
    const player = playerName === 'Jack' ? jack : john;
    createBoardGrid(player.board, boardClass, true); // Pass true for placement mode

    // Show the screen
    placementScreenEl.classList.remove('hidden');
    console.log("Placement screen 'hidden' class removed."); // Debug log
}

/**
 * Creates a draggable ship element for the inventory.
 */
function createDraggableShipElement(shipData, index) {
    const shipEl = document.createElement('div');
    shipEl.classList.add('draggable-ship-container'); // Wrapper for ship + button

    const shipVisualEl = document.createElement('div');
    shipVisualEl.classList.add('draggable-ship', shipData.orientation);
    shipVisualEl.draggable = true;
    shipVisualEl.dataset.shipIndex = index;
    shipVisualEl.dataset.length = shipData.length;
    shipVisualEl.dataset.name = shipData.name;

    // Create visual cells for the ship
    for (let i = 0; i < shipData.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('ship-cell');
        shipVisualEl.appendChild(cell);
    }

    // --- Individual Rotate Button ---
    const rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-ship-btn');
    rotateBtn.textContent = '🔄'; // Rotate icon
    rotateBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent drag start interference
        const shipIndex = parseInt(shipVisualEl.dataset.shipIndex, 10);
        const currentShip = shipsToPlace[shipIndex];
        // Toggle orientation in data
        currentShip.orientation = currentShip.orientation === 'horizontal' ? 'vertical' : 'horizontal';
        // Update visual class
        shipVisualEl.classList.remove('horizontal', 'vertical');
        shipVisualEl.classList.add(currentShip.orientation);
        console.log(`Rotated ship ${shipIndex} to ${currentShip.orientation}`);
    });

    shipEl.appendChild(shipVisualEl);
    shipEl.appendChild(rotateBtn);

    // --- Drag Handlers for Inventory Ships ---
    shipVisualEl.addEventListener('dragstart', (e) => {
        const shipIndex = parseInt(shipVisualEl.dataset.shipIndex, 10);
        const currentShipData = shipsToPlace[shipIndex]; // Get data for this specific ship

        draggedShip = {
            length: parseInt(shipVisualEl.dataset.length, 10),
            orientation: currentShipData.orientation, // Use this ship's orientation
            element: shipEl, // Reference the container
            visualElement: shipVisualEl, // Reference the visual part
            index: shipIndex
        };
        e.dataTransfer.setData('text/plain', shipIndex);
        e.dataTransfer.effectAllowed = 'move';
        shipVisualEl.classList.add('dragging');
    });

    shipVisualEl.addEventListener('dragend', () => {
        shipVisualEl.classList.remove('dragging');
        clearHighlights();
        draggedShip = null; // Ensure draggedShip is cleared
    });

    // --- Touch Handlers (Mobile) ---
    shipVisualEl.addEventListener('touchstart', handleTouchStart, { passive: false }); // Use passive: false if we preventDefault

    return shipEl; // Return the container
}

/**
 * Creates the visual grid, adding drop listeners if in placement mode.
 * @param {Array<Array<any>>} playerboard - Board data.
 * @param {string} boardClass - 'jackclass' or 'johnclass'.
 * @param {boolean} isPlacementMode - Add drop listeners if true.
 */
function createBoardGrid(playerboard, boardClass, isPlacementMode = false) {
    const targetContainerSelector = isPlacementMode
        ? `.placement-grid-container .${boardClass}`
        : `.${boardClass === 'jackclass' ? 'jackarea' : 'johnarea'} .${boardClass}`;
    const playerGridContainer = document.querySelector(targetContainerSelector);

    if (!playerGridContainer) {
        console.error(`Grid container not found for selector: ${targetContainerSelector}`);
        return;
    }

    playerGridContainer.innerHTML = ''; // Clear previous grid content

    playerboard.forEach((row, i) => {
        const rowcell = document.createElement("div");
        rowcell.classList.add("rowcell");
        row.forEach((cellData, j) => {
            const colcell = document.createElement("div");
            colcell.classList.add("colcell"); // Base class for styling
            colcell.setAttribute("data-xcords", i);
            colcell.setAttribute("data-ycords", j);
            colcell.setAttribute("data-playerboard", boardClass);
            colcell.classList.add(boardClass === "jackclass" ? "jackcell" : "johncell");

            if (isPlacementMode) {
                colcell.addEventListener('dragover', handleDragOver);
                colcell.addEventListener('dragleave', handleDragLeave);
                colcell.addEventListener('drop', handleDrop);

                // --- Touch Drop Zone Handlers ---
                colcell.addEventListener('touchmove', handleTouchMove, { passive: false }); // Need to prevent scroll
                colcell.addEventListener('touchend', handleTouchEnd);
                colcell.addEventListener('touchcancel', handleTouchEnd); // Treat cancel like end

                if (cellData && typeof cellData === 'object' && cellData !== 'T' && cellData !== 'X') {
                    colcell.classList.add('ship-placed');
                }
            } else {
                if (cellData === 'T') {
                    colcell.classList.add('hit');
                    colcell.style.cursor = 'not-allowed';
                } else if (cellData === 'X') {
                    colcell.classList.add('miss');
                    colcell.style.cursor = 'not-allowed';
                } else {
                    if (gameState === 'attacking') {
                        colcell.addEventListener('click', handleCellClick);
                        const isOpponentBoard = (currentPlayerName === 'Jack' && boardClass === 'johnclass') ||
                                                (currentPlayerName === 'John' && boardClass === 'jackclass');
                        if (!isOpponentBoard) {
                             colcell.style.cursor = 'not-allowed';
                        } else {
                             colcell.style.cursor = 'pointer';
                        }
                    } else {
                         colcell.style.cursor = 'not-allowed';
                    }
                }
            }

            rowcell.appendChild(colcell);
        });
        playerGridContainer.appendChild(rowcell);
    });
}

// --- Drag and Drop Handler Functions ---

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!draggedShip) return;

    const cell = e.target;
    if (!cell.classList.contains('colcell')) return;

    const x = parseInt(cell.getAttribute('data-xcords'), 10);
    const y = parseInt(cell.getAttribute('data-ycords'), 10);
    const boardClass = cell.getAttribute('data-playerboard');
    const playerBoard = (boardClass === 'jackclass' ? jack : john).board;

    clearHighlights();
    highlightPlacement(playerBoard, x, y, draggedShip.length, draggedShip.orientation);
}

function handleDragLeave(e) {}

function handleDrop(e) {
    e.preventDefault();
    clearHighlights();

    if (!draggedShip) return;

    const cell = e.target;
    if (!cell.classList.contains('colcell')) {
        console.warn("Drop target is not a cell.");
        draggedShip = null;
        return;
    }

    const x = parseInt(cell.getAttribute('data-xcords'), 10);
    const y = parseInt(cell.getAttribute('data-ycords'), 10);
    const boardClass = cell.getAttribute('data-playerboard');
    const player = boardClass === 'jackclass' ? jack : john;

    const tempShip = ship(draggedShip.length, 0, draggedShip.orientation);
    const placementResult = player.placement(tempShip, x, y);

    if (placementResult === true) {
        console.log(`Placed ${draggedShip.length}-length ship (${draggedShip.orientation}) at (${x},${y})`);

        for (let i = 0; i < draggedShip.length; i++) {
            let currentX = x, currentY = y;
            if (draggedShip.orientation === 'vertical') {
                currentX += i;
            } else {
                currentY += i;
            }
            const placedCell = document.querySelector(`.placement-grid-container .${boardClass} [data-xcords="${currentX}"][data-ycords="${currentY}"]`);
            if (placedCell) {
                placedCell.classList.add('ship-placed');
                placedCell.removeEventListener('dragover', handleDragOver);
                placedCell.removeEventListener('drop', handleDrop);
            }
        }

        draggedShip.element.remove();
        shipsToPlace[draggedShip.index].placed = true;
        placedShipCount++;

        if (placedShipCount === SHIP_TYPES.length) {
            confirmPlacementBtn.disabled = false;
        }

    } else {
        console.warn(`Placement failed: ${placementResult}`);
    }

    draggedShip = null;
}

// --- Touch Handler Functions (Mobile) ---

function handleTouchStart(e) {
    // Only handle single touch for simplicity
    if (e.touches.length !== 1) return;

    // Prevent potential browser drag behavior or other defaults on touch
    e.preventDefault();

    const shipVisualEl = e.target.closest('.draggable-ship');
    if (!shipVisualEl) return;

    const shipIndex = parseInt(shipVisualEl.dataset.shipIndex, 10);
    const currentShipData = shipsToPlace[shipIndex];

    // Store info about the touched ship
    touchedShip = {
        length: parseInt(shipVisualEl.dataset.length, 10),
        orientation: currentShipData.orientation,
        element: shipVisualEl.closest('.draggable-ship-container'), // The whole container
        visualElement: shipVisualEl,
        index: shipIndex
    };

    // Record start position
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    // Optional: Create a clone to follow finger
    shipClone = shipVisualEl.cloneNode(true);
    shipClone.style.position = 'absolute';
    shipClone.style.zIndex = '1000'; // Ensure it's on top
    shipClone.style.opacity = '0.7';
    shipClone.style.pointerEvents = 'none'; // Don't let clone interfere with events
    document.body.appendChild(shipClone);
    // Position clone initially (adjust based on touch point relative to element)
    const rect = shipVisualEl.getBoundingClientRect();
    shipClone.style.left = `${e.touches[0].clientX - (touchStartX - rect.left)}px`;
    shipClone.style.top = `${e.touches[0].clientY - (touchStartY - rect.top)}px`;

    // Add global listeners for move and end on the document/window
    // This ensures we capture events even if finger moves off the original element
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    console.log("Touch started on ship:", touchedShip.index);
}

function handleTouchMove(e) {
    if (!touchedShip || e.touches.length !== 1) return;

    // *** Prevent page scrolling ***
    e.preventDefault();

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;

    // Move the clone
    if (shipClone) {
        const rect = touchedShip.visualElement.getBoundingClientRect();
        shipClone.style.left = `${currentX - (touchStartX - rect.left)}px`;
        shipClone.style.top = `${currentY - (touchStartY - rect.top)}px`;
    }

    // Find element under the finger
    // Hide clone temporarily to get element underneath
    if (shipClone) shipClone.style.display = 'none';
    const elementUnderTouch = document.elementFromPoint(currentX, currentY);
    if (shipClone) shipClone.style.display = ''; // Show clone again

    clearHighlights(); // Clear previous highlights

    if (elementUnderTouch && elementUnderTouch.classList.contains('colcell') && elementUnderTouch.closest('.placement-grid-container')) {
        // It's a cell within the placement grid
        const cell = elementUnderTouch;
        const x = parseInt(cell.getAttribute('data-xcords'), 10);
        const y = parseInt(cell.getAttribute('data-ycords'), 10);
        const boardClass = cell.getAttribute('data-playerboard');
        const playerBoard = (boardClass === 'jackclass' ? jack : john).board;

        // Highlight based on validity
        highlightPlacement(playerBoard, x, y, touchedShip.length, touchedShip.orientation);
    } else {
        // Finger is not over a valid placement cell
    }
}

function handleTouchEnd(e) {
    // Check if touch is ending and we were tracking a ship
    if (!touchedShip) return;

    // Remove global listeners added in touchstart
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchcancel', handleTouchEnd);

    console.log("Touch ended");
    clearHighlights();

    // Remove the clone
    if (shipClone) {
        shipClone.remove();
        shipClone = null;
    }

    // Find element at the final touch point
    const touch = e.changedTouches[0]; // Use changedTouches for end/cancel
    const endX = touch.clientX;
    const endY = touch.clientY;
    const elementUnderTouch = document.elementFromPoint(endX, endY);

    let placedSuccessfully = false;
    if (elementUnderTouch && elementUnderTouch.classList.contains('colcell') && elementUnderTouch.closest('.placement-grid-container')) {
        // Dropped onto a valid grid cell
        const cell = elementUnderTouch;
        const x = parseInt(cell.getAttribute('data-xcords'), 10);
        const y = parseInt(cell.getAttribute('data-ycords'), 10);
        const boardClass = cell.getAttribute('data-playerboard');
        const player = boardClass === 'jackclass' ? jack : john;

        // --- Replicate placement logic from handleDrop ---
        const tempShip = ship(touchedShip.length, 0, touchedShip.orientation);
        const placementResult = player.placement(tempShip, x, y);

        if (placementResult === true) {
            console.log(`Touch Placed ${touchedShip.length}-length ship (${touchedShip.orientation}) at (${x},${y})`);
            placedSuccessfully = true;

            // Update UI for placed cells
            for (let i = 0; i < touchedShip.length; i++) {
                let currentX = x, currentY = y;
                if (touchedShip.orientation === 'vertical') currentX += i; else currentY += i;
                const placedCell = document.querySelector(`.placement-grid-container .${boardClass} [data-xcords="${currentX}"][data-ycords="${currentY}"]`);
                if (placedCell) {
                    placedCell.classList.add('ship-placed');
                    // Consider removing touch listeners from placed cells if needed
                }
            }

            // Remove ship from inventory UI
            touchedShip.element.remove();
            shipsToPlace[touchedShip.index].placed = true;
            placedShipCount++;

            // Enable confirm button if needed
            if (placedShipCount === SHIP_TYPES.length) {
                confirmPlacementBtn.disabled = false;
            }
        } else {
            console.warn(`Touch Placement failed: ${placementResult}`);
        }
    } else {
        console.log("Touch ended outside valid placement area.");
    }

    // Reset touched ship state
    touchedShip = null;
}

function clearHighlights() {
    const cells = document.querySelectorAll('.placement-grid-container .colcell');
    cells.forEach(c => c.classList.remove('drag-over-valid', 'drag-over-invalid'));
}

function highlightPlacement(board, startX, startY, length, orientation) {
    let isValid = true;
    const cellsToHighlight = [];

    for (let i = 0; i < length; i++) {
        let x = startX, y = startY;
        if (orientation === 'vertical') {
            x += i;
        } else {
            y += i;
        }

        if (x >= 10 || y >= 10) {
            isValid = false;
            const cellEl = document.querySelector(`.placement-grid-container [data-xcords="${x}"][data-ycords="${y}"]`);
            if (cellEl) cellsToHighlight.push(cellEl);
            continue;
        }

        if (board[x]?.[y] != null && typeof board[x]?.[y] === 'object') {
            isValid = false;
        }

        const cellEl = document.querySelector(`.placement-grid-container [data-xcords="${x}"][data-ycords="${y}"]`);
        if (cellEl) {
            cellsToHighlight.push(cellEl);
        } else {
             isValid = false;
        }
    }
    if (cellsToHighlight.length !== length) {
        isValid = false;
    }

    cellsToHighlight.forEach(cell => {
        cell.classList.add(isValid ? 'drag-over-valid' : 'drag-over-invalid');
    });
}

function handleConfirmPlacement() {
    console.log(`handleConfirmPlacement called. Current gameState: ${gameState}`);

    const placedCells = document.querySelectorAll('.placement-grid-container .colcell.ship-placed');
    placedCells.forEach(cell => cell.classList.remove('ship-placed'));

    if (gameState === 'placement_jack') {
        console.log("Switching from Jack's placement to John's placement.");
        showPlacementScreen("John", john.board);
    } else if (gameState === 'placement_john') {
        console.log("Switching from John's placement to attacking phase.");
        startGame();
    } else {
        console.warn(`handleConfirmPlacement called with unexpected gameState: ${gameState}`);
    }
}

function startGame() {
    console.log("startGame function called");
    console.log("Jack's board before startGame grid creation:", JSON.stringify(jack.board));
    console.log("John's board before startGame grid creation:", JSON.stringify(john.board));

    gameState = 'attacking';
    placementScreenEl.classList.add('hidden');

    playDisplayEl.classList.add('active');
    boardOwnerWrapperEl.classList.add('active');

    const jackGridContainer = document.querySelector('.jackarea .jackclass');
    const johnGridContainer = document.querySelector('.johnarea .johnclass');
    if (!jackGridContainer || !johnGridContainer) {
        console.error("Could not find main game grid containers in startGame!");
        return;
    }
    jackGridContainer.innerHTML = '';
    johnGridContainer.innerHTML = '';

    createBoardGrid(jack.board, "jackclass", false);
    createBoardGrid(john.board, "johnclass", false);

    currentPlayerName = "Jack";
    document.querySelector(".turndisplay").textContent = `${currentPlayerName}'s Turn`;
    updateControlStates();
}

function handleActivateClusterMode(playerName) {
    if (gameState !== 'attacking' || playerName !== currentPlayerName || isClusterModeActive) return;

    const player = playerName === 'Jack' ? jack : john;
    const btn = playerName === 'Jack' ? jackClusterBtn : johnClusterBtn;

    if (!player.hasCluster) {
        console.log(`${playerName} has already used Cluster Missile.`);
        return;
    }

    console.log(`${playerName} activated Cluster Missile mode.`);
    isClusterModeActive = true;
    document.body.style.cursor = 'crosshair';
    btn.classList.add('active');
    updateControlStates();
}

function handleActivateRandomSalvo(playerName) {
    if (gameState !== 'attacking' || playerName !== currentPlayerName || isClusterModeActive) return;

    const player = playerName === 'Jack' ? jack : john;
    const opponent = playerName === 'Jack' ? john : jack;
    const btn = playerName === 'Jack' ? jackSalvoBtn : johnSalvoBtn;
    const opponentBoardClass = playerName === 'Jack' ? 'johnclass' : 'jackclass';

    if (!player.hasSalvo) {
        console.log(`${playerName} has already used Random Salvo.`);
        return;
    }

    console.log(`${playerName} activating Random Salvo...`);
    const results = opponent.activateRandomSalvo();

    if (results === null) {
        console.error("Salvo activation failed unexpectedly.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Salvo (0)";

    processAttackResults(results, opponentBoardClass);
}

function deactivateClusterMode() {
    isClusterModeActive = false;
    document.body.style.cursor = 'default';
    jackClusterBtn.classList.remove('active');
    johnClusterBtn.classList.remove('active');
    updateControlStates();
}

function processAttackResults(results, targetBoardClass) {
    let anyHit = false;
    let winner = null;
    const opponent = targetBoardClass === 'johnclass' ? john : jack;

    results.forEach(({ x, y, result }) => {
        const cell = document.querySelector(`.${targetBoardClass} [data-xcords="${x}"][data-ycords="${y}"]`);
        if (!cell) return;

        switch (result) {
            case "hit":
                cell.classList.add("hit");
                anyHit = true;
                break;
            case "miss":
                cell.classList.add("miss");
                break;
        }
        cell.style.pointerEvents = 'none';
        cell.style.cursor = 'not-allowed';
        cell.removeEventListener('click', handleCellClick);
    });

    if (opponent.allshipssunk()) {
        winner = currentPlayerName;
    }

    if (winner) {
        showWinModal(winner);
        boardcontrol("jackcell", true);
        boardcontrol("johncell", true);
        gameState = 'game_over';
        console.log("Game Over!");
        jackClusterBtn.disabled = true;
        jackSalvoBtn.disabled = true;
        johnClusterBtn.disabled = true;
        johnSalvoBtn.disabled = true;
        return;
    }

    if (!anyHit) {
        currentPlayerName = currentPlayerName === "Jack" ? "John" : "Jack";
        console.log(`Switching turn to: ${currentPlayerName}`);
        document.querySelector(".turndisplay").textContent = `${currentPlayerName}'s Turn`;
        updateControlStates();
    } else {
        console.log(`${currentPlayerName} hit! Gets another turn.`);
        const turnDisplay = document.querySelector(".turndisplay");
        turnDisplay.textContent = `${currentPlayerName} Hit! Go Again!`;
        setTimeout(() => {
            if (gameState === 'attacking') {
                 turnDisplay.textContent = `${currentPlayerName}'s Turn`;
            }
        }, 1500);
        updateControlStates();
    }
}

function showWinModal(winnerName) {
    modalMessageEl.textContent = `${winnerName} WINS! Congratulations!`;
    modalOverlayEl.classList.remove('hidden');
}

function handleCellClick(e) {
    console.log("handleCellClick triggered");
    if (gameState !== 'attacking') return;

    const cell = e.target;
    const xcords = parseInt(cell.getAttribute("data-xcords"), 10);
    const ycords = parseInt(cell.getAttribute("data-ycords"), 10);
    const targetBoardClass = cell.getAttribute("data-playerboard");
    const isOwnBoard = (currentPlayerName === "Jack" && targetBoardClass === "jackclass") ||
                       (currentPlayerName === "John" && targetBoardClass === "johnclass");

    if (isClusterModeActive) {
        if (isOwnBoard) {
            console.log("Cluster Missile must target opponent's board.");
            return;
        }

        console.log(`${currentPlayerName} firing Cluster Missile at (${xcords}, ${ycords})`);
        const player = currentPlayerName === 'Jack' ? jack : john;
        const opponent = currentPlayerName === 'Jack' ? john : jack;
        const btn = currentPlayerName === 'Jack' ? jackClusterBtn : johnClusterBtn;

        const results = opponent.activateClusterMissile(xcords, ycords);

        deactivateClusterMode();

        if (results === null) {
            console.error("Cluster activation failed unexpectedly.");
            return;
        }

        btn.disabled = true;
        btn.textContent = "Cluster (0)";

        processAttackResults(results, targetBoardClass);

        return;
    }

    if (isOwnBoard) {
        console.log("Click ignored: Trying to click own board.");
        return;
    }

    if (document.body.style.cursor === 'crosshair') {
        console.warn("Cluster mode UI active, but state mismatch? Click ignored.");
        return;
    }

    console.log(`Attacking ${targetBoardClass} at (${xcords}, ${ycords})`);
    const result = coords(xcords, ycords, targetBoardClass);
    console.log(`Attack result: ${result}`);

    processAttackResults([{ x: xcords, y: ycords, result }], targetBoardClass);
}

function updateControlStates() {
    if (gameState !== 'attacking') return;

    const isJackTurn = currentPlayerName === 'Jack';

    boardcontrol("jackcell", isJackTurn);
    boardcontrol("johncell", !isJackTurn);

    jackClusterBtn.disabled = !isJackTurn || !jack.hasCluster || isClusterModeActive;
    jackSalvoBtn.disabled = !isJackTurn || !jack.hasSalvo || isClusterModeActive;
    johnClusterBtn.disabled = isJackTurn || !john.hasCluster || isClusterModeActive;
    johnSalvoBtn.disabled = isJackTurn || !john.hasSalvo || isClusterModeActive;

    if (!jack.hasCluster) jackClusterBtn.textContent = "Cluster (0)";
    if (!jack.hasSalvo) jackSalvoBtn.textContent = "Salvo (0)";
    if (!john.hasCluster) johnClusterBtn.textContent = "Cluster (0)";
    if (!john.hasSalvo) johnSalvoBtn.textContent = "Salvo (0)";
}

export function boardcontrol(boardCellClass, disable) {
    console.log(`boardcontrol called for ${boardCellClass}, disable: ${disable}`);
    const cells = document.querySelectorAll(`.${boardCellClass}`);
    cells.forEach(cell => {
        const isAttacked = cell.classList.contains("hit") || cell.classList.contains("miss");

        if (!disable && !isAttacked) {
            cell.style.pointerEvents = "auto";
            cell.style.cursor = isClusterModeActive ? "crosshair" : "pointer";
        } else {
            cell.style.pointerEvents = "none";
            cell.style.cursor = "not-allowed";
        }
    });
}

export { setupPlacementUI, showPlacementScreen };