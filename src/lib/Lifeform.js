class Lifeform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.age = 0;
    this.dead = false;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 5, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
  }

  move() {
    this.x += Math.random() - 0.5;
    this.y += Math.random() - 0.5;
  }
}

export default Lifeform;