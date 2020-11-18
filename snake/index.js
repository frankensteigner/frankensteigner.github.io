/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 100;

  var velocityX = 00;

  var velocityY = 0;

  var positionX = 20;

  var positionY = 20;

    var applePositionX = 200;

    var applePositionY = 200;

  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }

  // Game Item Objects

  var snake = [
      {positionX: 20, positionY: 20}, // head

    ]

    var head = snake[0]

    var tail = snake[snake.length - 1]

  var apple = {}

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    keepScreenX();
    keepScreenY();
  }

  newFrame();

  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
      if (event.which === KEY.LEFT) {
          console.log("left arrow key pressed");
            velocityX = -20;
            velocityY = 0
      } else if (event.which === KEY.UP) {
          console.log("up arrow key pressed");
            velocityY = -20;
            velocityX = 0;
      } else if (event.which === KEY.RIGHT) {
          console.log("right arrow key pressed");
            velocityX = 20;
            velocityY = 0;
      } else if (event.which === KEY.DOWN) {
          console.log("down arrow key pressed");
            velocityY = 20;
            velocityX = 0;
      }
  }


  // Keeps the snake in the left and right borders of the box 

    function keepScreenX() {
                if (positionX > 400) {
                    velocityX = -velocityX;
                    console.log("out of bounds")
				}
				else if (positionX < 20) {
					velocityX = -velocityX;
				}
            }

    function keepScreenY() {
        if (positionY > 400) {
			velocityY = -velocityY;
			} else if (positionY < 20) {
				velocityY = -velocityY;
				}
            }

    // do collide

    function doCollide(obj1, obj2) {
        if (obj1.x === obj2.x && obj1.y === obj2.y) {
        return true;
            } else {
             return false;
            }
        }

    function moveApple() {
        apple.x = randomInteger(BOARD_SIZE/SQUARE_SIZE) * SQUARE_SIZE;
        apple.y = randomInteger(BOARD_SIZE/SQUARE_SIZE) * SQUARE_SIZE;
        
        $('#apple').css("left", apple.x);
        $('#apple').css("top", apple.y);
    
    for (var i = 0; i < snakeBody.length; i++) {
    
        
        if (doCollide(apple, snakeBody[i]) === false) {
        } else {
        moveApple();
        break;
        }
        
    }
    }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
    }

    function randomiseApple() {
        var randomNum = ((math.random()*380) + 20);
        applePositionX = (1 * randomNum);
        applePositionY = (1 * randomNum)
    }

    function repositionGameItem() {
        positionX += velocityX; // update the position of the box on x axis 
        positionY += velocityY; // update the position of the box on the y axis
        
    }

    function redrawGameItem() {
        $("#snake").css("left", positionX); // draws the box positionX pixels away from 'left' location
        $("#snake").css("top", positionY); // draws the box positionY pixels away from 'top' location
    }

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
