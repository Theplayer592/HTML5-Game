function keyFromVal(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getObjectSize(obj) {
    if (obj !== null && obj !== undefined) {
        var objClass = Object.prototype.toString.call(obj).slice(8, -1);

        if (objClass === 'Object' || objClass === 'Array') {
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                getObjectSize(obj[key]);
            }
        } else {
            chunkBytes += obj.toString().length * 2;
        }
    }

    if (chunkBytes < 1024) return chunkBytes + "B";
    else if (chunkBytes < 1048576) return (chunkBytes / 1024).toFixed(3) + " KB";
    else if (chunkBytes < 1073741824) return (chunkBytes / 1048576).toFixed(3) + " MB";
    else return (chunkBytes / 1073741824).toFixed(3) + " GB";
}