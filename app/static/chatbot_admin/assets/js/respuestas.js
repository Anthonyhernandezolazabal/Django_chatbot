var estado = false;
var est_campos = false;
var validarcampo__slider = false;
var validar_input_pregunta_save = false; //Campo vacío
var validar_input_respuestas_save = false; //Campo vacío
var validar_antes_registrar = false; //No ha confirmado el registro de guardar slider
var validar__edit__imagen = false; //Que no a dado click en el check de validar slider. Al darle en validar slider pasará a un estado true que significa que a cambiado la imágen
var gener____al = false;
var Ls_rpt = localStorage.getItem('datos')
var id_cliente_id = JSON.parse(Ls_rpt).id_cliente;
var id_empresa_id = JSON.parse(Ls_rpt).id_empresa;
/*
=================================================================================
=================================================================================
              EDITAR POR PREGUNTAS ENTRENADAS
=================================================================================
=================================================================================
*/

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var pr__g = urlParams.get('prg');


if(pr__g != null){
  muestrame__prg(pr__g);

  $("#btn_sav").attr("onclick","rpt_aut_save('Editar')");
  $("#editar______estado").val("Editame");

}else{

  $("#btn_sav").show();
  $("#editar______estado").val("Registrame");

}
function quitarlsrepetidos(i__d){
  let prg = recuperarLS();
  prg.forEach(function (pre, indice) {
    if (pre[0].id === i__d) {
        prg.splice(indice, 1);
    }
  })
  localStorage.setItem("pregunta", JSON.stringify(prg))
}



var estado_ed_reg = $("#editar______estado").val();
if(estado_ed_reg == "Registrame"){
  conversaciones_pyr()
}
/*=============================================
CSRF
=============================================*/
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
      
    }
  }
  return cookieValue;
}
/*=============================================
  AGREGAR MAS PREGUNTAS
=============================================*/
let btn_quest = document.querySelector("#add_quest");
var cont = 0
var micont = 0
var contsl = 1;

/*== AGREGAR MAS PREGUNTAS ==*/
btn_quest.addEventListener("click", () => {
  cont++
  let contenedor = document.querySelector('#add_input_new')
  let p = document.createElement('div')
  p.classList.add('show__inp');
  p.innerHTML = `
    <div class="mb-2 mt-2" id='add_input_new'>
      <div class='row'>
        <div class='col-11 animate__animated animate__bounce'>
          <input class="form-control inputaddpregunta" type="text" placeholder="Formular pregunta">
        </div>
        <div class='col-1 animate__animated animate__bounce'>
          <button type="button" style='margin-left:-15px' id='btn_del' onclick='del_btn(this)' class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
        </div>
      </div>
    </div> `
  contenedor.append(p);
  // var b = document.querySelector(".btn_save");
  // b.setAttribute("attr_cont", cont);
})

