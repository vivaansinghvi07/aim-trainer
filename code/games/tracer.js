class Tracer {
  constructor(gameX, gameY, width, maxSpeed, mode, randomness) {
    this.gameX = gameX;
    this.gameY = gameY;
    this.width = width;
    this.maxSpeed = maxSpeed;

    this.mode = mode;
    this.randomness = randomness * .01;

    if (mouseX > gameX && mouseX < gameX + gameSize && mouseY < gameY + gameSize && gameY > gameY) {
      this.location = new Vector(mouseX, mouseY);
    }
    else {
      this.location = new Vector(gameX + gameSize / 2, gameY + gameSize / 2);
    }

    let vx = randomP(2, maxSpeed - 2) * randomSign();
    let vy = randomP(2, maxSpeed - 2) * randomSign();
    this.velocity = new Vector(vx, vy);
    this.acceleration = new Vector(0.1 * randomSign(), 0.1 * randomSign());

    this.score = 0;
  }

  update() {
    // add checkers for borders which will change the velocity to something new
    if (this.location.distance(mouseX, mouseY) < this.width) {
      this.score++;
    }

    let x1 = this.gameX + 25;
    let x2 = this.gameX + gameSize - 25;
    let y1 = this.gameY + 25;
    let y2 = this.gameY + gameSize - 25;
    let x = this.location.x;
    let y = this.location.y;
    
    if (x < x1 || x > x2 || y < y1 || y > y2) {
      let modX = Math.abs(this.velocity.x) * (1 - this.randomness) + randomP(2, this.maxSpeed - 2) * this.randomness;
      let modY = Math.abs(this.velocity.y) * (1 - this.randomness) + randomP(2, this.maxSpeed - 2) * this.randomness;
      if (x < x1 || x > x2) {
        if (x > x2) {
          modX *= -1;
        } 
        modY = (this.velocity.y) * (1 - this.randomness) + randomP(-this.maxSpeed, this.maxSpeed * 2) * this.randomness;
      }
      else {
        if (y > y2) {
          modY *= -1;
        }
        modX = (this.velocity.y) * (1 - this.randomness) + randomP(-this.maxSpeed, this.maxSpeed * 2) * this.randomness;
      }
      this.velocity = new Vector(modX, modY);
      if (this.mode === "Curve") {
        this.acceleration = new Vector(0.1 * randomSign(), 0.1 * randomSign());
      }
    }
    else if (this.mode === "Random") {
      this.limitAddRandom();
    }
    else if (this.mode === "Curve") {
      this.limitAddCurve();
    }
    this.location.add(this.velocity);

    // implement random bouncing within the box - just modify  borders a little
    // make it move
  }

  limitAddCurve() {
    if (Math.abs(this.velocity.y) < this.maxSpeed && Math.abs(this.velocity.x) < this.maxSpeed) {
      this.velocity.add(this.acceleration);
    }
    else if (Math.abs(this.velocity.x) < this.maxSpeed) {
      this.velocity.x += this.acceleration.x;
    }
    else if (Math.abs(this.velocity.y) < this.maxSpeed) {
      this.velocity.y += this.acceleration.y;
    }
  }

  limitAddRandom() {
    let tempX = this.velocity.x + randomSign() * this.randomness;
    let tempY = this.velocity.y + randomSign() * this.randomness;
    if (Math.abs(tempX) <= this.maxSpeed) {
      this.velocity.x = tempX;
    }
    if (Math.abs(tempY) <= this.maxSpeed) {
      this.velocity.y = tempY;
    }
  }

  display() {
    let x = int(this.location.x);
    let y = int(this.location.y);
    fill("#135f44");
    ellipse(x, y, int(this.width) * 2, int(this.width) * 2);
  }
}