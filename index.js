function addToHistory(decodedSourceSrc) {
    var history = getHistory();
    history.push({listenedAt: new Date().getTime(), songFile: decodedSourceSrc })
    localStorage.setItem("history", JSON.stringify(history))
}

function getHistory() {
    var history = JSON.parse(localStorage.getItem("history"));
    return Array.isArray(history) ? history : [];
}

function play(decodedSourceSrc) {
    var footer = document.querySelector(".footer")
    footer.innerHTML = "";

    var newSource = document.createElement("source");
    newSource.src = encodeURI(decodedSourceSrc);

    var newPlayer = document.createElement("video");
    newPlayer.className = "player";
    newPlayer.loop = true;
    newPlayer.controls = true;
    newPlayer.appendChild(newSource);

    footer.appendChild(newPlayer);
    newPlayer
    .play()
    .then(() => console.log("replaying"))
    .catch(err => console.log("error cannot replay:", err));
}

(function() {
    var player = document.getElementsByTagName("video")[0];
    if (!player) {
        return;
    }

    player.pause();

    var decodedSourceSrc = decodeURI(document.getElementsByTagName("source")[0].src);
    
    document.body.innerHTML = `
    <nav>
      <h2>History <button onclick="localStorage.removeItem('history')">Delete all history</button></h2>
      <ul id="history">
      </ul>
    </nav>
    
    <article>
      <h2>Lorem Ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </article>
    
    <footer class="footer">
    </footer>
    `;
    
    addToHistory(decodedSourceSrc);
    play(decodedSourceSrc);
    
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
    
    addStyle(`
        body {
            background-color: unset;
            margin: 0px;
            height: 100vh;
            display: grid;
            grid-template-areas: 'nav main'
                                'footer footer';
            grid-template-columns: minmax(auto, 12em) 5fr;
            grid-template-rows: auto 1fr auto;
        }
    
        footer {
            height: 54px;
            grid-area: footer;
        }
    
        nav {
            grid-area: nav;
        }
    
    
        article {
            grid-area: main;
            padding: 1rem;
        }
    
        * {
            box-sizing: border-box;
        }
    
        footer {
            background: #F1F3F4;
        }
    
        nav {
            border-right: 1px solid lightgray;
        }
    
        nav, article {
            height: calc(100vh - 54px);
            overflow-y: auto;
        }
    
        .player {
            position: unset;
            width: 100%;
            height: 54px;
            background-color: #F1F3F4;
            border-radius: 5px;
        }
    
        #history {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
    
        #history li {
            padding: 8px 16px;
            border-bottom: 1px solid #ddd;
        }
    `);
})()



/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}