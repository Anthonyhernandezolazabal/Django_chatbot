var url_servidor = '192.168.1.2:8000';

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
var contsl = 1;
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
/*===========================
  TEXTO
=============================*/
let check_inpt3 = document.querySelector("#customRadio3");
check_inpt3.addEventListener("click", () => {
  contsl = 1;
  console.log('customRadio333 :', contsl)
  var textarearpta = `
                    <textarea class="form-control" placeholder="Ingresa aquí la autorespuesta" id="txt_autorpta"  name="txt_autorpta" style="height: 100px"></textarea>
                    <label id='rmlbl01' for="txt_autorpta">Autorespuesta</label>`;
  document.querySelector('#add_chek_txt').innerHTML = textarearpta;
  document.getElementById('rptatit').style.display = "block";
  document.getElementById('add_slider').style.display = "none";

  document.querySelector('.cls_modal').classList.remove("modal-full-width")
  // document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"));
  document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"))
  document.querySelector('#cls_col').className = 'col-lg-10';
})
/*===========================
  SLIDER
=============================*/
let check_inpt4 = document.querySelector("#customRadio4");
check_inpt4.addEventListener("click", () => {

  document.getElementById('add_slider').style.display = "contents";
  console.log("slider :", document.getElementById('add_slider'))
  var sliderHTML = `<div class="accordion" id="accordionExample">
                      <div id='sld01'>
                        <div class="card mb-0 clsSlider">
                          <div class="card-header" id="heading01">
                            <h5 class="m-0">
                              <a class="custom-accordion-title d-block pt-2 pb-2" data-bs-toggle="collapse"
                                href="#collapse01" aria-expanded="true" aria-controls="collapse01">
                                Imágen de Slider #1 <i class="mdi mdi-close-circle-outline" style="margin-left: 15px;font-size: 20px;color: red;"></i>
                              </a>
                            </h5>
                          </div>
                          <div id="collapse01" class="collapse show" aria-labelledby="heading01"
                            data-bs-parent="#accordionExample">
                            <div class="card-body">
                              <div class="mb-3">
                                <div class="row mb-1">
                                  <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                  <div class="col-md-10 col-lg-10 col-xl-10 col-xxl-10 col-sm-12">
                                    <label for="example-fileinput" class="form-label">Cargar Archivo:</label>
                                    <input type="file" id="example-fileinput01" class="form-control imagen">
                                    <h6 class="text-warning">Puedes cargar: Imagen | Video | Audio</h6>
                                  </div>
                                  <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                </div>
                                <div class="row">
                                  <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                  <div class="col-md-10 col-lg-10 col-xl-10 col-xxl-10 col-sm-12">
                                    <label for="example-fileinput" class="form-label">Descripción:</label>
                                    <input type="text" class="form-control mb-2 titulo" id="validationTitulo01" placeholder="Título"
                                      required>
                                    <input type="text" class="form-control descripcion" id="validationDescrip01" placeholder="Descripción"
                                      required>
                                    <br>
                                    
                                    <label for="example-fileinput" class="form-label">Accion:</label>

                                    <div class="mb-2 mt-2" id='add_input_new_action1'>
                                    
                                        <input class="form-control accioninicial" type="text" placeholder="Formular pregunta" id="textaction01" name="textaction01" style='margin-bottom: 15px;'>

                                    </div>

                                    <a style="cursor: pointer" onclick='add_new_accion(this)' attr_cont_total='1' class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                                  
                                  </div>
                                  <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
  document.querySelector('#divSlider').innerHTML = sliderHTML;
  document.querySelector('.cls_modal').className += " modal-full-width"; //Extiendo el modal agregando una clase
  document.querySelector('#cls_col').className = 'col-lg-6';
  document.getElementById('rptatit').style.display = "none";
  document.getElementById("add_chek_txt").removeChild(document.getElementById("txt_autorpta"));
  document.getElementById("add_chek_txt").removeChild(document.getElementById("rmlbl01"));
})
/*===========================
  AGREGAR NUEVA IMAGEN A SLIDER
=============================*/
document.querySelector('#add_slider').addEventListener('click', function () {
  contsl++
  console.log('clickclick :', contsl)
  let contenedorsl = document.querySelector('#accordionExample')
  let sl = document.createElement('div')
  sl.id = "sld0" + contsl;
  sl.innerHTML = `
                      <div class="card mb-0 clsSlider">
                        <div class="card-header" id="heading0${contsl}">
                          <h5 class="m-0">
                            <a class="custom-accordion-title collapsed d-block pt-2 pb-2" data-bs-toggle="collapse"
                              href="#collapse0${contsl}" aria-expanded="false" aria-controls="collapse0${contsl}">
                              Imágen de Slider #${contsl} <i class="mdi mdi-close-circle-outline" style="margin-left: 15px;font-size: 20px;color: red;"></i>
                            </a>
                          </h5>
                        </div>
                        <div id="collapse0${contsl}" class="collapse" aria-labelledby="heading0${contsl}"
                          data-bs-parent="#accordionExample">
                          <div class="card-body">

                            <div class="mb-3">
                              <div class="row mb-2">
                                <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                <div class="col-md-10 col-lg-10 col-xl-10 col-xxl-10 col-sm-12">
                                  <label for="example-fileinput" class="form-label">Cargar Imagen:</label>
                                  <input type="file" id="example-fileinput0${contsl}" class="form-control imagen">
                                </div>
                                <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                              </div>
                              <div class="row">
                                <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                                <div class="col-md-10 col-lg-10 col-xl-10 col-xxl-10 col-sm-12">
                                  <label for="example-fileinput" class="form-label">Descripción:</label>
                                  <input type="text" class="form-control mb-2 titulo" id="validationTitulo0${contsl}" placeholder="Título"
                                    required>
                                  <input type="text" class="form-control descripcion" id="validationDescrip0${contsl}" placeholder="Descripción"
                                    required>

                                    <br>

                                    <label for="example-fileinput" class="form-label">Accion:</label>

                                    <div class="mb-2" id='add_input_new_action${contsl}'>
                                    
                                      <input class="form-control accioninicial" type="text" placeholder="Formular pregunta" id="textaction0${contsl}" name="textaction0${contsl}" style='margin-bottom: 15px;'>

                                    </div>

                                    <a style="cursor: pointer" onclick='add_new_accion(this)' attr_cont_total='${contsl}' class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>

                                </div>
                                <div class="col-md-1 col-lg-1 col-xl-1 col-xxl-1 col-sm-12"></div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>`;
  contenedorsl.append(sl);

  var sldr = document.querySelector(".btn_save");
  sldr.setAttribute("attr_cont_slider", contsl);

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
function myFunction_old() {
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

function myFunction() {
  let id = uuidv4() //generar un id para cada array
  let b = document.querySelector(".btn_save");
  let align = b.getAttribute("attr_cont"); //capturo el atributo en TEXTO que esta inicialmente en cero
  let old_ques = []
  let preguntas = [];
  let est_campos = false;

  micont++; //Contador para la vista conforme se va registrando
  n = -1;
  n2 = 0;
  naction = 0;
  x = 0;
  x2 = 0;

  //WHILE PARA OBTENER LAS N PREGUNTAS
  while (n < align) {
    n++;
    x = +n;
    //Id para las preguntas
    let capId = "question" + x
    let inputValue = document.getElementById(capId).value //Obtener los values de los input 
    if (inputValue != '') {
      est_campos = true
      old_ques.push(inputValue);
    } else {
      est_campos = false
    }
  }
  var seltexto = document.getElementById("customRadio3");
  var selslider = document.getElementById("customRadio4");
  var rptaFinal_texto = []
  // SI EL TIPO DE RESPUESTA ES TEXTO
  if (seltexto.checked == true) {
    let rpta_i = document.getElementById('txt_autorpta').value

    let rpta_all = {
      'tipo': "texto",
      'rpta': rpta_i,
    }

    rptaFinal_texto.push(rpta_all)


    preguntas.push({
      'preguntas_new': old_ques,
      'respuesta_new': btoa(JSON.stringify(rptaFinal_texto)),
      'id': id,
    })
    let id_tmp = preguntas[0].id
    console.log('id_tmp', id_tmp)
    if (est_campos == false) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Es necesario registrar preguntas'
      })
    } else if (rpta_i == '') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Es necesario registrar una respuesta'
      })
    } else {
      agregarLS(preguntas)

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Registrado correctamente'
      })
      $('#full-width-modal').modal('hide');
      $('#form-crear-rpta').trigger('reset');
    }
  } else if (selslider.checked == true) { // SI EL TIPO DE RESPUESTA ES UN SLIDER
    let nslider = document.querySelectorAll('.clsSlider').length; //total de slider imagen
    let slidersall = document.querySelectorAll('.clsSlider') //trae toda las cabeceras
    let respuestas = {};
    let rptaFinal = [];

    slidersall.forEach(sl => {
      let descripcionsl = sl.querySelector('.descripcion').value;
      let titulosl = sl.querySelector('.titulo').value;
      let imgsl = sl.querySelector('.imagen').files[0]['name'];
      let accioninicial = sl.querySelectorAll('.accioninicial')

      respuestas = {
        'tipo': 'slider',
        'img': imgsl,
        'titulo_imagen': titulosl,
        'descripcion': descripcionsl,
        'acciones': []
      }
      rptaFinal.push(respuestas) //BASE 64
      accioninicial.forEach(accion => {
        // console.log('accioninicial :', accion.value)
        respuestas.acciones.push(accion.value);
      });

    });

    preguntas.push({
      'preguntas_new': old_ques,
      'respuesta_new': btoa(JSON.stringify(rptaFinal)),
      'id': id,
    })

    agregarLS(preguntas)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Registrado correctamente'
    })
    $('#full-width-modal').modal('hide');
    $('#form-crear-rpta').trigger('reset');

  } else {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Es necesario registrar datos'
    })


  }

}



/*===========================
  AGREGAR NUEVA ACCION
=============================*/
var conttsld = 0

function add_new_accion(b) {
  conttsld++;
  let a = b.getAttribute("attr_cont_total");
  let contenedor = document.querySelector('#add_input_new_action' + a)
  document.querySelector('#add_slider').setAttribute('attradd_slider', conttsld) //envio el total de acciones para entrar al while
  let p = document.createElement('div')
  p.innerHTML = `
                <div class="row" style='margin-right: 15px;margin-bottom: 15px;'>
                  <div class="col-11">
                    <input class="form-control accioninicial" type="text" placeholder="Formular pregunta" id="textaction${conttsld}" name="textaction${conttsld}">
                  </div>
                  <div class="col-1">
                    <button type="button" id="btn_del" onclick="#" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                  </div>
                </div>`;
  contenedor.append(p);
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
    console.log('json_ls DE JSON :', json_ls)
    var nnn = nombre_json.split(" ").join("_")
    fetch('https://' + url_servidor + '/getjson/?json_rpt=' + json_ls + '&json_nombre=' + nnn + '&id_empresa=' + id_empresa + '&id_usu=' + id_usu, {
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      eliminarLS()
      document.getElementById('btn_sav').style.display = 'none';
      document.getElementById('btn_loader').style.display = 'block';
      // var url_python = '{% url "respuestas" %}?empre_id='+id_empresa
      // location.replace(url_python)
      location.href = "../respuestas/?empre_id=" + id_empresa;
    }).catch(e => {
      console.log(e);
    })
  }
}