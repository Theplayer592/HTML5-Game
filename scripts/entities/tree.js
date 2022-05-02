class Game_Tree {
    constructor() {
        this.checkAdded = true
        this.oninrange = function(thisComp, key) {
            prompt("Press <key>Q</key> to chop down wood")
            addIRH("Tree", Math.round(Number(thisComp.health) / Number(getItemsData().tree.health) * 100))
            if (!this.checkAdded) window.other_onkeydown.checks.push({
                val: "q",
                keydownOnly: true,
                f: () => {
                    thisComp.health = Number(thisComp.health) - window.playerData.equipped.props.Damage.val
                    if (thisComp.health == 0) {
                        addToInvent(window.allItems.wood, 4)
                        chunks[currentChunk].splice(getChunkIndex().indexOf(keyFromVal(game.components, thisComp)), 1)
                        delete window.game.components[keyFromVal(game.components, thisComp)]
                    }
                    window.other_onkeydown.checks = []
                    this.checkAdded = false
                }
            }) - 1
            this.checkAdded = true
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
                //if (this.checkAdded) window.other_onkeydown.checks = []
            this.checkAdded = false
        }
        this.speed = 0
        this.health = 50
        this.rates = 75
    }
}