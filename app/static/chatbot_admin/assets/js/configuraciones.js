var validar_rg_slider = false;
var confirmar_slider_registro = false;
function add__edit__img_save_sldr(e){
    $("#img__shw__").html("")
    $(e).hide();
    $(e.closest(".ee____i").querySelector('.sh_____ow_slr')).show();
  }

/*===========================
  AGREGAR NUEVA TIPO SLIDER
=============================*/
function add_new_sldr_accion(e) {
    let a__a = e.closest('.add_input_new_action_sldr')
    let htmlacc = `
    <div class="row delacc__slider" style='margin-right: 15px;margin-bottom: 15px;'>
      <div class="col-11 animate__animated animate__bounce">
        <input class="form-control accioninicial__sld1" required type="text" placeholder="Formular pregunta">
      </div>
      <div class="col-1 animate__animated animate__bounce">
        <button type="button" onclick="deleteaccion__slider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
      </div>
    </div>`;
    let t__his = a__a.querySelector("#padre__add_new_action_sldr");
    $(t__his).append(htmlacc);
  }
  
/*===========================
  ELIMINAR ACCION DE SLIDER
=============================*/
function deleteaccion__slider(sl) {
    sl.closest('.delacc__slider').remove();
  
}

/*=============================================
  AGREGAR MAS RPTA TIPO TEXTO 
=============================================*/
function add_rpta_txt(){
    $("#add_show__rpta_txt").append(`
        <div class="row eliminarrptatext">
            <div class="col-xl-11 col-lg-11 col-md-6 col-sm-6 col-xs-12">
                <div class="form-floating mt-2">
                <textarea class="form-control tipo_texto______t__y__c" placeholder="Leave a comment here" style="height: 70px;"></textarea>
                    <label for="">Respuesta tipo texto</label>
                </div>
            </div>
            <div class="col-xl-1 col-lg-1 col-md-6 col-sm-6 col-xs-12" style="margin: auto;">
                <button type="button" class="btn btn-danger" onclick="deletedrp__ta(this)"><i class="mdi mdi-window-close"></i> </button>
            </div>
        </div>`)
}
/*=============================================
  ELIMINAR RESPUESTAS
=============================================*/
function deletedrp__ta(e) {
    e.closest('.eliminarrptatext').remove();
}
function quitar____slider(e) {
  confirmar_slider_registro = true;
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
      e.closest('.show__sli__der').remove()
      con__sld--
      $.NotificationApp.send("¡Aviso!", "Eliminado!", "top-right", "rgba(0,0,0,0.2)", "error")
    }
  })
}
  
