class Lifeform {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.radius = 5;
    this.damping = 0.7;
    this.minVelocity = 0.001;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

  applyBoundaries(maxWidth, maxHeight) {
    if (this.x + this.radius > maxWidth || this.x - this.radius < 0) {
      this.vx = -this.vx;
      this.x = Math.max(this.radius, Math.min(this.x, maxWidth - this.radius));
    }

    if (this.y + this.radius > maxHeight || this.y - this.radius < 0) {
      this.vy = -this.vy;
      this.y = Math.max(this.radius, Math.min(this.y, maxHeight - this.radius));
    }
  }

  attract(lifeforms, color, strength) {
    lifeforms.forEach(otherLifeform => {
      if (otherLifeform !== this && otherLifeform.color === color) {
        let dx = otherLifeform.x - this.x;
        let dy = otherLifeform.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        distance = Math.max(distance, this.radius * 2);

        let force = strength / (distance * distance);

        force = Math.min(force, .05);


        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
      }
    });

    this.applyVelocity();
  }

  repel(lifeforms, color, strength) {
    lifeforms.forEach(otherLifeform => {
      if (otherLifeform !== this && otherLifeform.color === color) {
        let dx = this.x - otherLifeform.x;
        let dy = this.y - otherLifeform.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        distance = Math.max(distance, this.radius * 2);

        let force = strength / (distance * distance);

        force = Math.min(force, .05);

        this.vx += (dx / distance) * force;
        this.vy += (dy / distance) * force;
      }
    });

    this.applyVelocity();
  }

  applyVelocity() {

    this.vx *= this.damping;
    this.vy *= this.damping;


    if (Math.abs(this.vx) < this.minVelocity) this.vx = 0;
    if (Math.abs(this.vy) < this.minVelocity) this.vy = 0;


    this.x += this.vx;
    this.y += this.vy;
  }

  separate(lifeforms) {
    lifeforms.forEach(otherLifeform => {
      if (otherLifeform !== this) {
        let dx = this.x - otherLifeform.x;
        let dy = this.y - otherLifeform.y;
        let distance = Math.sqrt(dx * dx + dy * dy);


        const minSeparation = this.radius * 2;

        if (distance > 0 && distance < minSeparation) {

          let forceX = (dx / distance) * (minSeparation - distance);
          let forceY = (dy / distance) * (minSeparation - distance);


          this.vx += forceX;
          this.vy += forceY;
        }
      }
    });
  }

}

export default Lifeform;

