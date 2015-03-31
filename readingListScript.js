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
                rowRange.setBackgroundColor("#FFFFFF"); //blue
            } else if (status == 'Unfinished') {
                rowRange.setBackgroundColor("#FFC2C2"); //red            
            } else if (status === '') {
            rowRange.setBackgroundColor("#FFFFFF"); //red
            } else if (status === 'Reference') {
            rowRange.setBackgroundColor("#FFE0C2"); //red
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

// TODO: Make a 'reset' expression to make cells white again if they are changed.
/********************
* Rewrite the Top code, using a Switch Statement *
********************/
function setRowColors() {
        var range = SpreadsheetApp.getActiveSheet().getDataRange();
        var statusColumnOffset = getStatusColumnOffset();
        for (var i = range.getRow(); i < range.getLastRow(); i++) {
            rowRange = range.offset(i, 0, 1);
            status = rowRange.offset(0, statusColumnOffset).getValue();
            switch(status) {
                case status == 'Finished':
                  rowRange.setBackgroundColor("#C2FFC2"); //green
                  break;
                case status == 'Reading':
                  rowRange.setBackgroundColor("#FFFFC2"); //yellow
                  break;
                case status == 'Not Started':
                  rowRange.setBackgroundColor("#FFFFFF"); //white
                  break;
                case status == 'Unfinished':
                  rowRange.setBackgroundColor("#FFC2C2"); //red
                  break;
                default:
                  rowRange.setBackgroundColor("#FFFFFF"); //white
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
