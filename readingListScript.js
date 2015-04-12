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
var formatISBN = function() {
var range = SpreadsheetApp.getActiveSheet().getRange('A:A');
    for (var i = range.getRow(); i < range.getLastRow(); i++) {
        cell = range.offset(i, 0, 1);
        cellData = cell.getValue() + "";
        formattedData = cellData.replace(/[^0-9]+/g, '');
        cell.setValue(formattedData);
    }
};
function fetchBookData() {
    var range = SpreadsheetApp.getActiveSheet().getDataRange();
    for (var i = range.getRow(); i < range.getLastRow(); i++) {
        rowRange = range.offset(i, 0, 1);
        cellData = rowRange.offset(0, 0).getValue();
        
        if (cellData === "") {
        } else if (cellData != "undefined") {
            var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + cellData;
            var response = UrlFetchApp.fetch(url);
            var dataAll = JSON.parse(response);

            var title = (dataAll.items[0]["volumeInfo"]["title"]);
            var titleCell = range.offset(i, 1, 1, 1);
                titleCell.setValue(title);

            var subtitle = (dataAll.items[0]["volumeInfo"]["subtitle"]);
            var subtitleCell = range.offset(i, 2, 1, 1);
                subtitleCell.setValue(subtitle);
                
            var authors = (dataAll.items[0]["volumeInfo"]["authors"]);
            var authorsCell = range.offset(i, 3, 1, 1);
                authorsCell.setValue(authors);

            var printType = (dataAll.items[0]["volumeInfo"]["printType"]);
            var printTypeCell = range.offset(i, 4, 1, 1);
                printTypeCell.setValue(printType);
            
            var pageCount = (dataAll.items[0]["volumeInfo"]["pageCount"]);
            var pageCountCell = range.offset(i, 5, 1, 1);
                pageCountCell.setValue(pageCount);
            
            var publisher = (dataAll.items[0]["volumeInfo"]["publisher"]);
            var publisherCell = range.offset(i, 6, 1, 1);
                publisherCell.setValue(publisher);
            
            var publishedDate = (dataAll.items[0]["volumeInfo"]["publishedDate"]);
            var publishedDateCell = range.offset(i, 7, 1, 1);
                publishedDateCell.setValue(publishedDate);
            
            var webReaderLink = (dataAll.items[0]["accessInfo"]["webReaderLink"]);
            var webReaderLinkCell = range.offset(i, 10, 1, 1);
                webReaderLinkCell.setValue(webReaderLink);

            //todo
            // 1. If a json returns "undefined", print nothing to the cell
            // 2. If the ISMN doesn't return anything, ie https://www.googleapis.com/books/v1/volumes?q=isbn:9780060189877
            //      - skip and go to next row lookup
            // if the row is already filled up, ignore? 
        }
    }
}
// Putting this at the bottom, to work with JS best practices
function onEdit(e) {
    setRowColors();
    insertTopRow();
    formatISBN();
    fetchBookData();
}






/********************
* TODO *
********************/

// Import the book information, using just the ISBN lookup, from Google Book API
// https://developers.google.com/books/docs/v1/getting_started
// https://www.googleapis.com/books/v1/volumes?q=isbn:9780061766084
// https://www.googleapis.com/apiName/apiVersion/resourcePath?parameters
// Can be 10 or 13 digit ISBN for google API