/*===========================
  VALIDAR AGREGAR SLIDER
=============================*/
function show_add_slider__s(n) {
    let card = n.closest('.cls____Slider') //Todo el card del slider
    let tit = card.querySelector('.titulo_sldr').value;
    let des = card.querySelector('.descripcion_sldr').value;
    let acci = card.querySelectorAll('.accioninicial__sld1');
    acci.forEach(ac___val => {
        let va__l = ac___val.value

        if(va__l == "" || tit == "" || des == ""){
            validar_rg_slider = false;
            $.NotificationApp.send("¡Aviso!", "Hay campos obligatorios", "top-right", "rgba(0,0,0,0.2)", "warning")
        }else{
            validar_rg_slider = true;
            $.NotificationApp.send("¡Aviso!", "Hay campos obligatorios", "top-right", "rgba(0,0,0,0.2)", "success")
        }
        
    });
    if(validar_rg_slider == true){
        card.querySelector('.collapse___sld').classList.remove("show")
        const fileInput = card.querySelectorAll('.im__g')
        let img_nom = fileInput[0]['files'][0]
        /*=============================================
          ===== GUARDAR IMAGEN EN EL SERVIDOR =====
          Nota: Al enviar la imagen al servidor, ésta le asigna un alias al nombre por si es imagen repetida.
          Es nombre asigando se devuelve como response para ponerlo en un input hidden dicho nombre
          Al momento de GUARDAR , va tomar el nombre que se ha recibido para guardarlo en RESPUESTA en la funcion myFunction_save();
        =============================================*/
        if (img_nom != undefined) {
            var img_lg = fileInput[0]['files'][0];
            const formData = new FormData();
            formData.append('file', img_lg);
            fetch('/guardar_img_slider/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            }
            }).then(rsp => rsp.text()).then(function (response) {
                card.querySelector('#nombre_imagen___bk').value = response
                
                validar_rg_slider = false;
                confirmar_slider_registro = true;
            })
            $.NotificationApp.send("¡Aviso!", "Registrado con imágen", "top-right", "rgba(0,0,0,0.2)", "success")
        } else {
            validar_rg_slider = false;
            confirmar_slider_registro = true;
            $.NotificationApp.send("¡Aviso!", "Registrado sin imágen", "top-right", "rgba(0,0,0,0.2)", "success")
        }
    }else{
        validar_rg_slider = false;
        $.NotificationApp.send("¡Aviso!", "Hay campos obligatorios", "top-right", "rgba(0,0,0,0.2)", "warning")
    }
}
$(document).ready(function() {
var Ls = localStorage.getItem('datos')
var id_empresa = JSON.parse(Ls).id_empresa;
show____confi(id_empresa)
/*=============================================
  MOSTRAR CONFIGURACIONES
=============================================*/
function show____confi(id){

    fetch('/api/all/?id_empresa=' + id, {
        method: 'GET',
      }).then(rsp => rsp.json()).then(function (response) {

        console.log("RESPUESTA SERVERs :",response)
        

        if (response.id != "sindatos") {
            $("#estado_register").val("Editar")
            $("#id_registroconf").val(response[0].id)

            if (response[0].terminosycondiciones == "mostrar") {
              $("#chktyc").prop('checked', true)
            }
            if (response[0].c_email == "1") {
              $("#chk_email").prop('checked', true)
            }
            if (response[0].c_telefono == "1") {
              $("#chk_telefono").prop('checked', true)
            }
            if (response[0].horariocomercial == "personalizado") {
            
              document.getElementById('chk_personalizado').click();
              $("#time_inicio").val(response[0].h_inicio)
              
              $("#time_cierre").val(response[0].h_cierre)
              $("#txt_des_cierre").val(response[0].h_cierre_des)
  
              $("#ccc_ini").val(response[0].h_inicio)
              $("#ccc_cie").val(response[0].h_cierre)
              $("#ccc_cie_des").val(response[0].h_cierre_des)
            }
            if (response[0].horariocomercial == "24horas") {
                $("#chk_all").click();
            }
            let aver = JSON.parse(response[0].texto_bienvenida)
            if(aver[0].tipo == "texto"){
                $("#t__b__txt").click();
                $(".tyc_tp").val(aver[0].rptas[0])
                let a__b = aver[0].rptas

                for (let i = 1; i < a__b.length; i++) {
                    let element = a__b[i];

                    $("#add_show__rpta_txt").append(`
                        <div class="row eliminarrptatext">
                            <div class="col-xl-11 col-lg-11 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-floating mt-2">
                                <textarea class="form-control tipo_texto______t__y__c" placeholder="Leave a comment here" value="${element}" style="height: 70px;">${element}</textarea>
                                    <label for="">Respuesta tipo texto</label>
                                </div>
                            </div>
                            <div class="col-xl-1 col-lg-1 col-md-6 col-sm-6 col-xs-12" style="margin: auto;">
                                <button type="button" class="btn btn-danger" onclick="deletedrp__ta(this)"><i class="mdi mdi-window-close"></i> </button>
                            </div>
                        </div>`)
                    
                }


            }
            if(aver[0].tipo == "slider"){
                $( "#t__b__sldr" ).click();
                $("#txt_sld_pre_text").val(aver[0].pre_rpta)
                $(".ttt_sld1").val(aver[0].rptas[0].titulo_imagen)
                $(".ddd_sld1").val(aver[0].rptas[0].descripcion)
               
                //PRIMER SLIDER
                $("#textaction_sldr01").val(aver[0].rptas[0].acciones[0])
                let k_lo_s = aver[0].rptas[0].acciones
                for (let k = 1; k < k_lo_s.length; k++) {
                    const elem___ent = k_lo_s[k];
                    let htmlacc = `
                    <div class="row delacc__slider" style='margin-right: 15px;margin-bottom: 15px;'>
                      <div class="col-11 animate__animated animate__bounce">
                        <input class="form-control accioninicial__sld1" required type="text" value="${elem___ent}" placeholder="Formular pregunta">
                      </div>
                      <div class="col-1 animate__animated animate__bounce">
                        <button type="button" onclick="deleteaccion__slider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                      </div>
                    </div>`;
                    $("#padre__add_new_action_sldr").append(htmlacc);
                }
                if(aver[0].rptas[0].img != ""){
                    $("#img__shw__").html(`<center><img src="/media/${aver[0].rptas[0].img}" alt="image" class="img-fluid mb-1" style="width: 50%;height: auto;"></center>
                    <input type='hidden' id='nombre_imagen___bk' value='${aver[0].rptas[0].img}'>`)
                }else{
                    $("#img__shw__").html(``)
                }
                console.log(aver[0].rptas)


                //DEMÁS SLIDER
                var slrptasld = aver[0].rptas;
                for (let p = 1; p < slrptasld.length; p++) {
                    const e__l = slrptasld[p];


                    let ht_____ml = `
                    <div class="card mb-0 cls____Slider show__sli__der">
                        <div class="card-header" id="heading${p+1}">
                            <h5 class="m-0">
                                <a class="custom-accordion-title collapsed d-block py-1" data-bs-toggle="collapse" href="#collaps${p+1}" aria-expanded="false" aria-controls="collaps${p+1}"> ${p+1}. Slider <i
                                        class="mdi mdi-chevron-down accordion-arrow"></i>
                                </a>
                                <i class="mdi mdi-delete" onclick="quitar____slider(this)" style="cursor:pointer;position: absolute;right: 5px;top: 18px;color: #cd0008;font-size: 20px;"></i>
                            </h5>
                        </div>
                        <div id="collaps${p+1}" class="collapse show collapse___sld"
                            aria-labelledby="heading${p+1}"
                            data-bs-parent="#custom-accordion-one">
                            <div class="card-body">
                                <div class="card-body ee____i">`

                                if (e__l.img != "") {
                                    ht_____ml += `<center><img src="/media/${e__l.img}" alt="image" class="img-fluid mb-1" style="width: 50%;height: auto;"></center>`
                                  }
                                

ht_____ml += `
                                    <center><button type="button" class="btn btn-warning btn-sm" onclick="add__edit__img_save_sldr(this)">Cambiar | Agregar imágen</button></center>
                                    <input type='hidden' id='nombre_imagen___bk' value='${e__l.img}'>
                                    <div style="display:none" class="sh_____ow_slr">
                                        <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                                        <input type="file" id="example__fileinput01" name="images2" class="form-control im__g">
                                        
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action_sldr">
                                            <label for="example-fileinput" class="form-label">Descripción:</label>
                                            <div class="row">
                                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                                    <input type="text" class="form-control mb-2 titulo_sldr" value="${e__l.titulo_imagen}" placeholder="Título" required="">
                                                </div>
                                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                                    <input type="text" class="form-control descripcion_sldr" value="${e__l.descripcion}" placeholder="Descripción" required="">
                                                </div>
                                            </div>
                                            <label for="example-fileinput" class="form-label">Accion:</label>
                                            <div class="mb-2">
                                                <input class="form-control accioninicial__sld1"  value="${e__l.acciones}" required type="text" placeholder="Formular pregunta" id="textaction_sldr01" name="textaction_sldr01" style="margin-bottom: 15px;">
                                                <div id="padre__add_new_action_sldr">`
                                            
                                                let c____b = e__l.acciones;
                                                for (let l = 1; l < c____b.length; l++) {
                                                    const elemen__t = c____b[l];

                                                    ht_____ml += `
                                                    <div class="row delacc__slider" style='margin-right: 15px;margin-bottom: 15px;'>
                                                        <div class="col-11 animate__animated animate__bounce">
                                                            <input class="form-control accioninicial__sld1"  value="${elemen__t}" required type="text" placeholder="Formular pregunta">
                                                        </div>
                                                        <div class="col-1 animate__animated animate__bounce">
                                                            <button type="button" onclick="deleteaccion__slider(this)" class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
                                                        </div>
                                                    </div>
                                                    `

                                                }




                                                ht_____ml += `
                                                </div>
                                            </div>
                                            <a style="cursor: pointer" onclick="add_new_sldr_accion(this)" class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                                        </div>
                                        <center><button type="button" class="btn btn-success" onclick="show_add_slider__s(this)"><i class="mdi mdi-check-all"></i> </button></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    $("#add_ne__w_sld").append(ht_____ml)
                }
            }

        }else{
            $("#estado_register").val("Registrar")
        }
      }) 
}

/*=============================================
  HORARIO PERSONALIZADO
=============================================*/
$(document).on("click","#chk_personalizado",function (e) {
    let tttt = document.getElementById("chk_personalizado")
    if(tttt.checked) {
        $("#show__desc").html(
       `
                        <hr>
                        <div class="row mt-2">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="time_inicio" class="form-label">Inicio</label>
                                    <input class="form-control" id="time_inicio" type="time" name="time_inicio" value="${ $("#ccc_ini").val()}" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="time_cierre" class="form-label">Cierre</label>
                                    <input class="form-control" id="time_cierre" type="time" name="time_cierre"  value="${ $("#ccc_cie").val()}" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <textarea class="form-control" id="txt_des_cierre" required placeholder="Ejm. Estamos fuera de servicio" rows="3">${ $("#ccc_cie_des").val()}</textarea>
                                </div>
                            </div>
                        </div>`
                        )
    }
})
/*=============================================
  HORARIO 24 HORAS
=============================================*/
$(document).on("click","#chk_all",function (e) {
    $("#show__desc").html("")
    let tttt = document.getElementById("chk_all")
    if(tttt.checked) {
        $("#show__desc").html(`<center><p class="h5 mt-4 text-success"><i class="mdi mdi-source-branch-check"></i> <b>Chatbot estará activo las 24 horas</b> </p></center>`)
    }
})

/*=============================================
  TEXTO 
=============================================*/
$(document).on("click","#t__b__txt",function (e) {
    $(this).prop("disabled",true)
    $("#t__b__sldr").prop("disabled",false)
    let t__b__texto = document.getElementById("t__b__txt")
    let html___txt = "";
    if(t__b__texto.checked) {
        html___txt += `
        <div class="card animate__animated animate__backInLeft">
            <h6 class="card-header">Texto</h6>
            <div class="card-body">
                <div class="form-floating">
                    <textarea class="form-control tipo_texto______t__y__c tyc_tp" placeholder="Leave a comment here" style="height: 70px;"></textarea>
                    <label for="">Respuesta tipo texto</label>
                </div>
                <div id="add_show__rpta_txt">

                </div>
                <a style="cursor: pointer;" onclick="add_rpta_txt()" class="text-primary"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra respuesta</a>
            </div>
        </div>`
        $("#show___t___b__txt__sld").html(html___txt)
    }
})
/*=============================================
  SLIDER 
=============================================*/
$(document).on("click","#t__b__sldr",function (e) {
    $(this).prop("disabled",true)
    $("#t__b__txt").prop("disabled",false)
    let t__b__slider = document.getElementById("t__b__sldr")
    let html___sldr = "";
    if(t__b__slider.checked) {
        html___sldr += `
        <div class="card animate__animated animate__backInLeft">
            <h6 class="card-header">Respuesta tipo Slider</h6>
            <div class="card-body">
                <div class="form-floating mb-1">
                    <textarea class="form-control" required placeholder="Leave a comment here" id="txt_sld_pre_text" style="height: 80px"></textarea>
                    <label for="txt_sld_pre_text">Entrada</label>
                </div>
                <a style="cursor:pointer" class="add___slider text-info mt-2"><i class="mdi mdi-plus-circle me-1"></i>Agregar un slider</a>


                <div class="accordion custom-accordion" id="custom-accordion-one">
                    <div class="card mb-0 mt-1 cls____Slider">
                        <div class="card-header" id="headingFour">
                            <h5 class="m-0">
                                <a class="custom-accordion-title d-block py-1" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour"> 1. Slider <i class="mdi mdi-chevron-down accordion-arrow"></i>
                                </a>
                            </h5>
                        </div>
                        <div id="collapseFour" class="collapse show collapse___sld"
                            aria-labelledby="headingFour"
                            data-bs-parent="#custom-accordion-one">
                            <div class="card-body ee____i">
                                <div id="img__shw__"></div>
                                <center><button type="button" class="btn btn-warning btn-sm" onclick="add__edit__img_save_sldr(this)">Cambiar | Agregar imágen</button></center>
                                <input type='hidden' id='nombre_imagen___bk' value=''>
                                <div style="display:none" class="sh_____ow_slr">
                                    <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                                    <input type="file" id="example__fileinput01" name="images2" class="form-control im__g">
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action_sldr">
                                        <label for="example-fileinput" class="form-label">Descripción:</label>
                                        <div class="row">
                                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                                <input type="text" class="form-control mb-2 titulo_sldr ttt_sld1" placeholder="Título" required="">
                                            </div>
                                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                                <input type="text" class="form-control descripcion_sldr ddd_sld1" placeholder="Descripción" required="">
                                            </div>
                                        </div>
                                        <label for="example-fileinput" class="form-label">Accion:</label>
                                        <div class="mb-2">
                                            <input class="form-control accioninicial__sld1" required type="text" placeholder="Formular pregunta" id="textaction_sldr01" name="textaction_sldr01" style="margin-bottom: 15px;">
                                            <div id="padre__add_new_action_sldr">
                                        
                                            </div>
                                        </div>
                                        <a style="cursor: pointer" onclick="add_new_sldr_accion(this)" class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                                    </div>
                                    <center><button type="button" class="btn btn-success" onclick="show_add_slider__s(this)" ><i class="mdi mdi-check-all"></i> </button></center>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="add_ne__w_sld">
                    
                    
                    </div>
                </div>
            </div>
        </div>`
        $("#show___t___b__txt__sld").html(html___sldr)
    }
})
  

/*===========================
  AGREGAR NUEVA IMAGEN A SLIDER
=============================*/
var con__t = 0
var con__sld = 1
$(document).on("click",".add___slider",function(e) {
    confirmar_slider_registro = false;   
    con__t++
    con__sld++
    let ht__ml = `
    <div class="card mb-0 cls____Slider show__sli__der">
        <div class="card-header" id="heading${con__t}">
            <h5 class="m-0">
                <a class="custom-accordion-title collapsed d-block py-1" data-bs-toggle="collapse" href="#collaps${con__t}" aria-expanded="false" aria-controls="collaps${con__t}"> ${con__sld}. Slider <i
                        class="mdi mdi-chevron-down accordion-arrow"></i>
                </a>
                <i class="mdi mdi-delete" onclick="quitar____slider(this)" style="cursor:pointer;position: absolute;right: 5px;top: 18px;color: #cd0008;font-size: 20px;"></i>
            </h5>
        </div>
        <div id="collaps${con__t}" class="collapse show collapse___sld"
            aria-labelledby="heading${con__t}"
            data-bs-parent="#custom-accordion-one">
            <div class="card-body">
                <div class="card-body ee____i">
                    <center><button type="button" class="btn btn-warning btn-sm" onclick="add__edit__img_save_sldr(this)">Cambiar | Agregar imágen</button></center>
                    <input type='hidden' id='nombre_imagen___bk' value=''>
                    <div style="display:none" class="sh_____ow_slr">
                        <label for="example-fileinput" class="form-label">Cargar archivo:</label>
                        <input type="file" id="example__fileinput01" name="images2" class="form-control im__g">
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 add_input_new_action_sldr">
                            <label for="example-fileinput" class="form-label">Descripción:</label>
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                    <input type="text" class="form-control mb-2 titulo_sldr" placeholder="Título" required="">
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12">
                                    <input type="text" class="form-control descripcion_sldr" placeholder="Descripción" required="">
                                </div>
                            </div>
                            <label for="example-fileinput" class="form-label">Accion:</label>
                            <div class="mb-2">
                                <input class="form-control accioninicial__sld1" required type="text" placeholder="Formular pregunta" id="textaction_sldr01" name="textaction_sldr01" style="margin-bottom: 15px;">
                                <div id="padre__add_new_action_sldr">
                            
                                </div>
                            </div>
                            <a style="cursor: pointer" onclick="add_new_sldr_accion(this)" class="text-primary btn_save_action"><i class="mdi mdi-plus-circle me-1"></i>Agregar otra acción</a>
                        </div>
                        <center><button type="button" class="btn btn-success" onclick="show_add_slider__s(this)"><i class="mdi mdi-check-all"></i> </button></center>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    $("#add_ne__w_sld").append(ht__ml)
    
})
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
$('#save___config').submit(e=>{
    
    var per = document.getElementById("chktyc")
    let c_pers = document.getElementById("chk_personalizado")
    let c_all = document.getElementById("chk_all")
    let es___tado = $("#estado_register").val();
    var array_datos__all = [];
 
    // VALIDAR TEXTO DE BIENVENIDA
    var tip_text = document.getElementById("t__b__txt")
    var tip_sld = document.getElementById("t__b__sldr")
 
    // 1: seleccionado      0: no seleccionado
    let c_nombre = "1"
    let c_email = document.getElementById("chk_email")
    let c_tel = document.getElementById("chk_telefono")
    if(per.checked){
        ter_con = "mostrar"
    }else{
        ter_con = "no_mostrar"
    }

    if(c_pers.checked){
        est_inicio = $("#time_inicio").val();
        est_cierre = $("#time_cierre").val();
        cierre_desc = $("#txt_des_cierre").val();
        horario__comercial = "personalizado"
    }
    if(c_all.checked){
        est_inicio = null;
        est_cierre = null;
        cierre_desc = null;
        horario__comercial = "24horas"
    }
  
    if(c_email.checked){
        email_c = "1" //Seleccionado
    }else{
        email_c = "0"
    }

    if(c_tel.checked){
        tel_c = "1" //Seleccionado
    }else{
        tel_c = "0"
    }

    if(tip_text.checked){
        text_tipo = "texto"
        my__dat__ = {
            'tipo':text_tipo,
            'rptas':[]
        }
        array_datos__all.push(my__dat__);
        document.querySelectorAll(".tipo_texto______t__y__c").forEach(it_em => {
            array_datos__all[0].rptas.push(it_em.value)
        });
        let save_data = {
            "terminosycondiciones": ter_con,
            "horariocomercial": horario__comercial,
            "h_inicio": est_inicio,
            "h_cierre": est_cierre,
            "h_cierre_des": cierre_desc,
            "c_nombre": c_nombre,
            "c_email": email_c,
            "c_telefono": tel_c,
            "texto_bienvenida": JSON.stringify(array_datos__all),
            "cliente_empresa_id": id_empresa
        }
        if(es___tado == "Registrar"){
            fetch('/api/create/', {
                method: 'POST',
                body: JSON.stringify(save_data),
                headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCookie('csrftoken')
                }
            })          
            .then(rsp => rsp.json()).then(function (response) {
                console.log("RESPUESTA SERVERs 2:",response[0])
                if(response.message == "Registrado"){
                    $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
                }else
                if(response[0] == "This data already exists"){
                    $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
                }
                else{
                    $.NotificationApp.send("Error!", "Ocurrió un error al registrar!", "top-right", "rgba(0,0,0,0.2)", "error")
                }
            }) 
        }
        if(es___tado == "Editar"){
            let id_registro = $("#id_registroconf").val();
            fetch('/api/update/'+id_registro+'/', {
                method: 'POST',
                body: JSON.stringify(save_data),
                headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCookie('csrftoken')
                }
            }).then(function (response) {
                console.log("response :",response)
                if(response.status == 201){
                    $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
                }else{
                    $.NotificationApp.send("Error!", "Ocurrió un error al registrar!", "top-right", "rgba(0,0,0,0.2)", "error")
                }
            })
        }
    }


    if(tip_sld.checked){

        if(confirmar_slider_registro == true)
        {

            text_tipo = "slider"
            let pre_nombre = document.querySelector('#txt_sld_pre_text').value;
            my__dat__ = {
                'tipo':text_tipo,
                'pre_rpta': pre_nombre,
                'rptas':[]
            }
            array_datos__all.push(my__dat__);
            

            let slidersall = document.querySelectorAll('.cls____Slider') //trae toda las cabeceras
            slidersall.forEach(sldr => {
                let descripcionsl = sldr.querySelector('.descripcion_sldr').value;
                let titulosl = sldr.querySelector('.titulo_sldr').value;
                let nombre_imgl = sldr.querySelector('#nombre_imagen___bk').value;
                let accioninicial___ = sldr.querySelectorAll('.accioninicial__sld1')
                let dt_rpt = 
                    {
                        'acciones':[],
                        'descripcion': descripcionsl,
                        'img': nombre_imgl,
                        'titulo_imagen': titulosl,
                    }
                    array_datos__all[0].rptas.push(dt_rpt)

                accioninicial___.forEach(accion => {
                    dt_rpt.acciones.push(accion.value);
                });
            });
            console.log(array_datos__all)

            let save_data_sld = {
                "terminosycondiciones": ter_con,
                "horariocomercial": horario__comercial,
                "h_inicio": est_inicio,
                "h_cierre": est_cierre,
                "h_cierre_des": cierre_desc,
                "c_nombre": c_nombre,
                "c_email": email_c,
                "c_telefono": tel_c,
                "texto_bienvenida": JSON.stringify(array_datos__all),
                "cliente_empresa_id": id_empresa
            }
            if(es___tado == "Registrar"){
                fetch('/api/create/', {
                    method: 'POST',
                    body: JSON.stringify(save_data_sld),
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                    })          
                    .then(rsp => rsp.json()).then(function (response) {
                        if(response.status == 201){
                            $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
                        }else{
                            $.NotificationApp.send("Error!", "Ocurrió un error al registrar!", "top-right", "rgba(0,0,0,0.2)", "error")
                        }
                    
                        
                }) 
            }
            if(es___tado == "Editar"){

                let id_registro = $("#id_registroconf").val();
                fetch('/api/update/'+id_registro+'/', {
                    method: 'POST',
                    body: JSON.stringify(save_data_sld),
                    headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': getCookie('csrftoken')
                    }
                }).then(function (response) {
                    console.log(" hola ",response)
                    if(response.status == 201){
                        $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
                    }else{
                        $.NotificationApp.send("Error!", "Ocurrió un error al registrar!", "top-right", "rgba(0,0,0,0.2)", "error")
                    }
                })
            }

        }else{
            $.NotificationApp.send("¡Aviso!", "Confirme registro de Slider", "top-right", "rgba(0,0,0,0.2)", "warning")
        }

    }
    e.preventDefault();

})
  
})