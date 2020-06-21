var logoMelody = new Audio();
logoMelody.src = "./music/logoMusic.mp3";

var clickAudio = new Audio();
clickAudio.src = "./music/zvuki/click.mp3";

var clickAudio2 = new Audio();
clickAudio2.src = "./music/zvuki/click2.mp3";

var fonMusic = new Audio();
fonMusic.src = "./music/fonMusic/portal/guitar.mp3";

var proigrushMusic = new Audio();
proigrushMusic.src = "./music/fonMusic/fonRubaUmerla.mp3";



// function logoMelody() {
// 	var audio = new Audio();
// 	audio.src = "./music/logoMusic.mp3";
// 	audio.autoplay = true;
// }

// var logoMusic = new Audio();
// logoMusic.preload = 'auto';
// logoMusic.src = './music/logoMusic.mp3';

function deleteFonMusic() {
	fonMusic.pause();
}