/*== FECHA Y HORA ==*/
function fecha_hora() {
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

/*===========================
  TIPO DE RESPUESTA
=============================*/
/*== TEXTO ==*/
let check_inpt3 = document.querySelector("#customRadio3");
check_inpt3.addEventListener("click", () => {
  $("#customRadio3").attr("disabled", true);
  $("#customRadio4").attr("disabled", false);
  contsl = 1;
  var textarearpta = `
      <textarea class="form-control animate__animated animate__headShake texto_autorpta rpta__edit" placeholder="Ingresa aquí la autorespuesta" id="txt_autorpta"  name="txt_autorpta" style="height: 100px"></textarea>
      <label id='rmlbl01' for="txt_autorpta">Autorespuesta</label>
    `;
  document.querySelector('#add_chek_txt').innerHTML = textarearpta;
  document.getElementById('rptatit').style.display = "block";
  document.getElementById('add_slider').style.display = "none";
  document.getElementById('cls_rpta_add').style.display = "block";


  document.getElementById('div_pre_rpta').innerHTML = "";


  document.querySelector('.cls_modal').classList.remove("modal-full-width")
  // document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"));
  document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"))
  document.querySelector('#cls_col').className = 'col-lg-10';


  document.getElementById('pre_respuestatxt').style.display = "none";

})

/*=============================================
  AGREGAR MAS RESPUESTAS
=============================================*/
var cont_rpta = 0
var micont_rpta = 0
var contsl_rpta = 1;

function add_rpta(e) {
  let contenedor = document.querySelector('#add_chek_txt')
  let p = document.createElement('div')
  p.className = "cls_add_rpta form-floating mt-1 mb-1 animate__animated animate__bounce";
  p.innerHTML = `
  <div class="row eliminarrptatext">
    <div class="col-xl-11 col-lg-11 col-md-6 col-sm-6 col-xs-12">
      <div class="form-floating">
        <textarea class="form-control texto_autorpta" placeholder="Respuesta" id="floatingTextarea" style="height: 100px"></textarea>
        <label for="floatingTextarea">Autorrespuesta</label>
      </div>
    </div>
    <div class="col-xl-1 col-lg-1 col-md-6 col-sm-6 col-xs-12" style='margin: auto;'>
      <button type="button" style='margin-left: -15px;'   class="btn btn-danger" onclick="deletedrpta(this)"><i class="mdi mdi-window-close"></i> </button>
    </div>
  </div>
                 `
  contenedor.append(p);
}
/*=============================================
  ELIMINAR RESPUESTAS
=============================================*/
function deletedrpta(e) {
  e.closest('.eliminarrptatext').remove();
}

/*===========================
  SLIDER
=============================*/
let check_inpt4 = document.querySelector("#customRadio4");
check_inpt4.addEventListener("click", () => {

  $("#customRadio3").attr("disabled", false);
  $("#customRadio4").attr("disabled", true);
  if (estado == true) {
    document.getElementById('add_slider').style.display = "contents";
    document.getElementById('cls_rpta_add').style.display = "block";
  } else {
    document.getElementById('add_slider').style.display = "none";
    document.getElementById('cls_rpta_add').style.display = "none";
  }
  document.querySelectorAll('.cls_add_rpta').forEach(div => {
    div.remove() // Si han agregado mas respuestas en slider TEXTO, se eliminarán
  });
  document.querySelector('#div_pre_rpta').innerHTML = `
                  <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12">
                    <h6 class="font-15 mt-4 mb-1 animate__animated animate__backInRight">Pre Respuesta</h6>
                    <div class="form-floating mb-2 mt-1 animate__animated animate__backInRight">
                        <input type="text" class="form-control pre_respuestatxt_add" id="pre_respuestatxt" placeholder="Pre respuesta">
                        <label for="pre_respuestatxt">Pre respuesta</label>
                    </div>
                  </div>`;
  var sliderHTML = `<div class="accordion animate__animated animate__backInLeft" id="accordionExample">
                      <div id='sld01' class='show__slider'>
                        <div class="card mb-0 clsSlider">
                          <div class="card-header" id="heading01">
                            <h5 class="m-0">
                              <a class="custom-accordion-title d-block pt-2 pb-2 s____ld" data-bs-toggle="collapse"
                                href="#collapse01" aria-expanded="true" aria-controls="collapse01">
                                Imágen de Slider #1 
                              </a>
                            </h5>
                          </div>
                          <div id="collapse01" class="collapse show collapse_sld" aria-labelledby="heading01"
                            data-bs-parent="#accordionExample">
                            <form id="form-img" method="post" enctype="multipart/form-data">
                              <div class="card-body ee__i">
                                <div class="mb-3">
                                  <div id="show__img"></div>
                                  <div class="row mb-1">
                                    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12">
                                        <center><button type="button" class="btn btn-sm btn-info" onclick="add__edit__img_save(this)">Cambiar | agregar imágen</button></center>
                                        <div style="display:none;" class="sh_____ow">
                                            <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                                            <input type="file" id="example-fileinput01" name="images2" class="form-control imagen">
                                            <input type='hidden' id='nombre_imagen_bk' value=' '>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action">
                                      <label for="example-fileinput" class="form-label">Descripción:</label>
                                      <div class='row'>
                                        <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                                          <input type="text" class="form-control mb-2 titulo" placeholder="Título" required>
                                        </div>
                                        <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                                          <input type="text" class="form-control descripcion" placeholder="Descripción" required>
                                        </div>
                                      </div>
                                      <label for="example-fileinput" class="form-label">Accion:</label>
                                      <div class="mb-2">
                                          <input class="form-control accioninicial accioninicial__s1" type="text" placeholder="Formular pregunta" id="textaction01" name="textaction01" style='margin-bottom: 15px;'>
                                          <div id="padre__add_new_action">
                                      
                                          </div>
                                      </div>
                                      <a style="cursor: pointer" onclick='add_new_accion(this)' class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                                    </div>
                                  </div>
                                  <center>
                                    <br>
                                    <button type="button" class="btn btn-success" onclick="show_add_slider(this)"><i class="mdi mdi-check-all"></i> </button>
                                  </center>
                                </div>
                              </div>
                            </form>
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
  ELIMINAR ACCION DE SLIDER
=============================*/
function deleteaccionslider(sl) {
  sl.closest('.delaccslider').remove();
}
/*===========================
  AGREGAR NUEVA IMAGEN A SLIDER
=============================*/
document.querySelector('#add_slider').addEventListener('click', function () {
  validar__edit__imagen =false;
  contsl++
  if (estado == true) {
    document.getElementById('add_slider').style.display = "contents";
  }
  document.getElementById('add_slider').style.display = "none";
  let contenedorsl = document.querySelector('#accordionExample')
  let sl = document.createElement('div')
  sl.id = "sld0" + contsl;
  sl.classList.add('show__slider');
  sl.innerHTML = `
                <div class="card mb-0 clsSlider animate__animated animate__backInUp">
                  <div class="card-header" id="heading0${contsl}">
                    <h5 class="m-0">
                      <a class="custom-accordion-title collapsed d-block pt-2 pb-2" data-bs-toggle="collapse"
                        href="#collapse0${contsl}" aria-expanded="true" aria-controls="collapse0${contsl}">
                        Imágen de Slider #${contsl} 
                        <button type="button" onclick="quitar__slider(this)" class="btn btn-danger btn-sm" style='position: absolute;top: 5px;right: 0;'><i class="mdi mdi-window-close"></i> </button>
                      </a>
                    </h5>
                  </div>
                  <div id="collapse0${contsl}" class="collapse show collapse_sld" aria-labelledby="heading0${contsl}"
                    data-bs-parent="#accordionExample">
                    <div class="card-body ee__i">
                      <div class="mb-3">
                      <div id="show__img"></div>
                      <div class="row mb-1">
                        <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12">

                            <center><button type="button" class="btn btn-sm btn-info" onclick="add__edit__img_save(this)">Cambiar | agregar imágen</button></center>
                            <div style="display:none;" class="sh_____ow">
                              <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                              <input type="file" id="example-fileinput0${contsl}" name="images2" class="form-control imagen">
                              <input type='hidden' id='nombre_imagen_bk' value=' '>
                            </div>
                              
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action">
                            <label for="example-fileinput" class="form-label">Descripción:</label>
                              <div class='row'>
                                <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                                  <input type="text" class="form-control mb-2 titulo" placeholder="Título" required>
                                </div>
                                <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                                  <input type="text" class="form-control descripcion" placeholder="Descripción" required>
                                </div>
                              </div>
                              <label for="example-fileinput" class="form-label">Accion:</label>
                              <div class="mb-2">
                                <input class="form-control accioninicial" type="text" placeholder="Formular pregunta" style='margin-bottom: 15px;'>
                                <div id="padre__add_new_action">
                                        
                                </div>
                              </div>
                              <a style="cursor: pointer" onclick='add_new_accion(this)' class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                          </div>
                          <center>
                            <br>
                            <button type="button" class="btn btn-success" onclick="show_add_slider(this)"><i class="mdi mdi-check-all"></i> </button>
                          </center>
                          </form>
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
/*===========================
  VALIDAR AGREGAR SLIDER
=============================*/
function show_add_slider(n) {
  let card = n.closest('.clsSlider') //Todo el card del slider
  var tit = card.querySelector('.titulo').value;
  var des = card.querySelector('.descripcion').value;
  var acci = card.querySelectorAll('.accioninicial');
  var rptaval
  acci.forEach(acval => {
    rptaval = acval.value;
    if (rptaval == '') {
      validarcampo__slider = false; // campos vacios
    } else {
      validarcampo__slider = true
      validar_antes_registrar = true;
    }
  });
  const fileInput = card.querySelectorAll('.imagen')
  var img_nom = fileInput[0]['files'][0]
  if (tit == '' && des == '' && acci == '' && validarcampo__slider == false) {
    gener____al = false;
    $.NotificationApp.send("¡Aviso!", "Hay campos obligatorios", "top-right", "rgba(0,0,0,0.2)", "warning")
  } else if (tit == '' || des == '' || acci == '' || validarcampo__slider == false) {
    gener____al = false;
    if (tit == '') {
      $.NotificationApp.send("¡Aviso!", "Título obligatorio", "top-right", "rgba(0,0,0,0.2)", "warning")
      gener____al = false;
    }
    if (des == '') {
      $.NotificationApp.send("¡Aviso!", "Descripción obligatorio", "top-right", "rgba(0,0,0,0.2)", "warning")
      gener____al = false;
    }
    if (acci == '') {
      $.NotificationApp.send("¡Aviso!", "Acciones obligatorios", "top-right", "rgba(0,0,0,0.2)", "warning")
      gener____al = false;
    }
    if (validarcampo__slider == false) {
      $.NotificationApp.send("¡Aviso!", "Fomular pregunta es obligatorio", "top-right", "rgba(0,0,0,0.2)", "warning")
      gener____al = false;
    }
  } else {
    gener____al = true;
    document.getElementById('add_slider').style.display = "contents";
    card.querySelector('.collapse_sld').classList.remove("show")
    /*=============================================
      ===== GUARDAR IMAGEN EN EL SERVIDOR =====
      Nota: Al enviar la imagen al servidor, ésta le asigna un alias al nombre por si es imagen repetida.
      Es nombre asigando se devuelve como response para ponerlo en un input hidden dicho nombre
      Al momento de GUARDAR , va tomar el nombre que se ha recibido para guardarlo en RESPUESTA en la funcion myFunction_save();
    =============================================*/
    if (img_nom != undefined) {
      var img_lg = fileInput[0]['files'][0];
      console.log(img_lg)
      const formData = new FormData();
      formData.append('file', img_lg);
      fetch('/guardar_img_slider/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        }
      }).then(rsp => rsp.text()).then(function (response) {


        if(validar__edit__imagen == false){
          card.querySelector('#nombre_imagen_bk').value = response
        }

      })
      $.NotificationApp.send("¡Aviso!", "Registrado con imágen", "top-right", "rgba(0,0,0,0.2)", "success")
    } else {
      $.NotificationApp.send("¡Aviso!", "Registrado sin imágen", "top-right", "rgba(0,0,0,0.2)", "success")
    }
  }
}
/*=============================================
  EVENTO ONCLICK
=============================================*/
function myFunction_save() {

  let obtener__id_ls = $("#editar______ls").val()

  let old_ques = [] //Preguntas
  var respuesta_slider_texto = [] //Respuestas tipo texto
  var rpta_ls_tipo = []
  let id = fecha_hora() //generar un id para cada array
  let preguntas = [];
  var seltexto = document.getElementById("customRadio3");
  var selslider = document.getElementById("customRadio4");
  let inputpreguntas = document.querySelectorAll('.inputaddpregunta');


  inputpreguntas.forEach(inputs => {
    var valinput = inputs.value; //Obtengo los values de los inputs en total
    if (valinput == '') {
      validar_input_pregunta_save = false;
    } else {
      old_ques.push(encodeURIComponent(valinput));
      validar_input_pregunta_save = true;
    }
  });
  if (validar_input_pregunta_save == true) {
    /*=============================================
      TEXTO
    =============================================*/
    if (seltexto.checked == true) {
      // Obtener texto ingresado en los input de respuesta
      document.querySelectorAll('.texto_autorpta').forEach(rpta_all_all => {
        var respuestas_all = rpta_all_all.value
        if (respuestas_all == '') {
          validar_input_respuestas_save = false
        } else {
          validar_input_respuestas_save = true
          rpta_json = {
            'respueta_sl_texto': JSON.stringify(encodeURIComponent(respuestas_all))
          }
          respuesta_slider_texto.push(rpta_json)
        }
      });

      if (validar_input_respuestas_save == true) {
        let rpta_all = {
          'tipo': "texto",
          'rpta': respuesta_slider_texto,
        }
        rpta_ls_tipo.push(rpta_all)

        rptaFinal_texto = {
          'respuesta_tipo': rpta_ls_tipo
        }
        preguntas.push({
          'preguntas_new': old_ques,
          'respuesta_new': btoa(JSON.stringify(rptaFinal_texto)),
          'respuesta_ls': rptaFinal_texto,
          'id': id,
        })
        if(obtener__id_ls.length == 0){
          //AGREGÓ AL LOCALSTORAGE
          agregarLS(preguntas);
        }else{
          let ls = JSON.parse(localStorage.getItem("pregunta"))
          ls.forEach(function (pregunta, indice) {
            if (pregunta[0].id === obtener__id_ls) {
              // console.log("LS :",ls[0][0].preguntas_new)

              pregunta[0].preguntas_new = old_ques;
              pregunta[0].respuesta_ls = rptaFinal_texto;
              pregunta[0].respuesta_new = btoa(JSON.stringify(rptaFinal_texto));
              localStorage.setItem('pregunta', JSON.stringify(ls))
            }
          })

          let probar_div = document.querySelector(".d___v"+obtener__id_ls);
          let __ediiit_prg = probar_div.querySelector(".sh__ow_prg")
          let __ediiit_rpta = probar_div.querySelector(".rpt_____a")
          $(__ediiit_prg).html("")
          $(__ediiit_rpta).html("")
          let l_______s2 = preguntas;
          l_______s2[0].preguntas_new.forEach(el__ents => {
            $(__ediiit_prg).append(
                        `<div class="timeline-item mb-2">
                          <i class="dripicons-question bg-info-lighten text-info timeline-icon"></i>
                          <div class="timeline-item-info">
                            <a href="#" class="text-info fw-bold d-block">${decodeURIComponent(el__ents)}</a>
                          </div>
                        </div>`)
          });
          l_______s2[0].respuesta_ls.respuesta_tipo[0].rpta.forEach(elem____ent => {
            $(__ediiit_rpta).append(`<p class="mb-0">${decodeURIComponent(elem____ent.respueta_sl_texto)}</p><hr style="margin-top: 7px;margin-bottom: 7px;">`)
          });
        }
        $('#form-crear-rpta').trigger('reset');
        $('#full-width-modal').modal('hide');
        document.getElementById('add_chek_txt').innerHTML = "";
        document.getElementById('rptatit').style.display = "none";
        document.getElementById('cls_rpta_add').style.display = "none";
        $.NotificationApp.send("¡Aviso!", "Registrado correctamente!", "top-right", "rgba(0,0,0,0.2)", "success");
        $("#customRadio3").attr("disabled", false);
        $("#customRadio4").attr("disabled", false);
        
        let l_______s = recuperarLS()
        cont++
        l_______s.forEach(function (pregunta, indice) {
          if (pregunta[0].id === preguntas[0].id) {
            // console.log("LS :",ls[0][0].preguntas_new)

            template = `
                        <div class="col-lg-4 padre__all d___v${pregunta[0].id}">
                          <div class="card">`
            if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
              template += `<div class="card-body rptacls">`;
            }
            if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider') {
              template += `<div class="card-body" style='height: 470px;'>`;
            }
            template += `
                              <div class="dropdown float-end">
                                <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i class="mdi mdi-dots-vertical"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a href="javascript:void(0);" onclick="editar__ls('${pregunta[0].id}',this)" data-bs-toggle="modal" data-bs-target="#full-width-modal" class="dropdown-item">Editar</a>
                                  <a href="javascript:void(0);" onclick="lsdeleted(this,'${pregunta[0].id}')" class="dropdown-item">Eliminar</a>
                                </div>
                              </div>
                              <h4 class="header-title mb-2">PREGUNTAS N° ${cont}</h4>
                              <div data-simplebar="" style="max-height: 385px;">`

                              if(pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider'){

                                template += `
                                <h5 class="card-title mb-2 mt-2 pre____rpt__a">${decodeURIComponent(pregunta[0].respuesta_ls.pre_respuesta.pre_rpta)}</h5>`

                              }
            if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
              template += ` 
                                  <div class="timeline-alt pb-0 sh__ow_prg">`
              pregunta[0].preguntas_new.forEach(pre__text => {
                template += `
                                          <div class="timeline-item mb-2">
                                            <i class="dripicons-question bg-info-lighten text-info timeline-icon"></i>
                                            <div class="timeline-item-info">
                                              <a href="#" class="text-info fw-bold d-block">${decodeURIComponent(pre__text)}</a>
                                            </div>
                                          </div>`
              });
              template += `
                                  </div>`
            }
            if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == "slider") {
              pregunta[0].respuesta_ls.respuesta_tipo.forEach(sl__item => {
                template += `
                                    
                                    `
    
                if (sl__item.img != " ") {
    
                  template += `<img class="card-img-top" src="/media/${sl__item.img}" alt="Card image cap">`
    
                }
    
                template += `
                                        <div style="margin: 15px;">
                                            <h5 class="card-title mb-0">${decodeURIComponent(sl__item.titulo_imagen)}</h5>
                                            <h6>${decodeURIComponent(sl__item.descripcion)}</h6>`
                sl__item.acciones.forEach(acc => {
                  template += `<a href="javascript: void(0);" style='width: 100%;' class="btn btn-primary mb-3">${acc}</a>`
                });
                template += `
                                        </div>
                                    </div>`
              });
            }
            template += `
                              </div>
                            </div>`
    
            if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
              template += `                   
                              <div class="list-group">
                                  <a href="javascript:void(0);" class="list-group-item list-group-item-action active" style="height: 180px;overflow-y: auto;border-radius: 0;">
                                      <div class="d-flex w-100 justify-content-between mb-2">
                                          <small>${pregunta[0].respuesta_ls.respuesta_tipo[0].rpta.length} respuestas</small>
                                      </div> <div class="rpt_____a">`
    
              pregunta[0].respuesta_ls.respuesta_tipo[0].rpta.forEach(rr_r => {
    
                template += `<p class="mb-0">${JSON.parse(decodeURIComponent(rr_r.respueta_sl_texto))}</p> <hr style="margin-top: 7px;margin-bottom: 7px;"> `
    
              });
              template += ` 
                                </div>
                                  </a>
                              </div>`
            }
            template += `
                          </div>
                        </div>`;
            
            $('#lista_template').append(template)
          }
        })
        
        document.querySelectorAll('.show__inp').forEach(div => {
          div.remove();
        })

      } else {
        $.NotificationApp.send("¡Aviso!", "Es necesario registrar respuestas", "top-right", "rgba(0,0,0,0.2)", "warning")
      }

    } else
      /*=============================================
        SLIDER
      =============================================*/
      if (selslider.checked == true) { // SI EL TIPO DE RESPUESTA ES UN SLIDER
      
        if (gener____al == true) {

          let respuestas = {};
          var rpta_slider_ls = []
          var rptaFinal;

          let slidersall = document.querySelectorAll('.clsSlider') //trae toda las cabeceras
          let pre_rpta_add = document.getElementById('pre_respuestatxt').value

          slidersall.forEach(sl => {
            var descripcionsl = sl.querySelector('.descripcion').value;
            var titulosl = sl.querySelector('.titulo').value;
            var nombre_imgl = sl.querySelector('#nombre_imagen_bk').value;

            let accioninicial = sl.querySelectorAll('.accioninicial')

            respuestas = {
              'tipo': 'slider',
              'img': nombre_imgl,
              'titulo_imagen': encodeURIComponent(titulosl),
              'descripcion': encodeURIComponent(descripcionsl),
              'acciones': []
            }
            rpta_slider_ls.push(respuestas)
            pre_respuesta = {
              'pre_rpta': encodeURIComponent(pre_rpta_add)
            }
            rptaFinal = {
              'respuesta_tipo': rpta_slider_ls,
              'pre_respuesta': pre_respuesta,
            } //BASE 64
            accioninicial.forEach(accion => {
              console.log("accion :",accion)
              respuestas.acciones.push(encodeURIComponent(accion.value));
            });
          })
          preguntas.push({
            'preguntas_new': old_ques,
            'respuesta_new': btoa(JSON.stringify(rptaFinal)),
            'respuesta_ls': rptaFinal,
            'id': id,
          })

          if(obtener__id_ls.length == 0){
            //AGREGÓ AL LOCALSTORAGE
            agregarLS(preguntas);
          }else{
            let ls = JSON.parse(localStorage.getItem("pregunta"))
            ls.forEach(function (pregunta, indice) {
              if (pregunta[0].id === obtener__id_ls) {
  
                pregunta[0].preguntas_new = old_ques;
                pregunta[0].respuesta_ls = rptaFinal;
                pregunta[0].respuesta_new = btoa(JSON.stringify(rptaFinal));
                localStorage.setItem('pregunta', JSON.stringify(ls))

              }
            })

            let l_______sldr = preguntas;
            let probar_div = document.querySelector(".d___v"+obtener__id_ls);
            let __ediiit_rpta = probar_div.querySelector(".rp_______ta_sld")
            let __pre____rpt__a_rpta = probar_div.querySelector(".pre____rpt__a")
            $(__pre____rpt__a_rpta).html(decodeURIComponent(l_______sldr[0].respuesta_ls.pre_respuesta.pre_rpta))
            
            $(__ediiit_rpta).html("")
            l_______sldr[0].respuesta_ls.respuesta_tipo.forEach(r__p__t__a => {
              var tttt_plat = `
              <div class="card d-block">`
                if((r__p__t__a.img).length != 1){
                  tttt_plat += `<img class="card-img-top" src="/media/${r__p__t__a.img}" alt="Card image cap"> `;
                }
                tttt_plat += `
                  <div style="margin: 15px;">
                      <h5 class="card-title mb-0">${decodeURIComponent(r__p__t__a.titulo_imagen)}</h5>
                      <h6>${decodeURIComponent(r__p__t__a.descripcion)}</h6>`
                      r__p__t__a.acciones.forEach(elem__en_t => {
                        tttt_plat +=`<a href="javascript: void(0);" style="width: 100%;" class="btn btn-primary mb-1">${decodeURIComponent(elem__en_t)}</a>`
                      });
                      tttt_plat +=
                      ` 
                  </div>
              </div>`
              $(__ediiit_rpta).append(tttt_plat)
            });





          }

          $.NotificationApp.send("¡Aviso!", "Registrado correctamente!", "top-right", "rgba(0,0,0,0.2)", "success")
          $('#form-crear-rpta').trigger('reset');
          $('#full-width-modal').modal('hide');
          $("#customRadio3").attr("disabled", false);
          $("#customRadio4").attr("disabled", false);
          document.querySelector('.cls_modal').classList.remove("modal-full-width")
          // document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"));
          document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"))
          document.querySelector('#cls_col').className = 'col-lg-10';

          var rpta__pregunta = preguntas;
          cont++
          template = `
                    <div class="col-lg-4 padre__all d___v${rpta__pregunta[0].id}">
                      <div class="card">`
          if (rpta__pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
            // console.log('aa :', rpta__pregunta[0].id)
            template += `<div class="card-body rptacls">`;
          }
          if (rpta__pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider') {
            template += `<div class="card-body" style='height: 470px;'>`;
          }
          template += `
                          <div class="dropdown float-end">
                            <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="mdi mdi-dots-vertical"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <a href="javascript:void(0);" onclick="editar__ls('${rpta__pregunta[0].id}',this)" data-bs-toggle="modal" data-bs-target="#full-width-modal" class="dropdown-item">Editar</a>
                              <a href="javascript:void(0);" onclick="lsdeleted(this,'${rpta__pregunta[0].id}')" class="dropdown-item">Eliminar</a>
                            </div>
                          </div>
                          <h4 class="header-title mb-2">PREGUNTAS N° ${cont}</h4>
                          <div data-simplebar="" style="max-height: 385px;">`

                          if(rpta__pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider'){

                            template += `
                            <h5 class="card-title mb-2 mt-2 pre____rpt__a">${decodeURIComponent(rpta__pregunta[0].respuesta_ls.pre_respuesta.pre_rpta)}</h5>`

                          }

                          template += `
                          <div class="rp_______ta_sld">
                          `
          if (rpta__pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
            template += ` 
                              <div class="timeline-alt pb-0 sh__ow_prg">`

            rpta__pregunta[0].preguntas_new.forEach(pre__text => {
              template += `
                                      <div class="timeline-item mb-2">
                                        <i class="dripicons-question bg-info-lighten text-info timeline-icon"></i>
                                        <div class="timeline-item-info">
                                          <a href="#" class="text-info fw-bold d-block">${decodeURIComponent(pre__text)}</a>
                                        </div>
                                      </div>`
            });
            template += `
                              </div>`
          }
          if (rpta__pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == "slider") {
            rpta__pregunta[0].respuesta_ls.respuesta_tipo.forEach(sl__item => {
              template += `
                                
                                <div class="card d-block">
                                
                                `

              if (sl__item.img != " ") {

                template += `<img class="card-img-top" src="/media/${sl__item.img}" alt="Card image cap">`

              }

              template += `
                                    <div style="margin: 15px;">
                                        <h5 class="card-title mb-0">${decodeURIComponent(sl__item.titulo_imagen)}</h5>
                                        <h6>${decodeURIComponent(sl__item.descripcion)}</h6>`
              sl__item.acciones.forEach(acc => {
                template += `<a href="javascript: void(0);" style='width: 100%;' class="btn btn-primary mb-3">${decodeURIComponent(acc)}</a>`
              });
              template += `
                                    </div>
                                </div>`
            });
          }
          template += `
                          </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>`;

          if(obtener__id_ls.length == 0){
            $('#lista_template').append(template)
          }
          // var div_rptas = document.querySelector("#lista_template");
          // let rpt = document.createElement("div");
          // rpt.className = "col-lg-4";
          // rpt.innerHTML = template
          // div_rptas.append(rpt)
          document.querySelectorAll('.show__inp').forEach(div => {
            div.remove()
          });
          $("#div_pre_rpta").html("")
        } else {
          $.NotificationApp.send("¡Aviso!", "Confirme registro de Slider", "top-right", "rgba(0,0,0,0.2)", "warning")
        }
      } else {
        $.NotificationApp.send("¡Aviso!", "Seleccione un Tipo de respuesta", "top-right", "rgba(0,0,0,0.2)", "warning")
      }
  } else {
    $.NotificationApp.send("¡Aviso!", "Es necesario registrar preguntas", "top-right", "rgba(0,0,0,0.2)", "warning")
  }

}
/*===========================
  AGREGAR NUEVA 
=============================*/
function add_new_accion(e) {
  let a__a = e.closest('.add_input_new_action')
  let htmlacc = `
  <div class="row delaccslider" style='margin-right: 15px;margin-bottom: 15px;'>
    <div class="col-11 animate__animated animate__bounce">
      <input class="form-control accioninicial" type="text" placeholder="Formular pregunta">
    </div>
    <div class="col-1 animate__animated animate__bounce">
      <button type="button" onclick="deleteaccionslider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
    </div>
  </div>`;
  let t__his = a__a.querySelector("#padre__add_new_action");
  $(t__his).append(htmlacc);
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
  let pregunta, cont = 0;
  pregunta = recuperarLS();
  // console.log('pregunta :',pregunta)
  pregunta.forEach(prg => {
    // console.log('pregunta :',prg[0].respuesta_ls.respuesta_tipo[0].tipo)
    cont++
    template = `
              <div class="col-lg-4 padre__all d___v${prg[0].id}">
                <div class="card">`
    if (prg[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
      // console.log('aa :', prg[0].id)
      template += `<div class="card-body rptacls">`;
    }
    if (prg[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider') {
      template += `<div class="card-body" style='height: 470px;'>`;
    }
    template += `
                  
                    <div class="dropdown float-end">
                      <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="mdi mdi-dots-vertical"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a href="javascript:void(0);" onclick="editar__ls('${prg[0].id}',this)" data-bs-toggle="modal" data-bs-target="#full-width-modal" class="dropdown-item">Editar</a>
                        <a href="javascript:void(0);" onclick="lsdeleted(this,'${prg[0].id}')" class="dropdown-item">Eliminar</a>
                      </div>
                    </div>
                    <h4 class="header-title mb-2">PREGUNTAS N° ${cont}</h4>
                
                    <div data-simplebar="" style="max-height: 385px;">`
                    
                    if(prg[0].respuesta_ls.respuesta_tipo[0].tipo == 'slider'){
                      template += `<h5 class="card-title mb-2 mt-2 pre____rpt__a">${decodeURIComponent(prg[0].respuesta_ls.pre_respuesta.pre_rpta)}</h5>`
                    }

                    template += `
                    <div class="rp_______ta_sld">
                    `

    if (prg[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
      template += ` 
                        <div class="timeline-alt pb-0 sh__ow_prg">`

      prg[0].preguntas_new.forEach(pre__text => {
        template += `
                                <div class="timeline-item mb-2">
                                  <i class="dripicons-question bg-info-lighten text-info timeline-icon"></i>
                                  <div class="timeline-item-info">
                                    <a href="#" class="text-info fw-bold d-block">${decodeURIComponent(pre__text)}</a>
                                  </div>
                                </div>`
      });
      template += `
                        </div>`
    }

    if (prg[0].respuesta_ls.respuesta_tipo[0].tipo == "slider") {
      prg[0].respuesta_ls.respuesta_tipo.forEach(sl__item => {
        template += `
                          <div class="card d-block">
                          `
        if (sl__item.img != " ") {
          template += `
                            <img class="card-img-top" src="/media/${sl__item.img}" alt="Card image cap">`
        }
        template += `
                              <div style="margin: 15px;">
                                  <h5 class="card-title mb-0">${decodeURIComponent(sl__item.titulo_imagen)}</h5>
                                  <h6>${decodeURIComponent(sl__item.descripcion)}</h6>`
        sl__item.acciones.forEach(acc => {
          template += `<a href="javascript: void(0);" style='width: 100%;' class="btn btn-primary mb-1">${decodeURIComponent(acc)}</a>`
        });
        template += `
                              </div>
                          </div>`
      });
    }
    template += `
                    </div>
                  </div>
                  </div>`

    if (prg[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {

      template += `                   
                    <div class="list-group">
                        <a href="javascript:void(0);" class="list-group-item list-group-item-action active" style="height: 180px;overflow-y: auto;border-radius: 0;">
                            <div class="d-flex w-100 mb-1 justify-content-between mb-2">
                                <small>${prg[0].respuesta_ls.respuesta_tipo[0].rpta.length} respuestas</small>
                            </div>
                            <div class="rpt_____a">`
      prg[0].respuesta_ls.respuesta_tipo[0].rpta.forEach(rr_r => {
        console.log()
        // template += `<p class="mb-0">${decodeURIComponent(JSON.parse(rr_r.respueta_sl_texto))}</p> <hr style="margin-top: 7px;margin-bottom: 7px;"> `
        template += `<p class="mb-0">${JSON.parse(decodeURIComponent(rr_r.respueta_sl_texto))}</p> <hr style="margin-top: 7px;margin-bottom: 7px;"> `


      });
      template += `
                    </div>
                        </a>
                    </div>`
    }
    template += `
                </div>
              </div>`;

    $('#lista_template').append(template)

    // var div_rptas = document.querySelector("#lista_template");
    // let rpt = document.createElement("div");
    // rpt.className = "col-lg-4";
    // rpt.innerHTML = template
    // div_rptas.append(rpt)
  });
}
/*=============================================
  ENVIO AL VIEWS DE CHATBOT EL NOMBRE Y LAS RESPUESTAS AUTOMATICAS DEL LS
=============================================*/
function rpt_aut_save(a) {
  let query___String = window.location.search;
  var url__Params = new URLSearchParams(query___String);
  var pr____g = url__Params.get('prg');
  preguntas = recuperarLS();
  var nombre_json = document.getElementById('rpta_json_nomb').value
  var nombre_d_db = $("#name__org").val()

  var id_empresa = id_empresa_id
  var id_usu = id_cliente_id
  if (preguntas.length === 0) {
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
      icon: 'warning',
      title: 'No hay respuestas registradas'
    })
  } else if (nombre_json == '') {
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
      icon: 'warning',
      title: 'Debe asignarle un nombre'
    })
  } else {
    mostrar_loader('entrenar_chatbot');
    var json_ls = JSON.stringify(preguntas);
    var nnn = nombre_json.split(" ").join("_")
    document.getElementById('btn_sav').style.display = 'none';
    document.getElementById('btn_loader').style.display = 'block';

    console.log("ENVIANDO DATOS:",preguntas)
    console.log("ENVIANDO a:",a)


      fetch('/getjson/?json_rpt=' + json_ls + '&json_nombre=' + nnn + '&nombre_bd=' + nombre_d_db + '&id_empresa=' + id_empresa + '&id_usu=' + id_usu + '&estado=' + a + '&id_registro=' + pr____g, {
        method: 'GET',
      }).then(function (response) {
        eliminarLS()
        // var url_python = '{% url "respuestas" %}?empre_id='+id_empresa
        // location.replace(url_python)
        location.href = "../respuestas/?i=" + (randomCoding().toString() + id_empresa +  randomCoding().toString())
        cerrar_loader('exito_entreno');
      }).catch(e => {
        cerrar_loader('error_entreno');
        console.log(e);
      })

  }
}


function mostrar_loader(mensaje) {
  var texto = null;
  var mostrar = false;
  switch (mensaje) {
      case 'entrenar_chatbot':
          texto = 'Entrenando ChatBot, por favor espere...';
          mostrar = true;
          break;
  }
  if (mostrar) {
  Swal.fire({
      title: 'Entrenando',
      html: texto,
      timerProgressBar: true,
      didOpen: () => {
          Swal.showLoading()
              const content = Swal.getContent()
              if (content) {
                  const b = content.querySelector('b')
                  b.textContent = Swal.getTimerLeft()
              }
      },
  })
  }
}
function cerrar_loader(mensaje) {
    var texto = null;
    var mostrar = false;
    var tipo = null;
    switch (mensaje) {
        case 'exito_entreno':
            tipo = 'success';
            texto = 'Entrenamiento exitoso';
            mostrar = true;
            break;
        case 'error_entreno':
            tipo = 'error';
            texto = 'Ocurrió un error en el entrenamiento, por favor intente nuevamente.';
            mostrar = true;
            break;
        default:
            Swal.close();
            break;
    }

    if (mostrar) {

        Swal.fire({
            position: 'top-center',
            icon: tipo,
            title: texto,
            showConfirmButton: false,
            timer: 1500
        })

    }
}


//-------------------------------- SLIDER HOME --------------------------------
function fntExecuteSlide(side, objeto) {
  // let parentTarget = document.getElementById('slider');
  let slider = objeto.closest('#container-slider').querySelector('#slider');
  let elements = slider.getElementsByTagName('li');
  let curElement, nextElement;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].style.opacity == 1) {
      curElement = i;
      break;
    }
  }
  if (side == 'prev' || side == 'next') {

    if (side == "prev") {
      nextElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
    } else {
      nextElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
    }
  } else {
    nextElement = side;
    side = (curElement > nextElement) ? 'prev' : 'next';
  }
  elements[curElement].style.opacity = 0;
  elements[curElement].style.zIndex = 0;
  elements[nextElement].style.opacity = 1;
  elements[nextElement].style.zIndex = 1;
}
/*===========================
  ELIMINAR TODO EL SLIDER
=============================*/
function quitar__slider(e) {

  Swal.fire({
    title: '¿Eliminar?',
    text: "No podrá revetir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      e.closest('.show__slider').remove()
      document.getElementById('add_slider').style.display = "contents";
      contsl--
      $.NotificationApp.send("¡Aviso!", "Eliminado correctamente!", "top-right", "rgba(0,0,0,0.2)", "error")
    }
  })


}
/*===========================
  ELIMINAR CONVERSACIÓN GUARDADA EN EL LOCALSTORAGE
=============================*/
function lsdeleted(e, id) {
  Swal.fire({
    title: '¿Eliminar?',
    text: "No podrá revetir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {

      let ls_del;
      ls_del = recuperarLS();
      ls_del.forEach(function (pregunta, indice) {
        if (pregunta[0].id === id) {
          ls_del.splice(indice, 1);
          e.closest('.padre__all').remove()
        }
      });
      localStorage.setItem("pregunta", JSON.stringify(ls_del));
      $.NotificationApp.send("¡Aviso!", "Eliminado correctamente!", "top-right", "rgba(0,0,0,0.2)", "error")
    }
  })
}
/*===========================
  EDITAR CONVERSACIÓN POR LOCALSTORAGE
=============================*/
function editar__ls(id,t) {
  let padre = t.closest(".d___v"+id)
  gener____al = true;
  validar__edit__imagen = true
  $("#editar______ls").val(id);
  let ls_edit;
  ls_edit = recuperarLS();
  ls_edit.forEach(function (pregunta, indice) {
    if (pregunta[0].id === id) {

      if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == 'texto') {
        document.getElementById('customRadio3').click();


        $('.uniq_prg').val(decodeURIComponent(pregunta[0].preguntas_new[0])) //Obtengo el primer val

        //PREGUNTAS
        let ing__text = pregunta[0].preguntas_new
        for (let e = 1; e < ing__text.length; e++) {
          const element = ing__text[e];
          let contenedor = document.querySelector('#add_input_new')
          let p = document.createElement('div')
          p.classList.add('show__inp');
          p.innerHTML = `
            <div class="mb-2 mt-2" id='add_input_new'>
              <div class='row'>
                <div class='col-11 animate__animated animate__bounce'>
                  <input class="form-control inputaddpregunta" type="text" placeholder="Formular pregunta" value="${decodeURIComponent(element)}">
                </div>
                <div class='col-1 animate__animated animate__bounce'>
                  <button type="button" style='margin-left:-15px' id='btn_del' onclick='del_btn(this)' class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                </div>
              </div>
            </div> `
          contenedor.append(p);
        }


        if (ing__text.length == 1) {
          document.querySelectorAll('.show__inp').forEach(div => {
            div.remove()
          });
        }

        $('.rpta__edit').val(decodeURIComponent(pregunta[0].respuesta_ls.respuesta_tipo[0].rpta[0].respueta_sl_texto)) //Obtengo el primer val
        //RESPUESTAS 
        let total = pregunta[0].respuesta_ls.respuesta_tipo[0].rpta;
        for (i = 1; i < total.length; i++) {
          let contenedor = document.querySelector('#add_chek_txt')
          let p = document.createElement('div')
          p.className = "cls_add_rpta form-floating mt-1 mb-1 animate__animated animate__bounce";
          p.innerHTML = `
          <div class="row eliminarrptatext">
            <div class="col-xl-11 col-lg-11 col-md-6 col-sm-6 col-xs-12">
              <div class="form-floating">
                <textarea class="form-control texto_autorpta" placeholder="Respuesta" id="floatingTextarea" style="height: 100px">${decodeURIComponent(total[i].respueta_sl_texto)}</textarea>
                <label for="floatingTextarea">Autorrespuesta</label>
              </div>
            </div>
            <div class="col-xl-1 col-lg-1 col-md-6 col-sm-6 col-xs-12" style='margin: auto;'>
              <button type="button" style='margin-left: -15px;'   class="btn btn-danger" onclick="deletedrpta(this)"><i class="mdi mdi-window-close"></i> </button>
            </div>
          </div>`
          contenedor.append(p);
        }

        $("#customRadio4").attr("disabled", true);
        // $("#customRadio4").attr("disabled", true);


      }

      if (pregunta[0].respuesta_ls.respuesta_tipo[0].tipo == "slider") {


        // padre.querySelector(".pre_respuestatxt_add").value = 


        document.getElementById('customRadio4').click();
        document.getElementById('add_slider').style.display = "contents";
        let arrayElements = pregunta[0].preguntas_new
        const firstElement = arrayElements.find(element => element != undefined);
        $('.uniq_prg').val(decodeURIComponent(firstElement)) //Obtengo el primer val
        let total__sl = pregunta[0].preguntas_new;
        for (let e = 1; e < total__sl.length; e++) {
          const element__sl = total__sl[e];
          let contenedor = document.querySelector('#add_input_new')
          let p = document.createElement('div')
          p.classList.add('show__inp');
          p.innerHTML = `
            <div class="mb-2 mt-2" id='add_input_new'>
              <div class='row'>
                <div class='col-11 animate__animated animate__bounce'>
                  <input class="form-control inputaddpregunta" type="text" placeholder="Formular pregunta" value="${decodeURIComponent(element__sl)}">
                </div>
                <div class='col-1 animate__animated animate__bounce'>
                  <button type="button" style='margin-left:-15px' id='btn_del' onclick='del_btn(this)' class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                </div>
              </div>
            </div> `
          contenedor.append(p);
        }

        //Primer Slider
        var slrptaaa = pregunta[0].respuesta_ls.respuesta_tipo[0];
        $(".titulo").val(decodeURIComponent(slrptaaa.titulo_imagen))
        $(".descripcion").val(decodeURIComponent(slrptaaa.descripcion))
        $('#nombre_imagen_bk').val(slrptaaa.img)
        if (slrptaaa.img != "") {
          $("#show__img").html(`<img src="/media/${slrptaaa.img}" alt="image" class="img-fluid mb-1" style="width: auto;height: auto;">`)
        }
        if (slrptaaa.img == " ") {
          $("#show__img").html(``);
        }

        let aaa__c = slrptaaa.acciones;
        console.log("AAAAAAAAAAAAAAAAAAA :",pregunta[0])
        $('.accioninicial__s1').val(decodeURIComponent(slrptaaa.acciones[0]))
        for (let i = 1; i < aaa__c.length; i++) {
          const elem___ent = aaa__c[i];
          let htmlacc = `
          <div class="row delaccslider" style='margin-right: 15px;margin-bottom: 15px;'>
            <div class="col-11 animate__animated animate__bounce">
              <input class="form-control accioninicial" type="text" value="${decodeURIComponent(elem___ent)}" placeholder="Formular pregunta">
            </div>
            <div class="col-1 animate__animated animate__bounce">
              <button type="button" onclick="deleteaccionslider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
            </div>
          </div>`;
          $("#padre__add_new_action").append(htmlacc);
        }




        //Demás slider
        var slrptasld = pregunta[0].respuesta_ls.respuesta_tipo;
        for (let e = 1; e < slrptasld.length; e++) {
          const e__l = slrptasld[e];
          console.log(e__l)
          let contenedorsl = document.querySelector('#accordionExample')
          let sl = document.createElement('div')
          sl.id = "sld0" + e + 1;
          sl.classList.add('show__slider');

          var html___bot = `
          <div class="card mb-0 clsSlider animate__animated animate__backInUp">
            <div class="card-header" id="heading0${e+1}">
              <h5 class="m-0">
                <a class="custom-accordion-title d-block pt-2 pb-2" data-bs-toggle="collapse"
                  href="#collapse0${e+1}" aria-expanded="true" aria-controls="collapse0${e+1}">
                  Imágen de Slider #${e+1} 
                  <button type="button" onclick="quitar__slider(this)" class="btn btn-danger btn-sm" style='position: absolute;top: 5px;right: 0;'><i class="mdi mdi-window-close"></i> </button>
                </a>
              </h5>
            </div>
            <div id="collapse0${e+1}" class="collapse collapse_sld" aria-labelledby="heading0${e+1}"
              data-bs-parent="#accordionExample">
              <div class="card-body ee__i">
                <div class="mb-3">
                <div id="show__img">`


          if (e__l.img != " ") {
            html___bot += `<img src="/media/${e__l.img}" alt="image" class="img-fluid mb-1" style="width: auto;height: auto;">`
          }

          html___bot += ` 

                </div>
                <div class="row mb-1">
                  <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12">
                      <center><button type="button" class="btn btn-sm btn-info" onclick="add__edit__img_save(this)">Cambiar | agregar imágen</button></center>
                      <div style="display:none;" class="sh_____ow">
                          <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                          <input type="file" id="example-fileinput0${e+1}" name="images2" class="form-control imagen">
                          <input type='hidden' id='nombre_imagen_bk' value='${e__l.img}'>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action">
                      <label for="example-fileinput" class="form-label">Descripción:</label>
                        <div class='row'>
                          <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                            <input type="text" class="form-control mb-2 titulo" placeholder="Título" required value="${decodeURIComponent(e__l.titulo_imagen)}">
                          </div>
                          <div class='col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12'>
                            <input type="text" class="form-control descripcion" placeholder="Descripción" required value="${decodeURIComponent(e__l.descripcion)}">
                          </div>
                        </div>
                        <label for="example-fileinput" class="form-label">Accion:</label>
                        <div class="mb-2">
                        <input class="form-control accioninicial" value="${decodeURIComponent(e__l.acciones[0])}" type="text" placeholder="Formular pregunta" style='margin-bottom: 15px;'>

            
                          <div id="padre__add_new_action">`

          let c____b = e__l.acciones;
          for (let l = 1; l < c____b.length; l++) {
            const elemen__t = c____b[l];
            html___bot += `
                            <div class="row delaccslider" style="margin-right: 15px;margin-bottom: 15px;">
                              <div class="col-11 animate__animated animate__bounce">
                                <input class="form-control accioninicial" type="text" value="${decodeURIComponent(elemen__t)}" placeholder="Formular pregunta">
                              </div>
                              <div class="col-1 animate__animated animate__bounce">
                                <button type="button" onclick="deleteaccionslider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                              </div>
                            </div>
                            `
          }

          html___bot += ` 
                          </div>
                        </div>
                        <a style="cursor: pointer" onclick='add_new_accion(this)' class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                    </div>
                    <center>
                      <br>
                      <button type="button" class="btn btn-success" onclick="show_add_slider(this)"><i class="mdi mdi-check-all"></i> </button>
                    </center>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

          sl.innerHTML = html___bot
          contenedorsl.append(sl);
          var sldr = document.querySelector(".btn_save");
          sldr.setAttribute("attr_cont_slider", e + 1);

        }

        document.querySelector('.s____ld').className = 'custom-accordion-title d-block pt-2 pb-2 collapsed';
        document.querySelector('.collapse_sld').className = 'collapse_sld collapse';
        $("#customRadio3").attr("disabled", true);


        console.log("SLIDEEEEEEEEER :",)
        document.getElementById("pre_respuestatxt").value = decodeURIComponent(pregunta[0].respuesta_ls.pre_respuesta.pre_rpta)
        console.log("SLIDEEEEEEEEER2 :",)
      }
    }
  });

}

function add__edit__img_save(e){
  gener____al = false;
  $(e).hide();
  $(e.closest(".ee__i").querySelector('.sh_____ow')).show();
  $(e.closest(".ee__i").querySelector('#show__img')).hide();
  $(e.closest(".ee__i").querySelector('#nombre_imagen_bk')).val(' ');
  validar__edit__imagen = false;


}

$('#modal_cerrar').on('click', function () {
  if (document.getElementById("customRadio4").checked == true) {
    $('#form-crear-rpta').trigger('reset');
    $('#full-width-modal').modal('hide');
    document.querySelector('.cls_modal').classList.remove("modal-full-width")
    document.getElementById("divSlider").removeChild(document.getElementById("accordionExample"))
    document.querySelector('#cls_col').className = 'col-lg-10';
    $("#div_pre_rpta").html("");
    $("#editar______ls").val("")
  }

  if (document.getElementById("customRadio3").checked == true) {
    $('#form-crear-rpta').trigger('reset');
    $('#full-width-modal').modal('hide');
    document.getElementById('add_chek_txt').innerHTML = "";
    document.getElementById('rptatit').style.display = "none";
    document.getElementById('cls_rpta_add').style.display = "none";
  }
  document.querySelectorAll('.show__inp').forEach(div => {
    div.remove()
  });
  // document.querySelectorAll('.cls_add_rpta').forEach(div2 => {
  //   div2.remove() // Si han agregado mas respuestas en slider TEXTO, se eliminarán
  // });
  $("#show__img").html("")
  $("#customRadio3").attr("disabled", false);
  $("#customRadio4").attr("disabled", false);

})

$('.n____ew').on('click', function () {
  validar__edit__imagen = false;

})
/*=============================================
  CARGAR IMAGEN SLIDER
=============================================*/

// file__Input.addEventListener('change', function () {
//   var imagen = this.files[0];
//   console.log("imagen :", imagen)
// })
// $('.imagen').change(function () {
//   var imagen = this.files[0];


//   if (imagen["type"] != "image/jpeg" && imagen["type"] != "image/png") {
//       $(".nuevaFoto").val("");
//       alert("¡La imagen debe estar en formato JPG o PNG!")
//   } else if (imagen['size'] > 2000000) {
//       $(".nuevaFoto").val("");
//       alert("¡La imagen no debe pesar más de 2MB!")
//   } else {
//       var datosImagen = new FileReader;
//       datosImagen.readAsDataURL(imagen);
//       $(datosImagen).on("load", function (event) {
//           var rutaImagen = event.target.result;
//           $(".previsualizar_laboratorio").attr("src", rutaImagen);

//       })
//   }
// });



function muestrame__prg(p){
  fetch('/data__set/?prg=' + p, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    $("#rpta_json_nomb").val(response[0].nombre)
    $("#name__org").val(response[0].nombre)
    JSON.parse(response[0].conversacion).forEach(element => 
      {

        let old__ques = []
        let rpta__ls_tipo = []
        let respuesta__slider_texto = []
        let rpta__slider_ls = []
        let preguuu__taas = []
        quitarlsrepetidos(element[0].id)
        

        if(element[0].respuesta_ls.respuesta_tipo[0].tipo == "texto")
        {
          
          element[0].preguntas_new.forEach(ordenar => {
            old__ques.push(encodeURIComponent(ordenar))
          });
          element[0].respuesta_ls.respuesta_tipo[0].rpta.forEach(r__ow => {
            rpta_json = {
              'respueta_sl_texto': encodeURIComponent(r__ow.respueta_sl_texto)
            }
            respuesta__slider_texto.push(rpta_json)
          });
          let rpta_all = {
            'tipo': "texto",
            'rpta': respuesta__slider_texto,
          }
          rpta__ls_tipo.push(rpta_all)
          rptaFinal_texto = {
            'respuesta_tipo': rpta__ls_tipo
          }
          preguuu__taas = [{
            'preguntas_new': old__ques,
            'respuesta_new': btoa(JSON.stringify(rptaFinal_texto)),
            'respuesta_ls': rptaFinal_texto,
            'id': element[0].id,
          }];


          agregarLS(preguuu__taas);
        }

        if(element[0].respuesta_ls.respuesta_tipo[0].tipo == "slider")
        {

          element[0].preguntas_new.forEach(ordenar => {
            old__ques.push(encodeURIComponent(ordenar))
          });


          element[0].respuesta_ls.respuesta_tipo.forEach(ele___ment => {

            respuestas = {
              'tipo': 'slider',
              'img': ele___ment.img,
              'titulo_imagen': encodeURIComponent(ele___ment.titulo_imagen),
              'descripcion': encodeURIComponent(ele___ment.descripcion),
              'acciones': []
            }
            rpta__slider_ls.push(respuestas)

            ele___ment.acciones.forEach(roo__w => {
              respuestas.acciones.push(encodeURIComponent(roo__w));
            });
            
          });


          console.log("elementelementelementelement :",rpta__slider_ls)

          pre_respuesta = {
            'pre_rpta': encodeURIComponent(element[0].respuesta_ls.pre_respuesta.pre_rpta)
          }
          
          rptaFinal = {
            'respuesta_tipo': rpta__slider_ls,
            'pre_respuesta': pre_respuesta,
          }

        

          preguuu__taas = [{
            'preguntas_new': old__ques,
            'respuesta_new': btoa(JSON.stringify(rptaFinal)),
            'respuesta_ls': rptaFinal,
            'id': element[0].id,
          }]
          console.log("elemenst :",element[0].respuesta_ls.respuesta_tipo[0].acciones)


          agregarLS(preguuu__taas);
        
        }
      });
    conversaciones_pyr()
  })
}
