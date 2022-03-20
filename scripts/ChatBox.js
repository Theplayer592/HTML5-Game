class ChatBox {
    constructor(pfp = "./default.jpg", n = "", m = "Sorry, but I'm not sure what to say! I think I might be glitching! Please report this bug as soon as possible. Thanks!", _callback = function(v) { console.warn("No callback function provided. Please ensure that a callback is present.") }) {
        this.pfp = pfp
        this.m = m
        this.name = n
        this._callback = () => _callback(this.getData())
        this.ed = document.getElementById("chatBox")
        this.ei = document.getElementById("pfp")
        this.ec = document.getElementById("chatContent")
        this.ein = document.getElementById("chatInput")
        this.data = this.ein.value
        this.ei.src = pfp
        var thisc = this

        this.ein.onkeyup = function(e) {
            if (e.key == "Enter") {
                thisc._callback(thisc.getData())
            }
            if (e.key == "Escape") {
                shrink()
                document.getElementById("chatInput").blur()
            }
        }
    }

    run(host, pfp = this.pfp, n = this.name, m = this.m, o = 1) {
        this.host = host
        this.name = n
        this.m = m
        this.setPFP(pfp)
        this.setMessage(m)
        this.transition(o)
    }

    setMessage(m = this.m) {
        if (this.ed.style.opacity == 0) {
            document.getElementById("chat_name").innerHTML = this.name
            document.getElementById("chat_content").innerHTML = this.m
        } else {
            this.m = m
            document.getElementById("chat_content").style.animation = "fadeInOut 1s"
            document.getElementById("chat_name").innerHTML = this.name
            setTimeout(() => document.getElementById("chat_content").innerHTML = this.m, 500)
            setTimeout(() => document.getElementById("chat_content").style.animation = "", 1000)
        }
    }

    setPFP(pfp = this.pfp) {
        this.pfp = pfp
        this.ei.src = pfp
    }

    setName(n = this.n) {
        this.n = n
    }

    transition(o = 1) {
        if (o == 0 || o == 1) {
            this.ed.style.opacity = o
            document.getElementById("chatInput").blur()
        } else throw Error(`Value \"o\" must be either \"0\" or \"1\", not \"${o}\"`)
    }

    getData() {
        this.data = this.ein.value
        return this.data
    }
}