const GRID_W = 7;
const GRID_H = 6;

const grid = document.querySelector(".grid");
var hovered_square = null;
var current_player = false; // false is red -- true is blue

// make the board:
make_board()

function make_board() {
    for(let y = 0; y < GRID_H + 1; y++) {
        for(let x = 0; x < GRID_W; x++) {
            // make a element:
            var square = document.createElement("div");
            square.setAttribute("width", 50);
            square.setAttribute("data-x", x);
            square.setAttribute("data-y", y);
            
            if (y != 0) {
                square.classList.add("default");
            } else {
                square.classList.add("white");
            }

            square.addEventListener("click", click_square);
            square.addEventListener("mouseover", function() {
                console.log('hello');
                hover_square(this);
            });


            // add to grid:
            grid.appendChild(square);

        }
    }
}

function get_cords(square) {
    let x = parseInt(square.getAttribute("data-x")); 
    let y = parseInt(square.getAttribute("data-y")); 
    return [x, y];
}

function click_square() {
    let [x,y] = get_cords(this);

    for(let i = GRID_H; i != 0; i--) {
        var square = grid.children[i*GRID_W + x];
        // if not taken:
        if (square.classList.contains("default")) {
            square.classList.remove("default");
            if (current_player) {
                square.className = "";
                square.classList.add("blue");
            } else {
                square.className = "";
                square.classList.add("red");
            }
            let winner = check_board(square);
            if (winner) {
                winner = winner.toUpperCase();
                setTimeout(function () {
                    alert(`${winner} won the game!. Click OK to play again.`);
                    reset_game();
                }, 100)

            }
            break;
        }
    }

    // switch player:
    current_player = !current_player;
    hover_square(square);

}

function reset_game() {
    // clear board:
    for (let x=0; x < GRID_W; x++) {
       for (let y =1; y < GRID_H+1; y++) {
            let square = grid.children[y*GRID_W + x];
            square.className = "";
            square.classList.add("default");
       }
    }
}

function hover_square(square) {
    let [x,y] = get_cords(square);
    if ( hovered_square != null) {
        // reset img:
        hovered_square.className = "";
        hovered_square.classList.add("white");
          
    }
    hovered_square = grid.querySelectorAll(`[data-x="${x}"]`, `[data-y="0"]`)[0];

    if (current_player) {
        hovered_square.classList.remove("white");
        hovered_square.classList.add("blue_top");
    } else {
        hovered_square.classList.remove("white");
        hovered_square.classList.add("red_top");
    }
}

function check_board(current_square) {
    // check for 4 reds or blues in a row...
    let [x,y] = get_cords(current_square);
    let colour = current_player ? "blue" : "red";
    let squares = grid.children;
    let rs = false;

    // check horizontally:
    var n = 0;
    previous = false;
    for(let i = 0; i < GRID_W; i++) {
        let on_square = squares[y*GRID_W + i];
        if (on_square.classList.contains(colour)) {
            if (n === 0 || (previous === true)) {
                n++;
            }
            previous = true;
        } else {
            previous = false;
            n = 0;
        }
        if (n > 3) {
            return rs = colour;
        }
    }
    n = 0;
    previous = false;

    // check vertically:
    for(let i = 1; i < GRID_H+1; i++) {
        console.log("n is ", n);
        let on_square = squares[i*GRID_W + x];
        if (on_square.classList.contains(colour)) {
            if (n === 0 || (previous === true)) {
                n++;
            }
            previous = true;
        } else {
            previous = false;
            n = 0;
        }
        if (n > 3) {
            return rs = colour;
        }
    }
    n = 0;
    previous = false;

    // check diagonally:

    // top left diagonal:
    let left_x = x, left_y= y, right_x = x, right_y = y; 

    while (left_x > 0 && left_y > 1) {
        left_x--;
        left_y--;
    }
    while(left_x <= GRID_W-1 && left_y <= GRID_H) {
        console.log(left_x, left_y);
        let on_square = squares[left_y*GRID_W + left_x];
        if (on_square.classList.contains(colour)) {
            if (n === 0 || (previous === true)) {
                n++;
            }
            previous = true;
        } else {
            previous = false;
            n = 0;
        }
        if (n > 3) {
            return rs = colour;
        }
        left_x++;
        left_y++;
    }

    n = 0;
    previous = false;

    // top right diagonal:
    while (right_x < GRID_W-1 && right_y > 1) {
        right_x++;
        right_y--;
    }
    while(right_x >= 0 && right_y <= GRID_H) {
        // console.log(right_x, right_y)
        let on_square = squares[right_y*GRID_W + right_x];
        if (n > 3) {
            return rs = colour;
        }
        if (on_square.classList.contains(colour)) {
            if (n === 0 || (previous === true)) {
                n++;
            }
            previous = true;
        } else {
            previous = false;
            n = 0;
        }
        if (n > 3) {
            return rs = colour;
        }
        right_x--;
        right_y++;
    }
    return rs;
}
