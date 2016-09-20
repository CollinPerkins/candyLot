// Webpack
var qrcode = require('qr-encode');
var qrLot;

$(document).ready(function() {
  var qrObject;
  $('#qrScan').change(function() {
    // Input Value of the scanned GS128 Code
    var qr = ($('#qrScan').val());

    if(qr !== ""){
      // Splits the GS128 string at the * place.
      qr = JSON.parse(qr);
      qrLot = qr.lot;
    }
  });

  $("#generateQrcode").click(function(){
    // var qrCanvas = $("#qr").qrcode({width: 200,height: 200,text: JSON.stringify(GS128Object)});

    console.log(qrLot);
    // qrcode Value
    var qrcodeValue = qrcode(JSON.stringify(qrLot), {
      type:  10
    });

    var qrcodeImage = new Image();
    qrcodeImage.src = qrcodeValue;
    $('#qr').find('img').replaceWith(qrcodeImage);
    //qrContainer.appendChild(qrCanvas);
    //var qrCanvas = $("#qrImage").qrcode({ width: 200,height: 200,text: JSON.stringify(GS128Object)});
    //qrContainer.appendChild(qrCanvas);
    var w = window.open();

    // * {
    //   max-width: 150px;
    // }

    w.document.write(`
      <html>
      <head>
        <style>
          #right {
            float: right;
            font-size: 40px;
          }

        </style>
      </head>
      <body>
      <div style="width: 50px">
        ${$('#qr').html()}
      </div>
      <div id="right">
       Lot: ${qrLot}
      <div>
      </body></html>`);
    w.print();
    w.close();
  });
  // $('.printButton').click(function() {
  //    $('#GS128').focus();
  //  });

});
