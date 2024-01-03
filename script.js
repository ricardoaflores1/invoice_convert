const txt1 = document.getElementById('form-input');
const highAmount = document.getElementById('highAmount');
const out1 = document.getElementById('output1');

/*
  var input = document.getElementById('input');
  input.addEventListener('change', function(){
    readXlsxFile(input.files[0]).then(function (data) {
      var i = 0;
      var headers = [];
      var json_object = [];

      data.map((row, index) => {
        if (i == 0) {
          headers = row;
        }
        if (i > 0) {
          var temp = {};
          for (var x = 0; x < row.length; x++) {
            temp[headers[x]] = row[x];
          }
          json_object.push(temp);

        }
        i++;
      });
      document.getElementById('json-data').value = JSON.stringify(json_object, null, 2);
    });
    })*/


const excel_file = document.getElementById('excel_file');

excel_file.addEventListener('change', (event) => {

  if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
    document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

    excel_file.value = '';

    return false;
  }

  var reader = new FileReader();

  reader.readAsArrayBuffer(event.target.files[0]);

  reader.onload = function (event) {

    var data = new Uint8Array(reader.result);

    var work_book = XLSX.read(data, { type: 'array' });

    var sheet_name = work_book.SheetNames;

    var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });

    if (sheet_data.length > 0) {
      var table_output = '<table class="table table-striped table-bordered">';

      for (var row = 0; row < sheet_data.length; row++) {

        table_output += '<tr>';

        for (var cell = 0; cell < sheet_data[row].length; cell++) {

          if (row == 0) {

            table_output += '<th>' + sheet_data[row][cell] + '</th>';

          }
          else {

            table_output += '<td>' + sheet_data[row][cell] + '</td>';

          }

        }

        table_output += '</tr>';

      }

      table_output += '</table>';

      document.getElementById('excel_data').innerHTML = table_output;
    }

    excel_file.value = '';

  }

});

