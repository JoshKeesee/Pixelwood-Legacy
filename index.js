const authMiddleware = require("replit-auth");
const db = require("better-replit-db");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  }
});
const port = process.env.PORT || 3000;
const players = {};
var chestItems = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const ores = [
	{ type: "emerald", miningSpeed: .000009 },
  { type: "platinum", miningSpeed: .000005 },
	{ type: "diamond", miningSpeed: .00001 },
	{ type: "coal", miningSpeed: .0005 },
	{ type: "ruby", miningSpeed: .0001 },
	{ type: "iron", miningSpeed: .001 },
	{ type: "gold", miningSpeed: .01 },
];
const plainTypes = ["tree", "small-tree", "flower", "blue-flower", "purple-flower"];
const devs = ["13121245", "15824042", "6759741", "18760736"];
getChestItems();
const scenes = require("./scenery");
const Filter = require("bad-words");
const filter = new Filter();
const { instrument } = require("@socket.io/admin-ui");

instrument(io, {
  auth: false,
  mode: "development",
});

function getChestItems() {
  db.list().then(async (keys) => {
    if (keys.includes("chestItems")) {
      chestItems = await db.get("chestItems");
      chestItems = JSON.parse(chestItems);
    } else {
      await db.set("chestItems", JSON.stringify(chestItems));
    }
  });
}

