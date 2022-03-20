function renderChunk(chunk, x, y) {
    const oldPlayer = game.components.player
    window.game.components = {}
    game.newImageComponent("player", oldPlayer.height, oldPlayer.width, "./assets/player-front.png", x, y, oldPlayer.speed, oldPlayer.health)
    if (Bool(sessionStorage.getItem("visibleReachBox"))) { game.newRectComponent("reachBox", game.components.player.width + reachBoxSize, game.components.player.height + reachBoxSize, "rgba(0, 255, 0, 0.5)", game.components.player.x - (reachBoxSize / 2), game.components.player.y - (reachBoxSize / 2), 1.5) } else { game.newRectComponent("reachBox", game.components.player.width + reachBoxSize, game.components.player.height + reachBoxSize, "transparent", game.components.player.x - (reachBoxSize / 2), game.components.player.y - (reachBoxSize / 2), 1.5) }
    for (let i = 0; i < chunk.length; i++) {
        if (!game.skipComponents.includes(chunk[i].id)) {
            chunk[i].functions.onload();
            window.chatBox.transition(0)
            if (window.other_onkeydown) window.other_onkeydown.checks = []
                /*
                for (let a = 0; a < i; a++) {
                    if (!game.skipComponents.includes(chunk[a].id) && game.components[chunk[i].id].intersects(game.components[chunk[a].id])) {
                        setTimeout(() => {
                            game.skipComponents.push(chunk[i].id)
                            delete window.game.components[chunk[i].id]
                        }, game.tickInterval * 2);
                    }
                }
                */
        }
    }
}