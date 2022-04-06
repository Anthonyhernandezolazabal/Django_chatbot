var url_servidor = '192.168.18.23:8000';
/*=============================================
ENVIO AL APIVIEWS AL VIEWS DEL CHATBOT POR RANGO DE FECHAS
=============================================*/
var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;
$('input[name="dates"]').daterangepicker({
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
    fetch('https://'+url_servidor+'/historial_fecha/?desde=' + desde + '&hasta=' + hasta + '&id_empresa=' + id_empresa + '', {
      method: 'GET',
    }).then(rsp => rsp.json()).then(function (response) {
      var total_datos = response;
      var template = ``;

      if (total_datos.length == 0) {
        console.log('response :', total_datos.length)
        template += `<h1>SIN RESULTADOS</h1>`
        document.querySelector("#tmp_api").innerHTML = template;
      } else {
        console.log('response :', total_datos.length)
        for (let i = 0; i < total_datos.length; i++) {
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
          document.querySelector("#tmp_api").innerHTML = template;
        }
      }
    }).catch(e => {
      console.log(e);
    })
  }
);
/*=============================================
MOSTRAR HISTORIAL POR USUARIOS
=============================================*/
function ver_conversacion(alias_nom) {
  document.getElementById('card_conver').style.display = 'block'
  fetch('https://'+url_servidor+'/obtener_conversacion/?usuario_alias=' + alias_nom, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    console.log('response :', response)
    var total_datos = response;
    var template = ``;
    for (let i = 0; i < total_datos.length; i++) {
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
          </li>`;
      document.querySelector("#conv_hist").innerHTML = template;
    }
  }).catch(e => {
    console.log(e);
  })
}