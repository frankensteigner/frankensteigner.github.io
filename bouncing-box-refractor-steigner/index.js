/* global $ */
		'use strict'
		$(document).ready(function(){
            // SETUP
            
            var positionX = 0; // sets starting position
			var speedX = 10; // sets starting speed
            var points = 0; // sets number displayed on box
            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen

            // Every 50 milliseconds, call the update Function (see below)
			setInterval(update, 50);    

            // Every time the box is clicked, call the handleBoxClick Function (see below)
            $('#box').on('click', handleBoxClick);

            // CORE LOGIC
            
            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
            
			function update() {
				changePosition();
                redrawBox();
				keepScreen();
			}

			/* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
				increasePoints();
				increaseSpeed();
				resetPosition();
			}

            // HELPER FUNCTIONS

            // change the box's position
            function changePosition() {
                positionX += speedX;
            }

            // redraws the box
            function redrawBox() {
                $('#box').css("left", positionX);
            }

            // makes sure the box does not go off the screen and reverses it if it does
            function keepScreen() {
                if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
				}
            }

            function increasePoints() {
                points += 1;
                $('#box').text(points);
                points;
            }

            function increaseSpeed() {
                if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
					speedX -= 3;
				}
            }

            function resetPosition() {
                positionX = 0;
            }

		
		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE