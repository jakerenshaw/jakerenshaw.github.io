var canvas = document.getElementById('myCanvas'),
context = canvas.getContext('2d');
background = new Image();
rockyBike = new Image();
win = new Image();
lose = new Image();

background.src = 'street.jpg';
rockyBike.src = 'rockybike.png';
win.src = 'win.jpg';
lose.src = 'lose.jpg';

var bikePosition = -50;
var bet;
var timer = 10;
var distance = 0;
var end = false;
var music = new Audio('rockyclip.mp3');
var winMusic = new Audio('wincut.mp3');
var loseMusic = new Audio('losecut.mp3');

startGame();

function startGame(){
background.onload = function() {
	context.drawImage(background, 0, 0, 900, 500);
	context.drawImage(rockyBike, bikePosition, 180, 400, 400);
};
}

function placeBet(n){
	bet = n;
	playGame();
}

function playGame(){
	context.drawImage(background, 0, 0, 900, 500);
	context.font="50px Georgia";
	context.fillText("GO!", 400, 100);
	context.drawImage(rockyBike, bikePosition, 180, 400, 400);
	setTimeout(function(){ endGame() }, 10000);
	music.play();
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){
			bikePosition += 5;
			distance += 0.5;
			context.drawImage(background, 0, 0, 900, 500);
			context.font="30px Georgia";
			context.fillText(distance + "m", 800, 50);
			context.drawImage(rockyBike, bikePosition, 180, 400, 400);
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
