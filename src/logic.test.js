import { ship, gameboards } from './logic.js'; // Adjust path if needed

describe('ship factory', () => {
    test('creates a ship with correct properties and can be hit', () => {
        const myShip = ship(4, 0, 'horizontal');
        expect(myShip.length).toBe(4);
        expect(myShip.orientation).toBe('horizontal');
        expect(myShip.hitcounter).toBe(0);
        myShip.hits();
        expect(myShip.hitcounter).toBe(1);
    });

    test('isSunk() correctly identifies when sunk', () => {
        const myShip = ship(2, 0, 'vertical');
        myShip.hits();
        expect(myShip.isSunk()).toBe(false);
        myShip.hits();
        expect(myShip.isSunk()).toBe(true);
    });
});

describe('gameboards factory', () => {
    let boardInstance;
    let testShipH;
    let testShipV;

    beforeEach(() => {
        boardInstance = gameboards();
        boardInstance.initializeBoard(); // Ensure clean board for each test
        testShipH = ship(3, 0, 'horizontal');
        testShipV = ship(2, 0, 'vertical');
    });

    test('placement() places ships correctly and detects overlap', () => {
        // Successful placement
        expect(boardInstance.placement(testShipH, 2, 2)).toBe(true);
        expect(boardInstance.board[2][2]).toBe(testShipH);
        expect(boardInstance.board[2][3]).toBe(testShipH);
        expect(boardInstance.board[2][4]).toBe(testShipH);
        expect(boardInstance.ships).toContain(testShipH);

        // Overlap check
        expect(boardInstance.placement(testShipV, 1, 3)).toBe('Cannot place ship: Overlaps another ship');
        expect(boardInstance.ships.length).toBe(1); // Only the first ship should be placed
    });

    test('placement() rejects out-of-bounds placement', () => {
        expect(boardInstance.placement(testShipH, 5, 8)).toBe('Ship placement out of bounds (horizontal)');
        expect(boardInstance.placement(testShipV, 9, 1)).toBe('Ship placement out of bounds (vertical)');
        expect(boardInstance.ships.length).toBe(0);
    });

    test('receiveAttack() handles hit, miss, and already attacked', () => {
        boardInstance.placement(testShipH, 3, 3); // Place at 3,3 3,4 3,5

        // Miss
        expect(boardInstance.receiveAttack(0, 0)).toBe('miss');
        expect(boardInstance.board[0][0]).toBe('X');
        expect(boardInstance.receiveAttack(0, 0)).toBe('already_attacked'); // Attack miss again

        // Hit
        expect(boardInstance.receiveAttack(3, 4)).toBe('hit');
        expect(boardInstance.board[3][4]).toBe('T');
        expect(testShipH.hitcounter).toBe(1);
        expect(boardInstance.receiveAttack(3, 4)).toBe('already_attacked'); // Attack hit again
        expect(testShipH.hitcounter).toBe(1); // Hit counter should not increase
    });

    test('allshipssunk() correctly reports status', () => {
        expect(boardInstance.allshipssunk()).toBe(false); // No ships placed

        boardInstance.placement(testShipV, 1, 1); // Place at 1,1 and 2,1
        expect(boardInstance.allshipssunk()).toBe(false); // Ship placed but not sunk

        boardInstance.receiveAttack(1, 1);
        expect(boardInstance.allshipssunk()).toBe(false); // Ship hit but not sunk

        boardInstance.receiveAttack(2, 1);
        expect(boardInstance.allshipssunk()).toBe(true); // Ship sunk
    });
});
