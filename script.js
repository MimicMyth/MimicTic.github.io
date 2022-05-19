var gridContainer = document.getElementById('grid-container');
createLayoutObject();

//model
var currenMovesNum = 0;
var whosTurn = 1;
var gameList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const imagex = 'images/x.png';
const imageo = 'images/o.png';

function resetGame() {
    currenMovesNum = 0;
    whosTurn = 1;
    gameList = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function checkIfOccupied(row, col) {
    return gameList[row][col] != 0;
}

//view
function createLayoutObject() {
    gridContainer.innerHTML = /*HTML*/ `
                <div class="grid-item" row="0" col="0" onclick="nextMove(this)"></div>
                <div class="grid-item" row="0" col="1" onclick="nextMove(this)"></div>
                <div class="grid-item" row="0" col="2" onclick="nextMove(this)"></div>

                <div class="grid-item" row="1" col="0" onclick="nextMove(this)"></div>
                <div class="grid-item" row="1" col="1" onclick="nextMove(this)"></div>
                <div class="grid-item" row="1" col="2" onclick="nextMove(this)"></div>

                <div class="grid-item" row="2" col="0" onclick="nextMove(this)"></div>
                <div class="grid-item" row="2" col="1" onclick="nextMove(this)"></div>
                <div class="grid-item" row="2" col="2" onclick="nextMove(this)"></div>
    `;
}

function placeImageObject(gridCell) {
    if (whosTurn == 1) {
        gridCell.innerHTML = '<img src=' + imagex + ' class="imageCell">';
    } else {
        gridCell.innerHTML = '<img src=' + imageo + ' class="imageCell">';
    }
}

function resetBoard() {
    var cells = document.getElementsByClassName('grid-item');
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
}

function winAlert() {
    if (whosTurn == 1) {
        showPopUp();
        setTimeout(closePopUp, 3000);
        setTimeout(reload, 3000);
    }
    else {
        showPopUp2();
        setTimeout(closePopUp, 3000);
        setTimeout(reload, 3000);
    }

}
function closePopUp() {
    myPopup.style.display = "none";
    
}

function showPopUp() {
    document.getElementById('myPopup').innerHTML= /*HTML*/ `
    <span>X WON THE GAME!</span> `;
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
function showPopUp2() {
    document.getElementById('myPopup').innerHTML= /*HTML*/ `
    <span>O WON THE GAME!</span> `;
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function reload() {
    location.reload();
}

//controller
function calculateWin(row, col) {
    if ((gameList[row][0] == whosTurn && gameList[row][1] == whosTurn && gameList[row][2] == whosTurn)
        || (gameList[0][col] == whosTurn && gameList[1][col] == whosTurn && gameList[2][col] == whosTurn)) {
        return true;
    } else {
        if (row == 0 && col == 0
            || (row == 2 && col == 2)) {
            if (gameList[0][0] == whosTurn && gameList[2][2] == whosTurn && gameList[1][1] == whosTurn) {
                return true;
            }
        } else if (row == 0 && col == 2
            || (row == 2 && col == 0)) {
            if (gameList[0][2] == whosTurn && gameList[2][0] == whosTurn && gameList[1][1] == whosTurn) {
                return true;
            }
        } else if (row == 1 && col == 1) {
            if ((gameList[0][0] == whosTurn && gameList[2][2] == whosTurn && gameList[1][1] == whosTurn)
                || (gameList[0][2] == whosTurn && gameList[2][0] == whosTurn && gameList[1][1] == whosTurn)) {
                return true;
            }
        }
    }

    return false;

}

function nextMove(gridCell) {
    var row = parseInt(gridCell.getAttribute('row'));
    var col = parseInt(gridCell.getAttribute('col'));

    if (checkIfOccupied(row, col)) {
        return;
    }

    gameList[row][col] = whosTurn;
    var ifWon = calculateWin(row, col);

    if (ifWon) {
        winAlert();
        resetBoard();
        resetGame();
    } else {
        placeImageObject(gridCell);

        if (whosTurn == 1) {
            whosTurn = 2;
        } else if (whosTurn == 2) {
            whosTurn = 1;
        }

        currenMovesNum++;

        if (currenMovesNum == 9) {
            resetBoard();
            resetGame();
        }

    }
}

