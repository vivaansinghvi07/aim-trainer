// a class for points in the game
class Point {
  constructor(v, width, needClick) {
    // self explanatory; point size, point location
    this.location = v;
    this.width = width;

    // stores if you need a click to register if the point is being pressed
    this.needClick = needClick;

    // primer and timer are later explained
    this.primer = false;
    this.leewayTimer = 0;
  } // END OF CONSTRUCTOR

  // checks if we need to "update" what is going on with the thing
  update() {
    // decrements the leeway timer 
    this.leewayTimer--;
    // if the mouse is pressed within the circle, set the primer to be true and the leeway timer 10
    if (this.needClick) {
      if (this.location.distance(mouseX, mouseY) < this.width) {
        if (mouseIsPressed) {
          this.leewayTimer = 10;
          this.primer = true;
          return false;
        }
          
        // if the mouse gets let go within the circle, and the leeway timer allows for it to happen - i.e. they should not have been outside the circle for more than 10 frames - return that the thing has been clicked on
        else if (!mouseIsPressed && this.primer && this.leewayTimer > 0) {
          return true;
        }
      }
  
      // leeway timer for if you click it but before letting go, you slightly go outside the point - just checks if the mouse was released within the timer
      else if (!mouseIsPressed && this.leewayTimer > 0) {
        return true;
      }
    }
    // if you dont require clicks, then only check if you are within the range
    else if (this.location.distance(mouseX, mouseY) < this.width) {
      return true;
    }
      
    // otherwise it has not been clicked and nothing is happening
    else {
      return false;
    }
  } // END OF UPDATE FUNCTION

  // these just return the x and y values of the point respectively (as they use vectors)
  x () {
    return int(this.location.x);
  }
  y () {
    return int(this.location.y);
  }
} // END OF POINT CLASS

// point factory - stores the points that will be used within the game
class PointFactory {
  constructor(count, gameX, gameY, width, requireClicks) {
    
    // prepares an array to be used to store all the points in the game
    this.points = new Array();

    // how wide the game arena is played - made so that people do not abuse the fact that the window size can be adjusted making the game super easy
    this.gameX = gameX;
    this.gameY = gameY;

    // stores the width of a point
    this.width = width;

    // keeps track of how many points have been hit
    this.score = 0;

    this.needClicks = requireClicks;

    // creates points by randomly generating the location and adding it to the array
    for (let i = 0; i < count; i++) {
      let x = randomP(gameX, gameSize);
      let y = randomP(gameY, gameSize);
      this.points.push(new Point(new Vector(x, y), width, requireClicks));
    }
  } // END OF CONSTRUCTOR

  // deletes and replaces points if they have been clicked, and adds to the score
  update() {
    for (let i = 0; i < this.points.length; i++) {
      // determines if there is a need to reset based on what the update function returns - reset is true if the update function for the class Point determines if the point has been clicked
      let reset = this.points[i].update();
      if (reset) {
        // if you need to reset, increment the score by one and then create a new point at the same location, essentially deleting the old one as the object reference disappears
        this.score++;
        let x = randomP(this.gameX, gameSize);
        let y = randomP(this.gameY, gameSize);
        this.points[i] = new Point(new Vector(x, y), this.width, this.needClicks); 
      }
    }
  } // END OF UPDATE FUNCTION

  //displays all the points
  display() {
    for (let i = 0; i < this.points.length; i++) {
      fill("#165a72");
      ellipse(this.points[i].x(), this.points[i].y(), this.width * 2, this.width * 2);
    }
  }
} // END OF POINTFACTORY CLASS 
