var chatOpen = false;

function enableChat() {
  document.getElementById("chatWindow").style.left = "0";
  document.getElementById("notification").classList.add("hidden");
  chatOpen = true;
  document.getElementById("chat").onclick = () => {
    disableChat();
  }
}

function disableChat() {
  document.getElementById("chatWindow").style.left = "-100%";
  document.getElementById("notification").classList.add("hidden");
  chatOpen = false;
  document.getElementById("chat").onclick = () => {
    enableChat();
  }
}

document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key == "Enter" && connected) {
    var message = document.getElementById("input").value;
    if (message !== "") {
      socket.emit("chat message", message);
      document.getElementById("input").value = "";
    }
  }
});

socket.on("send message", (message) => {
  var div = document.createElement("div");
  div.innerHTML = "<div style='font-weight: 1000; font-size: 15px;'>" + message[0].replace(/<[^>]+>/g, '') + "</div><div>" + message[1].replace(/<[^>]+>/g, '') + "</div><hr style='height: 5px; border-radius: 5px; background: indigo; border: none;'>";
  document.getElementById("messages").appendChild(div);
  document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  if (!chatOpen) {
    document.getElementById("notification").classList.remove("hidden");
  }
});