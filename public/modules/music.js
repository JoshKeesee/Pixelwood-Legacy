var gameMusic = new Audio();

gameMusic.src = "./audio/pixelwood-forest.mp3";
gameMusic.volume = 0.2;
gameMusic.loop = true;

function startMusic() {
  gameMusic.play();
}