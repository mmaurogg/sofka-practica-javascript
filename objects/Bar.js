/**
 * Clase que genera el objeto barra
 * @author Manuel Mauricio Gómez Gallo - mmaurogg 
 * @version 1.0.0 
 */
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

    /**
     * Método para mover hacia abajo la barra
     */
    down() {
        this.y += this.speed; 
    }

    /**
     * Método para mover hacia arriba la barra
     */
    up() {
        this.y -= this.speed;
    }

    /**     
     * Método para dar la posición de la barra en String 
     * @returns String con la posición de la barra
     */
    toString() {
        return "x: "+ this.x + "\ny: " + this.y;
    }

}
