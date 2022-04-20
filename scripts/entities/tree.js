class Game_Tree {
    constructor() {
        this.oninrange = function(thisComp, key) {
            console.log("A tree is near...")
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
        }
        this.speed = 0
        this.health = 10
        this.rates = 1
    }
}