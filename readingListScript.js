function colorAll() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var endRow = sheet.getLastRow();

  for (var r = startRow; r <= endRow; r++) {
    colorRow(r);
  }
}

function colorRow(r){
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange(r, 1, 1, 3);

  var data = dataRange.getValues();
  var row = data[0];

  if(row[0] === ""){
    dataRange.setBackgroundRGB(255, 255, 255); /*white*/
  }else if(row[0] > 0){
    dataRange.setBackgroundRGB(192, 255, 192); /*green*/
  // }else if(row[0] > 0){
  //   dataRange.setBackgroundRGB(255, 255, 194); /*yellow*/    
  }else{
    dataRange.setBackgroundRGB(255, 192, 192); /*red*/
  }

  SpreadsheetApp.flush(); 
}

function onEdit(event)
{
  var r = event.source.getActiveRange().getRowIndex();
  if (r >= 2) {
    colorRow(r);
  }
}

function onOpen(){
  colorAll();
}
​