class Game {
    constructor(title) {
        this.title = title
        document.title = title
        return "Game object initiated."
    }

    init(w, h, color, insertBefore, us = 15) {
        this.run = true
        this.statusEffects = {
            positive: function(strength, duration) {
                game.components.player.health += strength
                this.interval = setInterval(() => game.components.player.health += strength, 1000)
                setTimeout(() => clearInterval(this.interval), duration)
            },
            negative: function(strength, duration) {
                this.interval = setInterval(() => game.components.player.health -= strength, 1000)
                setTimeout(() => clearInterval(this.interval), duration)
            },
            interval: null
        }
        this.updateSpeed = us
        this.drawCanvas(w, h, color, insertBefore)
    }

    clearScrn() { this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) }

    pause() {
        this.run = false
        clearInterval(window.mi)
    }

    play() {
        this.run = true
        this.update()
        setTimeout(() => window.mi = setInterval(() => {
            applyMovement()
            applyBehaviours()
        }, window.game.updateSpeed), 8)
    }

    drawCanvas(w, h, color, insertBefore) {
        this.canvas = document.createElement("canvas")
        this.canvas.width = w
        this.canvas.height = h
        this.canvas.style.background = color
        this.context = this.canvas.getContext("2d")
        this.components = {}
        this.skipComponents = []
        document.body.insertBefore(this.canvas, insertBefore)
        setTimeout(() => {
            updateGameArea()
            document.getElementById("healthBarBack").style.display = "block"
        }, 20)
    }

    newRectComponent(name, w, h, color, x, y, speed, health = 1, functions = {}) {
        this.components[name] = {}
        this.components[name].type = "rect"
        this.components[name].width = w
        this.components[name].height = h
        this.components[name].color = color
        this.components[name].x = x
        this.components[name].y = y
        this.components[name].speed = speed
        this.components[name].health = health
        this.components[name].functions = functions
        this.components[name].ai = new AI(this.components[name])
        this.components[name].intersects = function(otherComp) {
            return !(otherComp.x > (this.x + this.width) ||
                (otherComp.x + otherComp.width) < this.x ||
                otherComp.y > (this.y + this.height) ||
                (otherComp.y + otherComp.height) < this.y);
        }
    }

    newTextComponent(name, styling, size, font, color, value, x, y, speed, health = 1, functions = {}) {
        this.components[name] = {}
        this.components[name].type = "text"
        this.components[name].styling = styling
        this.components[name].size = size
        this.components[name].font = font
        this.components[name].ctxFont = `${styling} ${size} ${font}`
        this.components[name].color = color
        this.components[name].value = value
        this.components[name].x = x
        this.components[name].y = y
        this.components[name].speed = speed
        this.components[name].health = health
        this.components[name].functions = functions
        this.components[name].ai = new AI(this.components[name])
        this.components[name].intersects = function(otherComp) {
            return !(otherComp.x > (this.x + this.width) ||
                (otherComp.x + otherComp.width) < this.x ||
                otherComp.y > (this.y + this.height) ||
                (otherComp.y + otherComp.height) < this.y);
        }
    }

    newImageComponent(name, w, h, imgURL, x, y, speed, health = 1, functions = {}) {
        this.components[name] = {}
        this.components[name].type = "img"
        this.components[name].width = w
        this.components[name].height = h
        this.components[name].imgURL = imgURL
        this.components[name].x = x
        this.components[name].y = y
        this.components[name].speed = speed
        this.components[name].health = health
        this.components[name].functions = functions
        this.components[name].ai = new AI(this.components[name])
        this.components[name].intersects = function(otherComp) {
            return !(otherComp.x > (this.x + this.width) ||
                (otherComp.x + otherComp.width) < this.x ||
                otherComp.y > (this.y + this.height) ||
                (otherComp.y + otherComp.height) < this.y);
        }
    }

    update() {
        window.fpsCounter.count++;
        window.fpsCounter.fps = Math.round(window.fpsCounter.count / ((Date.now() / 1000) - window.fpsCounter.startTime))
        for (const [key, value] of Object.entries(this.components)) {
            switch (this.components[key].type) {
                case "rect":
                    this.context.fillStyle = this.components[key].color
                    this.context.fillRect(this.components[key].x, this.components[key].y, this.components[key].width, this.components[key].height)
                    break;
                case "text":
                    this.context.font = this.components[key].ctxFont
                    this.context.fillStyle = this.components[key].color
                    this.context.fillText(this.components[key].value, this.components[key].x, this.components[key].y)
                    this.components[key].ctxFont = `${this.components[key].styling} ${this.components[key].size} ${this.components[key].font}`
                    break;
                case "img":
                    let img = new Image()
                    img.src = this.components[key].imgURL
                    this.context.drawImage(img, this.components[key].x, this.components[key].y, this.components[key].width, this.components[key].height)
            }
        }
        document.getElementById("health").innerHTML = this.components.player.health
        document.getElementById("healthBar").style.width = `${this.components.player.health / 2}%`
        if (this.components.player.health / 2 < 7.5) {
            document.getElementById("healthBar").style.width = "6.5%"
        }
        updateIRH()
        if (this.run) requestAnimationFrame(updateGameArea)
    }
}