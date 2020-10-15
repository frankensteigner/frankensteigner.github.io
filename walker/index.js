/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;

  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }

  var KEY_WASD = {
    "A": 65,
    "W": 87,
    "D": 68,
    "S": 83,
  }

  var BOARD_WIDTH = 440;
  
  // Game Item Objects

    var positionX = 0 ;
    var speedX = 0;
    var positionY = 0;
    var speedY = 0;

    var positionXTWO = 0 ;
    var speedXTWO = 0;
    var positionYTWO = 0;
    var speedYTWO = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $(document).on('keydown', handleKeyDownWASD);                        // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUpWASD);


  ///////////////////////// CORE LOGIC ///////////////////////////////////////////

    // handle key down

  function handleKeyDown(event) {
      if (event.which === KEY.LEFT) {
          console.log("left arrow key pressed");
            speedX = -5;
      } else if (event.which === KEY.UP) {
          console.log("up arrow key pressed");
            speedY = -5;
      } else if (event.which === KEY.RIGHT) {
          console.log("right arrow key pressed");
             speedX = 5;
      } else if (event.which === KEY.DOWN) {
          console.log("down arrow key pressed");
            speedY = 5;
      }
  }

  function handleKeyUp(event) {
      if (event.which === KEY.LEFT) {
          console.log("left arrow key released");
            speedX = 0;
      } else if (event.which === KEY.UP) {
          console.log("up arrow key released");
            speedY = 0;
      } else if (event.which === KEY.RIGHT) {
          console.log("right arrow key released");
             speedX = 0;
      } else if (event.which === KEY.DOWN) {
          console.log("down arrow key released");
            speedY = 0;
      }
  }

    function handleKeyDownWASD(event) {
      if (event.which === KEY_WASD.A) {
          console.log("a key pressed");
            speedXTWO = -5;
      } else if (event.which === KEY_WASD.W) {
          console.log("w key pressed");
            speedYTWO = -5;
      } else if (event.which === KEY_WASD.D) {
          console.log("d key pressed");
            speedXTWO = 5;
      } else if (event.which === KEY_WASD.S) {
          console.log("s key pressed");
            speedYTWO = 5;
      }
  }

  function handleKeyUpWASD(event) {
      if (event.which === KEY_WASD.A) {
          console.log("a key released");
            speedXTWO = 0;
      } else if (event.which === KEY_WASD.W) {
          console.log("w key released");
            speedYTWO = 0;
      } else if (event.which === KEY_WASD.D) {
          console.log("d key released");
            speedXTWO = 0;
      } else if (event.which === KEY_WASD.S) {
          console.log("s key released");
            speedYTWO = 0;
      }
  }


  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    repositionGameBox();
    redrawGameBox();
  }

  newFrame();

  /// COLLISION DETECTORS ///

  function collideCheck() {

  }

  function keepBounds() {
      
  }

  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function repositionGameItem() {
    positionX += speedX; // update the position of the box on x axis 
    positionY += speedY; // update the position of the box on the y axis
    
  }

  function redrawGameItem() {
    $("#gameItem").css("left", positionX); // draws the box positionX pixels away from 'left' location
    $("#gameItem").css("top", positionY); // draws the box positionY pixels away from 'top' location
  }

  function repositionGameBox() {
    positionXTWO += speedXTWO; // update the position of the box on x axis 
    positionYTWO += speedYTWO; // update the position of the box on the y axis
    
  }

  function redrawGameBox() {
    $("#gameBox").css("left", positionXTWO); // draws the box positionXTWO pixels away from 'left' location
    $("#gameBox").css("top", positionYTWO); // draws the box positionYTWO pixels away from 'top' location
  }

}
