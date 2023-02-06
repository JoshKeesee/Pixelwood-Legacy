const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

var hotBarSpots = 8;
var hotBarSize = 80;

var collisions = [];

var brightness = 0;
var framewidth = 400;
var frameheight = 500;
var scale = 4;
var easterEgg = false;

document.fonts.load("30px pixel");

function loopFountain() {
  fountainFrame++;

  if (fountainFrame === 16) {
    fountainFrame = 0;
  }
}

function animate() {
  gameUpdate = requestAnimationFrame(animate);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (canvas.width > 1000) {
    hotBarSize = canvas.width / 20;
  } else {
    hotBarSize = canvas.width / 10;
  }
  hotBarSpots = players[myId].inventory.length;
  Object.keys(items).forEach(item => {
    items[item].width = hotBarSize - 20;
    items[item].height = hotBarSize - 20;
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisions = [];

  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(CAMERAZOOM, CAMERAZOOM);
  ctx.translate(-CAMERAX - canvas.width / 2, -CAMERAY - canvas.height / 2);

  for (var i = 0; i < scenes[players[myId].scene].height; i++) {
    for (var x = 0; x < scenes[players[myId].scene].width; x++) {
      if (scenes[players[myId].scene].type === "plains") {
        ctx.drawImage(grass, x * grass.width, i * grass.height, grass.width, grass.height);
      } else if (scenes[players[myId].scene].type === "house") {
        ctx.drawImage(plank, x * plank.width, i * plank.height, plank.width, plank.height);
      } else if (scenes[players[myId].scene].type === "cave") {
        ctx.drawImage(rocks, x * rocks.width, i * rocks.height, rocks.width, rocks.height);
      }
    }
  }

  if (scenes[players[myId].scene].type === "house" && scenes[players[myId].scene].height > 3) {
    ctx.beginPath();
    ctx.rect(-2, (scenes[players[myId].scene].height - 1) * plank.height + 2, (scenes[players[myId].scene].width - 1) * plank.width + 2, plank.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    collisions[collisions.length] = {
      x: -2,
      y: (scenes[players[myId].scene].height - 1) * plank.height + 2,
      w: (scenes[players[myId].scene].width - 1) * plank.width + 2,
      h: plank.height,
      type: "black",
    }
  } else if (scenes[players[myId].scene].type === "house") {
    ctx.beginPath();
    ctx.rect(-2, -2, plank.width + 2, plank.height - 100);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  if (scenes[players[myId].scene].type === "plains") {
    for (var i = 0; i < scenes[players[myId].scene].scenery.length; i++) {
      if (scenes[players[myId].scene].scenery[i].type === "path") {
        ctx.drawImage(path, scenes[players[myId].scene].scenery[i].x, scenes[players[myId].scene].scenery[i].y, path.width, path.height);
      }
    }
  }

  var person = [];
  var i = 0;

  Object.keys(players).forEach(id => {
    person[i] = {
      x: players[id].x,
      y: players[id].y + frameheight / scale,
      type: "player",
      id: id,
    };
    i++;
  });

  var newScenery = [];
  i = 0;

  scenes[players[myId].scene].scenery.forEach(object => {
    var height;
    if (object !== {} && object !== null) {
      if (object.type === "dirt") {
        height = 0;
      } else if (object.type === "tree") {
        height = tree.height;
      } if (object.type === "small-tree") {
        height = smallTree.height;
      } else if (object.type === "flower") {
        height = flower.height;
      } else if (object.type === "blue-flower") {
        height = blueFlower.height;
      } else if (object.type === "purple-flower") {
        height = purpleFlower.height;
      } else if (object.type === "house") {
        height = house.height - 70;
        collisions[collisions.length] = {
          x: object.x + 100,
          y: object.y + 180,
          w: house.width - 230,
          h: house.height - 360,
          type: "house",
        }
      } else if (object.type === "ladder") {
        height = ladder.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: ladder.width,
          h: ladder.height,
          type: "ladder",
          toScene: object.toScene,
          toX: object.toX,
          toY: object.toY,
        }
      } else if (object.type === "exit") {
        height = 20;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: 200,
          h: height,
          type: "exit",
          toScene: object.toScene,
          toX: object.toX,
          toY: object.toY,
        }
      } else if (object.type === "change") {
        height = 200;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: 200,
          h: height,
          type: "change",
          toScene: object.toScene,
          toX: object.toX,
          toY: object.toY,
        }
      } else if (object.type === "chest") {
        height = chestClosed.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: chestClosed.width,
          h: chestClosed.height,
          type: "chest",
        }
      } else if (object.type === "furnace") {
        height = furnace.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: furnace.width,
          h: furnace.height,
          type: "furnace",
        }
      } else if (object.type === "bed") {
        height = 0;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: bed.width,
          h: bed.height,
          type: "bed",
        }
      } else if (object.type === "glass") {
        height = glass.height;
      } else if (object.type === "sign") {
        height = sign.height;
      } else if (object.type === "cave") {
        height = 0;
      } else if (object.type === "box") {
        height = 1;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y,
          w: 200,
          h: 200,
          type: "box",
        }
      } else if (object.type === "emerald") {
        height = 0;
        if (!object.mined) {
          collisions[collisions.length] = {
            x: object.x,
            y: object.y,
            w: 200,
            h: 200,
            id: i,
            mining: object.mining,
            type: "emerald",
          }
        }
      } else if (object.type === "ruby") {
        height = 0;
        if (!object.mined) {
          collisions[collisions.length] = {
            x: object.x,
            y: object.y,
            w: 200,
            h: 200,
            id: i,
            mining: object.mining,
            type: "ruby",
          }
        }
      } else if (object.type === "diamond") {
        height = 0;
        if (!object.mined) {
          collisions[collisions.length] = {
            x: object.x,
            y: object.y,
            w: 200,
            h: 200,
            id: i,
            mining: object.mining,
            type: "diamond",
          }
        }
      } else if (object.type === "gold") {
        height = 0;
        if (!object.mined) {
          collisions[collisions.length] = {
            x: object.x,
            y: object.y,
            w: 200,
            h: 200,
            id: i,
            mining: object.mining,
            type: "gold",
          }
        }
      } else if (object.type === "iron") {
        height = 0;
        if (!object.mined) {
          collisions[collisions.length] = {
            x: object.x,
            y: object.y,
            w: 200,
            h: 200,
            id: i,
            mining: object.mining,
            type: "iron",
          }
        }
      } else if (object.type === "fountain") {
        height = fountainHeight / 2;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y + 140,
          w: fountainWidth / 2,
          h: fountainHeight / 2 - 130 - frameheight / scale,
          type: "fountain",
        }
      } else if (object.type === "fence-vertical") {
        height = fenceVertical.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y + 30,
          w: fenceVertical.width,
          h: fenceVertical.height - frameheight / scale + 20 - 30,
          type: "fence-vertical",
        }
      } else if (object.type === "fence-horizontal") {
        height = fenceHorizontal.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y + 30,
          w: fenceHorizontal.width,
          h: fenceHorizontal.height - frameheight / scale + 20 - 30,
          type: "fence-horizontal",
        }
      } else if (object.type === "fence-post") {
        height = fencePost.height;
        collisions[collisions.length] = {
          x: object.x,
          y: object.y + 30,
          w: fencePost.width,
          h: fencePost.height - frameheight / scale + 20 - 30,
          type: "fence-post",
        }
      } else if (object.type === "easter egg") {
        height = 200;
      }
      newScenery[i] = {
        x: object.x,
        y: object.y + height,
        type: object.type,
        num: i,
      };
    }
    i++;
  });

  var order = person.concat(newScenery);
  order.sort((a, b) => {
    return a.y - b.y;
  });

  for (var i = 0; i < order.length; i++) {
    var object = order[i];
    if (object && object !== {}) {
      if (object.type === "dirt") {
        ctx.drawImage(dirt, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, dirt.width, dirt.height);
      } else if (object.type === "tree") {
        if (colliding({
          x: players[myId].x,
          y: players[myId].y,
          w: framewidth / scale,
          h: frameheight / scale,
        }, {
          x: scenes[players[myId].scene].scenery[object.num].x,
          y: scenes[players[myId].scene].scenery[object.num].y,
          w: tree.width,
          h: tree.height - 200,
        })) {
          scenes[players[myId].scene].scenery[object.num].opacity += 0.2 * (0.6 - scenes[players[myId].scene].scenery[object.num].opacity);
        } else {
          scenes[players[myId].scene].scenery[object.num].opacity += 0.2 * (1 - scenes[players[myId].scene].scenery[object.num].opacity);
        }
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].opacity;
        ctx.drawImage(tree, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, tree.width, tree.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "small-tree") {
        if (colliding({
          x: players[myId].x,
          y: players[myId].y,
          w: framewidth / scale,
          h: frameheight / scale,
        }, {
          x: scenes[players[myId].scene].scenery[object.num].x,
          y: scenes[players[myId].scene].scenery[object.num].y,
          w: smallTree.width,
          h: smallTree.height - 150,
        })) {
          scenes[players[myId].scene].scenery[object.num].opacity += 0.2 * (0.6 - scenes[players[myId].scene].scenery[object.num].opacity);
        } else {
          scenes[players[myId].scene].scenery[object.num].opacity += 0.2 * (1 - scenes[players[myId].scene].scenery[object.num].opacity);
        }
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].opacity;
        ctx.drawImage(smallTree, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, smallTree.width, smallTree.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "flower") {
        ctx.drawImage(flower, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, flower.width, flower.height);
      } else if (object.type === "blue-flower") {
        ctx.drawImage(blueFlower, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, blueFlower.width, blueFlower.height);
      } else if (object.type === "purple-flower") {
        ctx.drawImage(purpleFlower, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, purpleFlower.width, purpleFlower.height);
      } else if (object.type === "house") {
        ctx.drawImage(house, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, house.width, house.height);
      } else if (object.type === "ladder") {
        ctx.drawImage(ladder, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, ladder.width, ladder.height);
      } else if (object.type === "bed") {
        ctx.drawImage(bed, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, bed.width, bed.height);
      } else if (object.type === "furnace") {
        ctx.drawImage(furnace, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, furnace.width, furnace.height);
      } else if (object.type === "glass") {
        ctx.drawImage(glass, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, glass.width, glass.height);
      } else if (object.type === "cave") {
        ctx.drawImage(cave, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, cave.width, cave.height);
        ctx.beginPath();
        ctx.rect(scenes[players[myId].scene].scenery[object.num].x + 200, scenes[players[myId].scene].scenery[object.num].y + 125, cave.width / 3, cave.width / 4);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      } else if (object.type === "sign") {
        ctx.drawImage(sign, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, sign.width, sign.height);
        ctx.textAlign = "center";
        ctx.font = "30px pixel";
        ctx.fillStyle = "black";
        ctx.textRendering = "optimizeLegibility";
        ctx.fillText(scenes[players[myId].scene].scenery[object.num].text, scenes[players[myId].scene].scenery[object.num].x + sign.width / 2, scenes[players[myId].scene].scenery[object.num].y + sign.height / 2 - 5);
      } else if (object.type === "chest") {
        var isOpen = true;

        for (var x = 0; x < Object.keys(players).length; x++) {
          if (players[Object.keys(players)[x]].chestOpen) {
            ctx.drawImage(chestOpen, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y - 50, chestOpen.width, chestOpen.height);
            break;
          }

          if (x === Object.keys(players).length - 1) {
            isOpen = false;
          }
        }

        if (!isOpen) {
          ctx.drawImage(chestClosed, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, chestClosed.width, chestClosed.height);
        }
      } else if (object.type === "box") {
        ctx.beginPath();
        ctx.rect(scenes[players[myId].scene].scenery[object.num].x - 0.5, scenes[players[myId].scene].scenery[object.num].y - 0.5, 200.5, 200.5);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      } else if (object.type === "emerald") {
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].mining;
        ctx.drawImage(emerald, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, emerald.width, emerald.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "diamond") {
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].mining;
        ctx.drawImage(diamond, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, diamond.width, diamond.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "ruby") {
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].mining;
        ctx.drawImage(ruby, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, ruby.width, ruby.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "gold") {
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].mining;
        ctx.drawImage(gold, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, gold.width, gold.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "iron") {
        ctx.globalAlpha = scenes[players[myId].scene].scenery[object.num].mining;
        ctx.drawImage(iron, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, iron.width, iron.height);
        ctx.globalAlpha = 1.0;
      } else if (object.type === "fountain") {
        ctx.drawImage(fountain, fountainFrame * fountainWidth, 0, fountainWidth, fountainHeight, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, fountainWidth / 2, fountainHeight / 2);
      } else if (object.type === "fence-vertical") {
        ctx.drawImage(fenceVertical, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, fenceVertical.width, fenceVertical.height);
      } else if (object.type === "fence-horizontal") {
        ctx.drawImage(fenceHorizontal, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, fenceHorizontal.width, fenceHorizontal.height);
      } else if (object.type === "fence-post") {
        ctx.drawImage(fencePost, scenes[players[myId].scene].scenery[object.num].x, scenes[players[myId].scene].scenery[object.num].y, fencePost.width, fencePost.height);
      } else if (object.type === "easter egg") {
        if (colliding({
          x: players[myId].x,
          y: players[myId].y,
          w: framewidth / scale,
          h: frameheight / scale,
        }, {
          x: scenes[players[myId].scene].scenery[object.num].x,
          y: scenes[players[myId].scene].scenery[object.num].y,
          w: 200,
          h: 200 - 150,
        })) {
          easterEgg = true;
          $(".usetool .text").html("...?");
          if (players[myId].useTool) {
            ctx.drawImage(bean, scenes[players[myId].scene].scenery[object.num].x + 200, scenes[players[myId].scene].scenery[object.num].y, bean.width, bean.height);
          }
        } else {
          easterEgg = false;
        }
      } else if (object.type === "player") {
        var player = players[object.id];
        if (player.devMode && players[myId].devMode && player.scene === players[myId].scene) {
          ctx.textAlign = "center";
          ctx.font = "25px pixel";
          ctx.fillStyle = "white";
          ctx.textRendering = "optimizeLegibility"
          ctx.fillText(player.name + " [Dev]", player.x + framewidth / scale / 2, player.y);

          if (player.inventory[player.spot - 1] !== "" && player.useTool) {
            var xCord;
            var yCord = player.y + 20;
            if (player.costumeY === 3 || player.costumeY === 1) {
              xCord = player.x + framewidth / scale - 20;
            } else {
              xCord = player.x - 60;
            }
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              player.rotate++;
              ctx.save();
              ctx.translate(xCord + 40, yCord + 40);
              ctx.rotate(Math.cos(player.rotate / 10) / 2);
              if (xCord === player.x - 60) {
                ctx.scale(-1, 1);
              }
              ctx.translate(-(xCord + 40), -(yCord + 40));
            }
            ctx.drawImage(items[player.inventory[player.spot - 1]], xCord, yCord, 80, 80);
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              ctx.restore();
            }
          } else {
            player.rotate = 0;
          }

          if (player.costumeY === 3) {
            ctx.drawImage(costume, framewidth / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          } else {
            ctx.drawImage(costume, (0 * framewidth) / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          }
        } else if (players[myId].devMode && player.dbId === user.id) {
          ctx.textAlign = "center";
          ctx.font = "25px pixel";
          ctx.fillStyle = "white";
          ctx.textRendering = "optimizeLegibility"
          ctx.fillText(player.name + " [Dev]", player.x + framewidth / scale / 2, player.y);

          if (player.inventory[player.spot - 1] !== "" && player.useTool) {
            var xCord;
            var yCord = player.y + 20;
            if (player.costumeY === 3 || player.costumeY === 1) {
              xCord = player.x + framewidth / scale - 20;
            } else {
              xCord = player.x - 60;
            }
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              player.rotate++;
              ctx.save();
              ctx.translate(xCord + 40, yCord + 40);
              ctx.rotate(Math.cos(player.rotate / 10) / 2);
              if (xCord === player.x - 60) {
                ctx.scale(-1, 1);
              }
              ctx.translate(-(xCord + 40), -(yCord + 40));
            }
            ctx.drawImage(items[player.inventory[player.spot - 1]], xCord, yCord, 80, 80);
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              ctx.restore();
            }
          } else {
            player.rotate = 0;
          }

          if (player.costumeY === 3) {
            ctx.drawImage(costume, framewidth / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          } else {
            ctx.drawImage(costume, (0 * framewidth) / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          }
        } else if (player.scene === players[myId].scene && !player.devMode && (players[myId].ready || player.id === players[myId].id)) {
          ctx.textAlign = "center";
          ctx.font = "25px pixel";
          ctx.fillStyle = "white";
          ctx.textRendering = "optimizeLegibility"
          ctx.fillText(player.name, player.x + framewidth / scale / 2, player.y);

          if (player.inventory[player.spot - 1] !== "" && player.useTool) {
            var xCord;
            var yCord = player.y + 20;
            if (player.costumeY === 3 || player.costumeY === 1) {
              xCord = player.x + framewidth / scale - 20;
            } else {
              xCord = player.x - 60;
            }
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              player.rotate++;
              ctx.save();
              ctx.translate(xCord + 40, yCord + 40);
              ctx.rotate(Math.cos(player.rotate / 10) / 2);
              if (xCord === player.x - 60) {
                ctx.scale(-1, 1);
              }
              ctx.translate(-(xCord + 40), -(yCord + 40));
            }
            ctx.drawImage(items[player.inventory[player.spot - 1]], xCord, yCord, 80, 80);
            if (player.inventory[player.spot - 1] === "pickaxe" || player.inventory[player.spot - 1] === "sword") {
              ctx.restore();
            }
          } else {
            player.rotate = 0;
          }

          if (player.costumeY === 3 && player.xVel < 1) {
            ctx.drawImage(costume, framewidth / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          } else {
            ctx.drawImage(costume, (player.currFrame * framewidth) / scale, ((frameheight * player.costumeY) + 75 + (100 * player.costumeY)) / scale, framewidth / scale, frameheight / scale, player.x, player.y, framewidth / scale, frameheight / scale);
          }
        }
      }
    }
  }

  const gradient = ctx.createRadialGradient(players[myId].x + 40, players[myId].y + 40, 1, players[myId].x + 40, players[myId].y + 40, players[myId].torch);

  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(1, "black");

  if (scenes[players[myId].scene].type === "cave") {
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = gradient;
    ctx.fillRect(CAMERAX - canvas.width * 2, CAMERAY - canvas.height * 2, canvas.width * 4, canvas.height * 4);
    ctx.globalAlpha = 1.0;
  }

  ctx.restore();

  ctx.globalAlpha = brightness;
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1.0;

  if (transition) {
    brightness += 0.2 * (1 - brightness);
  } else if (usingUtility) {
    brightness += 0.2 * (0.7 - brightness);
  } else if (players[myId].inBed) {
    $(".use").addClass("hidden");
    brightness += 0.02 * (1 - brightness);
  } else {
    brightness += 0.2 * (0 - brightness);
  }

  ctx.lineWidth = 0;
  ctx.globalAlpha = 0.8;

  for (var i = 0; i < hotBarSpots; i++) {
    ctx.beginPath();
    ctx.rect(i * hotBarSize + canvas.width / 2 - (hotBarSize * (hotBarSpots / 2)), canvas.height - hotBarSize - 24, hotBarSize, hotBarSize);
    if (colliding(mouse, {
      x: i * hotBarSize + canvas.width / 2 - (hotBarSize * (hotBarSpots / 2)),
      y: canvas.height - hotBarSize - 24,
      w: hotBarSize,
      h: hotBarSize,
    })) {
      if (mouse.click) {
        players[myId].spot = i + 1;
      }
      ctx.fillStyle = "lightgray";
    } else {
      ctx.fillStyle = "gray";
    }
    ctx.fill();
    ctx.closePath();

    if (players[myId].inventory[i] !== "") {
      ctx.drawImage(items[players[myId].inventory[i]], i * hotBarSize + canvas.width / 2 - (hotBarSize * (hotBarSpots / 2)) + hotBarSize / 2 - items[players[myId].inventory[i]].width / 2, canvas.height - hotBarSize - 24 + hotBarSize / 2 - items[players[myId].inventory[i]].height / 2, items[players[myId].inventory[i]].width, items[players[myId].inventory[i]].height);
    }
  }

  ctx.lineWidth = 3;
  ctx.globalAlpha = 1.0;

  for (var i = 0; i < hotBarSpots; i++) {
    ctx.beginPath();
    ctx.rect(i * hotBarSize + canvas.width / 2 - (hotBarSize * (hotBarSpots / 2)), canvas.height - hotBarSize - ctx.lineWidth - 21, hotBarSize, hotBarSize);
    ctx.strokeStyle = "darkgray";
    ctx.stroke();
    ctx.closePath();
  }

  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.rect((players[myId].spot - 1) * hotBarSize + canvas.width / 2 - (hotBarSize * (hotBarSpots / 2)), canvas.height - hotBarSize - 24, hotBarSize, hotBarSize);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();

  if (connected) {
    $(".players-connected").removeClass("hidden");
    $(".players-connected .box span").html(Object.keys(players).length);
  } else {
    $(".players-connected").addClass("hidden");
  }

  if (players[myId].devMode && movement.showData) {
    var data = [];
    for (var i = 0; i < Object.keys(players).length; i++) {
      data[i] = {
        name: players[Object.keys(players)[i]].name,
        x: players[Object.keys(players)[i]].x,
        y: players[Object.keys(players)[i]].y,
        scene: players[Object.keys(players)[i]].scene,
        inventory: players[Object.keys(players)[i]].inventory,
      }
    }
    document.querySelector(".player-data").innerHTML = JSON.stringify(data);
  } else {
    if (user) {
      document.querySelector(".player-data").innerHTML = "";
    }
  }
}