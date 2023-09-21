import { coords, user, computer } from "./logic"

export function gamedisplay() {
    //creates the main playarea where the game exists
    const playarea = document.createElement("div")
    playarea.classList.add("playarea")



    //creates the header to display the respective player's turn
    const turndisplay = document.createElement("div")
    turndisplay.classList.add("turndisplay")
    turndisplay.textContent = "John's turn"
    playarea.appendChild(turndisplay)
    const boardownerwrapper = document.createElement("div")
    boardownerwrapper.classList.add("boardownerwrapper")
    const boardowner1 = document.createElement("div")
    boardowner1.classList.add("boardowner1")
    const boardowner2 = document.createElement("div")
    boardowner2.classList.add("boardowner2")
    boardowner1.classList.add(".boardowner1")
    boardowner2.classList.add(".boardowner2")
    boardowner1.textContent = "Jake"
    boardowner2.textContent = "John"
    boardownerwrapper.appendChild(boardowner1)
    boardownerwrapper.appendChild(boardowner2)
    playarea.appendChild(boardownerwrapper)



    //creates the area for both boards of players
    const playdisplay = document.createElement("div")
    playdisplay.classList.add("playdisplay")
    playarea.appendChild(playdisplay)




    const computerarea = document.createElement("div")
    computerarea.classList.add("computerarea")



    const playerarea = document.createElement("div")
    playerarea.classList.add("playerarea")



    const userclass = document.createElement("div")
    userclass.classList.add("userclass")
    playerarea.appendChild(userclass)

    const computerclass = document.createElement("div")
    computerclass.classList.add("computerclass")
    computerarea.appendChild(computerclass)



    playdisplay.appendChild(computerarea)
    playdisplay.appendChild(playerarea)
    document.body.appendChild(playarea)
}




//creates the boards of respective players
export function DOMcreator() {


    function initialize(playerboard, playerclass) {
        let playergrid = document.getElementsByClassName(playerclass)

        for (let i = 0; i < playerboard[0].length; i++) {
            let rowcell = document.createElement("div")
            rowcell.classList.add("rowcell")
            for (let j = 0; j < playerboard.length; j++) {
                const colcell = document.createElement("div")
                colcell.setAttribute("xcords", i)
                colcell.setAttribute("ycords", j)
                colcell.setAttribute("playerboard", playerclass)
                colcell.addEventListener('click', function work(e) {

                    const xcords = e.target.getAttribute("xcords")
                    const ycords = e.target.getAttribute("ycords")
                    console.log(xcords, ycords)
                    const result = coords(xcords, ycords, playerclass)
                    if (result == "miss") {
                        e.target.style.backgroundColor = "green"
                    }
                    else if (result == "hit") {
                        e.target.style.backgroundColor = "red"

                    }
                    if (playerclass == "userclass") {
                        colcell.classList.remove("usercell")

                        boardcontrol("usercell", true)
                        boardcontrol("computercell", false)
                    }
                    else {
                        colcell.classList.remove("computercell")
                        boardcontrol("computercell", true)
                        boardcontrol("usercell", false)
                    }
                    colcell.removeEventListener('click', work)
                })
                colcell.classList.add("colcell")
                if (playerclass == "userclass")
                    colcell.classList.add("usercell")
                else
                    colcell.classList.add("computercell")
                rowcell.appendChild(colcell)

            }
            playergrid[0].appendChild(rowcell)
        }
        return "hello"
    }

    // this line is needed else the code breaks (required for nested functions)
    //Check this for recalling https://stackoverflow.com/questions/8817872/javascript-call-nested-function
    DOMcreator.initialize = initialize
}

export function boardcontrol(player, toggle) {
    const turn = document.querySelector(".turndisplay")

    if (user.allshipssunk() || computer.computerplayitems.allshipssunk()) {

        if (user.allshipssunk()) {
            turn.textContent = "Jake WON"
        }
        else {
            turn.textContent = "John WON"

        }



        const colcells = document.getElementsByClassName("colcell")
        for (let i = 0; i < colcells.length; i++) {
            console.log()
            colcells[i].style.pointerEvents = "none"
        }
        return

    }


    const val = document.getElementsByClassName(player)
    if (toggle) {
        if (player == "usercell") {
            turn.textContent = "John's turn"
        }
        else {
            turn.textContent = "Jake's turn"

        }

        for (let i = 0; i < val.length; i++) {
            val[i].style.pointerEvents = "none"
        }


    }
    else {

        for (let i = 0; i < val.length; i++) {
            val[i].style.pointerEvents = "auto"
        }

    }
}