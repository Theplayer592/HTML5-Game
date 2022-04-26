function touching() {
    function touching_chunkChecker(chunkName, x, y, operator) {
      console.log(chunks)
        if (!chunks[chunkName]) {
            chunks[chunkName] = []
            generateChunk(chunks[chunkName], chunkName)
            renderChunk(chunks[chunkName], x, y)
            operator()
            window.currentChunk = chunkName
        } else {
            renderChunk(chunks[chunkName], x, y)
            operator()
            window.currentChunk = chunkName
        }
        document.getElementById("chunk").innerHTML = currentChunk
    }
    if (game.components.player.x > game.canvas.width) {
        touching_chunkChecker(`${window.chunkX + 1},${window.chunkY}`, 0, game.components.player.y, () => window.chunkX++)
    }
    if (game.components.player.x < 0) {
        touching_chunkChecker(`${window.chunkX - 1},${window.chunkY}`, Math.floor(window.innerHeight / 1.05), game.components.player.y, () => window.chunkX--)
    }
    if (game.components.player.y > game.canvas.height) {
        touching_chunkChecker(`${window.chunkX},${window.chunkY - 1}`, game.components.player.x, 0, () => window.chunkY--)
    }
    if (game.components.player.y < 0) {
        touching_chunkChecker(`${window.chunkX},${window.chunkY + 1}`, game.components.player.x, Math.floor(window.innerHeight / 1.05), () => chunkY++)
    }

    for (let i = 0; i < chunks[window.currentChunk].length; i++) {
        try {
            if (game.components[chunks[currentChunk][i].id] && game.components[chunks[currentChunk][i].id].intersects(game.components.player)) {
                chunks[currentChunk][i].functions.onintersect(game.components[chunks[currentChunk][i].id])
            }
            if (game.components[chunks[currentChunk][i].id] && game.components[chunks[currentChunk][i].id].intersects(game.components.reachBox)) {
                chunks[currentChunk][i].functions.oninrange(game.components[chunks[currentChunk][i].id], chunks[currentChunk][i].id)
            } else {
                chunks[currentChunk][i].functions.onoutrange(game.components[chunks[currentChunk][i].id], chunks[currentChunk][i].id)
            }
        } catch (e) {
            console.warn("An error occured. Safe to ignore.\n", e)
        }
    }
}