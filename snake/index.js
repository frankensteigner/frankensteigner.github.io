/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

// in theory this will run program again when play again button pressed. doesn't work yet! 
// button.addEventListener("click", runProgram);

// button.addEventListener("click", playAgain);

function runProgram(){

                /* //////////////////////////////////////////////////////////////////////////
                                            SETUP
                                initial var declarations go here!
                                    snake array goes here!
                ////////////////////////////////////////////////////////////////////////// */ 

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 100;

  var velocityX = 0;

  var velocityY = 0;

  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }

  var points = 0;

  // Game Item Objects

  var BOARD_SIZE = $("#board").width();   // the height and width are equal
  var SQUARE_SIZE = $("#apple").width();  // the size of the apple is the same size as all squares

  // upon eating the apple a new object is added to the array ()
  var snake = [
      {positionX: 20, positionY: 20}, // head
    ]

  var head = snake[0]

  var tail = snake[snake.length - 1]

  var apple = apple || {
      positionX: 100,
      positionY: 100,
  }

    apple.$element = $("#apple");

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

                /* //////////////////////////////////////////////////////////////////////////
                                            CORE LOGIC
                                All functions called in newFrame go here!
                ////////////////////////////////////////////////////////////////////////// */ 

  // called every interval second (see var interval)
  function newFrame() {
    // repositionGameItem();
    // redrawGameItem();
    testRepositionGameItem();
    testRedrawGameItem();
    // keepScreen(); 
    eat()
    checkEndgame(); // comment this function out to remove endgame and have snake bounce off walls
    button.addEventListener("click", playAgain);
}

  newFrame();

  function playAgain() {
        // removes the game over screen
        $("#gameover").css({opacity: 0});
        // adds the score to below the screen
        $("#gamescore").css({opacity: 1});
        // resets speed to 0 so the snake doesn't automatically go offscreen
        velocityX = 0;
        velocityY = 0;
        // removes the body pieces from the array
        for (var i = (snake.length - 1); i > 0; i--) {
            snake.pop();
        }
        // removes the generated body piece ids
        for (var i = (snake.length - 1); i > 0; i--) {
            $( ".body").remove();;
        }
        // sets snake head back to starting position
        snake[0].positionX = 20;
        snake[0].positionY = 20;
        // set apple position
        apple.positionX = 100;
        apple.positionY = 100;

        $('#apple').css("left", apple.positionX);
        $('#apple').css("top", apple.positionY);
        // resets event listeners
        $(document).on();
        // calls program function again
        runProgram();
    }

    // repositions the head of the snake

    function repositionGameItem() {
            snake[0].positionX += velocityX; // update the position of the box on x axis 
            snake[0].positionY += velocityY; // update the position of the box on the y axis
    }

    // test function that will reposition the head AND the body pieces

    function testRepositionGameItem() {
        if (snake.length === 1) {
            snake[0].positionX += velocityX; // update the position of the head on x axis 
            snake[0].positionY += velocityY; // update the position of the head on the y axis
        } else if (snake.length > 1) {
            snake[0].positionX += velocityX; // update the position of the head on x axis 
            snake[0].positionY += velocityY; // update the position of the head on the y axis
            // for loop will update the position of the body to be square in front of it, counting down to index 0 from the tail
            for (var i = (snake.length - 1); i > 0; i--) {
                console.log("updated indexed positions");
                snake[i].positionX = snake[i-1].positionX;
                snake[i].positionY = snake[i-1].positionY;
            }
        }
    }
    
    // redraws the head of the snake

    function redrawGameItem() {
        $("#snake").css("left", snake[0].positionX); // draws the head positionX pixels away from 'left' location
        $("#snake").css("top", snake[0].positionY); // draws the head positionY pixels away from 'top' location
    }

    // test function that will redraw the head AND the body pieces

    function testRedrawGameItem() {
        if (snake.length === 1) {
            $("#snake").css("left", snake[0].positionX); // draws the head positionX pixels away from 'left' location
            $("#snake").css("top", snake[0].positionY); // draws the head positionY pixels away from 'top' location
        } else if (snake.length > 1) {
            $("#snake").css("left", snake[0].positionX); // draws the head positionX pixels away from 'left' location
            $("#snake").css("top", snake[0].positionY); // draws the head positionY pixels away from 'top' location
            // $("#snake2").css("top", snake[1].positionY); // DOESN'T WORK!!!!
            // for loop will redraw the body piece to be where the piece in front of it is, counting down from the tail
            for (var i = (snake.length - 1); i > 0; i--) {
                $("#snake" + (i + 1)).css("left", snake[i].positionX); 
                $("#snake" + (i + 1)).css("top", snake[i].positionY);
            }
            console.log("redrew indexed body pieces");
        }
    }


