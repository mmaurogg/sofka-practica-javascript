

    class Board {
        constructor (width, height) {
            this.width = width;
            this.height = height;
            this.player = false;
            this.game_over = false;
            this.bars= [];
            this.ball = null;
            this.playing = false;
        }

        get elements(){
            var elements = this.bars.map((bar)=> { return bar; });
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
            this.board.elements.forEach(element => {
                draw(this.ctx, element);
            });
        } 

        clean = () => {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        }

        checkCollisions = () => {
            this.board.bars.forEach(element => {
                var bar = element;
                if(hit(bar, this.board.ball)){
                    this.board.ball.collision(bar);
                }
            });
        }

        play = () => {
            if(this.board.playing){
                this.clean();
                this.draw();
                this.checkCollisions();
                this.board.ball.move();
            }
            
        }
    }

class Ball {
    constructor(x, y, radius, board){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed_X = 3;
    this.speed_Y = 0; 
    this.board = board;
    this.direction = 1;
    this.kind = "circle";
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI / 12;
    this.speed = 3;

    board.ball = this;
    } 

    get width(){
        return this.radius * 2;
    }

    get height(){
        return this.radius * 2;
    }
    
    move = () => {
        this.x += (this.speed_X);
        this.y += (this.speed_Y * this.direction);
    }

    collision = (bar) =>{
        var relative_intersect_y = ( bar.y + (bar.height / 2)) - this.y;
        var normalized_intersect_y = relative_intersect_y + (bar.height / 2);

        this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

        this.speed_Y = this.speed * -1*(Math.sin(this.bounce_angle));
        this.speed_X = this.speed * Math.cos(this.bounce_angle);

//---------------------
        this.direction = (this.x > (this.board.width / 2))? -1 : 1;

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

//a= barr b=ball
function hit(a , b){
    
    var hit = false;

    //colision board
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        if(b.y + b.height >= a.y && b.y < a.y + a.height){
            hit = true;
        }
    }

    // colicion a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            hit = true;
        }
    }

    // colision b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            hit = true;
        }
    }

    return hit;
}


// game controller


    var board = new Board(800,400);
    var bar_1 = new Bar(20,100,40,100, board);
    console.log(bar_1);
    var bar_2 = new Bar(750,100,40,100, board);
    console.log(bar_2);     
    var ball = new Ball(350, 100, 10, board);
    console.log(ball); 



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




// start menu

function controller () {


    var canvas = document.getElementById("canvas");
    let board_view = new BoardView(canvas, board);

    board_view.play();

    

    window.requestAnimationFrame(controller)

    canvas.append(board_view);
}