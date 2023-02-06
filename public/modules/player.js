$(".furnace").slideUp(0);
$(".chest").slideUp(0);

var allowedToMove = false;
var usingUtility = false;

var CAMERAX = 0;
var CAMERAY = 0;
var CAMERAZOOM = 1;
var smoothing = 0.25;

const playerLoop = () => {
  playerData = requestAnimationFrame(playerLoop);
  
  if (players[myId].devMode) {
    if (!movement.speed) {
      players[myId].speed = 3;
    } else {
      players[myId].speed = 6;
    }
  } else {
    players[myId].speed = 1.5;
  }
  
  CAMERAX += smoothing * ((players[myId].x - canvas.width / 2 + ((framewidth / 2) / scale)) - CAMERAX);
  CAMERAY += smoothing * ((players[myId].y - canvas.height / 2 + ((frameheight / 2) / scale)) - CAMERAY);

  if (scenes[players[myId].scene].type !== "house" && scenes[players[myId].scene].type !== "cave") {
    if (CAMERAX < 0) {
      CAMERAX = 0;
    }
  
    if (CAMERAX + canvas.width > scenes[players[myId].scene].width * grass.width) {
      CAMERAX = scenes[players[myId].scene].width * grass.width - canvas.width;
    }
  
    if (CAMERAY < 0) {
      CAMERAY = 0;
    }
  
    if (CAMERAY + canvas.height > scenes[players[myId].scene].height * grass.height) {
      CAMERAY = scenes[players[myId].scene].height * grass.height - canvas.height;
    }
  }
  
  players[myId].xVel *= 0.8;
  players[myId].yVel *= 0.8;

  players[myId].xVel = Math.trunc(players[myId].xVel * 10) / 10;
  players[myId].yVel = Math.trunc(players[myId].yVel * 10) / 10;

  players[myId].x += players[myId].xVel;
  players[myId].y += players[myId].yVel;

  players[myId].x = Math.trunc(players[myId].x * 10) / 10;
  players[myId].y = Math.trunc(players[myId].y * 10) / 10;

  if (movement.up) {
    players[myId].yVel -= players[myId].speed;
  }
  if (movement.down) {
    players[myId].yVel += players[myId].speed;
  }
  if (movement.left) {
    players[myId].xVel -= players[myId].speed;
  }
  if (movement.right) {
    players[myId].xVel += players[myId].speed;
  }

  $(".use").addClass("hidden");

  for (var i = 0; i < collisions.length; i++) {
    if (colliding(players[myId], collisions[i])) {
      if (collisions[i].type === "ladder" && players[myId].costumeY === 1) {
        $(".use").removeClass("hidden");
      }

      if (collisions[i].type === "bed") {
        $(".use").removeClass("hidden");
      }

      if ((collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") && players[myId].inventory[players[myId].spot - 1] === "pickaxe" && players[myId].useTool) {
        scenes[players[myId].scene].scenery[collisions[i].id].mining -= scenes[players[myId].scene].scenery[collisions[i].id].miningSpeed;
        if (scenes[players[myId].scene].scenery[collisions[i].id].mining < 0 && !scenes[players[myId].scene].scenery[collisions[i].id].mined) {
          scenes[players[myId].scene].scenery[collisions[i].id].mining = 0;
          scenes[players[myId].scene].scenery[collisions[i].id].mined = true;
          for (var x = 0; x < players[myId].inventory.length; x++) {
            if (players[myId].inventory[x] === "") {
              players[myId].inventory[x] = collisions[i].type;
              break;
            }
          }
        }
        socket.emit("updateOres", [scenes[players[myId].scene].scenery[collisions[i].id], collisions[i].id]);
      } else if ((collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") && !scenes[players[myId].scene].scenery[collisions[i].id].mined) {
        if (scenes[players[myId].scene].scenery[collisions[i].id].mining !== 1) {
          socket.emit("updateOres", [scenes[players[myId].scene].scenery[collisions[i].id], collisions[i].id]);
        }
        scenes[players[myId].scene].scenery[collisions[i].id].mining = 1;
      }
      
      if (collisions[i].type !== "ladder" && collisions[i].type !== "exit" && collisions[i].type !== "bed" && collisions[i].type !== "change") {
        if (colT(players[myId], collisions[i])) {
          players[myId].y = collisions[i].y - (frameheight / scale) - 2;
          if ((collisions[i].type === "furnace" || collisions[i].type === "chest") && players[myId].costumeY === 0) {
            players[myId].y = collisions[i].y - (frameheight / scale);
            $(".use").removeClass("hidden");
            if (movement.use && collisions[i].type === "furnace" && !players[myId].chestOpen) {
              toggleFurnace();
            } else if (movement.use) {
              toggleChest();
            }
          } else if (collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") {
            players[myId].y = collisions[i].y - (frameheight / scale);
          }
        }

        if (colB(players[myId], collisions[i])) {
          players[myId].y = collisions[i].y + collisions[i].h + 2;
          if ((collisions[i].type === "furnace" || collisions[i].type === "chest") && players[myId].costumeY === 1) {
            players[myId].y = collisions[i].y + collisions[i].h;
            $(".use").removeClass("hidden");
            if (movement.use && collisions[i].type === "furnace") {
              toggleFurnace();
            } else if (movement.use) {
              toggleChest();
            }
          } else if (collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") {
            players[myId].y = collisions[i].y + collisions[i].h;
          }
        }

        if (colR(players[myId], collisions[i])) {
          players[myId].x = collisions[i].x + collisions[i].w + 2;
          if ((collisions[i].type === "furnace" || collisions[i].type === "chest") && players[myId].costumeY === 2) {
            players[myId].x = collisions[i].x + collisions[i].w;
            $(".use").removeClass("hidden");
            if (movement.use && collisions[i].type === "furnace") {
              toggleFurnace();
            } else if (movement.use) {
              toggleChest();
            }
          } else if (collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") {
            players[myId].x = collisions[i].x + collisions[i].w;
          }
        }

        if (colL(players[myId], collisions[i])) {
          players[myId].x = collisions[i].x - (framewidth / scale) - 2;
          if ((collisions[i].type === "furnace" || collisions[i].type === "chest") && players[myId].costumeY === 3) {
            players[myId].x = collisions[i].x - (framewidth / scale);
            $(".use").removeClass("hidden");
            if (movement.use && collisions[i].type === "furnace") {
              toggleFurnace();
            } else if (movement.use) {
              toggleChest();
            }
          } else if (collisions[i].type === "iron" || collisions[i].type === "gold" || collisions[i].type === "emerald" || collisions[i].type === "diamond" || collisions[i].type === "ruby") {
            players[myId].x = collisions[i].x - (framewidth / scale);
          }
        }
      } else if (collisions[i].type === "bed" && movement.use && !players[myId].inBed) {
        getInBed(collisions[i]);
      } else if (collisions[i].type === "change") {
        players[myId].scene = collisions[i].toScene;
        players[myId].x = collisions[i].toX;
        players[myId].y = collisions[i].toY;
        CAMERAX += (players[myId].x - canvas.width / 2 + ((framewidth / 2) / scale)) - CAMERAX;
        CAMERAY += (players[myId].y - canvas.height / 2 + ((frameheight / 2) / scale)) - CAMERAY;
        transitionScene(300);
      } else if ((movement.use && collisions[i].type === "ladder" && players[myId].costumeY === 1) || ((movement.down || movement.up) && collisions[i].type === "exit")) {
        var oldScene = players[myId].scene;
        players[myId].scene = collisions[i].toScene;
        players[myId].x = collisions[i].toX;
        players[myId].y = collisions[i].toY;
        if (collisions[i].toScene === 0 && oldScene === 1) {
          players[myId].x = 2500 + house.width / 2 - (framewidth / scale) / 2 - 12;
          players[myId].y = 100 + house.height - 260 + framewidth / scale;
        } else if (collisions[i].toScene === 0 && oldScene === 5) {
          players[myId].x = 1300 + house.width / 2 - (framewidth / scale) / 2 - 12;
          players[myId].y = 100 + house.height - 260 + framewidth / scale;
        } else if (collisions[i].toScene === 1 && players[myId].scene === 0) {
          players[myId].x = (scenes[players[myId].scene].width - 1) * plank.width + (plank.width / 2) - (framewidth / scale / 2);
          players[myId].y = (scenes[players[myId].scene].height - 1) * plank.height;
        }
        CAMERAX += (players[myId].x - canvas.width / 2 + ((framewidth / 2) / scale)) - CAMERAX;
        CAMERAY += (players[myId].y - canvas.height / 2 + ((frameheight / 2) / scale)) - CAMERAY;
        transitionScene(300);
      }
    }
  }

  movement.use = false;

  if (players[myId].x < 0) {
    players[myId].x = 0;
    players[myId].xVel = 0;
  }

  if (players[myId].y < 0) {
    players[myId].y = 0;
    players[myId].yVel = 0;
  }

  if (players[myId].x + (framewidth / scale) > scenes[players[myId].scene].width * grass.width) {
    players[myId].x = scenes[players[myId].scene].width * grass.width - (framewidth / scale);
    players[myId].xVel = 0;
  }

  if (players[myId].y + (frameheight / scale) > scenes[players[myId].scene].height * grass.height) {
    players[myId].y = scenes[players[myId].scene].height * grass.height - (frameheight / scale);
    players[myId].yVel = 0;
  }

  if (players[myId].inventory[players[myId].spot - 1] === "torch" && players[myId].useTool) {
    players[myId].torch += smoothing * (1000 - players[myId].torch);
  } else {
    players[myId].torch += smoothing * (500 - players[myId].torch);
  }

  players[myId].torch = Math.trunc(players[myId].torch);

  if (players[myId].inventory[players[myId].spot - 1] !== "" && !easterEgg) {
    $(".usetool").removeClass("hidden");

    $(".usetool .text").html("USE " + players[myId].inventory[players[myId].spot - 1].toUpperCase() + "(Z)");
  } else if (easterEgg) {
    $(".usetool").removeClass("hidden");
  } else {
    $(".usetool").addClass("hidden");
  }

  if (usingUtility) {
    $(".use .text").html("CLOSE(X)");
  } else {
    $(".use .text").html("USE(X)");
  }

  if (movement.zoom) {
    CAMERAZOOM += 0.2 * (0.7 - CAMERAZOOM);
  } else {
    CAMERAZOOM += 0.2 * (1 - CAMERAZOOM);
  }

  if (movement.down) {
    players[myId].costumeY = 0;
  } else if (movement.up) {
    players[myId].costumeY = 1;
  } else if (movement.left) {
    players[myId].costumeY = 2;
  } else if (movement.right) {
    players[myId].costumeY = 3;
  }
};

const loopFrames = () => {
  if (movement.up || movement.down || movement.left || movement.right) {
    players[myId].currFrame++;
  
    if (players[myId].currFrame > 3) {
      players[myId].currFrame = 0;
    }
  } else {
    players[myId].currFrame = 0;
  }
};

function toggleFurnace() {
  allowedToMove = !allowedToMove;
  usingUtility = !usingUtility;
  $(".furnace").slideToggle(200);
}

function toggleChest() {
  players[myId].chestOpen = !players[myId].chestOpen;
  allowedToMove = !allowedToMove;
  usingUtility = !usingUtility;
  $(".chest").slideToggle(200);
}

function toggleBackpack() {
  allowedToMove = !allowedToMove;
  usingUtility = !usingUtility;
  $(".backpack").slideToggle(200);
}

function selectItemFromChest(item) {
  var originalItem = players[myId].inventory[players[myId].spot - 1];
  if (document.getElementById(item).innerHTML === "") {
    document.getElementById(item).innerHTML = "<img id='" + players[myId].inventory[players[myId].spot - 1] + "' src='" + items[players[myId].inventory[players[myId].spot - 1]].src + "'>";
    players[myId].inventory[players[myId].spot - 1] = "";
  } else {
    if (players[myId].inventory[players[myId].spot - 1] === "") {
      players[myId].inventory[players[myId].spot - 1] = document.getElementById(item).firstChild.id;
      document.getElementById(item).innerHTML = "";
    } else {
      players[myId].inventory[players[myId].spot - 1] = document.getElementById(item).firstChild.id;
      document.getElementById(item).innerHTML = "<img id='" + originalItem + "' src='" + items[originalItem].src + "'>";
    }
  }

  for (var i = 0; i < document.querySelectorAll(".chest .item").length; i++) {
    if (document.querySelectorAll(".chest .item")[i].innerHTML !== "") {
      chestItems[i] = document.querySelectorAll(".chest .item")[i].firstChild.id;
    } else {
      chestItems[i] = "";
    }
  }

  if (connected) {
    socket.emit("chestItems", chestItems);
  }
}

function selectItemFromBackpack(item) {
  var originalItem = players[myId].inventory[players[myId].spot - 1];
  if (document.getElementById(item).innerHTML === "") {
    document.getElementById(item).innerHTML = "<img id='" + players[myId].inventory[players[myId].spot - 1] + "' src='" + items[players[myId].inventory[players[myId].spot - 1]].src + "'>";
    players[myId].inventory[players[myId].spot - 1] = "";
  } else {
    if (players[myId].inventory[players[myId].spot - 1] === "") {
      players[myId].inventory[players[myId].spot - 1] = document.getElementById(item).firstChild.id;
      document.getElementById(item).innerHTML = "";
    } else {
      players[myId].inventory[players[myId].spot - 1] = document.getElementById(item).firstChild.id;
      document.getElementById(item).innerHTML = "<img id='" + originalItem + "' src='" + items[originalItem].src + "'>";
    }
  }

  for (var i = 0; i < document.querySelectorAll(".backpack .item").length; i++) {
    if (document.querySelectorAll(".backpack .item")[i].innerHTML !== "") {
      players[myId].backpack[i] = document.querySelectorAll(".backpack .item")[i].firstChild.id;
    } else {
      players[myId].backpack[i] = "";
    }
  }
}

function useTool() {
  players[myId].useTool = true;
}

function cancelTool() {
  players[myId].useTool = false;
}

function getInBed(cords) {
  allowedToMove = false;
  players[myId].inBed = true;
  players[myId].x = cords.x + cords.w / 2 - framewidth / scale / 2 - 7;
  players[myId].y = cords.y + 45;
  players[myId].costumeY = 4;
  players[myId].currFrame = 0;

  setTimeout(() => {
    allowedToMove = true;
    players[myId].inBed = false;
    players[myId].x = cords.x - framewidth / scale;
    players[myId].y = cords.y;
    players[myId].costumeY = 0;
    players[myId].currFrame = 0;
    saveGame();
  }, 6000);
}