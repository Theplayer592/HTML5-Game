function prompt(m = "Default prompt", l = 10000) {
    var e = document.getElementById("prompt")
    if (e.innerHTML !== "") {
        return "Other prompt already showing."
    }
    e.innerHTML = m
    e.style.opacity = 1
    e.style.transition = `${(l / 1000) / 2.5}s`
    setTimeout(() => {
        e.style.opacity = 0
        setTimeout(() => e.innerHTML = "", (l / 2))
    }, l)
}