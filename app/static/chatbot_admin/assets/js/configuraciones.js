var Ls = localStorage.getItem('datos')
var id_empresa = JSON.parse(Ls).id_empresa;
show____confi(id_empresa)
/*=============================================
  HORARIO PERSONALIZADO
=============================================*/
$(document).on("click","#chk_personalizado",function (e) {
   


    let h_personalizado = "";
    let tttt = document.getElementById("chk_personalizado")
    if(tttt.checked) {
        h_personalizado += `
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
                        </div>`;
        $("#show__desc").html(h_personalizado)
    }
})
/*=============================================
  HORARIO 24 HORAS
=============================================*/
$(document).on("click","#chk_all",function (e) {
    $("#show__desc").html("")
    let tttt = document.getElementById("chk_all")
    if(tttt.checked) {
        $("#show__desc").html(`<center><p class="h5 mt-3 text-success"><i class="mdi mdi-source-branch-check"></i> <b>Chatbot estará activo las 24 horas</b> </p></center>`)
    }
})


$('#save___config').submit(e=>{
    
    var per = document.getElementById("chktyc")
    let c_pers = document.getElementById("chk_personalizado")
    let c_all = document.getElementById("chk_all")
    let es___tado = $("#estado_register").val();

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

    fetch('/sav__config/?id_empr=' + id_empresa + '&es___tado=' + es___tado + '&ter_con=' + ter_con + '&horario__comercial=' + horario__comercial + '&est_inicio=' + est_inicio + '&est_cierre=' + est_cierre + '&cierre_desc=' + cierre_desc + '&c_nombre=' + c_nombre + '&email_c=' + email_c + '&tel_c=' + tel_c, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
        console.log("response :",response)
        if(response == "registrado"){
            $.NotificationApp.send("¡Aviso!", "Se guardaron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
        }else
        if(response == "ya_existe"){
            $.NotificationApp.send("¡Aviso!", "Error de servidor. Ya existe en la BD", "top-right", "rgba(0,0,0,0.2)", "error")
        }else
        if(response == "editado"){
            $.NotificationApp.send("¡Aviso!", "Se guardaron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
        }else{
            $.NotificationApp.send("¡Aviso!", "Error de servidor. Inténtelo mas tarde", "top-right", "rgba(0,0,0,0.2)", "error")
        }
    }) 

    e.preventDefault();


})

/*=============================================
  MOSTRAR CONFIGURACIONES
=============================================*/
function show____confi(id){
    fetch('/mostrar_data__config/?id_empr=' + id, {
        method: 'GET',
      }).then(rsp => rsp.json()).then(function (response) {

        if (response.length == 1) {
            $("#estado_register").val("Editar")

            if (response[0].fields.terminosycondiciones == "mostrar") {
              $("#chktyc").prop('checked', true)
            }
            if (response[0].fields.c_email == "1") {
              $("#chk_email").prop('checked', true)
            }
            if (response[0].fields.c_telefono == "1") {
              $("#chk_telefono").prop('checked', true)
            }
            if (response[0].fields.horariocomercial == "personalizado") {
            
              document.getElementById('chk_personalizado').click();
              $("#time_inicio").val(response[0].fields.h_inicio)
              $("#time_cierre").val(response[0].fields.h_cierre)
              $("#txt_des_cierre").val(response[0].fields.h_cierre_des)
  
              $("#ccc_ini").val(response[0].fields.h_inicio)
              $("#ccc_cie").val(response[0].fields.h_cierre)
              $("#ccc_cie_des").val(response[0].fields.h_cierre_des)
              
            }
            if (response[0].fields.horariocomercial == "24horas") {
              document.getElementById('chk_all').click();
            }
            
        }else{
            
            $("#estado_register").val("Registrar")
        }
          
      }) 
}