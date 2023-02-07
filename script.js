// hex codes used in this project come from 
// blue: https://imagecolorpicker.com/color-code/2596be
// green: https://imagecolorpicker.com/color-code/25be88
// fix the point size being displayed inaccurately

// global variables representing stuff like the window height, the size of the aim game, etc.
var width;  
var height;
var gameX;
var gameY;
var gameSize = 600;

var clickedForCpsTestGame = false; 

// empty for now
var timer = 0;

// initializes variables that are used to determine what page we are on
var mainMenu = true;
var tracerSettingsPage = false;
var aimTrainerSettingsPage = false;
var cpsTestSettingsPage = false;

var playAimTrainer = false;
var playTracer = false;
var playCpsTest = false;

var aimTrainerGameOver = false;
var tracerGameOver = false;
var cpsTestGameOver = false;

var pointMaker;
var tracerGame;
var cpsTestGame;

// variables declared for the the settings screen of the aim trainer
var aimTrainerSettings;
var tracerSettings;
var cpsTestSettings;

var mainMenuReturnTextClicker;
var playTextClicker;
var aimTrainerSettingsTextClicker;
var tracerSettingsTextClicker;
var cpsTestSettingsTextClicker;

var tracerTimer;
var aimTrainerTimer;
var cpsTestTimer;

var goToAimTrainer;
var goToTracer;
var goToCpsTest;

function setup() {
  createCanvas(windowWidth, windowHeight);
  width = windowWidth;  
  height = windowHeight;
  background(255);
  gameX = width / 2 - gameSize / 2;
  gameY = height / 2 - gameSize / 2;
  goToAimTrainer = new clickDetectorButton(width / 2 - 150, 250, 300, 80, "Aim Trainer", "blue");
  goToTracer = new clickDetectorButton(width / 2 - 150, 375, 300, 80, "Tracer", "green");
  goToCpsTest = new clickDetectorButton(width / 2 - 150, 500, 300, 80, "CPS Test", "red");
} // if the mouse x and mouse y is less than radius

