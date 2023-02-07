class cpsTest {
  constructor (gameX, gameY, width) {
    let x = gameX + gameSize / 2;
    let y = gameY + gameSize / 2;
    this.location = new Vector(x, y);

    this.width = width;

    this.score = 0;
  }
  display() {
    fill("#851a1c");
    ellipse(int(this.location.x), int(this.location.y), int(this.width * 2), int(this.width * 2));
  }
  update(clicked) {
    if (clicked && this.location.distance(mouseX, mouseY) < this.width) {
      this.score++;
    }
  }
}

function mouseClicked() {
  clickedForCpsTestGame = true;
}