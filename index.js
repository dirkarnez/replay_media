var player = document.getElementsByTagName("video")[0];
player.loop = true;
player.style.width = "98%";
player.style.height = "54px";
player.style.borderStyle = "solid";
player.style.backgroundColor = "#F1F3F4";
player.style.borderRadius = "5px";
player
.play()
.then(() => console.log("replaying"))
.catch(err => console.log("error cannot replay:", err));