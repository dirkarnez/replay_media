function removeAllHistory() {
    localStorage.removeItem('history');
}

function getHistory() {
    var history = JSON.parse(localStorage.getItem("history"));
    return Array.isArray(history) ? history : [];
}

function addToHistory(decodedSourceSrc) {
    var history = getHistory();
    history.push({listenedAt: new Date().getTime(), songFile: decodedSourceSrc })
    localStorage.setItem("history", JSON.stringify(history))
}

function displayAllHistory() {
    document.getElementById("history").innerHTML = "";

    getHistory().forEach(item => {
        var li = document.createElement("li");
        var listenedAt = new Date();
        listenedAt.setTime(item.listenedAt);
        li.appendChild(document.createTextNode(`${item.songFile.substring(item.songFile.lastIndexOf("/") + 1, item.songFile.length)} - ${listenedAt.getDate()}/${listenedAt.getMonth() + 1}`));
        li.addEventListener("click", function () {
            addToHistory(item.songFile);
            play(item.songFile);
        });
        document.getElementById("history").appendChild(li);
    })
}

function play(decodedSourceSrc) {
    var footer = document.querySelector(".footer")
    footer.innerHTML = "";

    var newSource = document.createElement("source");
    newSource.src = encodeURI(decodedSourceSrc);

    var newPlayer = document.createElement("video");
    newPlayer.className = "player";
    newPlayer.controls = true;
    newPlayer.appendChild(newSource);

    footer.appendChild(newPlayer);
    newPlayer
    .play()
    .then(() => console.log("replaying"))
    .catch(err => console.log("error cannot replay:", err));
}

var decodedSourceSrc = decodeURI(window.location.hash.substring(1));

if (decodedSourceSrc.length > 0) {
    addToHistory(decodedSourceSrc);
    play(decodedSourceSrc);
}

displayAllHistory();

document.querySelector(".btn-remove-history").addEventListener("click", function() {
    removeAllHistory();
    displayAllHistory();
});