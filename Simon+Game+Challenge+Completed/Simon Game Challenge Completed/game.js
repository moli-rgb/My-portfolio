var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Function to generate and play tones
function playTone(frequency, duration) {
  try {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = context.createOscillator();
    var gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration);
    oscillator.stop(context.currentTime + duration);
  } catch (e) {
    console.log("Web Audio API not supported");
  }
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Also allow clicking on the title to start the game
$("#level-title").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  // Use Web Audio API tones as the primary method
  var frequencies = {
    "red": 200,
    "blue": 300,
    "green": 400,
    "yellow": 500,
    "wrong": 150
  };
  
  var frequency = frequencies[name] || 440;
  var duration = (name === "wrong") ? 0.5 : 0.3;
  
  playTone(frequency, duration);
  
  // Fallback: try to play sound files if they exist
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.3;
  audio.play().catch(function(error) {
    // If sound file doesn't exist, the Web Audio API tone will still play
    console.log("Sound file not found or could not be played: " + name + ".mp3 (using generated tone instead)");
  });
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}