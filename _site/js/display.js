var itemDisplayColCount = 3;


function handleHashChange() {
    if (!window.location.hash) {
        return;
    }
    const hash = window.location.hash.substring(1); // Remove the '#'
    console.log("Current hash:", hash);
    var splitIndex = hash.indexOf('_');
    var category = hash;
    var sub_category = null;
    if (splitIndex > -1) {
        category = hash.slice(0, splitIndex);
        if (splitIndex < (hash.length - 1));
        sub_category = hash.slice(splitIndex + 1);
    }
    findItemsByCategory(category, sub_category);
}

// Listen for subsequent hash changes
window.addEventListener('hashchange', handleHashChange);

function findItemsByCategory(category, sub_category) {
    console.log('hi');
    var foundItems = [];
    while (document.getElementById('cr1').firstChild) {
        document.getElementById('cr1').removeChild(document.getElementById('cr1').firstChild);

    }
    document.getElementById('cr1').appendChild(createGridHeader(category, sub_category));
    items.data.forEach((value, index) => {
        if (value.category && (value.category === category)) {
            if ((sub_category === undefined) ||
                (value.sub_category && (value.sub_category === sub_category))) {
                foundItems.push(value);
            }
        }
    });
    var displayTitle = category.charAt(0).toUpperCase() + category.slice(1);
    displayItemsForCategory(category, foundItems);
}

function createGridHeader(category, sub_category) {
    var gridHeaderHolder = document.createElement('div');
    var gridHeader = document.createElement('h6');
    gridHeader.style.textAlign = "center";
    var newText = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    if (sub_category) {
        newText += " - " + sub_category.charAt(0).toUpperCase() + sub_category.slice(1).toLowerCase();
    }
    gridHeader.innerText = newText;
    gridHeaderHolder.appendChild(gridHeader);
    return gridHeader;
}
function displayItemsForCategory(displayTitle, items) {
    var cr1 = document.getElementById('cr1');
    var cols = [];
    items.forEach((item, index) => {
        if (index == 0 || ((index % itemDisplayColCount) == 0)) {
            cr1.appendChild(initRow(index, items));
        }
    });
}

function initRow(rowIndex, items) {
    var row = document.createElement('div');
    row.style = "margin-bottom:5em;"
    row.className = 'row';
    var col = null;
    for (let i = 0; (i < itemDisplayColCount) && ((rowIndex + i) < items.length); i++) {
        col = document.createElement('div');
        if (i < 2) {
            col.style = "";
        }
        col.className = 'col-lg-4';
        row.appendChild(col);
        populateCol(col, items[rowIndex + i]);
    }
    return row;
}

function populateCol(col, item) {
    var thumbCell = document.createElement('div');
    thumbCell.className = "container";
    thumbCell.style = "padding-top:10px;";

    var thumbCellRow = document.createElement('div');
    thumbCellRow.className = "row";
    var thumbCellCol = document.createElement('div');
    thumbCellCol.className = "col";
    thumbCellCol.style = "display:grid; place-items:center;min-width:200px";
    var imgHolder = document.createElement('div');

    var labelHolder = document.createElement('div');
    var label = document.createElement('span');
    labelHolder.appendChild(label);
    label.innerText = item.title;

    var img = document.createElement('img');
    imgHolder.appendChild(img);

    //img.src = "./images/th/" + item.id + "_th.jpg";
    img.src = "./images/th/" + "1" + "_th.jpg";

    thumbCellCol.appendChild(imgHolder);
    thumbCellCol.appendChild(labelHolder);

    thumbCellRow.appendChild(thumbCellCol);
    thumbCell.appendChild(thumbCellRow);
    col.appendChild(thumbCell);

}

document.addEventListener("DOMContentLoaded", function () {
    // Initial call when the page loads to handle the current hash
    if (window.location.hash) {
        handleHashChange();
    } else {
        window.location.hash = "#cards_birthday";
    }

});

