/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n//factory function to create a ship\nfunction ship(length, hitcounter, orientation) {\n    return {\n        length,\n        hitcounter,\n        orientation,\n        hits() {\n            this.hitcounter = this.hitcounter + 1;\n            return this.hitcounter;\n        },\n        isSunk() {\n            if (this.hitcounter == this.length)\n                return true;\n            return false\n        },\n        alive: true\n    }\n}\n\n\n//factory function for gamelogic\nfunction gameboards() {\n    let board = []\n    let placedships = []\n    return {\n        board,\n        placedships,\n        placement(ship, x, y) {\n            if (ship.orientation == 'vertical') {\n                if (x + ship.length >= 10)\n                    return ('Ship goes beyond waters')\n                for (let i = x; i < x + ship.length; i++) {\n                    if (board[i][y] != null) {\n                        return ('Another ship already present')\n                    }\n                }\n                for (let i = x; i < ship.length; i++) {\n                    board[i][y] = ship;\n                }\n                placedships.push(ship)\n                return 'Ship placed vertically'\n            }\n            else {\n                if (y + ship.length >= 10) {\n                    return ('Ship goes beyond waters')\n                }\n                for (let i = y; i < y + ship.length; i++) {\n                    if (board[x][i] != null)\n                        return ('Another ship already present')\n                }\n                for (let i = y; i < y + ship.length; i++) {\n                    board[x][i] = ship\n                }\n                placedships.push(ship)\n                return 'Ship placed horizontally'\n            }\n        },\n\n\n        receiveAttack(x, y) {\n            //sends hit function to appropriate ship\n            //or keeps track of missed shot\n            if (board[x][y] != null && board[x][y] != 'X' && board[x][y] != 'T') {\n                board[x][y].hits()\n                if (board[x][y].isSunk()) {\n                    board[x][y].alive = false\n                }\n                board[x][y] = 'T'\n\n                return 'hit'\n            }\n            else {\n                if (board[x][y] == null)\n                    board[x][y] = 'X';\n                return 'miss'\n            }\n\n        },\n\n        //checks if all the ships are sunk\n        allshipssunk() {\n            let counter = 0;\n            for (let i = 0; i < placedships.length; i++) {\n                if (placedships[i].alive == false)\n                    counter = counter + 1;\n\n            }\n            if (counter == placedships.length) { return true }\n            else {\n                return false\n            }\n\n\n        },\n\n        //creates the board and reinitializes the placeships and board arrays \n        resetarrays() {\n            placedships = []\n            board = []\n            for (let i = 0; i < 10; i++) {\n                const row = [];\n                for (let j = 0; j < 10; j++) {\n                    row.push(null);\n                }\n                board.push(row);\n            }\n        }\n\n    }\n}\n\nlet player = gameboards()\nlet computer = {\n    trigger: false,\n    computerplayitems: Object.create(gameboards()),\n    boardformation() {\n        for (let i = 0; i < 10; i++) {\n            const row = [];\n            for (let j = 0; j < 10; j++) {\n                row.push(null);\n            }\n            this.computerplayitems.board.push(row);\n        }\n        return this.computerplayitems.board\n    },\n    logic() {\n        if (this.trigger) {\n\n            for (let i = 0; i < this.computerplayitems.board[0].length; i++) {\n                for (let j = 0; j < this.computerplayitems.board.length; j++) {\n                    if (this.computerplayitems.board[i][j] != 'T' && this.computerplayitems.board[i][j] != null) {\n                        console.log('Ship got hittt');\n                        break\n                    }\n\n                    else\n                        continue\n                }\n            }\n        }\n        else\n            this.trigger = true;\n    }\n\n}\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;