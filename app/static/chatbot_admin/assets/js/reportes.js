// =============================================
//   ENVIO AL APIVIEWS AL VIEWS DEL CHATBOT POR RANGO DE FECHAS
// =============================================

var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;

console.log()
$('input[name="dates"]').daterangepicker(

  {
    locale: {
      format: 'YYYY/MM/DD',
      applyLabel: 'Aplicar',
      cancelLabel: 'Cancelar',
    }
  },
  function (start, end, label) {

    let desde = start.format('YYYY-MM-DD');
    let hasta = end.format('YYYY-MM-DD');
    let id_empresa = empresa_id

    // $.ajax({
    //   // url: 'http://127.0.0.1:8000/historial_fecha',
    //   url: 'http://127.0.0.1:8000/historial_fecha',
    //   data: {
    //     'desde': desde,
    //     'hasta': hasta,
    //     'id_empresa':id_empresa
    //   },
    //   type: "GET",
    //   success: function (response) {
    //     // console.log("Desde: " + desde + '  ' + 'Hasta: ' + hasta);
    //     console.log("Desde: " + desde + '  ' + 'Hasta: ' + hasta);
    //   }
    // });

    $.get('http://127.0.0.1:8000/historial_fecha/?desde=' + desde + '&hasta=' + hasta + '&id_empresa=' + id_empresa + '', function (response) {

      var total_datos = response;
      var template = ``;

      // total_datos.forEach(registro => {
      //   console.log(registro)
      //   template = `
      //         <a href="javascript:void(0);" class="text-body">
      //             <div class="d-flex align-items-start bg-light mt-1 p-2">
      //               <h1 class="me-2 rounded-circle" height="48">M</h1>
      //               <div class="w-100 overflow-hidden">
      //                 <h5 class="mt-0 mb-0 font-14">
      //                   <span class="float-end text-muted font-12">4:30am</span>
      //                   ${registro.nombre_persona}
      //                 </h5>
      //                 <p class="mt-1 mb-0 text-muted font-14">
      //                   <span class="w-75">Última pregunta que fue respondid</span>
      //                 </p>
      //               </div>
      //             </div>
      //           </a>`;
      //   $("#tmp_api").html(template);
      // });

      for (let i = 0; i < total_datos.length; i++) {
        // console.log(total_datos[i])
        let f_h = total_datos[i].registrado
        


      
       


        template += `
              <a href="javascript:ver_conversacion('${total_datos[i].nombre_persona}');" class="text-body cls_attr">
                  <div class="d-flex align-items-start bg-light mt-1 p-2">
                    <h1 class="me-2 rounded-circle" height="48">${total_datos[i].nombre_persona.charAt(0).toUpperCase()}</h1>
                    <div class="w-100 overflow-hidden">
                      <h5 class="mt-0 mb-0 font-14">
                        <span class="float-end text-muted font-12">${f_h.substr(11,5)}PM</span>
                        ${total_datos[i].nombre_persona}
                      </h5>
                      <p class="mt-1 mb-0 text-muted font-14">
                        <span class="w-75">${total_datos[i].pregunta}</span>
                      </p>
                    </div>
                  </div>
                </a>`;
        $("#tmp_api").html(template);

      }
      // console.log(response[0].nombre_persona)
    })

  }


);

// =============================================
//   MOSTRAR HISTORIAL POR USUARIOS
// =============================================

function ver_conversacion(alias_nom) {

  $('#card_conver').show();

  $.get('http://127.0.0.1:8000/obtener_conversacion/?usuario_alias=' + alias_nom, function (response) {

    var total_datos = response;
    var template = ``;

    for (let i = 0; i < total_datos.length; i++) {
      console.log(total_datos[i])

      template += `
          <li class="clearfix">
            <div class="chat-avatar">
              <h1 class="me-2 rounded-circle" height="48">${total_datos[i].nombre_persona.charAt(0).toUpperCase()}</h1>
            </div>
            <div class="conversation-text">
              <div class="ctext-wrap">
                <i>${total_datos[i].nombre_persona}</i>
                <p>
                ${total_datos[i].pregunta}
                </p>
              </div>
            </div>
          </li>

          <li class="clearfix odd">
            <div class="conversation-text">
              <div class="ctext-wrap" style='background-color: #2C3B5E !important;color: #fff;'>
                <i>INGyTALBot</i>
                <p>
                ${total_datos[i].respuesta}
                </p>
              </div>
            </div>
          </li>
      `;
      $("#conv_hist").html(template);

    }

  })


}