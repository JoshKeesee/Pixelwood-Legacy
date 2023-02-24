const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  use: false,
  speed: false,
  showData: false,
  backpack: false,
};

const mouse = {
  x: 0,
  y: 0,
  w: 1,
  h: 1,
  click: false,
};

function keydown(e) {
  if (!transition && allowedToMove && !chatOpen) {
    if (e.key === "ArrowUp" || e.key === "w" && !(usingChest || usingFurnace || usingWorkbench || usingBackpack)) {
      movement.up = true;
    } else if (e.key === "ArrowDown" || e.key === "s" && !(usingChest || usingFurnace || usingWorkbench || usingBackpack)) {
      movement.down = true;
    } else if (e.key === "ArrowLeft" || e.key === "a" && !(usingChest || usingFurnace || usingWorkbench || usingBackpack)) {
      movement.left = true;
    } else if (e.key === "ArrowRight" || e.key === "d" && !(usingChest || usingFurnace || usingWorkbench || usingBackpack)) {
      movement.right = true;
    } else if (e.key === "z" && !(usingChest || usingFurnace || usingWorkbench || usingBackpack)) {
      if (!players[myId].useTool && connected) {
        socket.emit("playerMovement", players[myId]);
      }
      players[myId].useTool = true;
    }
  } else {
    movement.up = false;
    movement.down = false;
    movement.left = false;
    movement.right = false;
    players[myId].useTool = false;
  }
}

function keyup(e) {
  if (e.key === "1") {
    players[myId].spot = 1;
  } else if (e.key === "2") {
    players[myId].spot = 2;
  } else if (e.key === "3") {
    players[myId].spot = 3;
  } else if (e.key === "4") {
    players[myId].spot = 4;
  } else if (e.key === "5") {
    players[myId].spot = 5;
  } else if (e.key === "6") {
    players[myId].spot = 6;
  } else if (e.key === "7") {
    players[myId].spot = 7;
  } else if (e.key === "8") {
    players[myId].spot = 8;
  } else if (e.key === "ArrowUp" || e.key === "w") {
    movement.up = false;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    movement.down = false;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    movement.left = false;
  } else if (e.key === "ArrowRight" || e.key === "d") {
    movement.right = false;
  } else if (!transition && allowedToMove && !chatOpen) {
    if (e.key === "x") {
      movement.use = true;
    } else if (e.key === "c") {
      toggleBackpack();
    } else if (e.key === "z") {
      players[myId].useTool = false;
    } else if (e.key === "Shift") {
      movement.speed = !movement.speed;
    } else if (e.key === "q") {
      movement.showData = !movement.showData;
    } else if (e.key === "p") {
      movement.zoom = !movement.zoom;
    } else if (e.key === "Escape" && dev) {
      players[myId].devMode = !players[myId].devMode;
    } else if (e.key === "Enter") {
      enableChat();
      document.querySelector("#input").select();
    }
  } else if (e.key === "x" && (players[myId].chestOpen || usingChest || usingFurnace || usingWorkbench)) {
    movement.use = true;
  } else if (e.key === "c" && usingBackpack) {
    toggleBackpack();
  }
}

function mousemove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function mousedown() {
  mouse.click = true;
}

function mouseup() {
  mouse.click = false;
}

document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);
document.addEventListener("mousemove", mousemove, false);
document.addEventListener("mousedown", mousedown, false);
document.addEventListener("mouseup", mouseup, false);