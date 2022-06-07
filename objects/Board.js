/**
 * Clase que genera el objeto tablero
 * @author Manuel Mauricio Gómez Gallo - mmaurogg
 * @version 1.0.0
 */
export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = false;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
    this.playing = false;
  }

  /**
   * Método para obtener los objetos que hay en el tablero
   * @return array de elementos del tablero
   */
  get elements() {
    var elements = this.bars.map((bar) => {
      return bar;
    });
    elements.push(this.ball);

    return elements;
  }
}
