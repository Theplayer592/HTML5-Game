class Game_Merchant {
    constructor() {
        this.oninrange = function(thisComp, key) {
            window.other_onkeydown.checks.push({
                val: "t",
                f: () => {
                    thisComp.ai.active = false
                    window.chatBox._callback = function(v) {
                        if (v.toLowerCase().includes("y")) {
                            window.chatBox.setMessage("Excellent! Here are the items I sell:\n\n<ol><li>Magic dust</li></ol> \n[Select a number to continue]")
                            window.chatBox._callback = function(v) {
                                switch (v) {
                                    case "1":
                                        chatBox.setMessage("Ok, well that costs 10 gold peices. [y = pay, n = reject]")
                                        window.chatBox._callback = function(v) {
                                            addToInvent(window.allItems.wood)
                                        }
                                        break;
                                    default:
                                        window.chatBox.setMessage("Sorry, but I don't sell that. However, I do sell... [Press enter to continue]")
                                        var currentF = window.chatBox._callback
                                        window.chatBox._callback = function(v) {
                                            window.chatBox.setMessage("<ol><li>Magic dust</li></ol> \n[Select a number to continue]")
                                            window.chatBox._callback = currentF;
                                        }
                                        break;
                                }
                            }
                        } else if (v.toLowerCase().includes("n")) {
                            window.chatBox.setMessage("No?!? Well, if you say so... [Press enter or escape to continue]")
                            window.chatBox._callback = function(v) { window.chatBox.transition(0) }
                        } else {
                            window.chatBox.setMessage("Ummmmmm... Sorry? I don't understand what your trying to say. What I asked, is would you like to trade with me? [y/n]")
                        }
                    }
                    window.chatBox.run(key, "./assets/Merchant.png", "Wandering Merchant", "Hello young traveller! I am a trader of the wandering clan. Would you like to do business with me? [y/n]")
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
        this.speed = 2
        this.rates = 5
    }
}