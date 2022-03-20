class AI {
    constructor(comp) {
        this.prevChoice;
        this.active = true;
        this.comp = comp;
        this.dirChoice = Math.floor(Math.random() * 15);
        this.dirCount = 0;
        this.time = 1;
    }
    main() {
        if (!this.active) return

        this.prevChoice = this.dirChoice

        if (window.fpsCounter.count % (window.fpsCounter.fps * this.time) == 0) {
            this.dirChoice = Math.floor(Math.random() * 15)
            this.time = Math.floor(Math.random() * 5)
        }
        if (this.dirChoice == this.prevChoice) { this.dirCount++; } else { this.dirCount = 0 }

        //Emergency measure if AI seems to glitch
        if (this.dirCount > (window.fpsCounter.fps * (this.time + 10))) {
            this.dirChoice = 0
            this.dirCount = 0
        }
        switch (this.dirChoice) {
            case 0:
                this.comp.y -= (this.comp.speed / 1.5)
                this.comp.x += (this.comp.speed / 1.5)
                break;
            case 1:
                this.comp.y -= (this.comp.speed / 1.5)
                this.comp.x -= (this.comp.speed / 1.5)
                break;
            case 2:
                this.comp.y += (this.comp.speed / 1.5)
                this.comp.x += (this.comp.speed / 1.5)
                break;
            case 3:
                this.comp.y += (this.comp.speed / 1.5)
                this.comp.x -= (this.comp.speed / 1.5)
                break;
            case 4:
                this.comp.y -= this.comp.speed
                break;
            case 5:
                this.comp.x += this.comp.speed
                break;
            case 6:
                this.comp.y += this.comp.speed
                break;
            case 7:
                this.comp.x -= this.comp.speed
                break;
            default:
                return;
        }
    }
}