// A slider for when we need settings input that can be anywhere in a range of values
class Slider {
  constructor(x, y, width, s, min, max, color) {
    // stores the x and y values of the slider
    this.x = x;
    this.y = y;

    // this is where the actual sliding thing is going to be located 
    this.innerX = x;

    // width of the slider
    this.width = width;

    // height of the slider, should be a thin line
    this.height = 4;

    // what is displayed above it, showing the user what it does
    this.prompt = s;

    // min and max values to be outputted by the slider
    this.min = min;
    this.max = max;

    this.color = color;
  } // END OF CONSTRUCTOR FUNCTION

  // slides the slider
  update () {
    // determines if slider is being pressed, with some added leeway on the y value because it is a thin line
    let leeway = 20
    if (mouseIsPressed && mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y - leeway && mouseY < this.y + this.height + leeway) {
      // updates the inner circle to be where the mouse is
      this.innerX = mouseX;
    }
  } // END OF UPDATE FUNCTION 

  // gets the value stored by the slider
  param () {
    // first gets the percent of the distance covered, then determines what the distance between minimum and max values are and takes that percent of this output, and then adds the min value 
    return Math.round(((this.innerX - this.x) / this.width) * (this.max - this.min) + this.min);
  } // END OF PARAM FUNCTION

  // displays all the things
  display () {
    // display for the inner line
    if (this.color === "blue") {
      fill("#a8d5e5");
    }
    else if (this.color === "green") {
      fill("#a8e5cf");
    }
    else if (this.color === "red") {
      fill("#e5a8a9");
    }
    rect(int(this.x), int(this.y), int(this.width), int(this.height));

    // display for the circle
    if (this.color === "blue") {
      fill("#1e7898");
    }
    else if (this.color === "green") {
      fill("#1e986d");
    }
    else if (this.color === "red") {
      fill("#981e20");
    }
    ellipse(int(this.innerX), int(this.y) + int(this.height / 2), 20, 20); 

    // prints the prompt so the reader knows what the setting does
    if (this.color === "blue") {
      fill("#0f3c4c");
    }
    else if (this.color === "green") {
      fill("#0f4c36");
    }
    else if (this.color === "red") {
      fill("#4c0f10");
    }
    textAlign(LEFT);
    textSize(15);
    text(this.prompt + this.param(), int(this.x), int(this.y) - 15);
  } // END OF DISPLAY FUNCTION
} // END OF SLIDER CLASS

// creates each individual button within a series of buttons
class Button {
  constructor (x, y, width, height, value, color) {
    // location of the button
    this.x = x;
    this.y = y; 

    // width of the button and height of the button - both determined in the buttonfactory class
    this.width = width;
    this.height = height;

    // stores whether the button is pressed and the value of the button
    this.pressed = false;
    this.value = value;

    this.color = color;
  } // END OF CONSTRUCTOR FUNCTION

  // checks if the button is pressed or not - returns 1 if so, used in the buttonfactory class
  update () {
    // if the mouse is pressed within the region bounded by the button
    if (mouseIsPressed && mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
      this.pressed = true;
      return 1;
    }
    return 0;
  } // END OF UPDATE FUNCTION

  // unpresses the button - used in the ButtonFactory class
  unPress () {
    this.pressed = false;
  }

  // displays each button
  display () {
    // displays different colors based on if the button is pressed or not
    if (this.pressed) {
      if (this.color === "blue") {
        fill("#7cc0d8");
      }
      else if (this.color === "green") {
        fill("#7cd8b8");
      }
      else if (this.color === "red") {
        fill("#d87c7e");
      }
    }
    else {
      if (this.color === "blue") {
        fill("#bee0ec");
      }
      else if (this.color === "green") {
        fill("#beecdb");
      }
      else if (this.color === "red") {
        fill("#ecbebf");
      }
    }

    // rectangle for the button
    rect(int(this.x), int(this.y), int(this.width), int(this.height), 15);

    // prints the value within the button
    if (this.color === "blue") {
      fill("#0f3c4c");
    }
    else if (this.color === "green") {
      fill("#0f4c36");
    }
    else if (this.color === "red") {
      fill("#4c0f10");
    }
    textAlign(CENTER); 
    textSize(25);
    text(this.value, int(this.x + this.width / 2), int(this.y + this.height / 2 + 7));
  } // END OF DISPLAY FUNCTION
} // END OF BUTTON CLASS

