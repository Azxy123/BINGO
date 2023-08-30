const container = document.querySelector('.grid-container');
const reset = document.querySelector('.reset');
const undo = document.querySelector('.undo');
let undovar = [];
let countundo = 0;
const play = document.querySelector('.play');
const items = document.querySelectorAll('.grid-item');
const item = document.querySelector('.grid-item');
const done = document.querySelector('.done');
// for inner value of boxes
let x = 1;
// after game over make run old add function's functionality
let y = 0;
// possible pair combination
let combination = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
// to check the div on user clicked is in combination or not
let position = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
// after finding match combination store in empty array
let newcombination = [];
let finalcombination = [];


// for add number in boxes functionality
// for add number in boxes functionality 
container.addEventListener('click', (e) => {
    // for not click on outer box
    if (e.target.className === "grid-item" && y == 0) {
        // for select only one box at a time
        if (e.target.innerHTML === "") {
            let box = e.target;
            box.classList.add(`v${x}`);
            box.innerHTML = x;
            undovar = [...undovar, e.target.classList[1]];
            x += 1;
            countundo = 0;
        }
    }
});


// for reset button functionality
// for reset button functionality
reset.addEventListener('click', allreset);
function allreset() {
    undovar = [];
    reset.classList.add('fa-bounce');
    setTimeout(() => {
        reset.classList.remove('fa-bounce');
    }, 500);
    y = 0;
    items.forEach(item => {
        item.innerHTML = '';
        x = 1;
        item.classList.remove('op')
        item.classList.remove(item.classList[1]);
    });
    // for reset akshu name when reset btn clicked
    // for reset akshu name when reset btn clicked
    for (let i = 1; i <= finalcombination.length; i++) {
        document.querySelector(`.span${i}`).style.opacity = '0';
    }
}
// for all play and play button functionality
// for all play and play button functionality
function allplay() {
    play.classList.add('fa-bounce');
    setTimeout(() => {
        play.classList.remove('fa-bounce');
    }, 500);
}
// for play button functionality
// for play button functionality
play.addEventListener('click', () => {
    if (x === 26) {
        // to add button bounce animation
        allplay()
        // after game over make run old add function's functionality
        y = 1;
        container.addEventListener('click', (e) => {
            if (e.target.classList[0] == "grid-item" && y === 1) {
                var forbold = e.target;
                forbold.classList.add('op');
                position[e.target.attributes.value.value] = 1;
                // to check user selected div is in combination or not we have user for of loop
                for (c of combination) {
                    if (position[c[0]] == 1 && position[c[1]] == 1 && position[c[2]] == 1 && position[c[3]] == 1 && position[c[4]] == 1) {
                        // once we find match combination pair we store in empty Array
                        newcombination.push(c);
                        // but here is one problem is that once we found pair it will store that pair agian and again till last so for that we use set method to remove duplicate pair and again store in new empty array 
                        finalcombination = [...new Set(newcombination)];
                        for (let i = 1; i <= finalcombination.length; i++) {
                            document.querySelector(`.span${i}`).style.opacity = '1';
                        }
                        if (finalcombination.length === 5) {
                            y = 0;
                        }
                    }
                }
            }
        })
    } else {
        allplay()
        setTimeout(() => {
            alert("First Make Your Strategy")
        }, 1);
    }
});

// for done btn functionality
// for done btn functionality
// for done btn functionality

done.addEventListener('click', () => {
    if (finalcombination.length == 5) {
        allreset();
        position = [];
        newcombination = [];
        finalcombination = [];
        setTimeout(() => {
            for (let i = 1; i <= 5; i++) {
                document.querySelector(`.span${i}`).style.opacity = '0';
            }
        }, 3000)
    }
    else {
        alert('First Play Game');
    }
})



// for undo btn functionality
// for undo btn functionality
// for undo btn functionality
// for undo btn functionality

undo.addEventListener('click', (e) => {
    if (y === 0) {
        let len = undovar.length - 1 - countundo;
        let undoele = document.querySelector(`.${undovar[len]}`);
        undoele.classList.remove(`${undovar[len]}`);
        undoele.innerHTML = "";
        x -= 1;
        countundo += 1;
    }
})



