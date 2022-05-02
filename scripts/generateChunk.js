function generateChunk(chunk, chunkID, renderChunkAfter = true) {
    game.canvas.style.background = "url('./assets/TerrainGeneration.png')"
    var noOfItems = Math.floor(Math.random() * (Math.round(window.innerHeight / 100)))
    if (noOfItems < 1 && window.gameMode == "debug") getItemsData() //Load in the items, even if there is no need to, for debug purposes
    for (let i = 0; i < noOfItems; i++) {
        let chosenItem = chooseItem()
        let xVal = Math.floor(Math.random() * (window.innerHeight / 1.05 - 50))
        let yVal = Math.floor(Math.random() * (window.innerHeight / 1.05 - 50))
        var ADDME = {
            id: `${chunkID}:${chosenItem.id}.${i}`,
            descriptor: chosenItem.id,
            functions: {
                onload: () => chosenItem.onload(`${chunkID}:${chosenItem.id}.${i}`, xVal, yVal),
                onintersect: (thisComp) => chosenItem.onintersect(thisComp),
                oninrange: (thisComp, key) => chosenItem.oninrange(thisComp, key),
                onoutrange: (thisComp, key) => chosenItem.onoutrange(thisComp, key)
            }
        }
        chunk.push(ADDME)
    }
    game.canvas.style.background = "#699969"
    if (renderChunkAfter) renderChunk(chunk, game.components.player.x, game.components.player.y)
}