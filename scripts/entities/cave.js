class Game_Cave {
    constructor() {
        this.oninrange = function(thisComp, key) {
            prompt("Press <key>Q</key> to go down cave")
            if (!this.checkAdded) window.other_onkeydown.checks.push({
                val: "q",
                keydownOnly: true,
                f: () => {
                    console.log("Go down cave")
                }
            })
            this.checkAdded = true
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
            this.checkAdded = false
        }
        this.speed = 0
        this.health = 50
        this.rates = 3
    }
}