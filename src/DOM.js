import { coords, jack, john } from "./logic";

let currentPlayerName = "Jack";


export function gamedisplay() {
  const playarea = document.createElement("div");
  playarea.classList.add("playarea");

  const turndisplay = document.createElement("div");
  turndisplay.classList.add("turndisplay");

  playarea.appendChild(turndisplay);

  const boardownerwrapper = document.createElement("div");
  boardownerwrapper.classList.add("boardownerwrapper");
  const boardowner1 = document.createElement("div");
  boardowner1.classList.add("boardowner");
  boardowner1.textContent = "Jack's Board";
  const boardowner2 = document.createElement("div");
  boardowner2.classList.add("boardowner");
  boardowner2.textContent = "John's Board";
  boardownerwrapper.appendChild(boardowner1);
  boardownerwrapper.appendChild(boardowner2);
  playarea.appendChild(boardownerwrapper);

  const playdisplay = document.createElement("div");
  playdisplay.classList.add("playdisplay");
  playarea.appendChild(playdisplay);

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

  playdisplay.appendChild(jackarea);
  playdisplay.appendChild(johnarea);

  document.body.appendChild(playarea);
}


export function DOMcreator() {
  
    /**
     * Creates the board grid for a player.
     * @param {Array<Array<any>>} playerboard - The player's board data.
     * @param {string} boardClass - The class name for the board container.
     */
   
  function createBoardGrid(playerboard, boardClass) {
    const playerGridContainer = document.querySelector(`.${boardClass}`);
    if (!playerGridContainer) {
      console.error(`Container element not found for class: ${boardClass}`);
      return;
    }
    playerGridContainer.innerHTML = "";

    playerboard.forEach((row, i) => {
      const rowcell = document.createElement("div");
      rowcell.classList.add("rowcell");
      row.forEach((cellData, j) => {
        const colcell = document.createElement("div");
        colcell.classList.add("colcell");

        colcell.setAttribute("data-xcords", i);
        colcell.setAttribute("data-ycords", j);
        colcell.setAttribute("data-playerboard", boardClass);

        colcell.classList.add(
          boardClass === "jackclass" ? "jackcell" : "johncell"
        );

        colcell.addEventListener("click", handleCellClick);

        rowcell.appendChild(colcell);
      });
      playerGridContainer.appendChild(rowcell);
    });
  }

  /**
   * Handles the click event on a grid cell.
   * @param {Event} e - The click event object.
   */
  function handleCellClick(e) {
    const cell = e.target;
    const xcords = cell.getAttribute("data-xcords");
    const ycords = cell.getAttribute("data-ycords");
    const targetBoardClass = cell.getAttribute("data-playerboard");

    if (
      (currentPlayerName === "Jack" && targetBoardClass !== "johnclass") ||
      (currentPlayerName === "John" && targetBoardClass !== "jackclass")
    ) {
      console.log("Click on your own board or wrong board for turn!");

      return;
    }

    const result = coords(xcords, ycords, targetBoardClass);

    switch (result) {
      case "hit":
        cell.classList.add("hit");
        break;
      case "miss":
        cell.classList.add("miss");
        break;
      case "already_attacked":
        console.log("Cell already attacked");

        return;
      default:
        break;
    }

    cell.style.pointerEvents = "none";
    cell.style.cursor = "not-allowed";

    let winnerName = null;

    if (targetBoardClass === "johnclass") {
      if (john.allshipssunk()) {
        winnerName = "Jack";
      }
    } else {
      if (jack.allshipssunk()) {
        winnerName = "John";
      }
    }

    if (winnerName) {
      document.querySelector(
        ".turndisplay"
      ).textContent = `${winnerName} WINS!`;
      boardcontrol("jackcell", true);
      boardcontrol("johncell", true);

      return;
    }

    currentPlayerName = currentPlayerName === "Jack" ? "John" : "Jack";
    document.querySelector(
      ".turndisplay"
    ).textContent = `${currentPlayerName}'s Turn`;

    if (currentPlayerName === "Jack") {
      boardcontrol("jackcell", true);
      boardcontrol("johncell", false);
    } else {
      boardcontrol("jackcell", false);
      boardcontrol("johncell", true);
    }
  }

  DOMcreator.createBoardGrid = createBoardGrid;
}

/**
 * Controls the interactivity (pointer events) of player board cells.
 * @param {string} boardCellClass - The class of cells to control ('jackcell' or 'johncell').
 * @param {boolean} disable - True to disable pointer events, false to enable.
 */
export function boardcontrol(boardCellClass, disable) {
  const cells = document.getElementsByClassName(boardCellClass);

  for (let i = 0; i < cells.length; i++) {
    if (
      !cells[i].classList.contains("hit") &&
      !cells[i].classList.contains("miss")
    ) {
      cells[i].style.pointerEvents = disable ? "none" : "auto";

      cells[i].style.cursor = disable ? "not-allowed" : "pointer";
    } else {
      cells[i].style.pointerEvents = "none";
      cells[i].style.cursor = "not-allowed";
    }
  }
}
