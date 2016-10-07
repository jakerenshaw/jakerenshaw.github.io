var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');
stairs = new Image();
rockyRun = new Image();
win = new Image();
lose = new Image();
rockyRuns = new Image();

stairs.src = 'stairs.jpg';
rockyRun.src = 'rockyRun.png';
rockyRuns.src = 'rockyRuns.png';
win.src = 'win.jpg';
lose.src = 'lose.jpg';

var stepsV = 150;
var stepsX = 50;
var sizeW = 400;
var sizeH = 400;
var flip = 1;

var bet;
var timer = 10;
var distance = 0;
var end = false;
var music = new Audio('rockyclip.mp3');
var winMusic = new Audio('wincut.mp3');
var loseMusic = new Audio('losecut.mp3');

startGame();

function startGame(){
stairs.onload = function() {
	context.drawImage(stairs, 0, 0, 900, 500);
	context.drawImage(rockyRun, stepsX, stepsV, sizeW, sizeH);
};
}

function placeBet(n){
	bet = n;
	playGame();
}

function playGame(){
	context.drawImage(stairs, 0, 0, 900, 500);
	context.font="50px Georgia";
	context.fillText("GO!", 400, 100);
	context.drawImage(rockyRun, stepsX, stepsV, sizeW, sizeH);
	setTimeout(function(){ endGame() }, 10000);
	music.play();
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){
			stepsV -= 0.5;
			stepsX += 4;
			sizeH -= 4;
			sizeW -= 4;
			distance += 1;
			flip += 1;
			context.drawImage(stairs, 0, 0, 900, 500);
			context.font="30px Georgia";
			context.fillText(distance + " steps", 800, 50);
			if (flip % 2 === 0)
			{
				context.drawImage(rockyRun, stepsX, stepsV, sizeW, sizeH);
			}
			else
			{
				context.drawImage(rockyRuns, stepsX, stepsV, sizeW, sizeH);
			}
		}
	}
}

function endGame(){
	document.body.onkeyup = function (e) {
		return false;
	}
	var winnings = 10*(bet+1);
	var winMes = "Congratulations! Your bet won - $" + (winnings);
	var loseMes = "Unlucky, your bet lost";
	if (distance > (bet * 10))
	{
		winMusic.play();
		context.drawImage(win, 0, 0, 900, 500);
		context.beginPath();
		context.rect(145, 3, 500, 40);
		context.fillStyle = 'yellow';
		context.fill();
		context.fillStyle = 'blue';
		context.fillText(winMes, 150, 30);
	}
	else
	{
		loseMusic.play();
		context.drawImage(lose, 0, 0, 900, 500);
		context.beginPath();
		context.rect(165, 3, 300, 40);
		context.fillStyle = 'black';
		context.fill();
		context.fillStyle = 'red';
		context.fillText(loseMes, 170, 30);
	}
}

