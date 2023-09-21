/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DOMcreator: () => (/* binding */ DOMcreator),\n/* harmony export */   boardcontrol: () => (/* binding */ boardcontrol),\n/* harmony export */   gamedisplay: () => (/* binding */ gamedisplay)\n/* harmony export */ });\n/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ \"./src/logic.js\");\n\nfunction gamedisplay() {\n  //creates the main playarea where the game exists\n  const playarea = document.createElement(\"div\");\n  playarea.classList.add(\"playarea\");\n\n  //creates the header to display the respective player's turn\n  const turndisplay = document.createElement(\"div\");\n  turndisplay.classList.add(\"turndisplay\");\n  turndisplay.textContent = \"John's turn\";\n  playarea.appendChild(turndisplay);\n  const boardownerwrapper = document.createElement(\"div\");\n  boardownerwrapper.classList.add(\"boardownerwrapper\");\n  const boardowner1 = document.createElement(\"div\");\n  boardowner1.classList.add(\"boardowner1\");\n  const boardowner2 = document.createElement(\"div\");\n  boardowner2.classList.add(\"boardowner2\");\n  boardowner1.classList.add(\".boardowner1\");\n  boardowner2.classList.add(\".boardowner2\");\n  boardowner1.textContent = \"Jake\";\n  boardowner2.textContent = \"John\";\n  boardownerwrapper.appendChild(boardowner1);\n  boardownerwrapper.appendChild(boardowner2);\n  playarea.appendChild(boardownerwrapper);\n\n  //creates the area for both boards of players\n  const playdisplay = document.createElement(\"div\");\n  playdisplay.classList.add(\"playdisplay\");\n  playarea.appendChild(playdisplay);\n  const computerarea = document.createElement(\"div\");\n  computerarea.classList.add(\"computerarea\");\n  const playerarea = document.createElement(\"div\");\n  playerarea.classList.add(\"playerarea\");\n  const userclass = document.createElement(\"div\");\n  userclass.classList.add(\"userclass\");\n  playerarea.appendChild(userclass);\n  const computerclass = document.createElement(\"div\");\n  computerclass.classList.add(\"computerclass\");\n  computerarea.appendChild(computerclass);\n  playdisplay.appendChild(computerarea);\n  playdisplay.appendChild(playerarea);\n  document.body.appendChild(playarea);\n}\n\n//creates the boards of respective players\nfunction DOMcreator() {\n  function initialize(playerboard, playerclass) {\n    let playergrid = document.getElementsByClassName(playerclass);\n    for (let i = 0; i < playerboard[0].length; i++) {\n      let rowcell = document.createElement(\"div\");\n      rowcell.classList.add(\"rowcell\");\n      for (let j = 0; j < playerboard.length; j++) {\n        const colcell = document.createElement(\"div\");\n        colcell.setAttribute(\"xcords\", i);\n        colcell.setAttribute(\"ycords\", j);\n        colcell.setAttribute(\"playerboard\", playerclass);\n        colcell.addEventListener('click', function work(e) {\n          const xcords = e.target.getAttribute(\"xcords\");\n          const ycords = e.target.getAttribute(\"ycords\");\n          const result = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.coords)(xcords, ycords, playerclass);\n          if (result == \"miss\") {\n            e.target.style.backgroundColor = \"green\";\n          } else if (result == \"hit\") {\n            e.target.style.backgroundColor = \"red\";\n          }\n          if (playerclass == \"userclass\") {\n            colcell.classList.remove(\"usercell\");\n            boardcontrol(\"usercell\", true);\n            boardcontrol(\"computercell\", false);\n          } else {\n            colcell.classList.remove(\"computercell\");\n            boardcontrol(\"computercell\", true);\n            boardcontrol(\"usercell\", false);\n          }\n          colcell.removeEventListener('click', work);\n        });\n        colcell.classList.add(\"colcell\");\n        if (playerclass == \"userclass\") colcell.classList.add(\"usercell\");else colcell.classList.add(\"computercell\");\n        rowcell.appendChild(colcell);\n      }\n      playergrid[0].appendChild(rowcell);\n    }\n    return \"hello\";\n  }\n\n  // this line is needed else the code breaks (required for nested functions)\n  //Check this for recalling https://stackoverflow.com/questions/8817872/javascript-call-nested-function\n  DOMcreator.initialize = initialize;\n}\nfunction boardcontrol(player, toggle) {\n  const turn = document.querySelector(\".turndisplay\");\n  if (_logic__WEBPACK_IMPORTED_MODULE_0__.user.allshipssunk() || _logic__WEBPACK_IMPORTED_MODULE_0__.computer.computerplayitems.allshipssunk()) {\n    if (_logic__WEBPACK_IMPORTED_MODULE_0__.user.allshipssunk()) {\n      turn.textContent = \"Jake WON\";\n    } else {\n      turn.textContent = \"John WON\";\n    }\n    const colcells = document.getElementsByClassName(\"colcell\");\n    for (let i = 0; i < colcells.length; i++) {\n      colcells[i].style.pointerEvents = \"none\";\n    }\n    return;\n  }\n  const val = document.getElementsByClassName(player);\n  if (toggle) {\n    if (player == \"usercell\") {\n      turn.textContent = \"John's turn\";\n    } else {\n      turn.textContent = \"Jake's turn\";\n    }\n    for (let i = 0; i < val.length; i++) {\n      val[i].style.pointerEvents = \"none\";\n    }\n  } else {\n    for (let i = 0; i < val.length; i++) {\n      val[i].style.pointerEvents = \"auto\";\n    }\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/DOM.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ \"./src/logic.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\n\n(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.gamedisplay)();\n_logic__WEBPACK_IMPORTED_MODULE_1__.user.resetarrays();\n_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.resetarrays();\n(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.DOMcreator)();\n_DOM__WEBPACK_IMPORTED_MODULE_0__.DOMcreator.initialize(_logic__WEBPACK_IMPORTED_MODULE_1__.user.board, \"userclass\");\n_DOM__WEBPACK_IMPORTED_MODULE_0__.DOMcreator.initialize(_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.board, \"computerclass\");\nconst usership1 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(3, 0, \"vertical\");\nconst usership2 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(4, 0, \"horizontal\");\nconst usership3 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(3, 0, \"vertical\");\nconst usership4 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(2, 0, \"horizontal\");\n_logic__WEBPACK_IMPORTED_MODULE_1__.user.placement(usership1, 0, 1);\n_logic__WEBPACK_IMPORTED_MODULE_1__.user.placement(usership2, 2, 4);\n_logic__WEBPACK_IMPORTED_MODULE_1__.user.placement(usership3, 5, 1);\n_logic__WEBPACK_IMPORTED_MODULE_1__.user.placement(usership4, 5, 4);\nconst compship1 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(3, 0, \"vertical\");\nconst compship2 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(3, 0, \"horizontal\");\nconst compship3 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(2, 0, \"vertical\");\nconst compship4 = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.ship)(4, 0, \"horizontal\");\n_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.placement(compship1, 1, 1);\n_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.placement(compship2, 3, 3);\n_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.placement(compship3, 5, 2);\n_logic__WEBPACK_IMPORTED_MODULE_1__.computer.computerplayitems.placement(compship4, 8, 4);\n(0,_DOM__WEBPACK_IMPORTED_MODULE_0__.boardcontrol)(\"computercell\", false);\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   computer: () => (/* binding */ computer),\n/* harmony export */   coords: () => (/* binding */ coords),\n/* harmony export */   gameboards: () => (/* binding */ gameboards),\n/* harmony export */   ship: () => (/* binding */ ship),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\n//factory function to create a ship\nfunction ship(length, hitcounter, orientation) {\n  return {\n    length,\n    hitcounter,\n    orientation,\n    hits() {\n      this.hitcounter = this.hitcounter + 1;\n      return this.hitcounter;\n    },\n    isSunk() {\n      if (this.hitcounter == this.length) return true;\n      return false;\n    },\n    alive: true\n  };\n}\n\n//factory function for gamelogic\nfunction gameboards() {\n  let board = [];\n  let placedships = [];\n  return {\n    board,\n    placedships,\n    placement(ship, x, y) {\n      if (ship.orientation == 'vertical') {\n        if (x + ship.length >= 10) return 'Ship goes beyond waters';\n        for (let i = x; i < x + ship.length; i++) {\n          if (this.board[i][y] != null) {\n            return 'Another ship already present';\n          }\n        }\n        for (let i = x; i < x + ship.length; i++) {\n          this.board[i][y] = ship;\n        }\n        placedships.push(ship);\n        return 'Ship placed vertically';\n      } else {\n        if (y + ship.length >= 10) {\n          return 'Ship goes beyond waters';\n        }\n        for (let i = y; i < y + ship.length; i++) {\n          if (this.board[x][i] != null) return 'Another ship already present';\n        }\n        for (let i = y; i < y + ship.length; i++) {\n          this.board[x][i] = ship;\n        }\n        placedships.push(ship);\n        return 'Ship placed horizontally';\n      }\n    },\n    receiveAttack(x, y) {\n      //sends hit function to appropriate ship\n      //or keeps track of missed shot\n      if (this.board[x][y] != null && this.board[x][y] != 'X' && this.board[x][y] != 'T') {\n        this.board[x][y].hits();\n        if (this.board[x][y].isSunk()) {\n          this.board[x][y].alive = false;\n        }\n        this.board[x][y] = 'T';\n        return \"hit\";\n      } else {\n        if (this.board[x][y] == null) {\n          this.board[x][y] = 'X';\n          return \"miss\";\n        }\n      }\n    },\n    //checks if all the ships are sunk\n    allshipssunk() {\n      let counter = 0;\n      for (let i = 0; i < placedships.length; i++) {\n        if (placedships[i].alive == false) counter = counter + 1;\n      }\n      if (counter == placedships.length) {\n        return true;\n      } else {\n        return false;\n      }\n    },\n    //creates the board and reinitializes the placeships and board arrays \n    resetarrays() {\n      for (let i = 0; i < 10; i++) {\n        const row = [];\n        for (let j = 0; j < 10; j++) {\n          row.push(null);\n        }\n        board.push(row);\n      }\n      return board.length;\n    }\n  };\n}\n\n//Initializing both players\nlet user = gameboards();\nlet computer = {\n  computerplayitems: Object.create(gameboards())\n  // logic() {\n  //     if (this.trigger) {\n\n  //         for (let i = 0; i < this.computerplayitems.board[0].length; i++) {\n  //             for (let j = 0; j < this.computerplayitems.board.length; j++) {\n  //                 if (this.computerplayitems.board[i][j] != 'T' && this.computerplayitems.board[i][j] != null) {\n  //                     console.log('Ship got hittt');\n  //                     break\n  //                 }\n\n  //                 else\n  //                     continue\n  //             }\n  //         }\n  //     }\n  //     else\n  //         this.trigger = true;\n  // }\n};\n\nfunction coords(x, y, playerclass) {\n  let val;\n  if (playerclass == \"userclass\") {\n    val = user.receiveAttack(x, y);\n    user.allshipssunk();\n    return val;\n  } else {\n    val = computer.computerplayitems.receiveAttack(x, y);\n    computer.computerplayitems.allshipssunk();\n    return val;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/logic.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.playarea {\n\n    height: 100vh;\n    width: 100vw;\n    background-color: green;\n}\n\n.turndisplay {\n\n    height: 10%;\n    width: 100%;\n    background-color: rgb(104, 10, 10);\n    color: white;\n\n}\n\n.playdisplay {\n    height: 80%;\n    width: 100%;\n    background-color: orange;\n    display: flex;\n}\n\n.computerarea {\n\n    padding: 1%;\n    width: 50%;\n    height: 100%;\n    background-color: red;\n\n}\n\n.playerarea {\n    padding: 1%;\n    width: 50%;\n    height: 100%;\n    background-color: brown;\n}\n\n.turndisplay {\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 300%;\n}\n\n.userclass,\n.computerclass {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n\n}\n\n.rowcell {\n    display: flex;\n    flex: 1\n}\n\n.colcell {\n    flex: 1;\n    background-color: black;\n\n}\n\n.computercell,\n.usercell {\n    pointer-events: none;\n}\n\n.boardownerwrapper {\n    height: 10%;\n    width: 100%;\n    background-color: maroon;\n    display: flex;\n}\n\n.boardowner1,\n.boardowner2 {\n\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 250%;\n    font-family: Verdana, Geneva, Tahoma, sans-serif;\n    color: white;\n\n\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;