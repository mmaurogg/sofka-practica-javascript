export class Bar {

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

    down() {
        this.y += this.speed; 

    }

    up() {
        this.y -= this.speed;

    }

    toString() {
        return "x: "+ this.x + "\ny: " + this.y;
    }

}