app.use(favicon(__dirname + "/public/images/pixelwood-logo.png"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.disable("etag");

authMiddleware(app, { customPage: __dirname + "/views/index.ejs" });
authMiddleware(io);

app.get("/", (req, res) => {
  const { user } = req;
  return res.render("index", {
    user,
    dev: devs.includes(user?.id)
  });
});

app.get("/admin", (req, res) => {
  const { user } = req;
  if (devs.includes(user?.id)) {
    return res.render("admin");
  }
  res.redirect("/");
});

io.on("connection", (socket) => {
  players[socket.id] = {
    x: 5 * 200 - 400 / 4,
    y: 0,
    xVel: 0,
    yVel: 0,
    w: 100,
    h: 125,
    health: 100,
    kills: 0,
    lastTouched: null,
    speed: 1,
    scene: 1,
    cutScene: 0,
    id: socket.id,
    currFrame: 0,
    costumeY: 0,
    inBed: false,
    chestOpen: false,
    useTool: false,
    torch: 0,
    rotate: 0,
    spot: 1,
    inventory: ["", "", "", "", "", "", "", ""],
    backpack: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    dbId: null,
    name: randomName(),
    devMode: false,
    ready: false,
    eventData: {},
    premiumUser: false,
  };

  getPlayerData();

  async function getPlayerData() {
    if (!socket.user?.id) {
      socket.emit("currentPlayers", [players, scenes, chestItems]);
      return;
    }
    const keys = await db.list();
    if (keys.includes(socket.user.id)) {
      socket.emit("currentPlayers", [players, scenes, chestItems]);
      let player = await db.get(socket.user.id);
      if (!player) return;
      player = JSON.parse(player);
      player.dbId = socket.user.id;
      player.id = socket.id;
      if (player.inventory.includes("sword") || player.inventory.includes("pickaxe")) {
        player.inventory = ["coal", "torch", "", "", "", "", "", ""];
      }
      players[socket.id] = player;
      socket.emit("playerData", players[socket.id]);
      socket.emit("send event data", players[socket.id].eventData);
    }
  };

  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("respawn", () => {
    if (typeof players[socket.id].lastTouched == "undefined") return;
    // if (players[socket.id].lastTouched === null) return;
    // players[players[socket.id].lastTouched].kills++;

    // socket.to(players[socket.id].lastTouched).emit("addKill", players[players[socket.id].lastTouched].kills);
  });

  socket.on("chestItems", async (data) => {
    chestItems = data;
    socket.broadcast.emit("update chestItems", chestItems);
    await db.set("chestItems", JSON.stringify(chestItems));
    if (!socket.user?.id) return;
    await db.set(socket.user.id, JSON.stringify(players[socket.id]));
  });

  socket.on("updateOres", (data) => {
		const scene = scenes[players[socket.id].scene];
    if (scene.type !== "cave") return;
    if (typeof data[0].mined == "undefined") return;
    if (data[0].mined) {
      var xCord = Math.floor(Math.random() * scene.width);
      var yCord = Math.floor(Math.random() * scene.height);

			const { type, miningSpeed } = ores[Math.floor(Math.random() * ores.length)];
			
      scene.scenery[data[1]] = {
        x: xCord * 200,
        y: yCord * 200,
        type,
				miningSpeed,
        mining: 1,
        mined: false,
      }

      io.emit("updateOres", [scene.scenery[data[1]], data[1], players[socket.id].scene]);
    } else {
      scene.scenery[data[1]] = data[0];
      socket.broadcast.emit("updateOres", [scene.scenery[data[1]], data[1], players[socket.id].scene]);
    }
  });

  socket.on("updateTrees", (data) => {
		const scene = scenes[players[socket.id].scene];
    if (scene.type !== "plains") return;
    if (!data[0]?.mined) return;
    if (data[0].mined) {
      var xCord = Math.floor(Math.random() * scene.width);
      var yCord = Math.floor(Math.random() * scene.height);

			// consider using switch statements
      if (players[socket.id].scene === 6 || players[socket.id].scene === 3) {
        xCord = Math.floor(Math.random() * 1600);
        yCord = Math.floor(Math.random() * 1600);
      }

      if (players[socket.id].scene === 0 && xCord > 1000 && yCord < 1000) {
        xCord = Math.floor(Math.random() * 1600);
        yCord = Math.floor(Math.random() * 600) + 1000;
      }

      if (players[socket.id].scene === 0 && xCord > 1800) {
        xCord = Math.floor(Math.random() * 1200);
        yCord = Math.floor(Math.random() * 600) + 1000;
      }

      if (players[socket.id].scene === 3 && xCord < 1200 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 600) + 1200;
        yCord = Math.floor(Math.random() * 600) + 1100;
      }

      if (players[socket.id].scene === 6 && xCord < 1000 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 1000) + 1000;
        yCord = Math.floor(Math.random() * 600) + 1100;
      }

      if (players[socket.id].scene === 7 && xCord > 2000 && yCord < 1100) {
        xCord = Math.floor(Math.random() * 2000);
        yCord = Math.floor(Math.random() * 600) + 1100;
      }

      scene.scenery[data[1]] = {
        x: xCord * 200,
        y: yCord * 200,
        type: ["tree", "small-tree"][Math.floor(Math.random() * ["tree", "small-tree"].length)],
        mining: 1,
        mined: false,
        miningSpeed: 0.01,
      }

      io.emit("updateTrees", [scene.scenery[data[1]], data[1], players[socket.id].scene]);
    } else {
      scene.scenery[data[1]] = data[0];
      socket.broadcast.emit("updateTrees", [scene.scenery[data[1]], data[1], players[socket.id].scene]);
    }
  });

  socket.on("hitPlayer", (data) => {
    players[data[1]] = data[0];
    players[data[1]].lastTouched = socket.id;

    socket.to(data[1]).emit("hitPlayer", players[data[1]]);
  });

  socket.on("disconnect", async () => {
    const player = players[socket.id];
    delete players[socket.id];
    io.emit("disconnected", socket.id);
    if (!socket.user?.id) return;
    await db.set(socket.user.id, JSON.stringify(player));
  });

  socket.on("gameSave", async (player) => {
    if (!player) return;
    if (player.dbId === null) return;
    players[socket.id] = player;
    await db.set(players[socket.id].dbId, JSON.stringify(players[socket.id]));
  });

  socket.on("playerMovement", (data) => {
    players[socket.id] = data;
    socket.broadcast.emit("playerMoved", players[socket.id]);
  });

  socket.on("get event data", async (user) => {
    const keys = await db.list();
    if (keys.includes(user)) {
      let player = await db.get(user);
      if (!player) return;
      player = JSON.parse(player);
      socket.emit("event data", player.eventData);
    }
  });

  socket.on("update event data", async (data) => {
    if (data.dbId === null) return;
    var player = await db.get(data.dbId);
    player = JSON.parse(player);
    player.eventData = data.eventData;
    if (player.eventData.score >= 1000000000) {
      player.premiumUser = true;
    } else {
      player.premiumUser = false;
    }
    await db.set(data.dbId, JSON.stringify(player));
    Object.keys(players).forEach(id => {
      const p = players[id];
      if (p.dbId === data.dbId) {
        io.to(id).emit("update event data", player);
      }
    });
  });

  socket.on("chat message", (message) => {
    if (!message) return;
    if (message === null) return;
    io.emit("send message", [players[socket.id].name, filter.clean(message)]);
  });
});

const adjective = ["Excited", "Anxious", "Overweight", "Jumpy", "Squashed", "Broad", "Crooked", "Curved", "Deep", "Even", "Anxious", "Jumpy", "Squashed", "Broad", "Crooked", "Curved", "Deep", "Even", "Flat", "Hilly", "Jagged", "Round", "Shallow", "Square", "Steep", "Straight", "Thick", "Thin", "Cooing", "Faint", "Harsh", "Hissing", "Hushed", "Husky", "Loud", "Melodic", "Moaning", "Mute", "Noisy", "Purring", "Quiet", "Raspy", "Shrill", "Silent", "Soft", "Squeaky"];
const object = ["Taco", "Sphere", "Watermelon", "Cheeseburger", "Spider", "Dragon", "Soda", "Watch", "Sunglasses", "T-shirt", "Purse", "Towel", "Hat", "Camera", "Photo", "Cat", "Dog"];

function randomName() {
  return adjective[Math.floor(Math.random() * adjective.length)] + object[Math.floor(Math.random() * object.length)];
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});