function draw() {
  // redraws the background
  noStroke();
  fill(255, 255, 255);
  rect(0, 0, width, height);
  
  // sets global text to monospace
  textFont("monospace");
  
  if (mainMenu) {
    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(100);
    text("Aim Lab", width / 2, 130);

    goToAimTrainer.display();
    goToTracer.display();
    goToCpsTest.display();

    fill(0, 0, 0);
    textAlign(CENTER);
    textSize(20);
    text("If the game does not fit your screen, zoom out your browser's view and then refresh the page.\n\n The game is most optimal in full screen!", 0, height - 200, width, height);
    
    if (goToAimTrainer.update()) {
      aimTrainerSettingsPage = true;
      mainMenu = false;
      aimTrainerSettings = new AimSettingsFactory(width);
      mainMenuReturnTextClicker = new TextClicker(width / 2, height - 100, 500, 50, "Return to Main Menu", 40, "blue");
      playTextClicker = new TextClicker(width / 2, height - 215, 300, 70, "Play", 70, "blue");
    }
    else if (goToTracer.update()) {
      tracerSettingsPage = true;
      mainMenu = false;
      tracerSettings = new TracerSettingsFactory(width);
      mainMenuReturnTextClicker = new TextClicker(width / 2, height - 100, 500, 50, "Return to Main Menu", 40, "green");
      playTextClicker = new TextClicker(width / 2, height - 215, 300, 70, "Play", 70, "green");
    }
    else if (goToCpsTest.update()) {
      cpsTestSettingsPage = true;
      mainMenu = false;
      cpsTestSettings = new cpsTestSettingsFactory(width);
      mainMenuReturnTextClicker = new TextClicker(width / 2, height - 100, 500, 50, "Return to Main Menu", 40, "red");
      playTextClicker = new TextClicker(width / 2, height - 215, 300, 70, "Play", 70, "red");
    }
  }
  else if (cpsTestSettingsPage) {
    fill("#ab2124");
    textAlign(CENTER);
    textSize(80);
    text("CPS Test", width / 2, 100);
    cpsTestSettings.display();
    cpsTestSettings.update();

    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      cpsTestSettingsPage = false;
      mainMenu = true;
    }

    playTextClicker.update();
    playTextClicker.display();

    if (playTextClicker.findClick()) {
      cpsTestSettingsPage = false;
      playCpsTest = true;
      cpsTestGame = new cpsTest(gameX, gameY, cpsTestSettings.getSize()); 
      cpsTestTimer = cpsTestSettings.getTime() * 60;
    }
  }
  else if (playCpsTest) {

    if (cpsTestGame.score != 0) {
      cpsTestTimer--;
    }
    if (cpsTestTimer < 0) {
      playCpsTest = false;
      cpsTestGameOver = true;
      cpsTestSettingsTextClicker = new TextClicker(width / 2, height - 200, 300, 40, "Return to Settings", 30, "red");
    }
    
    cpsTestGame.display();
    cpsTestGame.update(clickedForCpsTestGame);
    textAlign(CENTER);
    fill(0, 0, 0);
    textSize(30);
    text(cpsTestGame.score, width / 2, 100);
    clickedForCpsTestGame = false;
    
  }
  else if (cpsTestGameOver) {
    
    let score = cpsTestGame.score;
    textAlign(CENTER);
    fill("#ab2124");
    textSize(30);
    text("You scored " + int(score) + " in " + cpsTestSettings.getTime() + " seconds!", width / 2, 200); 
    text("This is " + Math.round(score / cpsTestSettings.getTime() * 100) / 100 + " clicks per second.", width / 2, 300);

    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      cpsTestGameOver = false;
      mainMenu = true;
    }

    cpsTestSettingsTextClicker.update();
    cpsTestSettingsTextClicker.display();
    if (cpsTestSettingsTextClicker.findClick()) {
      cpsTestGameOver = false;
      cpsTestSettingsPage = true;
    }
  }
  else if (tracerSettingsPage) {
    fill("#21ab7a");
    textAlign(CENTER);
    textSize(80);
    text("Tracer", width / 2, 100);
    tracerSettings.display();
    tracerSettings.update();

    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      tracerSettingsPage = false;
      mainMenu = true;
    }

    playTextClicker.update();
    playTextClicker.display();
    if (playTextClicker.findClick()) {
      tracerSettingsPage = false;
      playTracer = true;
      tracerGame = new Tracer(gameX, gameY, tracerSettings.getSize(), tracerSettings.getSpeed(), tracerSettings.getMode(), tracerSettings.getRandomness());
      tracerTimer = tracerSettings.getTime() * 60;
    }
    
  }
  else if (playTracer) {
    tracerTimer--;
    if (tracerTimer < 0) {
      playTracer = false;
      tracerGameOver = true;
      tracerSettingsTextClicker = new TextClicker(width / 2, height - 200, 300, 40, "Return to Settings", 30, "green");
    }
    tracerGame.display();
    textAlign(CENTER);
    fill(0, 0, 0);
    textSize(30);
    text(tracerGame.score, width / 2, 100);
    tracerGame.update();
  }
  else if (aimTrainerSettingsPage) {
    fill("#51abcb");
    textAlign(CENTER);
    textSize(80);
    text("Aim Trainer", width / 2, 100);
    aimTrainerSettings.display();
    aimTrainerSettings.update();

    // detects if we need to return to the main menu
    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      aimTrainerSettingsPage = false;
      mainMenu = true;
    }

    playTextClicker.update();
    playTextClicker.display();
    if (playTextClicker.findClick()) {
      aimTrainerSettingsPage = false;
      playAimTrainer = true;
      pointMaker = new PointFactory(aimTrainerSettings.circleCount(), gameX, gameY, aimTrainerSettings.circleSize(), aimTrainerSettings.needClicks());
      aimTrainerTimer = aimTrainerSettings.timePlay() * 60;
    }
    
    textSize(40);
  }
  else if (playAimTrainer) {
    aimTrainerTimer--;
    if (aimTrainerTimer <= 0) {
      playAimTrainer = false;
      aimTrainerGameOver = true;
      aimTrainerSettingsTextClicker = new TextClicker(width / 2, height - 200, 300, 40, "Return to Settings", 30, "blue");
    }
    pointMaker.display();
    textAlign(CENTER);
    fill(0, 0, 0);
    textSize(30);
    text(pointMaker.score, width / 2, 100);
    pointMaker.update();
  }
  else if (aimTrainerGameOver) {
    let score = pointMaker.score;
    textAlign(CENTER);
    fill("#2187ab");
    textSize(30);
    text("You scored " + int(score) + " in " + aimTrainerSettings.timePlay() + " seconds!", width / 2, 200); // fix this
    text("This is equal to " + Math.round(score / aimTrainerSettings.timePlay() * 100) / 100 + " per second.", width / 2, 300);
    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      aimTrainerGameOver = false;
      mainMenu = true;
    }

    aimTrainerSettingsTextClicker.update();
    aimTrainerSettingsTextClicker.display();
    if (aimTrainerSettingsTextClicker.findClick()) {
      aimTrainerGameOver = false;
      aimTrainerSettingsPage = true;
    }
  }
  else if (tracerGameOver) {
    let score = tracerGame.score;
    textAlign(CENTER);
    fill("#21ab7a");
    textSize(30);
    text("You scored " + int(score) + " in " + tracerSettings.getTime() + " seconds!", width / 2, 200); // fix this
    text("This is equal to " + Math.round(score / tracerSettings.getTime() * 100) / 100 + " per second.", width / 2, 300);

    mainMenuReturnTextClicker.update();
    mainMenuReturnTextClicker.display();
    if (mainMenuReturnTextClicker.findClick()) {
      tracerGameOver = false;
      mainMenu = true;
    }

    tracerSettingsTextClicker.update();
    tracerSettingsTextClicker.display();
    if (tracerSettingsTextClicker.findClick()) {
      tracerGameOver = false;
      tracerSettingsPage = true;
    }
    
  }
}