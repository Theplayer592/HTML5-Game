function chooseItem() {
    items = getItemsData()

    //Build an index of all of the elements in "items" and then sort them
    for (var x in items) {
        items.metaData.index.push(x);
    }
    items.metaData.index.sort(function(a, b) {
        return a == b ? 0 : (a > b ? 1 : -1);
    });

    for (let i = 0; i < Object.keys(items).length; i++) {
        if (items.metaData.index[i] !== "metaData") {
            items[items.metaData.index[i]].rateIndexStart = items.metaData.totalChances
            items.metaData.totalChances += items[items.metaData.index[i]].rates
            items[items.metaData.index[i]].rateIndexEnd = items.metaData.totalChances
        }
    }

    var numGen = Math.floor(Math.random() * items.metaData.totalChances)

    for (let i = 0; i < Object.keys(items).length; i++) {
        if (items.metaData.index[i] !== "metaData") {
            if (numGen <= items[items.metaData.index[i]].rateIndexEnd && numGen >= items[items.metaData.index[i]].rateIndexStart) {
                return items[items.metaData.index[i]]
            }
        }
    }
}