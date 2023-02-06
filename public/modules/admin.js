const socket = io();

var players = {};

socket.on("currentPlayers", (data) => {
  players = data[0];
  updateList();
});

socket.on("playerMoved", (player) => {
  players[player.id] = player;
  updateList();
});

socket.on("newPlayer", (player) => {
  players[player.id] = player;
  updateList();
});

socket.on("disconnected", (player) => {
  delete players[player];
  updateList();
});

function updateList() {
  document.querySelector(".content").innerHTML = "";
  
  for (var i = 0; i < Object.keys(players).length; i++) {
    var player = players[Object.keys(players)[i]];
    var item = document.createElement("div");
    item.classList = "item";
    document.querySelector(".content").appendChild(item);
    for (var x = 0; x < Object.keys(player).length; x++) {
      var div = document.createElement("div");
      div.innerHTML = "<span style='color: indigo; font-weight: 1000;'>" + Object.keys(player)[x] + "</span>: " + player[Object.keys(player)[x]];
      document.querySelectorAll(".item")[i].appendChild(div);
    }
  }
}