// creates a row of buttons, based on how many you need and what values are stored in it
class ButtonFactory { // add color for each of the buttons
  constructor(x, y, width, height, times, values, prompt, color) {
    // initializes an array to store all the buttons
    this.buttons = new Array();

    // color storage
    this.color = color;

    // stores the prompt that gets printed above the buttons
    this.prompt = prompt;

    // x and y values of the overall "rectangle"
    this.x = x;
    this.y = y;

    // modifies the width for calcuations - the space between each button is 15 - makes it so that there are <times> even segments that each have a built in gap - 15 added so that the last one wouldn't flow over where it was supposed to go
    let modWidth = width + 15;

    // finds the width of each button - this is done by subtracting how many gaps there are within the width and then dividing by how many buttons you need
    // for now each gap length is 15, but this is probably adjustable with a variable definition
    let buttonWidth = (width - ((times - 1) * 15)) / times;

    // adds buttons to the array of buttons 
    for (let i = 0; i < times; i++) {
      // xSpot is just the n-th button - 1st button is at the x, but 3rd button is 2 (i) widths away
      let xSpot = x + modWidth / times * i;
      let ySpot = y;

      // saves the value into the button based on the inputted array of values
      this.buttons.push(new Button(xSpot, ySpot, buttonWidth, height, values[i], color));
    }
  } // END OF CONSTRUCTOR

  // updates the status of the buttons depending on pressed or not
  update() {
    // the index of the newly pressed button
    let pressedIndex = -1;

    // goes through all the buttonss
    for (let i = 0; i < this.buttons.length; i++) {
      // if a button had been pressed at the moment of the update, store result as 1
      let result = this.buttons[i].update();

      // if the result is 1 then save the index of the pressed button
      if (result == 1) {
        pressedIndex = i;
      }
    }

    // if there is no pressed button, there is no need to continue
    if (pressedIndex == -1) {
      return;
    }

    // goes through every button again, if it is not the one that has been recently pressed, clear its pressed status
    for (let i = 0; i < this.buttons.length; i++) {
      if (i == pressedIndex) {
        continue;
      }
      this.buttons[i].unPress();
    }
  } // END OF UPDATE FUNCTION

  // displays the row of buttons
  display () {
    // displays the prompt
    if (this.color === "blue") {
      fill("#0f3c4c");
    }
    else if (this.color === "green") {
      fill("#0f4c36");
    }
    textAlign(LEFT);
    textSize(15);
    text(this.prompt, int(this.x), int(this.y) - 15);

    // displays each button in the row of buttons 
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].display();
    }
  } // END OF DISPLAY FUNCTION

  getValue () {
    for (let i = 0 ; i < this.buttons.length; i++) {
      if(this.buttons[i].pressed) {
        return this.buttons[i].value;
      }
    }
    return this.buttons[0].value;
  }
} // END OF BUTTONFACTORY CLASS

class TextClicker {
  constructor (x, y, width, height, text, size, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.hovered = false;
    this.size = size;

    this.primer = false;
    this.leewayTimer = 0; 

    this.color = color;
  } 
  update () {
    let x = this.x;
    let width = this.width / 2;
    let y = this.y;
    let height = this.height;
    if (mouseX > x - width && mouseX < x + width && mouseY > y - height + 20 && mouseY < y) {
      this.hovered = true;
    }
    else {
      this.hovered = false;
    }
  }
  display() {
    if (this.hovered) {
      if (this.color === "blue") {
        fill("#2596be");
      }
      else if (this.color === "green") {
        fill("#21ab7a");
      }
      else if (this.color === "red") {
        fill("#be2528");
      }
    }
    else {
      fill(0, 0, 0);
    }
    textAlign(CENTER);
    textSize(int(this.size));
    text(this.text, int(this.x), int(this.y));
  }
  findClick() {
    this.leewayTimer--;
    if (this.hovered) {
      if (mouseIsPressed) {
        this.primer = true;
        this.leewayTimer = 10;
        return false;
      }
      else if (!mouseIsPressed && this.primer && this.leewayTimer > 0) {
        this.leewayTimer = -1;
        return true;
      }
    }
    return false;
  } // END OF FINDCLICK FUNCTION
}

class clickDetectorButton {
  constructor(x, y, width, height, text, color) {
    this.primer = false;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.leewayTimer = 0;
    this.text = text;
    this.color = color;
  }

  update() {
    this.leewayTimer--;
    let x = this.x;
    let y = this.y;
    let width = this.width;
    let height = this.height;
    if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
      this.hovered = true;
      if (mouseIsPressed) {
        this.primer = true;
        this.leewayTimer = 10;
        return false;
      }
      else if (!mouseIsPressed && this.primer && this.leewayTimer > 0) {
        this.leewayTimer = -1;
        return true;
      }
    }
    else {
      this.hovered = false;
    }
    return false;
  }

  display() {
    if (this.color === "blue") {
      if (this.hovered) {
        fill("#66b6d2");
      }
      else {
        fill("#1e7898")
      }
    }
    else if (this.color === "green") {
      if (this.hovered) {
        fill("#51cba0");
      }
      else {
        fill("#1a855f");
      }
    }
    else if (this.color === "red") {
      if (this.hovered) {
        fill("#d87c7e");
      }
      else {
        fill("#981e20");
      }
    }
    rect(int(this.x), int(this.y), int(this.width), int(this.height), 15);
    fill(255, 255, 255);
    textSize(40);
    text(this.text, width / 2, int(this.y + 50));
  }
}