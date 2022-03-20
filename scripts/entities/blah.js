class Game_Blah {
    constructor() {
        this.oninrange = function(thisComp, key) {
            window.other_onkeydown.checks.push({
                val: "t",
                f: () => {
                    thisComp.ai.active = false
                    window.chatBox._callback = function(v) {
                        if (v.toLowerCase() == "hi!") {
                            addToInvent({
                                name: "Magic Dust",
                                descript: "Just some dust... But with magic!",
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
                            })
                            window.chatBox.setMessage("How are you doing?")
                        } else if (v.toLowerCase() == "no") {
                            console.log("no")
                            removeFromeInvent("Magic Dust")
                        }
                    }
                    window.chatBox.run(key, "./assets/player-back.png", "Mr. Blah", "Hi there!")
                    window.other_onkeydown.checks = []
                    window.other_onkeydown.checks.push({
                        val: "Escape",
                        f: () => {
                            chatBox.transition(0)
                            window.blockKeys = false
                        }
                    })
                }
            })
            prompt("Press <key>T</key> to talk with NPCs!")
        }
        this.onoutrange = function(thisComp, key) {
            if (thisComp == undefined) return
            thisComp.ai.active = true
            if (window.chatBox.host == key) {
                chatBox.transition(0)
                window.blockKeys = false
                window.other_onkeydown.checks = []
            }
        }
    }
}