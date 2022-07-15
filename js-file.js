const gameBoard = (() => {
    function reset() {
        this.array = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    };
    function getArray(x, y) {
        return this.array[x][y];
    };
    function move(x, y, mark) {
        this.array[x][y] = mark;
    };
    function winner() {
        if (this.array[0][0] && this.array[0][0] === this.array[1][1] && this.array[0][0] === this.array[2][2]) {
            return this.array[0][0];
        }
        if (this.array[0][2] && this.array[0][2] === this.array[1][1] && this.array[0][2] === this.array[2][0]) {
            return this.array[0][2];
        }
        for (let i = 0; i < 3; i++) {
            if (this.array[i][0] && this.array[i][0] === this.array[i][1] && this.array[i][0] === this.array[i][2]) {
                return this.array[i][0];
            }
            if (this.array[0][i] && this.array[0][i] === this.array[1][i] && this.array[0][i] === this.array[2][i]) {
                return this.array[0][i];
            }
        }
        let tie = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.array[i][j]) tie = false;
            }
        }
        if (tie) return 'tie';
    }

    return {
        reset, getArray, move, winner
    };
})();

const displayController = (() => {
    const moves = document.querySelectorAll(".container div");
    const xName = document.querySelector(".xScore span");
    const oName = document.querySelector(".oScore span");
    const xScore = document.querySelector(".xScore p");
    const oScore = document.querySelector(".oScore p");
    const result = document.querySelector(".result");

    function reset() {
        result.textContent = "";
        moves.forEach((move) => {
            move.textContent = "";
        })
    }
    function preview(x, y, mark) {
        if (mark) {
            document.getElementById(x + y).textContent = mark;
            document.getElementById(x + y).style.color = "rgba(0,0,0,0.5)";
        }
        else {
            document.getElementById(x + y).textContent = '';
        }
    }
    function render(x, y) {
        document.getElementById(x + y).textContent = gameBoard.array[x][y];
        document.getElementById(x + y).style.color = "black";
    }
    function endGame() {
        if (gameBoard.winner()) {
            if (gameBoard.winner() === "x") {
                xScore.textContent = parseInt(xScore.textContent, 10) + 1;
                result.textContent = xName.textContent + " won! Replay?";
            }
            else if (gameBoard.winner() === "o") {
                oScore.textContent = parseInt(oScore.textContent, 10) + 1;
                result.textContent = oName.textContent + " won! Replay?";
            }
            else result.textContent = "Tie! Replay?";
        }
    }
    return {
        reset, render, preview, endGame
    }
})();

const Game = (() => {
    let turn = 0;
    const title = document.getElementsByClassName("title");
    const moves = document.querySelectorAll(".container div");

    title[0].addEventListener('click', () => {
        init();
    });
    moves.forEach((move) => {
        ['click', 'mouseover', 'mouseout'].forEach(evt =>
            move.addEventListener(evt, () => {
                const x = move.id[0];
                const y = move.id[1];
                if (!gameBoard.getArray(x, y) && !gameBoard.winner()) {
                    if (evt === 'click') {
                        input(x, y);
                        update();
                        render(x, y);
                        endGame();
                    }
                    else if (evt === 'mouseover') {
                        displayController.preview(x, y, (turn % 2 === 0) ? "x" : "o");
                    }
                    else if (evt === 'mouseout') {
                        displayController.preview(x, y, "");
                    }
                }
            })
        );
    })

    function init() {
        gameBoard.reset();
        displayController.reset();
        turn = 0;
    }
    function input(x, y) {
        gameBoard.move(x, y, (turn % 2 === 0) ? "x" : "o");
    }
    function update() {
        turn++;
    }
    function render(x, y) {
        displayController.render(x, y, (turn % 2 === 0) ? "x" : "o");
    }
    function endGame() {
        displayController.endGame();
    }

    return {
        init
    };
})();

Game.init();
