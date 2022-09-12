/*=============================================
ENVIO AL APIVIEWS AL VIEWS DEL CHATBOT POR RANGO DE FECHAS
=============================================*/
var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;
var micont = 0
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
    fetch('/historial_fecha/?desde=' + desde + '&hasta=' + hasta + '&id_empresa=' + id_empresa , {
      method: 'GET',
    }).then(rsp => rsp.json()).then(function (response) {
      var total_datos = response;
      var template = ``;
      if (total_datos.length == 0) {
        template += `<h1>SIN RESULTADOS</h1>`
        document.querySelector("#tmp_api").innerHTML = template;
      } else {
        for (let i = 0; i < total_datos.length; i++) {
          let f_h = total_datos[i].registrado
          template += `
            <a href="javascript:ver_conversacion('${total_datos[i].nombre_persona}','${total_datos[i].fecha_historial_chat}');" class="text-body cls_attr">
                <div class="d-flex align-items-start bg-light mt-1 p-2">
                  <button type="button" class="btn btn-danger btn-sm" onclick="delete_cha___t('${total_datos[i].nombre_persona}','${total_datos[i].nombre_persona_sin_alias}')" style="position: absolute;right: 0;padding: 0px;margin-top: -17px;"><i class="mdi mdi-delete"></i> </button>
                  
                  <h1 class="me-2 rounded-circle" height="48">${total_datos[i].nombre_persona.charAt(0).toUpperCase()}</h1>
                  <div class="w-100 overflow-hidden" style="margin: auto;">
                    <h5 class="mt-0 mb-0 font-14">
                      <span class="float-end text-muted font-12 f____ch" attr_hr="${total_datos[i].fecha_historial_chat}">Hora</span>
                      ${total_datos[i].nombre_persona_sin_alias}
                    </h5>
                    <p class="mt-1 mb-0 text-muted font-14">
                      <span class="w-25 float-end text-end ac___all__ch"  attr_nom__b="${total_datos[i].nombre_persona}"></span>
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
)
/*=============================================
MOSTRAR HISTORIAL POR USUARIOS
=============================================*/
function ver_conversacion(alias_nom,fecha) {

  document.getElementById('card_conver').style.display = 'block'


  //Pasará en visto
  fetch('/visto__chat/?alias=' + alias_nom, {
    method: 'GET',
  }).then(rsp => rsp.text()).then(function (rpta_v) {
    ac_all();
  }).catch(e => {
    console.log(e);
  })

  fetch('/obtener_conversacion/?usuario_alias=' + alias_nom, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    var template = ``;
    response.forEach(element => {
      let r______pt = JSON.parse(atob(element.respuesta))
      template += `
      <li class="clearfix">
        <div class="chat-avatar" style="margin-right: 10px;">
          <h1 class="rounded-circle mb-0" height="48">${element.nombre_persona.charAt(0).toUpperCase()}</h1>
          <i>${f____(new Date(fecha))}</i>
        </div>
        <div class="conversation-text">
          <div class="ctext-wrap">
            <i>${element.nombre_persona_sin_alias}</i>
            <p>
            ${element.pregunta}
            </p>
          </div>
        </div>
      </li>`
      
      if(r______pt.respuesta_tipo[0].tipo == "texto"){
        r______pt.respuesta_tipo[0].rpta.forEach(item_rpta => {
          template += `
          <li class="clearfix odd">
              <div class="chat-avatar">
                  <img src="/static/chatbot_admin/assets/images/default.png" alt="dominic" class="rounded">
                  <i>10:05</i>
              </div>
              <div class="conversation-text">
                  <div class="ctext-wrap" style='background-color: #2C3B5E !important;color: #fff;'>
                      <i>ChatBot</i>
                      <p>
                        ${item_rpta.respueta_sl_texto}
                      </p>
                  </div>
              </div>
          </li>`;
        });
      }

      if(r______pt.respuesta_tipo[0].tipo == "slider"){
        micont++


        if ((r______pt.pre_respuesta.pre_rpta).length != 0) {
          template += `
          <li class="clearfix odd">
              <div class="chat-avatar">
                  <img src="/static/chatbot_admin/assets/images/default.png" alt="dominic" class="rounded">
                  <i>10:05</i>
              </div>
              <div class="conversation-text">
                  <div class="ctext-wrap" style='background-color: #2C3B5E !important;color: #fff;'>
                      <i>ChatBot</i>
                      <p>
                        ${r______pt.pre_respuesta.pre_rpta}
                      </p>
                  </div>
              </div>
          </li>`
        }
        template += `
        <li class="clearfix odd">
            <div class="chat-avatar">
                <img src="/static/chatbot_admin/assets/images/default.png" alt="dominic" class="rounded">
                <i>10:05</i>
            </div>
            <div class="conversation-text" style="width: 300px !important;">

              <div id="${alias_nom}-${micont}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner" role="listbox">`

                let arrayElements = r______pt.respuesta_tipo
                const firstElement = arrayElements.find(element => element != undefined);
                template += `
                <div class="carousel-item active">`

                if((firstElement.img).length != 1){
                  template += `<img class="d-block img-fluid" src="/media/${firstElement.img}" alt="Second slide">`
                }
                template += `

                <div style="margin: 15px;">
                    <h5 class="card-title mb-0" style="text-align: left;">${firstElement.titulo_imagen}</h5>
                    <h6 style="text-align: left;">${firstElement.descripcion}</h6>`
                    firstElement.acciones.forEach(r__ow => {
                        template += `<a href="javascript: void(0);" style="width: 100%;" class="btn btn-primary mb-1">${r__ow}</a>`
                    });
                    template += `
                    
                </div>
                </div>`
                let total__sl = r______pt.respuesta_tipo
                for (let n = 1; n < total__sl.length; n++) {
                  const element = total__sl[n];
                  template += `
                  <div class="carousel-item">`

                  if((element.img).length != 1){
                    template += `<img class="d-block img-fluid" src="/media/${element.img}" alt="Second slide">`
                  }
                  template += `
                  <div style="margin: 15px;">
                      <h5 class="card-title mb-0" style="text-align: left;">${element.titulo_imagen}</h5>
                      <h6 style="text-align: left;">${element.descripcion}</h6>`


                      element.acciones.forEach(r__ow => {
                        template += `<a href="javascript: void(0);" style="width: 100%;" class="btn btn-primary mb-1">${r__ow}</a>`
                    });

                      template += `
                  </div>
                  </div>`
                }

        template += `

                </div>`
                if(arrayElements.length !=1 ){
                  template += `
                  <a class="carousel-control-prev" href="#${alias_nom}-${micont}" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#${alias_nom}-${micont}" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </a>
                  `
                }

template += `
              </div>
            </div>
        </li>
        `;
      }

      document.querySelector("#conv_hist").innerHTML = template;
    });

  }).catch(e => {
    console.log(e);
  })



}


function f____(fec){
  let hours = fec.getHours();
  let minutes = fec.getMinutes();
  let secon = fec.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

document.querySelectorAll(".f____ch").forEach(h__r => {
  // Poner la hora que se realizó el chat
  let d = $(h__r).attr("attr_hr")
  $(h__r).html(f____(new Date(d)))
});
ac_all()
function ac_all(){
  document.querySelectorAll(".ac___all__ch").forEach(h__all__r => {
    // Cantidad de chat recibidos sin leer
    let n_om = $(h__all__r).attr("attr_nom__b")
    fetch('/all_chat_ver/?id=' + n_om, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      if(response != "0"){
        $(h__all__r).html(`<span class="badge badge-success-lighten ">${response}</span>`)
      }else{
        $(h__all__r).html(`<span class="badge badge-info-lighten ">Visto</span>`)
      }
      
    })
  });
}

setInterval(ac_all, 3000);

function delete_cha___t(id,nom){
 
  Swal.fire({
    title: '<strong>Eliminar historial con <u>'+nom+'</u></strong>',
    icon: 'info',
    html:
      'No podrá revertir esta acción',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="dripicons-thumbs-up"></i>',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    cancelButtonText:
    '<i class="dripicons-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      fetch('/delete___chat/?id=' + id, {
        method: 'GET',
      }).then(rsp => rsp.text()).then(function (response) {

        if(response == "ChatEliminado") {

          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Historial de '+nom+' eliminado',
            showConfirmButton: false,
            timer: 1500
          }).then(function () {

            location.reload();
            
          })

        }
        console.log("responseresponse :",response)
      })
    }
  })
}
/*=============================================
GENERAR REPORTES POR DATOS DINÁMICOS RECIBIDOS EN EL CHAT
=============================================*/
var contador = 0;
$('input[name="datos_dinamicos"]').daterangepicker({
    locale: {
      format: 'YYYY/MM/DD',
      applyLabel: 'Generar',
      cancelLabel: 'Cancelar',
    }
},
  function (start, end, label) {
    let desd__e = start.format('YYYY-MM-DD');
    let hast__a = end.format('YYYY-MM-DD');
    console.log("response desd__e :",desd__e);
    console.log("response hast__a :",hast__a);

    let id__empresa = empresa_id
    fetch('/historial_fecha/?desde=' + desd__e + '&hasta=' + hast__a + '&id_empresa=' + id__empresa + '', {
      method: 'GET',
    }).then(rsp => rsp.json()).then(function (response) {
      if(response.length != 0){
        let show__rpt_rt2 = "";
        let contall = 0;
        response.forEach(it__ => {
        contall++
        show__rpt_rt2 +=  `
          <tr>
              <td>${contall}</td>`
              if(it__.email_persona == "null" && it__.telefono_persona == "null"){
                console.log("IF 1")
                show__rpt_rt2 +=  `<td><span class="badge bg-primary">Nombre</span></td>`
              }else
              if(it__.email_persona == "null" && it__.telefono_persona != "null"){
                console.log("IF 2")
                show__rpt_rt2 +=  `
                <td>
                  <span class="badge bg-primary">Nombre</span> 
                  <span class="badge bg-info">Teléfono</span>
                </td>`
              }else
              if(it__.telefono_persona == "null" && it__.email_persona != "null"){
                console.log("IF 3")
                show__rpt_rt2 +=  `
                <td>
                  <span class="badge bg-primary">Nombre</span> 
                  <span class="badge bg-success">Correo electrónico</span>
                </td>`
              }else{
                console.log("IF 4")
                show__rpt_rt2 +=  `
                <td>
                  <span class="badge bg-primary">Nombre</span> 
                  <span class="badge bg-success">Correo electrónico</span> 
                  <span class="badge bg-info">Teléfono</span>
                </td>`
              }
              show__rpt_rt2 +=  `
              <td>${it__.nombre_persona_sin_alias}</td>`
              if(it__.email_persona != "null"){
  
                show__rpt_rt2 +=  `<td>${it__.email_persona}</td>`
  
              }else{
  
                show__rpt_rt2 +=  `<td> - </td>`
  
              }
              if(it__.telefono_persona != "null"){
  
                show__rpt_rt2 +=  `<td>${it__.telefono_persona}</td>`
  
              }else{
  
                show__rpt_rt2 +=  `<td> - </td>`
  
              }
              show__rpt_rt2 +=  `
          </tr>
        `;
        contador++
          $("#show__rpt_rt2").html(show__rpt_rt2)
        });
        $("#data__tables").DataTable({
          // paging: false,
          searching: false,   
          language: {
                  "lengthMenu": "Mostrar _MENU_ registros",
                  "zeroRecords": "No se encontraron resultados",
                  "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                  "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                  "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                  "sSearch": "Buscar:",
                  "oPaginate": {
                      "sFirst": "Primero",
                      "sLast":"Último",
                      "sNext":"Siguiente",
                      "sPrevious": "Anterior"
            },
            "sProcessing":"Procesando...",
              },
          //para usar los botones  
          responsive: "true",
          dom: 'Bfrtilp',       
          buttons:[ 
          {
            extend:    'excelHtml5',
            text:      '<i class="mdi mdi-microsoft-excel"></i> ',
            titleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
            title: 'Exportando_excel_desde_'+desd__e+'_hasta_'+hast__a
          },
          {
            extend:    'pdfHtml5',
            text:      '<i class="mdi mdi-file-pdf-outline"></i> ',
            titleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
            title: 'Exportando_pdf_desde_'+desd__e+'_hasta_'+hast__a
          },
          {
            extend:    'print',
            text:      '<i class="dripicons-print"></i> ',
            titleAttr: 'Imprimir',
            className: 'btn btn-info',
            title: 'Exportando_print_desde_'+desd__e+'_hasta_'+hast__a
          },
          ],   
        }); 
        
      }else{
        $("#show__rpt_rt2").html(`<h1>SIN RESULTADOS</h1>`)
      }

    })

})

/*=============================================
EXPORTAR EXCEL
=============================================*/
