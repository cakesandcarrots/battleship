import { gameboards, ship } from './logic.js'; // Update this with the correct import path from logic.js

describe('ship and gameboard interactions', function () {
    let playerone;
    let playeronetestShip;
    let playeronetestShip2;

    beforeEach(function () {
        playerone = gameboards();
        playerone.initializeBoard(); // Use initializeBoard instead of resetarrays
        playeronetestShip = ship(3, 0, 'horizontal'); // Create a standard ship for tests
        playeronetestShip2 = ship(2, 0, 'vertical'); // Create another ship
    });

    test('Successful horizontal placement', function () {
        expect(playerone.placement(playeronetestShip, 6, 6)).toBe(true);
        // Optionally check board state
        expect(playerone.board[6][6]).toBe(playeronetestShip);
        expect(playerone.board[6][7]).toBe(playeronetestShip);
        expect(playerone.board[6][8]).toBe(playeronetestShip);
    });

    test('Horizontal placement out of bounds', function () {
        const result = playerone.placement(playeronetestShip, 8, 8);
        expect(result).toBe('Ship placement out of bounds (horizontal)');
    });

    test('Invalid ship placement due to overlap', function () {
        // Place the first ship
        playerone.placement(playeronetestShip, 4, 4); // Places at 4,4 4,5 4,6

        // Attempt to place the second ship overlapping vertically
        const result = playerone.placement(playeronetestShip2, 3, 5); // Tries to place at 3,5 and 4,5
        expect(result).toBe('Cannot place ship: Overlaps another ship');
    });

    test('Receive a hit on a ship', function () {
        playerone.placement(playeronetestShip, 3, 3); // Places at 3,3 3,4 3,5
        const result = playerone.receiveAttack(3, 4); // Hit middle part
        expect(result).toBe('hit');
        expect(playerone.board[3][4]).toBe('T'); // Check board marked as hit
        expect(playeronetestShip.hitcounter).toBe(1); // Check ship hit counter
    });

    test('Receive a miss on an empty cell', function () {
        const result = playerone.receiveAttack(1, 1);
        expect(result).toBe('miss');
        expect(playerone.board[1][1]).toBe('X'); // Check board marked as miss
    });

    test('Check if all ships are sunk (initially false)', function () {
        playerone.placement(playeronetestShip, 5, 4);
        playerone.placement(playeronetestShip2, 0, 4);
        playerone.receiveAttack(5, 4); // Hit ship 1 once
        playerone.receiveAttack(0, 4); // Hit ship 2 once
        expect(playerone.allshipssunk()).toBe(false);
    });

    test('Check if all ships are sunk (true after sinking all)', function () {
        playerone.placement(playeronetestShip, 5, 4); // 3 length horizontal at 5,4 5,5 5,6
        playerone.placement(playeronetestShip2, 0, 4); // 2 length vertical at 0,4 1,4
        // Sink ship 1
        playerone.receiveAttack(5, 4);
        playerone.receiveAttack(5, 5);
        playerone.receiveAttack(5, 6);
        // Sink ship 2
        playerone.receiveAttack(0, 4);
        playerone.receiveAttack(1, 4);
        expect(playerone.allshipssunk()).toBe(true);
    });

});
