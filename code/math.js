// returns a random number between the min and the min + step
function randomP(min, step) {
  return (Math.random() * step) + min;
}

function randomSign() {
  return Math.floor(Math.random() * 2) * 2 - 1;
}

// a vector class which is often going to be used to present 2d variables for the points
class Vector {
  constructor (x, y) {
    this.x = x;  
    this.y = y;
  }
  // calculates the distance of the point from a given point - used for finding if a person clicked on the point in the aim trainer
  distance (x, y) {
    // just normal distance formula
    let xdist = Math.pow(this.x - x, 2);
    let ydist = Math.pow(this.y - y, 2);
    return Math.sqrt(xdist + ydist);
  }

  add (v2) {
    this.x += v2.x;
    this.y += v2.y;
  }
} // END OF VECTOR CLASS
