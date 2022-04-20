window.onload = script_loads()

function script_loads() {
    var entities = [
        "merchant",
        "tree"
    ]

    for (var x in entities) {
        var a = document.createElement("script")
        a.setAttribute("src", `./scripts/entities/${entities[x]}.js`)
        document.getElementById("script_loader").appendChild(a)
    }

    callLoad()
}

function callLoad() {
    setTimeout(() => {
        try {
            loaded()
            setTimeout(() => document.getElementById("load_modal").style.display = "none", 500)
        } catch (e) {
            callLoad()
            document.getElementById("load_modal").style.display = "flex"
        }
    }, 15)
}