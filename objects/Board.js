export class Board {
    
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
