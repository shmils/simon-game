var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;
var userClickCounter = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function checkAnswer(lastClickedColor) {
  if (lastClickedColor == gamePattern[userClickCounter - 1]) {
    if (userClickedPattern.length == gamePattern.length) {
      nextLevel();
    }
  } else {
    gameOver();
  }
}

function nextLevel() {
  level++;
  $("#level-title").text("Level " + level);
  setTimeout(function() {
    nextSequence();
  }, 300);
  userClickedPattern = [];
  userClickCounter = 0;
}

function gameOver() {
  level = 1;
  started = false;
  userClickCounter = 0;
  userClickedPattern = [];
  gamePattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound('wrong');
  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 100);
}

function playSound(name) {
  new Audio('sounds/' + name + '.mp3').play();
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
})

$(".btn").click(function() {
  var userClickedColor = $(this).attr('id');
  userClickedPattern.push(userClickedColor);
  playSound(userClickedColor);
  $("#" + userClickedColor).toggleClass("pressed");
  setTimeout(function() {
    $("#" + userClickedColor).toggleClass("pressed");
  }, 100);
  userClickCounter++;
  checkAnswer(userClickedColor);
})
