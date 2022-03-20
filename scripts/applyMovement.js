//NOTE: texture changes here

function applyMovement() {
    if ((map["ArrowUp"] && map["ArrowRight"]) || (map["w"] && map["d"])) {
        game.components.player.imgURL = "./assets/player-trd.png"
        game.components.player.y -= (game.components.player.speed / 1.5)
        game.components.player.x += (game.components.player.speed / 1.5)
        game.components.reachBox.y -= (game.components.player.speed / 1.5)
        game.components.reachBox.x += (game.components.player.speed / 1.5)
    } else if ((map["ArrowUp"] && map["ArrowLeft"]) || (map["w"] && map["a"])) {
        game.components.player.imgURL = "./assets/player-tld.png"
        game.components.player.y -= (game.components.player.speed / 1.5)
        game.components.player.x -= (game.components.player.speed / 1.5)
        game.components.reachBox.y -= (game.components.player.speed / 1.5)
        game.components.reachBox.x -= (game.components.player.speed / 1.5)
    } else if ((map["ArrowDown"] && map["ArrowRight"]) || (map["s"] && map["d"])) {
        game.components.player.imgURL = "./assets/player-brd.png"
        game.components.player.y += (game.components.player.speed / 1.5)
        game.components.player.x += (game.components.player.speed / 1.5)
        game.components.reachBox.y += (game.components.player.speed / 1.5)
        game.components.reachBox.x += (game.components.player.speed / 1.5)
    } else if ((map["ArrowDown"] && map["ArrowLeft"]) || (map["s"] && map["a"])) {
        game.components.player.imgURL = "./assets/player-bld.png"
        game.components.player.y += (game.components.player.speed / 1.5)
        game.components.player.x -= (game.components.player.speed / 1.5)
        game.components.reachBox.y += (game.components.player.speed / 1.5)
        game.components.reachBox.x -= (game.components.player.speed / 1.5)
    } else if (map["ArrowUp"] || map["w"]) {
        game.components.player.imgURL = "./assets/player-front.png"
        game.components.player.y -= game.components.player.speed
        game.components.reachBox.y -= game.components.player.speed
    } else if (map["ArrowRight"] || map["d"]) {
        game.components.player.imgURL = "./assets/player-right.png"
        game.components.player.x += game.components.player.speed
        game.components.reachBox.x += game.components.player.speed
    } else if (map["ArrowDown"] || map["s"]) {
        game.components.player.imgURL = "./assets/player-back.png"
        game.components.player.y += game.components.player.speed
        game.components.reachBox.y += game.components.player.speed
    } else if (map["ArrowLeft"] || map["a"]) {
        game.components.player.imgURL = "./assets/player-left.png"
        game.components.player.x -= game.components.player.speed
        game.components.reachBox.x -= game.components.player.speed
    }
}