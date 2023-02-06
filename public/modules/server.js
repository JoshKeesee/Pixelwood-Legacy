const socket = io();

var myId = 0;
var players = {};
var playerData;
var playerFrames;
var gameSave;
var updatePlayer;
var fountainFrames;
var gameUpdate;
var connected = false;

socket.on("currentPlayers", (data) => {
  myId = socket.id;
  players = data[0];
  scenes = data[1];
  chestItems = data[2];

  players[socket.id].w = framewidth / scale;
  players[socket.id].h = frameheight / scale;

  for (var i = 0; i < chestItems.length; i++) {
    if (chestItems[i] !== "") {
      document.querySelectorAll(".item")[i].innerHTML = "<img id='" + chestItems[i] + "' src='" + items[chestItems[i]].src + "'>";
    } else {
      document.querySelectorAll(".item")[i].innerHTML = "";
    }
  }

  socket.emit("playerMovement", players[socket.id]);

  if (user) {
    players[myId].name = user.name;
    socket.emit("playerData", user.id);
  }

  updatePlayer = setInterval(() => {
    if (user) {
      players[myId].name = user.name;
    }
    
    if (connected) {
      socket.emit("playerMovement", players[myId]);
    }
  }, 1000 / 30);
});

function checkForAnimate() {
  if (readyToAnimate) {
    if (!connected) {
      players[myId] = {
    		x: 5 * 200 - 400 / 4,
    		y: 0,
    		xVel: 0,
    		yVel: 0,
    		w: 0,
    		h: 0,
    		speed: 1,
    		scene: 1,
        cutScene: 0,
    		id: myId,
    		currFrame: 0,
    		costumeY: 0,
    		inBed: false,
    		chestOpen: false,
    		useTool: false,
    		torch: 0,
        rotate: 0,
    		spot: 1,
    		inventory: ["sword", "pickaxe", "coal", "torch", "", "", "", ""],
        backpack: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    		dbId: null,
    		name: "Offline",
    		devMode: false,
    		ready: false,
    	};

      scenes = offlineScenes;
    }
    playerData = requestAnimationFrame(playerLoop);
    playerFrames = setInterval(loopFrames, 150);
    fountainFrames = setInterval(loopFountain, 100);
    doneLoading();
    gameUpdate = requestAnimationFrame(animate);
  } else {
    setTimeout(checkForAnimate, 0);
  }
}

function saveGame() {
  if (connected) {
    setTimeout(() => {
      $(".game-save").slideDown();
    }, 500);
    $(".manual-save").fadeOut();
    socket.emit("gameSave", players[myId]);
  
    setTimeout(() => {
      $(".game-save").slideUp();
      setTimeout(() => {
        $(".manual-save").fadeIn();
      }, 500);
    }, 5000);
  }
}

socket.on("playerData", (player) => {
  players[myId] = player;
  players[myId].inBed = false;
  players[myId].chestOpen = false;
  players[myId].useTool = false;
  if (scenes[players[myId].scene].type === "cave") {
    players[myId].x = 0;
    players[myId].y = 0;
  }
  saveGame();
  gameSave = setInterval(saveGame, 30000);
});

socket.on("newPlayer", (player) => {
  players[player.id] = player;
});

socket.on("updateOres", (data) => {
  scenes[players[socket.id].scene].scenery[data[1]] = data[0];
});

socket.on("chestItems", (data) => {
  chestItems = data;
  for (var i = 0; i < chestItems.length; i++) {
    if (chestItems[i] !== "") {
      document.querySelectorAll(".item")[i].innerHTML = "<img id='" + chestItems[i] + "' src='" + items[chestItems[i]].src + "'>";
    } else {
      document.querySelectorAll(".item")[i].innerHTML = "";
    }
  }
});

socket.on("playerMoved", (player) => {
  players[player.id] = player;
});

socket.on("connect", () => {
  connected = true;
  $(".connected").addClass("hidden");
  $(".save").removeClass("hidden");
});

socket.on("disconnect", () => {
  connected = false;
  $(".connected").removeClass("hidden");
  $(".save").addClass("hidden");
});

socket.on("disconnected", (player) => {
  delete players[player];
});