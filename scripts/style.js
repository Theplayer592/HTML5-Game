function enlarge() {
    var e = document.getElementById("chatBox")
    window.spareData.chatBox_e = {
        height: getComputedStyle(e).height
    }

    e.style.height = "calc(100vh - 40px)"
    e.style.width = "calc(100vh - 40px)"
    e.style.left = 0
    e.style.right = 0
    document.getElementById("chatInput").style.fontSize = "large"

    window.blockKeys = true
}

function shrink() {
    var e = document.getElementById("chatBox")

    e.style.height = window.spareData.chatBox_e.height
    e.style.width = "50%"
    e.style.left = "calc(25% - 20px)"
    e.style.right = "calc(25% - 20px)"
    e.style.margin = "auto"
    document.getElementById("chatInput").style.fontSize = "medium"

    window.blockKeys = false
}