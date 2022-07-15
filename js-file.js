const Board = (() => {
    let array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    function reset(moves) {
        this.array = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        moves.forEach((move) => {
            move.textContent = "";
        })
    };
    function getArray(x, y) {
        return this.array[x][y];
    };
    function move(x, y, mark) {
        this.array[x][y] = mark;
    };
    function render(x, y) {
        document.getElementById(x+y).textContent = this.array[x][y];
    }
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
        reset, getArray, move, render, winner
    };
})();

const Game = (() => {
    let turn = 0;

    const xScore = document.querySelector(".xScore p");
    const oScore = document.querySelector(".oScore p");
    const result = document.querySelector(".result");
    const moves = document.querySelectorAll(".container div");
    moves.forEach((move) => {
        move.addEventListener('click', () => {
            const x = move.id[0];
            const y = move.id[1];
            if (!Board.getArray(x, y)) {
                input(x, y);
                update();
                render(x, y);
                endGame();
            }
        })
    })

    function init() {
        Board.reset(moves);
        result.textContent = "";
    }
    function input(x, y) {
        Board.move(x, y, (turn % 2 === 0) ? "x" : "o");        
    }
    function update(x, y) {
        turn++;
    }
    function render(x, y) {
        Board.render(x, y);
    }
    function endGame() {
        if (Board.winner()) {
            result.textContent = Board.winner().toUpperCase() + " won! Replay?";

            if (Board.winner() === "x") xScore.textContent = parseInt(xScore.textContent, 10)+1;
            else if (Board.winner() === "o") oScore.textContent = parseInt(oScore.textContent, 10)+1;
            else result.textContent = "Tie! Replay?";
        }
    }

    return {
        init, input, update, render, endGame, turn
    };
})();

Game.init();
