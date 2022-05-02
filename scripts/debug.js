function debug() {
    try {
        document.getElementById("title").innerHTML = game.title
        document.getElementById("start").innerHTML = performance.timeOrigin
        document.getElementById("fcts").innerHTML = window.fpsCounter.count
        if (navigator.userAgentData) document.getElementById("platform").innerHTML = navigator.userAgentData.platform
        document.getElementById("browser").innerHTML = navigator.whichBrowser
        if (location.href.length > Math.floor(window.innerWidth / 26)) { document.getElementById("src").innerHTML = location.href.substring(0, Math.floor(window.innerWidth / 26)) + "..." } else { document.getElementById("src").innerHTML = JSON.stringify(Object.keys(game.components)) }
        document.getElementById("wifi").innerHTML = navigator.connection.effectiveType
        document.getElementById("lan").innerHTML = navigator.language
        document.getElementById("display").innerHTML = `${game.canvas.style.width} x ${game.canvas.style.height}`
        document.getElementById("mappedChunks").innerHTML = Object.keys(chunks).length
        document.getElementById("mapSize").innerHTML = getObjectSize(window.chunks)
        window.chunkBytes = 0
        if (JSON.stringify(game.skipComponents).length > Math.floor(window.innerWidth / 26)) { document.getElementById("skipComponents").innerHTML = JSON.stringify(game.skipComponents).substring(0, Math.floor(window.innerWidth / 26)) + "...]" } else { document.getElementById("skipComponents").innerHTML = JSON.stringify(game.skipComponents) }
        document.getElementById("x").innerHTML = Math.round(game.components.player.x)
        document.getElementById("y").innerHTML = Math.round(game.components.player.y)
        document.getElementById("playerImage").innerHTML = game.components.player.imgURL
        if (JSON.stringify(Object.keys(game.components)).length > Math.floor(window.innerWidth / 28)) { document.getElementById("components").innerHTML = JSON.stringify(Object.keys(game.components)).substring(0, Math.floor(window.innerWidth / 28)) + "...]" } else { document.getElementById("components").innerHTML = JSON.stringify(Object.keys(game.components)) }
        document.getElementById("mic").innerHTML = Math.round(window.innerHeight / 100)
        document.getElementById("gameMode").innerHTML = window.gameMode
    } catch (e) {
        document.getElementById("debugData.error").style.display = "block"
    }
}