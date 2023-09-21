import { gameboards, ship } from './index'; // Update this with the correct import path

describe('ship', function () {
    let playerone;
    let playertwo;
    let playeronetestShip;
    let playeronetestShip2;
    let playeronetestShip3;
    let playertwotestShip;
    let playertwotestShip2;


    beforeEach(function () {
        playerone = gameboards();
        playertwo = gameboards()
        playerone.resetarrays()

        // Creating a ship with length 3 and initial hit counter 0
    });

    test('Vertical check', function () {
        playeronetestShip = ship(3, 0, 'vertical');
        expect(playerone.placement(playeronetestShip, 6, 4)).toBe('Ship placed vertically');
    });
    test('Horizontal check', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        expect(playerone.placement(playeronetestShip, 9, 6)).toBe('Ship placed horizontally')
    })

    test('out of bounds check', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        expect(playerone.placement(playeronetestShip, 9, 9)).toBe('Ship goes beyond waters')

    })


    test('Overlap check', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip2 = ship(3, 0, 'horizontal')
        playerone.placement(playeronetestShip, 9, 6)

        expect(playerone.placement(playeronetestShip, 9, 6)).toBe('Another ship already present')

    })

    test('Overlap check', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip2 = ship(3, 0, 'vertical');
        playerone.placement(playeronetestShip, 4, 4);
        expect(playerone.placement(playeronetestShip2, 3, 4)).toBe('Another ship already present');
    });

    test('Vertical placement within bounds', function () {
        playeronetestShip = ship(3, 0, 'vertical');
        const result = playerone.placement(playeronetestShip, 2, 2);
        expect(result).toBe('Ship placed vertically');
    });

    test('Horizontal placement within bounds', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        const result = playerone.placement(playeronetestShip, 6, 6);
        expect(result).toBe('Ship placed horizontally');
    });

    test('Vertical placement out of bounds', function () {
        playeronetestShip = ship(4, 0, 'vertical');
        const result = playerone.placement(playeronetestShip, 8, 9);
        expect(result).toBe('Ship goes beyond waters');
    });

    test('Horizontal placement out of bounds', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        const result = playerone.placement(playeronetestShip, 8, 8);
        expect(result).toBe('Ship goes beyond waters');
    });

    test('Invalid ship placement due to overlap', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip2 = ship(2, 0, 'horizontal');

        // Place the first ship
        playerone.placement(playeronetestShip, 4, 4);

        // Attempt to place the second ship in a way that it overlaps with the first
        const result = playerone.placement(playeronetestShip2, 4, 5);
        expect(result).toBe('Another ship already present');
    });

    test('Receive a hit on a ship', function () {
        playeronetestShip = ship(3, 'horizontal');
        playerone.placement(playeronetestShip, 3, 3);

        const result = playerone.receiveAttack(3, 3);
        expect(result).toBe('hit');
    });

    test('Receive a miss on an empty cell', function () {
        const result = playerone.receiveAttack(1, 1);
        expect(result).toBe('miss');
    });

    test('Receive a miss on a cell with a sunk ship', function () {
        playeronetestShip = ship(1, 'horizontal');
        playerone.placement(playeronetestShip, 5, 5);
        playerone.receiveAttack(5, 5); // Hit the ship
        const result = playerone.receiveAttack(5, 5); // Try to hit the same cell again
        expect(result).toBe('miss');
    });

    test('All sunk', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip2 = ship(3, 0, 'vertical');
        playeronetestShip3 = ship(3, 0, 'horizontal')
        playerone.placement(playeronetestShip, 5, 4);
        playerone.placement(playeronetestShip2, 0, 4)
        playerone.receiveAttack(5, 4)
        playerone.receiveAttack(5, 5)
        playerone.receiveAttack(5, 6)
        playerone.receiveAttack(0, 4)
        playerone.receiveAttack(1, 4)
        playerone.receiveAttack(2, 4)
        expect(playerone.allshipssunk()).toBe(true);
    });

    test('returns true when ship is sunk', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip.hits();
        playeronetestShip.hits();
        playeronetestShip.hits();
        expect(playeronetestShip.isSunk()).toBe(true);
    });

    test('returns false when ship is not sunk', function () {
        playeronetestShip = ship(3, 0, 'horizontal');
        playeronetestShip.hits();
        const isSunk = playeronetestShip.isSunk();
        expect(isSunk).toBe(false);
    });

    test('Out of bounds test', function () {




    })


});
