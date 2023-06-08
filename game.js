let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");  // to store the id of the button that got clicked. 
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);  // when a user clicks on a button, the corresponding sound should be played.
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log(wrong);
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//  setInterval(nextSequence,1000);

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}