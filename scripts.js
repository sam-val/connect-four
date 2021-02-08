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
    for(let j=0; j < 2; j++) {
        for(let i=1; i <= 3;i++) {
            let new_i = i;
            if (j == 1) {
                new_i = i * -1; 
            }
            let new_x = x + new_i;
            if (GRID_W-1 >= new_x && new_x >= 0) {
                let on_square = squares[y*GRID_W + new_x];
                if (!on_square.classList.contains(colour)) {
                    break;
                }else {
                    if (Math.abs(new_x - x) >= 3) {
                        return rs = colour;
                    }
                }
            }
        }
    }

    // check vertically:
    for(let j=0; j < 2; j++) {
        for(let i=1; i <= 3;i++) {
            let new_i = i;
            if (j == 1) {
                new_i = i * -1; 
            }
            let new_y = y + new_i;
            if (GRID_H >= new_y && new_y >= 1) {
                let on_square = squares[new_y*GRID_W + x];
                if (!on_square.classList.contains(colour)) {
                    break;
                }else {
                    if (Math.abs(new_y - y) >= 3) {
                        return rs = colour;
                    }
                }
            }

        }
        
    }

    // check diagonally:
    for(let i=0; i < 4; i++) {
        for(let j=1; j <=3; j++ ) {
                let offset_x = j;
                let offset_y = j;
                if (i > 1) {
                    offset_x = j * -1;
                }
                if (i % 2 != 0) {
                    offset_y = j * -1;
                }

                let new_x = x + offset_x;
                let new_y = y + offset_y;
                
                if (GRID_W-1 >= new_x && new_x >= 0 && GRID_H >= new_y && new_y >= 1) {
                    let on_square = squares[new_y*GRID_W + new_x];
                    if (!on_square.classList.contains(colour)) {
                        break;
                    }else {
                        if (Math.abs(new_x - x) >= 3) {
                            return rs = colour;
                        }
                    }
                }

        }
    }

    return rs;
}
