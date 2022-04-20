function handleInvent(elem) {
    var data = window.playerData.equipped = JSON.parse(elem.getAttribute("item-data"))
    document.getElementById("stats_type").innerText = data.type
    document.getElementById("stats_damage").innerText = `${data.props.Damage.val} ${data.props.Damage.rep}`
}