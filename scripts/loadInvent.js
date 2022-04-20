function loadInvent() {
    if (window.inventList == undefined) window.inventList = []
    setTimeout(() => document.getElementById("gold_quant").innerText = window.playerData.gold || 0, 25)
    document.getElementById("list").innerHTML = window.inventList.length > 0 ? "" : "<h3 style='text-align: center'>You have no equipabble items</h3>"
    for (var x in window.inventList) {
        var y = window.inventList[x]
        document.getElementById("list").innerHTML += `
        <div class="invent_item" onclick="handleInvent(this)" item-data='${JSON.stringify(y)}'>
            <h3>${y.name}</h3>
            <p>${y.descript}</p>
        </div>
        `
    }
}

function addToInvent(obj) {
    window.inventList.push(obj)
    loadInvent()
}

function removeFromeInvent(i) {
    if (typeof i == "number") {
        window.inventList.splice(i, 1)
    } else if (typeof i == "object") {
        window.inventList.splice(window.inventList.indexOf(i), 1)
    } else {
        for (var x in window.inventList) {
            if (window.inventList[x].name == i) {
                window.inventList.splice(x, 1)
            }
        }
    }
    loadInvent()
}