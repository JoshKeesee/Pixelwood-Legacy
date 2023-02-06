const authMiddleware = require("replit-auth");
const db = require("better-replit-db");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;
const players = {};
var chestItems = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const devs = ["13121245", "15824042", "6759741"];
getChestItems();
const scenes = require("./scenery");
const Filter = require('bad-words');
const filter = new Filter();

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
		w: 0,
		h: 0,
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
		inventory: ["sword", "pickaxe", "coal", "torch", "", "", "", ""],
    backpack: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		dbId: null,
		name: randomName(),
		devMode: false,
		ready: false,
	};

	// instead of doing this because sb could tamper request use socket.user.id to get id of authed user
	socket.on("playerData", async () => {
		if (!socket.user.id) return;
		const keys = await db.list();
		if (keys.includes(socket.user.id)) {
			let player = await db.get(socket.user.id);
			player = JSON.parse(player);
			player.dbId = socket.user.id;
			socket.emit("playerData", player);
		} else if (players[socket.id]) {
			players[socket.id].dbId = socket.user.id;
			await db.set(socket.user.id, JSON.stringify(players[socket.id]));
			socket.emit("playerData", players[socket.id]);
		}
	});

	socket.emit("currentPlayers", [players, scenes, chestItems]);

	socket.broadcast.emit("newPlayer", players[socket.id]);

	socket.on("chestItems", async (data) => {
		chestItems = data;
		socket.broadcast.emit("chestItems", chestItems);
		await db.set("chestItems", JSON.stringify(chestItems));
		if (!players[socket.id]?.dbId) return;
		await db.set(players[socket.id].dbId, JSON.stringify(players[socket.id]));
	});

	socket.on("updateOres", (data) => {
		scenes[players[socket.id].scene].scenery[data[1]] = data[0];
		socket.broadcast.emit("updateOres", [scenes[players[socket.id].scene].scenery[data[1]], data[1]]);
	});

	socket.on("disconnect", async () => {
    delete players[socket.id];
		io.emit("disconnected", socket.id);
		if (!players[socket.id]?.dbId) return;
		await db.set(players[socket.id].dbId, JSON.stringify(players[socket.id]));
	});

	socket.on("gameSave", async (player) => {
		if (!player?.dbId) return;
		await db.set(player.dbId, JSON.stringify(players[socket.id]));
	});

	socket.on("playerMovement", (data) => {
		players[socket.id] = data;
		socket.broadcast.emit("playerMoved", players[socket.id]);
	});

	socket.on("chat message", (message) => {
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