
//factory function to create a ship
export function ship(length, hitcounter, orientation) {
    return {
        length,
        hitcounter,
        orientation,
        hits() {
            this.hitcounter = this.hitcounter + 1;
            return this.hitcounter;
        },
        isSunk() {
            if (this.hitcounter == this.length)
                return true;
            return false
        },
        alive: true
    }
}


//factory function for gamelogic
export function gameboards() {
    let board = []
    let placedships = []
    return {
        board,
        placedships,
        placement(ship, x, y) {
            if (ship.orientation == 'vertical') {
                if (x + ship.length >= 10)
                    return ('Ship goes beyond waters')
                for (let i = x; i < x + ship.length; i++) {
                    if (this.board[i][y] != null) {
                        return ('Another ship already present')
                    }
                }
                for (let i = x; i < x + ship.length; i++) {
                    this.board[i][y] = ship;
                }
                placedships.push(ship)
                return 'Ship placed vertically'
            }
            else {
                if (y + ship.length >= 10) {
                    return ('Ship goes beyond waters')
                }
                for (let i = y; i < y + ship.length; i++) {
                    if (this.board[x][i] != null)
                        return ('Another ship already present')
                }
                for (let i = y; i < y + ship.length; i++) {
                    this.board[x][i] = ship
                }
                placedships.push(ship)
                return 'Ship placed horizontally'
            }
        },


        receiveAttack(x, y) {
            //sends hit function to appropriate ship
            //or keeps track of missed shot
            if (this.board[x][y] != null && this.board[x][y] != 'X' && this.board[x][y] != 'T') {
                this.board[x][y].hits()
                if (this.board[x][y].isSunk()) {
                    this.board[x][y].alive = false
                }
                this.board[x][y] = 'T'

                return "hit"
            }
            else {
                if (this.board[x][y] == null) {
                    this.board[x][y] = 'X';
                    return "miss"
                }
            }

        },

        //checks if all the ships are sunk
        allshipssunk() {
            let counter = 0;
            for (let i = 0; i < placedships.length; i++) {
                if (placedships[i].alive == false)
                    counter = counter + 1;

            }
            if (counter == placedships.length) { return true }
            else {
                return false
            }


        },

        //creates the board and reinitializes the placeships and board arrays 
        resetarrays() {

            for (let i = 0; i < 10; i++) {
                const row = [];
                for (let j = 0; j < 10; j++) {
                    row.push(null);
                }
                board.push(row);
            }
            return board.length
        }

    }
}


//Initializing both players
export let user = gameboards()
export let computer = {
    computerplayitems: Object.create(gameboards()),
    // logic() {
    //     if (this.trigger) {

    //         for (let i = 0; i < this.computerplayitems.board[0].length; i++) {
    //             for (let j = 0; j < this.computerplayitems.board.length; j++) {
    //                 if (this.computerplayitems.board[i][j] != 'T' && this.computerplayitems.board[i][j] != null) {
    //                     console.log('Ship got hittt');
    //                     break
    //                 }

    //                 else
    //                     continue
    //             }
    //         }
    //     }
    //     else
    //         this.trigger = true;
    // }


}

export function coords(x, y, playerclass) {
    let val
    if (playerclass == "userclass") {
        val = user.receiveAttack(x, y)
        user.allshipssunk()
        return val

    }
    else {
        val = computer.computerplayitems.receiveAttack(x, y)
        computer.computerplayitems.allshipssunk()
        return val

    }



}

