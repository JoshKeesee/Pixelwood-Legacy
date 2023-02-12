const authMiddleware = require("replit-auth");
const db = require("better-replit-db");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});
const port = process.env.PORT || 3000;
const players = {};
var chestItems = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const ores = ["emerald", "diamond", "gold", "iron", "ruby", "coal"];
const plainTypes = ["tree", "small-tree", "flower", "blue-flower", "purple-flower"];
const devs = ["13121245", "15824042", "6759741", "18760736"];
getChestItems();
const scenes = require("./scenery");
const Filter = require("bad-words");
const filter = new Filter();
const { instrument } = require("@socket.io/admin-ui");

instrument(io, {
  auth: false,
  mode: "production",
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
		inventory: ["coal", "torch", "", "", "", "", "", ""],
    backpack: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		dbId: null,
		name: randomName(),
		devMode: false,
		ready: false,
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
		}
	};

	socket.broadcast.emit("newPlayer", players[socket.id]);

	socket.on("chestItems", async (data) => {
		chestItems = data;
		socket.broadcast.emit("update chestItems", chestItems);
		await db.set("chestItems", JSON.stringify(chestItems));
		if (!socket.user?.id) return;
		await db.set(socket.user.id, JSON.stringify(players[socket.id]));
	});

	socket.on("updateOres", (data) => {
    if (scenes[players[socket.id].scene].type !== "cave") return;
    if (!data[0]?.mined) return;
    if (data[0].mined) {
      var xCord = Math.floor(Math.random() * scenes[players[socket.id].scene].width);
      var yCord = Math.floor(Math.random() * scenes[players[socket.id].scene].height);
      
      scenes[players[socket.id].scene].scenery[data[1]] = {
        x: xCord * 200,
        y: yCord * 200,
        type: ores[Math.floor(Math.random() * ores.length)],
        mining: 1,
        mined: false,
      }

      if (scenes[players[socket.id].scene].scenery[data[1]].type === "diamond") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.00001;
      } else if (scenes[players[socket.id].scene].scenery[data[1]].type === "emerald") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.000009;
      } else if (scenes[players[socket.id].scene].scenery[data[1]].type === "iron") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.001;
      } else if (scenes[players[socket.id].scene].scenery[data[1]].type === "gold") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.01;
      } else if (scenes[players[socket.id].scene].scenery[data[1]].type === "ruby") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.0001;
      } else if (scenes[players[socket.id].scene].scenery[data[1]].type === "coal") {
        scenes[players[socket.id].scene].scenery[data[1]].miningSpeed = 0.0005;
      }

      io.emit("updateOres", [scenes[players[socket.id].scene].scenery[data[1]], data[1], players[socket.id].scene]);
    } else {
		  scenes[players[socket.id].scene].scenery[data[1]] = data[0];
      socket.broadcast.emit("updateOres", [scenes[players[socket.id].scene].scenery[data[1]], data[1], players[socket.id].scene]);
    }
	});

  socket.on("updateTrees", (data) => {
    if (scenes[players[socket.id].scene].type !== "plains") return;
    if (!data[0]?.mined) return;
    if (data[0].mined) {
      var xCord = Math.floor(Math.random() * scenes[players[socket.id].scene].width);
      var yCord = Math.floor(Math.random() * scenes[players[socket.id].scene].height);

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
      
      scenes[players[socket.id].scene].scenery[data[1]] = {
        x: xCord * 200,
        y: yCord * 200,
        type: ["tree", "small-tree"][Math.floor(Math.random() * ["tree", "small-tree"].length)],
        mining: 1,
        mined: false,
        miningSpeed: 0.01,
      }

      io.emit("updateTrees", [scenes[players[socket.id].scene].scenery[data[1]], data[1], players[socket.id].scene]);
    } else {
		  scenes[players[socket.id].scene].scenery[data[1]] = data[0];
      socket.broadcast.emit("updateTrees", [scenes[players[socket.id].scene].scenery[data[1]], data[1], players[socket.id].scene]);
    }
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

httpServer.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});