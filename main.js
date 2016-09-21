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
    var qrcodeValue = qrcode(qrLot, {
      type:  10
    });

    var qrcodeImage = new Image();
    qrcodeImage.src = qrcodeValue;

    console.log(qrcodeValue);
    $('#qr').find('img').replaceWith(qrcodeImage);
    //qrContainer.appendChild(qrCanvas);
    //var qrCanvas = $("#qrImage").qrcode({ width: 200,height: 200,text: JSON.stringify(GS128Object)});
    //qrContainer.appendChild(qrCanvas);
    var w = window.open();



    w.document.write(`
      <html>
      <head>
        <style>
          #right {
            float: right;
            font-size: 18px;
            padding-top: 35px;
            padding-left: 20px;
          }
          #left {
            float: left;
          }
          * {
            max-height: 85px;
          }

        </style>
      </head>
      <body>
      <div style="width: 50px" id="left">
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