// checks for collision w/ apple, changes apple position and adds body piece if true

  function eat() {
    if (doCollide(apple, snake[0]) === true) {
        moveApple();
        addSnake();
        points = (points + 1);
        $('.score').text("SCORE: " + points);
        console.log("eat function worked");
    } else {
        console.log("eat function did NOT work");
    }
  }

  // Keeps the snake in the left and right borders of the box 
  // this should probably be a helped function but I still call it in newFrame so I'm putting it here

    function keepScreen() {
                if (snake[0].positionX > 400) {
                    velocityX = -velocityX;
				} else if (snake[0].positionX < 20) {
                    velocityX = -velocityX;
                } else if (snake[0].positionY > 400) {
                    velocityY = -velocityY;
			    } else if (snake[0].positionY < 20) {
                    velocityY = -velocityY;
				} 
            }

    // // checks for collisions with the walls and snake body, and runs endgame if true
    function checkEndgame() {
        if (snake[0].positionX > 420) {
            endgame()
			} else if (snake[0].positionX < 0) {
            endgame()
            } else if (snake[0].positionY > 420) {
            endgame()
			} else if (snake[0].positionY < 0) {
            endgame()
            } 
            else { for (var i = (snake.length - 2); i > 1; i--) {
            if (doCollide(snake[0], snake[i])) {
                endgame();
            } }
        }
    }

    // display endgame screen and stop interval timer
    // this should also be in helper functions but I got tired of scrolling down to find it so it's here
    function endgame() {
        // displays the game over css
        $("#gameover").css({opacity: 0.7});
        // removes the score from below the screen
        $("#gamescore").css({opacity: 0});
        // stop the interval timer
        clearInterval(interval);
        // turn off event handlers
        $(document).off();
    }


                /* //////////////////////////////////////////////////////////////////////////
                                            HELPER FUNCTIONS
                                All functions NOT called in newFrame go here!
                ////////////////////////////////////////////////////////////////////////// */ 


  // updates velocity when arrow keys pressed. updated velocity used in the resposition function to move head
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


    // generates the random integer in moveApple
    function randomInteger(max) {
            var randomInt = Math.floor(Math.random() * max);
            return randomInt;
    }

    // updates position of apple when 'eaten' 

    function moveApple() {
        apple.positionX = randomInteger(BOARD_SIZE/SQUARE_SIZE) * 20; // generates a random new x coordinate for the apple
        apple.positionY = randomInteger(BOARD_SIZE/SQUARE_SIZE) * 20; // generates a random new y coordinate for the apple
        
        //  move the apple to new x and y coordinates
        $('#apple').css("left", apple.positionX);
        $('#apple').css("top", apple.positionY);
    
        // if the new x and y positions collide with the snake, move the apple somwehere else
        for (var i = 0; i < snake.length; i++) {
            if (doCollide(apple, snake[i]) === false) {
            } else {
            moveApple();
            break;
            }    
        }   
    }


    // Adds body piece to the snake

    function bodyPiece(id) {
        var body = {};
        body.id = id;
        body.positionX = snake[0].positionX; // makes new body piece be at the same position as head
        body.positionY = snake[0].positionY; // makes new body piece be at the same position as head

        return body;
    }   

    function addSnake() {  
        var newID = "snake" + snake.length;  // eg snake1, snake2 
        
        // add body

        $("<div>")
            .addClass("body") // assigns new pice the 'body' class
            .attr('id', newID) // gives the new piece the id of snake1, snake2, etc
            .appendTo("#board"); // nests the new piece in the board div

        var newBody = bodyPiece("#" + newID); 
        snake.push(newBody);
    }

    // checks for collisions 

    function doCollide(obj1, obj2) {
        // if position x and position y of object 1 and 2 are the same, then there is a collision
        if (obj1.positionX === obj2.positionX && obj1.positionY === obj2.positionY) { 
        console.log("collision"); // THIS IS BEING LOGGED AND I DON'T KNOW WHY? game still works though
        return true;
            } else {
             return false;
            }
        }
  
}
