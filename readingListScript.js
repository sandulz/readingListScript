function onEdit(e) {
    setRowColors("getActiveSheet","range");
    insertTopRow();
    retrieveBookData();
}
function setRowColors() {
        var range = SpreadsheetApp.getActiveSheet().getDataRange();
        var statusColumnOffset = getStatusColumnOffset();
        for (var i = range.getRow(); i < range.getLastRow(); i++) {
            rowRange = range.offset(i, 0, 1);
            status = rowRange.offset(0, statusColumnOffset).getValue();
            if (status.match(/Finished*/)) {
                rowRange.setBackgroundColor("#C2FFC2"); //green 
            } else if (status == 'Reading') {
                rowRange.setBackgroundColor("#FFFFC2"); //yellow
            } else if (status == 'Not Started') {
                rowRange.setBackgroundColor("#FFFFFF"); //white
            } else if (status == 'Unfinished') {
                rowRange.setBackgroundColor("#FFC2C2"); //red            
            } else if (status === '') {
                rowRange.setBackgroundColor("#FFFFFF"); //white
            } else if (status === 'Reference') {
                rowRange.setBackgroundColor("#FFE0C2"); //orange
            }
        }
    }
    //Returns the offset value of the column titled "Status"
    //(eg, if the 7th column is labeled "Status", this function returns 6)
function getStatusColumnOffset() {
    lastColumn = SpreadsheetApp.getActiveSheet().getLastColumn();
    var range = SpreadsheetApp.getActiveSheet().getRange(1, 1, 1, lastColumn);
    for (var i = 0; i < range.getLastColumn(); i++) {
        if (range.offset(0, i, 1, 1).getValue() == "Status") {
            return i;
        }
    }
}
function insertTopRow() {
    var ss = SpreadsheetApp.getActiveSheet();
    var rowsArray = ss.getRange("A2:J2").getValues();
    var firstRow = rowsArray.join();
        if (firstRow.match(/\w/)) {
            ss.insertRows(2);
    }
}
function retrieveBookData() {
    var formatISBN = function() {
    var range = SpreadsheetApp.getActiveSheet().getRange('A:A');
        for (var i = range.getRow(); i < range.getLastRow(); i++) {
            cell = range.offset(i, 0, 1);
            cellData = cell.getValue() + "";
            formattedData = cellData.replace(/[^0-9]+/g, '');
            cell.setValue(formattedData);
        }
    };
    formatISBN();
    function callGoogleAPI() {
        // call the Google Book API and return the JSON file, parse and insert into right cells
    }
}

// just method, object, var, etc, resources for above code
// HTTPResponse.getContentText()
// JSON.parse()
// document.write(items.title)
// document.write(items.subtitle)
// document.write(items.authors)
// document.write(items.publisher)
// document.write(items.publishedDate)
// document.write(items.pageCount)
// document.write(items.printType)




/********************
* TODO *
********************/

// Import the book information, using just the ISBN lookup, from Google Book API
// https://developers.google.com/books/docs/v1/getting_started
// https://www.googleapis.com/books/v1/volumes?q=isbn:9780061766084
// https://www.googleapis.com/apiName/apiVersion/resourcePath?parameters
// Can be 10 or 13 digit ISBN for google API

