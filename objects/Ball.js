/**
 * Clase que genera el objeto bola
 * @author Manuel Mauricio Gómez Gallo - mmaurogg
 * @version 1.0.0
 */
export class Ball {
  constructor(x, y, radius, board) {
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
    this.speed = 2;

    board.ball = this;
  }

  /**
   * Método que recupera el valor del ancho
   * @return valor del ancho de la bola
   */
  get width() {
    return this.radius * 2;
  }

  /**
   * Método que recupera el valor del ancho la latura
   * @return valor de la altura de la bola
   */
  get height() {
    return this.radius * 2;
  }

  /**
   * Método para mover la bola
   */
  move() {
    this.x += this.speed_X * this.direction;
    this.y += this.speed_Y * this.direction;
  }

  /**
   * Método para redireccionar la bola despues de una colisión
   * @param {*} bar la barra con la que colisiona
   */
  collision(bar) {
    var relative_intersect_y = bar.y + bar.height / 2 - this.y;
    var normalized_intersect_y = relative_intersect_y + bar.height / 2;

    this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

    this.speed_Y = this.speed * -1 * Math.sin(this.bounce_angle);
    this.speed_X = this.speed * Math.cos(this.bounce_angle);

    this.direction = this.x > this.board.width ? -1 : 1;

    console.log(this.bounce_angle);
  }
}
