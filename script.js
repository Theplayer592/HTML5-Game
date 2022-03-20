/*
    Descrition:
        This is supposed to resemble games like "Pokémon Red", and is block/square based (like "Minecraft").
        The game is supposed to be an RPG, but is all pixilated/block based.
        All art should be pixel art (it is easy, and creates a certain feel which this game requires).
        The game currently has no title, one can be developed after a storyline is thought of.
        Could there be music?
        Get multiple viwes of the character.
        Shoudl be un-intensive: even a basic machine can run the game easily.
        Try and reduce load times later on in development
        Possible monetisation: advertisements
*/

navigator.whichBrowser = (function() {
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

function Bool(v) {
    return (v.toLowerCase() == "true")
}

loaded = function() {
    window.onresize = () => {
        if (document.body.clientHeight > document.body.clientWidth) {
            document.getElementById("err").innerHTML = "Some content has been hidden so as to not interupt user experience. Please press <key>Ctrl</key> + <key>V</key> to display said content."
            document.getElementById("err").style.opacity = 1
            setTimeout(() => {
                document.getElementById("err").style.opacity = 0
                setTimeout(() => document.getElementById("err").innerHTML = "", 2000)
            }, 15000)
        } else {
            document.getElementById("err").innerHTML = "Resizing of the window has been detected. Please note that resizing the window may damage chunk generation and can harm your experience of the game."
            document.getElementById("err").style.opacity = 1
            setTimeout(() => {
                document.getElementById("err").style.opacity = 0
                setTimeout(() => document.getElementById("err").innerHTML = "", 2000)
            }, 15000)
        }
    }

    window.gameMode = "default"
    window.reachBoxSize = 70
    window.blockKeys = false
    window.inventOpen = false;
    window.fpsCounter = {
        startTime: Date.now() / 1000,
        count: 0,
        fps: 0
    }

    window.spareData = {}
    window.playerData = {
        invent: {}
    }

    window.chatBox = new ChatBox()

    setInterval(() => {
        window.fpsCounter.fps = Math.round(window.fpsCounter.count / ((Date.now() / 1000) - window.fpsCounter.startTime))
        document.getElementById("fps").innerHTML = window.fpsCounter.fps
        window.fpsCounter.startTime = Date.now() / 1000
        window.fpsCounter.count = 0
    }, 1000)

    if (sessionStorage.getItem("visibleReachBox") == undefined) { sessionStorage.setItem("visibleReachBox", false) }

    window.game = new Game("New Game")
    game.init(window.innerHeight / 1.05, window.innerHeight / 1.05, "#699969", document.getElementById("post-gameArea"))
    game.canvas.style.backgroundSize = `${window.innerWidth / 1.05}px ${window.innerHeight / 1.05}px`
    console.log(game)

    game.newRectComponent("canvasSize", window.innerHeight / 1.05, window.innerHeight / 1.05, "transparent", 0, 0)
    game.newImageComponent("player", 75, 75, "./assets/player-front.png", (window.innerHeight / 1.05) / 2, (window.innerHeight / 1.05) / 2, 4, 100)

    const player = game.components.player

    console.log(window)

    window.chunks = { "0,0": [] }
    window.chunkX = 0
    window.chunkY = 0
    window.currentChunk = "0,0"
    window.chunkBytes = 0
    generateChunk(chunks["0,0"], "0,0")
        /*
        Script: MASS CHUNK RENDERING
        Might be used in cases where a user wishes to know what the map is like, without having to explore for ages
        It is important to note that around 200-300 chunks is optimum, too much more and it takes to long, much shorter and the point of the feature is virtually wasted

    for (let x = 0; x < 300; x++) {
        for (let y = 0; y < 300; y++) {
            chunks[`${chunkX + x},${chunkY + y}`] = []
            generateChunk(chunks[`${chunkX + x},${chunkY + y}`], `${chunkX + x},${chunkY + y}`, false)
        }
    }
    */

    //Make sure this is the last component to be created: it means it will show above everything else
    game.newRectComponent("reachBox", player.width + reachBoxSize, player.height + reachBoxSize, "transparent", player.x - (reachBoxSize / 2), player.y - (reachBoxSize / 2), 1.5)

    window.map = {};
    window.music = {
        on: false,
        var: new Sound("./assets/Random.mp3")
    }

    window.other_onkeydown = {
        checks: [],
        f: function(e) {
            for (let i = 0; i < this.checks.length; i++) {
                if (e.type == "keydown" && e.key == this.checks[i].val) {
                    this.checks[i].f()
                }
            }
        }
    }

    switch (Bool(sessionStorage.getItem("visibleReachBox"))) {
        case true:
            game.components.reachBox.color = "rgba(0, 255, 0, 0.5)"
            document.getElementById("debugData").style.display = "block"
            break;
        case false:
            game.components.reachBox.color = "transparent"
            document.getElementById("debugData").style.display = "none"
            break;
        default:
            game.components.reachBox.color = "transparent"
            document.getElementById("debugData").style.display = "none"
            break;
    }

    onkeydown = onkeyup = function(e) {
        if (window.blockKeys) return

        if (e.type == "keydown" && e.key == "F2") {
            switch (Bool(sessionStorage.getItem("visibleReachBox"))) {
                case false:
                    game.components.reachBox.color = "rgba(0, 255, 0, 0.5)"
                    document.getElementById("debugData").style.display = "block"
                    sessionStorage.setItem("visibleReachBox", true)
                    break;
                case true:
                    game.components.reachBox.color = "transparent"
                    document.getElementById("debugData").style.display = "none"
                    sessionStorage.setItem("visibleReachBox", false)
                    break;
                default:
                    game.components.reachBox.color = "transparent"
                    document.getElementById("debugData").style.display = "none"
                    sessionStorage.setItem("visibleReachBox", false)
                    break;
            }
        }
        if (e.type == "keydown" && e.key == "F12") {
            window.gameMode = "debug"
        }
        if (e.type == "keydown" && e.key == "Tab") {
            respawn()
        }
        if (e.type == "keydown" && e.key == "e") {
            if (window.inventOpen) {
                document.getElementById("invent").style.display = "none"
            } else {
                document.getElementById("invent").style.display = "flex"
            }
            inventOpen = !inventOpen
        }
        if (e.type == "keydown" && e.key == "m") {
            if (window.music.on) {
                music.var.stop()
                music.on = false
            } else {
                music.var.play()
                music.on = true
            }
        }
        if (e.type == "keydown" && e.key == "v" && map["Control"]) {
            if (document.body.style.overflow == "hidden") {
                document.body.style.overflow = "visible"
            } else {
                document.body.style.overflow = "hidden"
            }
        }
        map[e.key] = e.type == 'keydown'
        other_onkeydown.f(e)
    }
}

loadInvent()

if (document.body.clientHeight > document.body.clientWidth) {
    document.getElementById("err").innerHTML = "Some content has been hidden so as to not interupt user experience. Please press <key>Ctrl</key> + <key>V</key> to display said content."
    document.getElementById("err").style.opacity = 1
    setTimeout(() => {
        document.getElementById("err").style.opacity = 0
        setTimeout(() => document.getElementById("err").innerHTML = "", 2000)
    }, 15000)
}

//Apply movement before updating the screen. In addition, make sure movement is independant from fps
setTimeout(() => {
    window.mi = setInterval(() => {
        try {
            applyMovement()
            applyBehaviours()
        } catch (e) {
            console.warn("An error occured. Safe to ignore.\n", e)
        }
    }, getUpdateSpeed())
}, 10)

//Calling this functions means that the reference to "this" in game.update() does not refer to the window object, but to the current Game object
function updateGameArea() {
    game.clearScrn()
    game.canvas.style.width = Math.round(window.innerHeight / 1.05) + "px"
    game.canvas.style.height = Math.round(window.innerHeight / 1.05) + "px"
    game.canvas.style.backgroundSize = `${window.innerHeight / 1.05}px ${window.innerHeight / 1.05}px`
    if (game.canvas.style.backgroundImage == "url(\"./assets/TerrainGeneratio.png\")") {
        game.components.player.imgURL = ""
    }
    touching()
    debug()
    game.update()
}

function respawn() {
    renderChunk(chunks["0,0"], 100, 100)
    window.chunkX = 0
    window.chunkY = 0
    window.currentChunk = "0,0"
    document.getElementById("chunk").innerHTML = "0,0"
}

function showNotes() {
    if (document.getElementById("notesContent").style.display !== "block") {
        document.getElementById("notesTag").innerHTML = "&#8592;"
        document.getElementById("notesTag").style.textDecoration = "none"
        document.getElementById("notesTag").style.fontSize = "1.5em"
        document.getElementById("mainContent").style.display = "none"
        document.getElementById("notesContent").style.display = "block"
    } else {
        document.getElementById("notesTag").innerHTML = "Notes"
        document.getElementById("notesTag").style.textDecoration = "underline"
        document.getElementById("notesTag").style.fontSize = "medium"
        document.getElementById("mainContent").style.display = "block"
        document.getElementById("notesContent").style.display = "none"
    }
}

function getUpdateSpeed() {
    try {
        var ret = window.game.updateSpeed
    } catch (e) {
        return 15
    }

    return ret
}

function pause() { game.pause() }

function play() { game.play() }