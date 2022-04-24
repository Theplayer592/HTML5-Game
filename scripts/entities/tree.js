class Game_Tree {
    constructor() {
        this.oninrange = function(thisComp, key) {
            prompt("Press <key>Q</key> to chop down wood")
            addIRH("Tree", Math.round(Number(thisComp.health) / Number(getItemsData().tree.health)) * 100)
            window.other_onkeydown.checks.push({
                val: "q",
                f: () => {
                    //Add a cooldown, because otherwise this will decrease health by 50 in about a second
                    thisComp.health -= 1
                }
            })
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
        }
        this.speed = 0
        this.health = 10
        this.rates = 1
    }
}