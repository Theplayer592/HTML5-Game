class Game_Tree {
    constructor() {
        this.oninrange = function(thisComp, key) {
            prompt("Press <key>Q</key> to chop down wood")
            addIRH("Tree", Math.round(Number(thisComp.health) / Number(getItemsData().tree.health) * 100))
            if (!this.checkAdded) window.other_onkeydown.checks.push({
                val: "q",
                keydownOnly: true,
                f: () => {
                    //Add a cooldown, because otherwise this will decrease health by 50 in about a second
                    /*if(!this.blocker)*/
                    thisComp.health = Number(thisComp.health) - 1
                    addToInvent(window.allItems.wood)
                    if (thisComp.health == 0) {
                        chunks[currentChunk].splice(getChunkIndex().indexOf(keyFromVal(game.components, thisComp)), 1)
                        delete window.game.components[keyFromVal(game.components, thisComp)]
                    }
                    //this.blocker = true
                    //setTimeout(() => this.blocker = false, 1)
                }
            })
            this.checkAdded = true
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
            this.checkAdded = false
        }
        this.speed = 0
        this.health = 10
        this.rates = 1
    }
}