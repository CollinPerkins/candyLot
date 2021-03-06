// Webpack
var qrcode = require('qr-encode');
var qrLot;
var qrUpc;

$(document).ready(function() {
  var qrObject;
  $('#qrScan').change(function() {
    // Input Value of the scanned GS128 Code
    var qr = ($('#qrScan').val());

    if(qr !== ""){
      // Splits the GS128 string at the * place.
      qr = JSON.parse(qr);
      qrLot = qr.lot;
      qrUpc = qr.sku;
    }


  });

  $("#generateQrcode").click(function(){
    // var qrCanvas = $("#qr").qrcode({width: 200,height: 200,text: JSON.stringify(GS128Object)});

    // qrcode Value
    var qrcodeValueLot = qrcode(qrLot, {
      type:  2
    });
    var qrcodeImageLot = new Image();
    qrcodeImageLot.src = qrcodeValueLot;

    var qrcodeValueUpc = qrcode(qrUpc, {
      type:  2
    });

    var qrcodeImageUpc = new Image();
    qrcodeImageUpc.src = qrcodeValueUpc;
    // console.log(qrcodeValue);

    $('#qrUpc').find('img').replaceWith(qrcodeImageUpc);
    $('#qrLot').find('img').replaceWith(qrcodeImageLot);
    //qrContainer.appendChild(qrCanvas);
    //var qrCanvas = $("#qrImage").qrcode({ width: 200,height: 200,text: JSON.stringify(GS128Object)});
    //qrContainer.appendChild(qrCanvas);
    var w = window.open();



    w.document.write(`
      <html>
      <head>
        <style>
          @page { size: auto;  margin: 0mm; }
          #right {
            float: right;
            font-size: 12px;
          }
          #left {
            float: left;
            font-size: 12px;
          }
          * {
            max-height: 50px;
          }

        </style>
      </head>
      <body>
        <div id="left">
          <div style="width: 50px; padding-left: 20px;">
            ${$('#qrUpc').html()}
          </div>
          <div>
            UPC:
            <br>
            ${qrUpc}
          </div>
        </div>
        <div id="right">
          <div style="width: 50px; padding-left: 40px;">
            ${$('#qrLot').html()}
          </div>
          <div>
            Lot:
            <br>
            ${qrLot}
          </div>
        </div>
      </body></html>`);
    w.print();
    w.close();
  });
  // $('.printButton').click(function() {
  //    $('#GS128').focus();
  //  });

});
