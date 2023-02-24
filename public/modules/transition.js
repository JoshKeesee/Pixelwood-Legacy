var transition = false;

$(document).ready(() => {
  setTimeout(() => {
    $(".align").css("opacity", 1);
  }, 100);
});

function transitionScene(ms) {
  transition = true;
  brightness = 1;
  setTimeout(() => {
    transition = false;
  }, ms);
}

function startGame() {
  $(".furnace").slideUp(0);
  $(".chest").slideUp(0);
  $(".game-save").slideUp(0);
  $(".connected").addClass("hidden");
  $(".save").removeClass("hidden");

  $(".loading .icon").removeClass("hidden");
  $(".loading .icon").fadeOut(0);
  $(".align").slideUp();
  $(".main-menu").slideUp("slow");
  $("footer").fadeOut("slow");
  setTimeout(() => {
    $(".loading .icon").fadeIn();
  }, 500);
  
  setTimeout(loadImages, 500);
  checkForAnimate();
}

function doneLoading() {
  $(".loading").fadeOut("slow");
  usingUtility = false;
  startMusic();
  if (user) {
    setTimeout(() => {
      $(".logged-in").slideDown();
    }, 1000);
    
    setTimeout(() => {
      $(".logged-in").slideUp();
    }, 4000);
  }
  tutorial[0] = new Cutscene("Welcome to Pixelwood, " + players[myId].name + "!", "toScene", {x: 5 * 200 - 400 / 4, y: 0, toScene: 1});
  tutorial[1] = new Cutscene("Pixelwood is an online RPG game where you can do lots of things.", "typeWriter");
  tutorial[2] = new Cutscene("Come take a tour of the place!", "typeWriter");
  tutorial[3] = new Cutscene("Here is your house...", "toScene", {x: 2825, y: 800, toScene: 0});
  tutorial[4] = new Cutscene("...but there is also another house right next to it.", "toScene", {x: 1625, y: 800, toScene: 0});
  tutorial[5] = new Cutscene("There is also a cave system...", "toScene", {x: 275, y: 200, toScene: 3});
  tutorial[6] = new Cutscene("...but be careful. It is very dark in there.", "typeWriter");
  tutorial[7] = new Cutscene("Don't worry though, you have a torch which you can hold to light up the place!", "typeWriter");
  tutorial[8] = new Cutscene("Inside the cave, you can find lots of ores that can be mined and used for currency...", "typeWriter");
  tutorial[9] = new Cutscene("...but some of them take a while to mine, so you may need to upgrade your pickaxe.", "typeWriter");
  tutorial[10] = new Cutscene("Gold is the easiest to mine, then iron, then ruby, then diamond, and then emerald.", "typeWriter");
  tutorial[11] = new Cutscene("You can also use the different utilities inside the house such as the chest to store items or the furnace to smelt things.", "toScene", {x: 5 * 200 - 400 / 4, y: 0, toScene: 1});
  tutorial[12] = new Cutscene("Pixelwood also has some pretty easy controls, which include...", "typeWriter");
  tutorial[13] = new Cutscene("...using the Arrow keys or WASD to move...", "typeWriter");
  tutorial[14] = new Cutscene("...the X key to use items in your hotbar...", "typeWriter");
  tutorial[15] = new Cutscene("...the Z key to use utilities (such as the chest, furnace, etc.)...", "typeWriter");
  tutorial[16] = new Cutscene("...the P key to zoom in and out of the map...", "typeWriter");
  tutorial[17] = new Cutscene("...the number keys to change your inventory slot...", "typeWriter");
  tutorial[18] = new Cutscene("...the C key to access your backpack...", "typeWriter");
  tutorial[19] = new Cutscene("...and the enter key to quickly open chat.", "typeWriter");
  if (players[myId].cutScene > tutorial.length - 1) {
    $(".scene").fadeOut(0);
    players[myId].ready = true;
    allowedToMove = true;
    return;
  }
  nextScene();
}