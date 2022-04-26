window.inrangeHealths = []

//Adds a health to the list
function addIRH(name, percent) {
    window.inrangeHealths.push({
        name: name,
        percent: Number(percent)
    })
}

//Renders, clears the health list, then readies for a new update
function updateIRH() {
    document.getElementById("inrangeHealths").innerHTML = ""
    inrangeHealths.forEach(({ name, percent }) => {
        document.getElementById("inrangeHealths").innerHTML += `
        <div class="irh-container">
            <p>${name}: ${percent}%</p>
            <div class="irh">
                <div style="width: ${percent}%"></div>
            </div>
        </div>
        <br /> <br />
        `
    });
    window.inrangeHealths = []
}