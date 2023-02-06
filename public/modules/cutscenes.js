class Cutscene {
  constructor(txt, type, other) {
    this.text = txt;
    this.element = ".scene .text";
    this.type = type;
    this.other = other;
  }
  typeWriter() {
    var x = 0;
    var type = () => {
      if (x < this.text.length && !skip) {
        document.querySelector(this.element).innerHTML += this.text.charAt(x);
        x++;
        setTimeout(type, typingSpeed);
      } else {
        document.querySelector(this.element).innerHTML = this.text;
        document.querySelector(".scene .continue").classList.remove("hidden");
      }
    }
    setTimeout(type, typingSpeed);
  }
  toScene() {
    players[myId].scene = this.other.toScene;
    players[myId].x = this.other.x;
    players[myId].y = this.other.y;
    transitionScene(300);
    setTimeout(() => {
      this.typeWriter();
    }, 400);
  }
}

var tutorial = [];
tutorial[0] = new Cutscene("Welcome to Pixelwood!", "toScene", {x: 5 * 200 - 400 / 4, y: 0, toScene: 1});
tutorial[1] = new Cutscene("Pixelwood is an online RPG game where you can do lots of things.", "typeWriter");
tutorial[2] = new Cutscene("Come take a tour of the place!", "typeWriter");
tutorial[3] = new Cutscene("Here is your house...", "toScene", {x: 2825, y: 800, toScene: 0});
tutorial[4] = new Cutscene("...but there is also another house right next to it.", "toScene", {x: 1625, y: 800, toScene: 0});
tutorial[5] = new Cutscene("There is also a cave system...", "toScene", {x: 275, y: 200, toScene: 3});
tutorial[6] = new Cutscene("...but be careful. It is very dark in there.", "typeWriter");
tutorial[7] = new Cutscene("Don't worry though, you have a torch which you can hold to light up the place!", "typeWriter");
tutorial[8] = new Cutscene("Inside the cave, you can find lots of ores that can be mined and used for currency...", "typeWriter");
tutorial[9] = new Cutscene("...but some of them take a while to mine, so you may need to upgrade your pickaxe.", "typeWriter");
tutorial[10] = new Cutscene("Iron is the easiest to mine, then gold, then emerald, then ruby, and then diamond.", "typeWriter");
tutorial[11] = new Cutscene("You can also use the different utilities inside the house such as the chest to store items or the furnace to smelt things.", "toScene", {x: 5 * 200 - 400 / 4, y: 0, toScene: 1});
tutorial[12] = new Cutscene("Pixelwood also has some pretty easy controls, which include...", "typeWriter");
tutorial[13] = new Cutscene("...using the Arrow keys or WASD to move...", "typeWriter");
tutorial[14] = new Cutscene("...the X key to use items in your hotbar...", "typeWriter");
tutorial[15] = new Cutscene("...the Z key to use utilities (such as the chest, furnace, etc.)...", "typeWriter");
tutorial[16] = new Cutscene("...the P key to zoom in and out of the map...", "typeWriter");
tutorial[17] = new Cutscene("...the number keys to change your inventory slot...", "typeWriter");
tutorial[18] = new Cutscene("...the C key to access your backpack...", "typeWriter");
tutorial[19] = new Cutscene("...and the enter key to quickly open chat.", "typeWriter");
var typingSpeed = 50;
var skip = false;

function nextScene() {
  document.querySelector(".scene .continue").classList.add("hidden");
  document.querySelector(".scene .text").innerHTML = "";
  if (players[myId].cutScene < tutorial.length) {
    if (tutorial[players[myId].cutScene].type === "typeWriter") {
      tutorial[players[myId].cutScene].typeWriter();
    } else if (tutorial[players[myId].cutScene].type.includes("toScene")) {
      tutorial[players[myId].cutScene].toScene();
      saveGame();
    }
    players[myId].cutScene++;
  } else {
    $(".scene").fadeOut();
    players[myId].ready = true;
    allowedToMove = true;
    saveGame();
  }
}

function skipText() {
  skip = true;
}

function unskipText() {
  skip = false;
}