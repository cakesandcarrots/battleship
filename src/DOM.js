import { coords } from "./logic"

export function gamedisplay() {
    //creates the main playarea where the game exists
    const playarea = document.createElement("div")
    playarea.classList.add("playarea")



    //creates the header to display the respective player's turn
    const turndisplay = document.createElement("div")
    turndisplay.classList.add("turndisplay")
    turndisplay.textContent = "Dummy text"
    playarea.appendChild(turndisplay)



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
                colcell.addEventListener('click', function (e) {
                    const xcords = e.target.getAttribute("xcords")
                    const ycords = e.target.getAttribute("ycords")
                    const result = coords(xcords, ycords, playerclass)
                    if (result == "miss") {
                        e.target.style.backgroundColor = "green"
                    }
                    else if (result == "hit") {
                        e.target.style.backgroundColor = "red"

                    }

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
    let val = document.getElementsByClassName(player)
    if (toggle) {

        for (let i = 0; i < val; i++) {
            val[i].classList.remove(player)
        }
    }
    else {
        for (let i = 0; i < val; i++) {
            val[i].classList.add(player)
        }
    }
}