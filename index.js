

    class Board {
        constructor (width, height) {
            this.width = width;
            this.height = height;
            this.player = false;
            this.game_over = false;
            this.bars= [];
            this.ball = null;
        }

        get elements(){
            var elements = this.bars;
            elements.push(this.ball);

            return elements;
        }

    }

    class BoardView {
        constructor (canvas, board) {
            this.canvas = canvas;
            this.canvas.width = board.width;
            this.canvas.height = board.height;
            this.board = board;
            this.ctx = canvas.getContext("2d");
        }

        draw = () => {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);
            }
        } 

        clean = () => {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        }

        play = () => {
            this.clean();
            this.draw();
        }
    }

    class Ball {
        constructor(x, y, radius, board){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speed_y = 0;
            this.speed_y = 3; 
            this.board = board;

            board.ball = this;
            this.kind = "circle";

        };

    }

    function draw(ctx, element){
    
        switch(element.kind){
        case "rectangle":
            ctx.fillRect(element.x, element.y, element.width, element.height);
            break;

        case "circle":
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.radius, 0, 7);
            ctx.fill();
            ctx.closePath();
            break;
            
        }
    }

    class Bar {
        constructor(x,y,width,height,board){
            this.x = x;
            this.y = y;
            this.height = height;
            this.width = width;
            this.board = board;
            
            this.kind = "rectangle";
            this.speed = 10;

            this.board.bars.push(this);
        }

        down = () => {
            this.y += this.speed; 

        };

        up = () => {
            this.y -= this.speed;

        }

        toString = () =>{
            return "x: "+ this.x + "\ny: " + this.y;
        }
    }

    var board = new Board(800,400);
    var bar_1 = new Bar(20,100,40,100, board);
    console.log(bar_1);
    var bar_2 = new Bar(750,100,40,100, board);
    console.log(bar_2);     
    var ball = new Ball(350, 100, 10, board);
    console.log(ball); 



document.addEventListener("keydown", (ev)=>{
    
    ev.preventDefault();

    if(ev.keyCode == 38){
        bar_1.up();
    }

    else if(ev.keyCode == 40){
        bar_1.down();
    }

    else if(ev.keyCode == 87){
        //w
        bar_2.up();
    }

    else if(ev.keyCode == 83){
        //s
        bar_2.down();
    }
    console.log( bar_2.toString() )
});

//window.addEventListener("load",controller);
window.requestAnimationFrame(controller)

function controller () {


    var canvas = document.getElementById("canvas");
    var board_view = new BoardView(canvas, board);

    board_view.play();

    

    window.requestAnimationFrame(controller)

    canvas.append(board_view);
}