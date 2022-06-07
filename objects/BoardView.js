/**
 * Clase que grafica el tablero y contiene sus interacciones
 * @author Manuel Mauricio Gómez Gallo - mmaurogg
 * @version 1.0.0
 */
export class BoardView {
  #ctx;
  constructor(canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Método que dibuja los elementos del tablero
   */
  draw() {
    this.board.elements.forEach((element) => {
      switch (element.kind) {
        case "rectangle":
          this.ctx.fillRect(
            element.x,
            element.y,
            element.width,
            element.height
          );
          break;

        case "circle":
          this.ctx.beginPath();
          this.ctx.arc(element.x, element.y, element.radius, 0, 7);
          this.ctx.fill();
          this.ctx.closePath();
          break;
      }
    });
  }

  /**
   * Método que borra el tablero, preparandolo para la siguiente interacción
   */
  clean() {
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
  }

  /**
   * Método que comprueba si la bola ha colisionado con las barras
   */
  checkCollisions() {
    this.board.bars.forEach((element) => {
      var bar = element;
      if (hit(bar, this.board.ball)) {
        this.board.ball.collision(bar);
        console.log("Choca");
      }
    });
  }

  /**
   * Método que grafica cada interacción
   */
  play() {
    if (this.board.playing) {
      this.clean();
      this.draw();
      this.checkCollisions();
      this.board.ball.move();
    }
  }
}

/**
 * Funcion que indica cuando la pelota ha colisionado con otro objeto
 * @param {*} bar Barras del juego
 * @param {*} ball Bola del juego
 * @returns Booleano true si colisionó o false en caso contrario
 */
function hit(bar, ball) {
  var hitting = false;

  //colision board
  if (ball.x + ball.width >= bar.x && ball.x < bar.x + bar.width) {
    if (ball.y + ball.height >= bar.y && ball.y < bar.y + bar.height) {
      hitting = true;
    }
  }

  // colicion a con b
  if (ball.x <= bar.x && ball.x + ball.width >= bar.x + bar.width) {
    if (ball.y <= bar.y && ball.y + ball.height >= bar.y + bar.height) {
      hitting = true;
    }
  }

  // colision b con a
  if (bar.x <= ball.x && bar.x + bar.width >= ball.x + ball.width) {
    if (bar.y <= ball.y && bar.y + bar.height >= ball.y + ball.height) {
      hitting = true;
    }
  }

  return hitting;
}
