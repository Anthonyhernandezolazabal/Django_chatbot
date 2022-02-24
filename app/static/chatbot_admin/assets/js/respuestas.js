var url_servidor = 'chatbot.demoregistro.xyz';
conversaciones_pyr()
var Ls_rpt = localStorage.getItem('datos')
var id_cliente_id = JSON.parse(Ls_rpt).id_cliente;
var id_empresa_id = JSON.parse(Ls_rpt).id_empresa;
/*=============================================
  AGREGAR MAS PREGUNTAS
=============================================*/
let btn_quest = document.querySelector("#add_quest");
var cont = 0
var micont = 0
btn_quest.addEventListener("click", () => {
  cont++
  let contenedor = document.querySelector('#add_input_new')
  let p = document.createElement('div')
  p.innerHTML = `
    <div class="mb-2 mt-2" id='add_input_new'>
      <div class='row'>
        <div class='col-10'>
          <input class="form-control" type="text" placeholder="Formular pregunta" id="question${cont}" name="question${cont}">
        </div>
        <div class='col-2'>
          <button type="button" id='btn_del' onclick='del_btn(this)' class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
        </div>
      </div>
    </div> `
  contenedor.append(p);
  var b = document.querySelector(".btn_save");
  b.setAttribute("attr_cont", cont);
})
/*== FECHA Y HORA ==*/
function uuidv4() {
  var hoy = new Date();
  var fecha = hoy.getDate() + '' + (hoy.getMonth() + 1);
  var hora = hoy.getMinutes() + '' + hoy.getSeconds();
  var alias_id = fecha + '' + hora;
  return alias_id
}
/*=============================================
  QUITAR PREGUNTAS
=============================================*/
function del_btn(btn) {
  cont--
  'btn :', btn.closest('.mb-2').parentNode.remove()
  // var padre = document.getElementById('del_quest').parentNode.parentNode.parentNode.childNodes;
  var b = document.querySelector(".btn_save");
  b.setAttribute("attr_cont", cont);
}
/*=============================================
  LIMPIA LOCALSTORAGE POR SECCION DE PREGUNTAS
=============================================*/
function quitar_prg(btn) {
  let prg_id = btn.closest('.tmpl').getAttribute('id_prg')
  btn.closest('.tmpl').remove()
  let prg;
  prg = recuperarLS();
  prg.forEach(function (pre, indice) {
    if (pre[0].id === prg_id) {
      prg.splice(indice, 1);
    }
  });
  localStorage.setItem("pregunta", JSON.stringify(prg))
}
/*== TIPO DE RESPUESTA ==*/
let check_inpt3 = document.querySelector("#customRadio3");
check_inpt3.addEventListener("click", () => {
  var x = document.getElementById("add_chek_txt");
  var y = document.getElementById("alert_check");
  let titulo = document.getElementById('rptatit')
  x.style.display = "block";
  y.style.display = "none";
  titulo.style.display = "block";
})
let check_inpt4 = document.querySelector("#customRadio4");
check_inpt4.addEventListener("click", () => {
  var x = document.getElementById("add_chek_txt");
  var y = document.getElementById("alert_check");
  let titulo = document.getElementById('rptatit')
  x.style.display = "none";
  y.style.display = "block";
  titulo.style.display = "none";
})
/*===========================
  VACIAR TODO LOS PRODUCTO DEL LOCASLTORAGE
=============================*/
function eliminarLS() {
  // localStorage.clear(); /*Elimina todo del localstorage */
  localStorage.removeItem('pregunta')
}
/*=============================================
  EVENTO ONCLICK
=============================================*/
function myFunction() {
  let id = uuidv4()
  let b = document.querySelector(".btn_save");
  let align = b.getAttribute("attr_cont");
  let old_ques = []
  let preguntas = [];
  let est_campos = false;
  micont++;
  n = -1;
  x = 0;
  while (n < align) {
    n++;
    x = +n;
    let capId = "question" + x
    let inputValue = document.getElementById(capId).value
    if (inputValue != '') {
      est_campos = true
      old_ques.push(inputValue);
    } else {
      est_campos = false
    }
  }
  let rpta_i = document.getElementById('txt_autorpta').value
  preguntas.push({
    'preguntas_new': old_ques,
    'respuesta_new': rpta_i,
    'id': id
  })
  let id_tmp = preguntas[0].id
  if (est_campos == false) {
    alert('Es necesario registrar preguntas')
  } else if (rpta_i == '') {
    alert('Es necesario registrar una respuesta')
  } else {
    agregarLS(preguntas)
    // $("#form-crear-rpta").trigger('reset');
    // $('#full-width-modal').modal('hide');
    document.getElementById('form-crear-rpta').reset();
    document.getElementById("rptatit").style.display = 'none';
    document.getElementById("add_chek_txt").style.display = 'none';
    template = `
          <div class="card border-secondary border tmpl" id_prg='${id_tmp}'>
            <div class="card-body">
              <div class="dropdown float-end">
                <i onclick='quitar_prg(this)' class="mdi mdi-close-circle" style='color: #c01f1f;cursor:pointer'></i>
              </div>
              <h4 class="header-title mb-3">CONVERSACIÓN N° ${micont}</h4>
              <div data-simplebar="init" style="max-height: 320px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Pregunta</th>
                                  </tr>
                                </thead>
                                <tbody class="simplebar-content-wrapper;">`;
    var arr = preguntas[0].preguntas_new
    arr.forEach(element => {
      template += `<tr><td>${element}</td></tr>`;
    });
    template += `
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
              <div data-simplebar="init" style="max-height: 200px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper" style="height: auto; overflow: hidden scroll;">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Respuesta</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="text-align: justify;">
                                    <td><i class="mdi mdi-format-quote-open font-20"></i> 
                                      <b>
                                        ${rpta_i}
                                      </b> 
                                      <i class="mdi mdi-format-quote-close font-20"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
            </div>
          </div>`;
    var div_rptas = document.querySelector("#lista_template");
    let rpt = document.createElement("div");
    rpt.className = "col-lg-4";
    rpt.innerHTML = template;
    div_rptas.append(rpt)
  }
}
/*===========================
RECUPERAR LAS PREGUNTAS AL LOCAL STORAGE
=============================*/
function recuperarLS() {
  let pregunta;
  if (localStorage.getItem('pregunta') === null) {
    pregunta = [];
  } else {
    pregunta = JSON.parse(localStorage.getItem("pregunta"));
  }
  return pregunta;
}
/*=============================================
  AGREGAR LAS PREGUNTAS AL LOCAL STORAGE
=============================================*/
function agregarLS(preguntas) {
  let pregunta = recuperarLS()
  pregunta.push(preguntas);
  localStorage.setItem("pregunta", JSON.stringify(pregunta));
}
/*=============================================
  MOSTRAR SECCIONES DE PREGUNTAS Y RESPUESTAS
=============================================*/
function conversaciones_pyr() {
  let id = uuidv4()
  let pregunta, cont = 0;
  pregunta = recuperarLS();
  pregunta.forEach(prg => {
    cont++
    template = `
          <div class="card border-secondary border tmpl" id_prg='${prg[0].id}'>
            <div class="card-body">
              <div class="dropdown float-end">
                <i onclick='quitar_prg(this)' class="mdi mdi-close-circle" style='color: #c01f1f;cursor:pointer'></i>
              </div>
              <h4 class="header-title mb-3">CONVERSACIÓN N° ${cont}</h4>
              <div data-simplebar="init" style="max-height: 320px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive" id="divu1">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Pregunta</th>
                                  </tr>
                                </thead>
                                <tbody class="simplebar-content-wrapper;">`;
    for (let i = 0; i < (prg[0]['preguntas_new']).length; i++) {
      template += `<tr><td>${prg[0]['preguntas_new'][i]}</td></tr>`
    }
    template += `             </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
              <div data-simplebar="init" style="max-height: 200px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper" style="height: auto; overflow: hidden scroll;">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Respuesta</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="text-align: justify;">
                                    <td><i class="mdi mdi-format-quote-open font-20"></i> <b>
                                    ${prg[0]['respuesta_new']}
                                        </b> <i
                                        class="mdi mdi-format-quote-close font-20"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
            </div>
          </div>`;
    var div_rptas = document.querySelector("#lista_template");
    let rpt = document.createElement("div");
    rpt.className = "col-lg-4";
    rpt.innerHTML = template;
    div_rptas.append(rpt)
  });
}
/*=============================================
  ENVIO AL VIEWS DE CHATBOT EL NOMBRE Y LAS RESPUESTAS AUTOMATICAS DEL LS
=============================================*/
function rpt_aut_save() {
  preguntas = recuperarLS();
  var nombre_json = document.getElementById('rpta_json_nomb').value
  var id_empresa = id_empresa_id
  var id_usu = id_cliente_id
  if (preguntas.length === 0) {
    alert('No hay respuestas automaticas registradas')
  } else if (nombre_json == '') {
    alert('Debe asignarle un nombre')
  } else {
    var json_ls = JSON.stringify(preguntas);
    console.log('json_ls :', json_ls)
    var nnn = nombre_json.split(" ").join("_")
    fetch('https://' + url_servidor + '/getjson/?json_rpt=' + json_ls + '&json_nombre=' + nnn + '&id_empresa=' + id_empresa + '&id_usu=' + id_usu, {
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      eliminarLS()
      document.getElementById('btn_sav').style.display = 'none'
      document.getElementById('btn_loader').style.display = 'block'
      
      // var url_python = '{% url "respuestas" %}?empre_id='+id_empresa
      // location.replace(url_python)

      location.href = "../respuestas/?empre_id="+id_empresa;
    
    }).catch(e => {


      console.log(e);


    })
  }
}