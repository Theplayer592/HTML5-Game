function applyBehaviours() {
    for (const [key, value] of Object.entries(game.components)) {
        if (key !== "player" && key !== "reachBox") {
            try {
                game.components[key].functions.draw(game.components[key])
            } catch (e) {}
        }
    }
}