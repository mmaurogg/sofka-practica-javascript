import { Board } from "./objects/Board.js";
import { BoardView } from "./objects/BoardView.js";
import { Ball } from "./objects/Ball.js";
import { Bar } from "./objects/Bar.js";



var board = new Board(800,400);
var bar_1 = new Bar(20,40,40,100, board);
console.log(bar_1);
var bar_2 = new Bar(750,40,40,100, board);
console.log(bar_2);     
var ball = new Ball(350, 100, 10, board);
console.log(ball); 


// game controller

/**
 * Escucha los eventos que suceden en el tablero
 */
document.addEventListener("keydown", (ev)=>{
    
    if(ev.keyCode == 38){
        ev.preventDefault();
        bar_2.up();
    }
    else if(ev.keyCode == 40){
        ev.preventDefault();
        bar_2.down();
    }
    else if(ev.keyCode == 87){
        //w
        ev.preventDefault();
        bar_1.up();
    }
    else if(ev.keyCode == 83){
        //s
        ev.preventDefault();
        bar_1.down();
    }
    else if(ev.keyCode === 32 ){
        ev.preventDefault();
        board.playing = !board.playing;
    }

    console.log( bar_2.toString() )
});


window.requestAnimationFrame(controller)




/**
 * Inicializa el juego
 */
function controller () {

    var canvas = document.getElementById("canvas");
    var board_view = new BoardView(canvas, board);
    board_view.play();

    canvas.append(board_view);

    window.requestAnimationFrame(controller)

}