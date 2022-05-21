var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver () {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function playSound(name) {
  var audio = new Audio( "sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).fadeOut(100).fadeIn(100);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function checkAnswer (currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length)
    {
      userClickedPattern = [];
      setTimeout (function() {
        nextSequence();
      },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press any to Restart")
    startOver();
  }
}

$(".btn").on("click",function(event)
{
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);


});


$(document).on("keypress",function(event) {
  if(event) {
    nextSequence(level);
    started = true;
  }
})
