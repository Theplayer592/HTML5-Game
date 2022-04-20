function getItemsData() {
    window.allItems = {
        magic_dust: {
            name: "Magic Dust",
            descript: "Just some dust... But with magic!",
            type: "Miscellaneous",
            props: {
                Magic: {
                    val: 100,
                    unit: "mp"
                },
                Protection: {
                    val: 1,
                    rep: "HP"
                }
            }
        },
        wood: {
            name: "Wood",
            descript: "Good wood",
            type: "Miscellaneous",
            props: {
                Damage: {
                    val: 1,
                    rep: "HP"
                }
            }
        }
    }

    function getItemsData_chunkChecker(thisComp, newChunkID, src, x, y) {
        if (chunks[newChunkID] == undefined) {
            window.chunks[newChunkID] = []
            generateChunk(chunks[newChunkID], newChunkID, false)
        }

        var id = `${newChunkID}:${src.id}.${chunks[newChunkID].length}`

        chunks[newChunkID].push({
            id: id,
            descriptor: src.id,
            functions: {
                onload: () => src.onload(id, x, y),
                onintersect: () => src.onintersect(game.components[id]),
                oninrange: () => src.oninrange(game.components[id], id),
                onoutrange: () => src.onoutrange(game.components[id], id)
            }
        })

        var index = []
        for (let i = 0; i < chunks[currentChunk].length; i++) {
            index.push(chunks[currentChunk][i].id)
        }

        chunks[currentChunk].splice(index.indexOf(keyFromVal(game.components, thisComp)), 1)
        delete game.components[keyFromVal(game.components, thisComp)]
    }

    function getItemsData_touching(thisComp, src) {
        if (thisComp.x > game.canvas.width) {
            getItemsData_chunkChecker(thisComp, `${window.chunkX + 1},${window.chunkY}`, src, thisComp.width, thisComp.y)
        }
        if (thisComp.x < (0 - thisComp.width)) {
            getItemsData_chunkChecker(thisComp, `${window.chunkX - 1},${window.chunkY}`, src, Math.floor(window.innerHeight / 1.05) - (thisComp.width * 2), thisComp.y)
        }
        if (thisComp.y > game.canvas.height) {
            getItemsData_chunkChecker(thisComp, `${window.chunkX},${window.chunkY - 1}`, src, thisComp.x, thisComp.height)
        }
        if (thisComp.y < 0) {
            getItemsData_chunkChecker(thisComp, `${window.chunkX},${window.chunkY + 1}`, src, thisComp.x, Math.floor(window.innerHeight / 1.05) - (thisComp.height * 2))
        }
    }

    function getItemsData_index() {
        let indexList = []
        for (let i = 0; i < chunks[currentChunk].length; i++) {
            indexList.push(chunks[currentChunk][i].id)
        }
        return indexList
    }

    function getItemsData_draw(thisComp) {
        if (typeof thisComp == "undefined") return

        thisComp.ai.main()

        var key = keyFromVal(game.components, thisComp)
        chunks[currentChunk][getItemsData_index().indexOf(keyFromVal(game.components, thisComp))].functions.onload = () => getItemsData().merchant.onload(key, thisComp.x, thisComp.y)

        getItemsData_touching(thisComp, getItemsData().merchant)
    }

    var entities = {
        merchant: new Game_Merchant(),
        tree: new Game_Tree()
    }

    return {
        metaData: {
            index: [],
            totalChances: 0
        },
        "tree": {
            id: "Game_Tree",
            onload: function(name, xVal, yVal) {
                game.newImageComponent(name, 85, 85, "./assets/tree.svg", xVal, yVal, getItemsData().tree.speed, getItemsData().tree.health, { draw: this.draw })
                game.components[name].ai.active = false
            },
            onintersect: function(thisComp) {},
            oninrange: entities.tree.oninrange,
            onoutrange: entities.tree.onoutrange,
            draw: getItemsData_draw,
            speed: entities.tree.speed,
            rates: entities.tree.rates
        }
        /*
        "merchant": {
            id: "Game_Merchant",
            onload: function(name, xVal, yVal) {
                game.newImageComponent(name, 85, 85, "./assets/Merchant.png", xVal, yVal, getItemsData().merchant.speed, 1, { draw: this.draw })
            },
            onintersect: function(thisComp) {

            },
            oninrange: entities.merchant.oninrange,
            onoutrange: entities.merchant.onoutrange,
            draw: getItemsData_draw,
            speed: entities.merchant.speed,
            rates: entities.merchant.rates
        },
        "no2": {
            id: "game_no2",
            onload: function(name, xVal, yVal) {
                game.newRectComponent(name, 50, 50, "blue", xVal, yVal, getItemsData().no2.speed, 1, { draw: this.draw })
            },
            onintersect: function() {

            },
            oninrange: function(thisComp, key) {

            },
            onoutrange: function(thisComp, key) {

            },
            draw: getItemsData_draw,
            speed: 3,
            rates: 5
        }
        */
    }
}