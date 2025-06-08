let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let winner = document.querySelectorAll(".score-board");
let win = document.getElementById("win");
let resetBtn = document.getElementById("reset");
let clickSound = document.getElementById("clickSound");
let winSound = document.getElementById("winSound");
let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();
        if (turn0) {
            box.innerHTML = "0";
            turn0 = false;
        } else {
            box.innerHTML = "X"
            turn0 = true;
        }

        box.disabled = true;

        if (checkWinner() == true) {
            winSound.play();
            resetGame();
            return;
        }

        count++;
        if (count == 9) {
            alert("Draw!! Game Will Rest In 3 Seconds!!")
            resetGame();
        }
    })
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 != "_" && val2 != "_" && val3 != "_") {
            console.log(val1);
            if (val1 == val2 && val2 == val3) {
                winner[1].classList.add("winner");
                win.innerText = val1;

                if (val1 == "X") {
                    let winX = document.getElementById("x");
                    winX.innerText = parseInt(winX.innerText) + 1;;
                } else {
                    let win0 = document.getElementById("zero");
                    win0.innerText = parseInt(win0.innerText) + 1;;
                }

                return true;
            }
        }
    }
};

function resetGame() {
    boxes.forEach((box) => box.disabled = true);

    setTimeout(() => {
        boxes.forEach((box) => {
            box.innerText = "_";
            box.disabled = false;
        })
        turn0 = true;
        count = 0;
        win.innerText = " ";
        winner[1].classList.remove("winner");
    }, 3000)
}

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "_";
        box.disabled = false;
    })
    turn0 = true;
    count = 0;
    win.innerText = " ";
})