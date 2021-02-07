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
    let x = get_cords(this)[0];

    for(let i = GRID_H; i != 0; i--) {
        console.log(i*GRID_W + x);
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

            break;
        }
    }

    // check whole board:    

    // switch player:
    current_player = !current_player;
    hover_square(square);
    console.log(current_player);

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