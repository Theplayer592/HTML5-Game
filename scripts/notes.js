/*
        Quite a good flickering effect. Could use later...

        Add to script.js: game.newRectComponent("fadeBackground", window.innerHeight / 1.05, window.innerHeight / 1.05, "transparent", 0, 0)

        fadeBegan = false;

        updateBackground(1)

        function updateBackground(i) {
            if (fadeBegan == false) {
                fadeBegan = true
            }
            console.log(i / 10)
            if (i > 10) return;
            game.components.fadeBackground.color = `rgba(0, 0, 0, ${i/10})`
            i++;
            setTimeout(() => { updateBackground(i) }, 1000)
        }
    */