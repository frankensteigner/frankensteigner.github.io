/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){

                /* //////////////////////////////////////////////////////////////////////////
                                            SETUP
                                initial var declarations go here!
                ////////////////////////////////////////////////////////////////////////// */ 

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
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 fps)
    $(document).on('keydown', handleKeyDown);                           
    $(document).on('keyup', handleKeyUp);
    $(document).on('keydown', handleKeyDownWASD);                       
    $(document).on('keyup', handleKeyUpWASD);

                /* //////////////////////////////////////////////////////////////////////////
                                            CORE LOGIC
                                All functions called in newFrame go here!
                ////////////////////////////////////////////////////////////////////////// */ 

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
        pongBlock();
        keepScreen();
        checkEndgame()
    }
  
    newFrame(); 

// keep in screen

        function keepScreen() {
                        // this code will check if the ping pong goes off the screen vertically
                        if (pingPong.y <= 0) {
                            pingPong.speedY = -pingPong.speedY;
                        } else if (pingPong.y >= screenHeight) {
                            pingPong.speedY = -pingPong.speedY;
                        } 
                        
                        // this code will check if the ping pong goes off the screen horizontally
                        else if (pingPong.x = 0) {
                            increasePointsRight();
                            $('#pingPong').css("left", "50%");
                            // pingPong.speedX = - pingPong.speedX;
                        } else if (pingPong.x = ScreenWidth) {
                            increasePointsLeft();
                            $('#pingPong').css("left", "50%");
                            // pingPong.speedX = - pingPong.speedX;
                        } 

                        // these functions will stop the paddles from going offscreen
                        else if (rightPaddle.y >= screenHeight) {
                            rightPaddle.speedY = 0;
                        } else if (rightPaddle.y <= 0)  {
                            rightPaddle.speedY = 0;
                        } else if (leftPaddle.y >= screenHeight) {
                            leftPaddle.speedY = 0;
                        } else if (leftPaddle.y <= 0)  {
                            leftPaddle.speedY = 0;
                        } 
                    }

    function checkEndgame() {
        if (pointsLeft > 10) {
            endGame();
        } else if (pointsRight > 10) {
            endGame();
        }
    }

  //PINGPONG MOVEMENT

    function startPingPong() {
        var number = Math.floor(Math.random() * 10);
        //check if the number is even or odd
        if (number % 2 == 0) {
            console.log("The number is even.");
            pingPong.speedX = 5;
            pingPong.speedY = 1;
            // pingPong.speedY = 5;
        } else if (number % 2 == 1) {
            console.log("The number is odd.");
            pingPong.speedX = -5;
            pingPong.speedY = -1;
            // pingPong.speedY = -5;
        }
        console.log("ping pong function called");
    }


    // checks for collision 

    function doCollide(ball, paddle) {

        // TODO: calculate and store the remaining
        // sides of the ball
        ball.leftX = ball.x;
        ball.topY = ball.y;
        ball.rightX = ball.x + ball.width;
        ball.bottomY = ball.y + ball.height; 
    
        // TODO: Do the same for square2
        paddle.leftX = paddle.x;
        paddle.topY = paddle.y;
        paddle.rightX = paddle.x + paddle.width;
        paddle.bottomY = paddle.y + paddle.height; 
	
        if (ball.rightX > paddle.leftX && ball.leftX && paddle.rightX && ball.topY < paddle.bottomY
         && paddle.bottomY > ball.topY) {
            console.log("overlap");
            //pingPong.speedX = pingPong.speedX * -1;
            return true;
            } else { 
                //pingPong.speedX = pingPong.speedX * 1;
                console.log("no overlap");
                return false;
            }
    }

    function pongBlock() {
        if ((doCollide(pingPong, rightPaddle)) === true) {
            pingPong.speedX = pingPong.speedX;
        } else if ((doCollide(pingPong, leftPaddle)) === true) {
            pingPong.speedX = pingPong.speedX;
        } else 
            console.log("no paddle collide");
    }

    // SCOREBOARD
        // put scoreboard update code here

    function increasePointsLeft() {
                pointsLeft = (pointsLeft + 1);
                $('#leftScore').text(pointsLeft);
            }

    function increasePointsRight() {
                pointsRight += 1;
                $('#rightScore').text(pointsRight);
                pointsRight;
            }
  


                /* //////////////////////////////////////////////////////////////////////////
                                            HELPER FUNCTIONS
                                All functions NOT called in newFrame go here!
                ////////////////////////////////////////////////////////////////////////// */


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

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    $("#endgame").css({opacity: 0.7});
    $("#gameover").css({opacity: 0.1});
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
}