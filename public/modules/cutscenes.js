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

function skipTutorial() {
  players[myId].cutScene = tutorial.length;
  nextScene();
}