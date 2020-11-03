/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
    var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  
    var screenHeight = $(window).height();
    var ScreenWidth = $(window).width();
    var pointsLeft = 0;
    var pointsRight = 0;

    var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen

    var ARROW_KEY = {
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


  // Game Item Objects

    //STARTGAME 
        // put code to make the css start game screen disappear here

    function start() {
        document.getElementById("startgame").style.display = "none";
        document.getElementById("startbutton").style.display = "none";
        startPingPong();
    }
    startbutton.addEventListener("click", start);

    // SCOREBOARD
            // put scoreboard update code here

    function increasePointsLeft() {
                pointsLeft += 1;
                $('#scoreboard').text(pointsLeft);
                pointsLeft;
            }

    function increasePointsRight() {
                pointsRight += 1;
                $('#scoreboard').text(pointsRight);
                pointsRight;
            }

    function keepScreen(newScoreLeft) {
                if (positionX > BOARD_WIDTH) {
					increasePointsLeft;
				}
				else if (positionX < 0) {
					increasePointsRight
				}
            }

    function updateScoreBoard() {
        keepScreen();
    }

    // css information extractor 

    function takeIn(element) {
        var cssExtract = {
        id: element,
        position: $(element).css("position"),
        width: $(element).width(),
        height: $(element).height(),
        x: Number($(element).css('left').replace(/[^-\d\.]/g, '')),
        y: Number($(element).css('top').replace(/[^-\d\.]/g, '')),
        speedX: 0,
        speedY: 0,
        }
        return cssExtract;
    }

    var pingPong = takeIn("#pingPong");
    var rightPaddle = takeIn("#rightPaddle");
    var leftPaddle = takeIn("#leftPaddle");

  // one-time setup
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyDown);                           
    $(document).on('keyup', handleKeyUp);
    $(document).on('keydown', handleKeyDownWASD);                       
    $(document).on('keyup', handleKeyUpWASD);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //PINGPONG MOVEMENT

    function startPingPong() {
        var number = Math.floor(Math.random() * 10);
        //check if the number is even or odd
        if (number % 2 == 0) {
            console.log("The number is even.");
            pingPong.speedX = 5;
        } else if (number % 2 == 1) {
            console.log("The number is odd.");
            pingPong.speedX = -5;
        }
        console.log("ping pong function called");
    }

    /* 
    these handleKey functions register to the console if the key is pressed and move the paddles accordingly
    */ 

    function handleKeyDown(event) {
        if (event.which === ARROW_KEY.UP) {
            console.log("up arrow key pressed");
                rightPaddle.speedY = -5;
        } else if (event.which === ARROW_KEY.DOWN) {
            console.log("down arrow key pressed");
                rightPaddle.speedY = 5;
        }
    }

    function handleKeyUp(event) {
        if (event.which === ARROW_KEY.UP) {
            console.log("up arrow key released");
                rightPaddle.speedY = 0;
        } else if (event.which === ARROW_KEY.DOWN) {
            console.log("down arrow key released");
                rightPaddle.speedY = 0;
        }
    }

        function handleKeyDownWASD(event) {
        if (event.which === KEY_WASD.W) {
            console.log("w key pressed");
                leftPaddle.speedY = -5;
        } else if (event.which === KEY_WASD.S) {
            console.log("s key pressed");
                leftPaddle.speedY = 5;
        }
    }

    function handleKeyUpWASD(event) {
        if (event.which === KEY_WASD.W) {
            console.log("w key released");
                leftPaddle.speedY = 0;
        } else if (event.which === KEY_WASD.S) {
            console.log("s key released");
                leftPaddle.speedY = 0;
        }
    }

    // checks for collision 

    function doCollide(ball, paddle) {

        // TODO: calculate and store the remaining
        // sides of the ball
        ball.leftX = ball.x;
        ball.topY = ball.y;
        ball.rightX = ball.x + ball.width;
        ball.bottomY = ball.y - ball.height; 
    
        // TODO: Do the same for square2
        paddle.leftX = paddle.x;
        paddle.topY = paddle.y;
        paddle.rightX = paddle.x + paddle.width;
        paddle.bottomY = paddle.y - paddle.height; 

        // TODO: Return true if they are overlapping, false otherwise
	
        if (ball.rightX > paddle.leftX && ball.leftX < paddle.rightX && ball.topY > paddle.bottomY
         && paddle.bottomY < ball.topY) {
            console.log("overlap");
            pingPong.speedX = pingPong.speedX * -1;
            return true
            } else { 
                pingPong.speedX = pingPong.speedX * 1;
                console.log("no overlap");
                return false
                }
            }

        }

  /* 
  Updates the positions of the paddles on screen
  */
    function newFrame() {
        repositionRightPaddle();
        redrawRightPaddle();
        repositionLeftPaddle();
        redrawLeftPaddle();
        repositionPingPong();
        redrawPingPong();
        updateScoreBoard();
    }
  
    newFrame(); 


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  

    function repositionLeftPaddle() {
        leftPaddle.y += leftPaddle.speedY; // update the position of the box on the y axis  
    }

    function redrawLeftPaddle() {
        $("#leftPaddle").css("top", leftPaddle.y); // draws the box positionY pixels away from 'top' location
    }

    function repositionRightPaddle() {
        rightPaddle.y += rightPaddle.speedY; // update the position of the box on the y axis 
    }

    function redrawRightPaddle() {
        $("#rightPaddle").css("top", rightPaddle.y); // draws the box rightPaddle.y pixels away from 'top' location
        // console.log("right paddle redraw");
    }

    function repositionPingPong() {
        pingPong.y += pingPong.speedY; // update the position of the pingpong on the y axis 
        pingPong.x += pingPong.speedX; // update the position of the pingpong on the x axis
    }

    function redrawPingPong() {
        $("#pingPong").css("top", pingPong.y); // draws the box pingPong.y pixels away from 'top' location
        $("#pingPong").css("left", pingPong.x); // draws the box pingPong.x pixels away from 'left' location
    }

