// loads the settings page for the aim trainer game
class AimSettingsFactory {
  constructor (width) {
    //  initializes an array to be used for all the different settings
    this.settings = new Array();

    // sets the space between each setting
    let increment = 75;

    // starting point for the settings (based on height)
    let i = 200;

    // initializes a new setting for the circle size and moves i down
    this.settings.push(new Slider(width / 2 - 175, i, 350, "Size of the circles: ", 5, 25, "blue"));
    i += increment;

    // initializes a new setting for the number of circles and moves i down
    this.settings.push(new Slider(width / 2 - 175, i, 350, "Number of circles: ", 1, 10, "blue"));
    i += increment;

    // initializes an array of differetn values that go in each button in the button settings for time - you can add or remmove values and the buttons still work
    let buttonSettings = new Array(10, 30, 60);
    this.settings.push(new ButtonFactory(width / 2 - 175, i, 350, 50, buttonSettings.length, buttonSettings, "Time: ", "blue"));
    i += increment + 25;

    // yes or no for requiring the points to be clicked
    let clickSettings = new Array("Yes", "No");
    this.settings.push(new ButtonFactory(width / 2 - 175, i, 350, 50, clickSettings.length, clickSettings, "Require clicks: ", "blue"));
  } // END OF CONSTRUCTOR

  // calls a unique display function for each setting
  display() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].display();
    }
  } // END OF DISPLAY FUNCTION

  // calls a unique update function for each setting
  update() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].update();
    }
  } // END OF UPDATE FUNCTION

  circleSize() {
    return int(this.settings[0].param());
  }

  circleCount() {
    return int(this.settings[1].param());
  }

  timePlay () {
    return int(this.settings[2].getValue());
  }

  needClicks() {
    return this.settings[3].getValue() == "Yes";
  }
} // END OF AIMSETTINGSFACTORY CLASS

class TracerSettingsFactory {
  constructor(width) {
    this.settings = new Array();

    let i = 185;
    let increment = 75;

    this.settings.push(new Slider(width / 2 - 175, i, 350, "Circle Size: ", 10, 40, "green"));
    i += increment;

    this.settings.push(new Slider(width / 2 - 175, i, 350, "Max Speed: ", 2, 6, "green"));
    i += increment;

    this.settings.push(new Slider(width / 2 - 175, i, 350, "Percent Randomness: ", 10, 100, "green"));
    i += increment - 10;

    let buttonSettings = new Array(10, 15, 30, 60);
    this.settings.push(new ButtonFactory(width / 2 - 175, i, 350, 50, buttonSettings.length, buttonSettings, "Time: ", "green"));
    i += increment + 20;

    buttonSettings = new Array("Line", "Random", "Curve");
    this.settings.push(new ButtonFactory(width / 2 - 175, i, 350, 50, buttonSettings.length, buttonSettings, "Mode: ", "green"));
    
  } // END OF CONSTRUCTOR

  display() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].display();
    }
  }

  update() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].update();
    }
  }

  getSize() {
    return int(this.settings[0].param());
  }

  getSpeed() {
    return int(this.settings[1].param());
  }

  getRandomness() {
    return int(this.settings[2].param());
  }

  getTime() {
    return int(this.settings[3].getValue());
  }

  getMode() {
    return this.settings[4].getValue();
  }
  // add update function
}

class cpsTestSettingsFactory {
  constructor(width) {
    this.settings = new Array();

    let i = 200;
    let increment = 75;

    this.settings.push(new Slider(width / 2 - 175, i, 350, "Target Size: ", 10, 100, "red"));
    i += increment;

    let buttonSettings = new Array(10, 15, 30, 60);
    this.settings.push(new ButtonFactory(width / 2 - 175, i, 350, 50, buttonSettings.length, buttonSettings, "Time:", "red"));
  }
  
  display() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].display();
    }
  }
  
  update() {
    for (let i = 0; i < this.settings.length; i++) {
      this.settings[i].update();
    }
  }

  getTime() {
    return this.settings[1].getValue();
  }

  getSize() {
    return this.settings[0].param();
  }
}