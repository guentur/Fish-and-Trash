
function fishToMouse(event) {

	var game = document.querySelector('#game');

	var realGameX = game.offsetLeft - (game.clientWidth / 2);
	var realGameY = game.offsetTop - (game.clientHeight / 2);
	realMouseX = event.clientX - realGameX; 
	realMouseY = event.clientY - realGameY; 
}
