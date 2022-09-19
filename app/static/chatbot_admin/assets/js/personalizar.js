
var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;
chatbot_personalizado();
/*=============================================
CHATBOT PERSONALIZADO
=============================================*/
function chatbot_personalizado() {
  fetch('/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    // 0 = No tiene registros
    // 1 = Tiene registros

    if(response.length != 0){
      //Editar
      $("#frm_ptitulo").val(response[0]['nombre_chatbot']);
      $("#frm_pdatos").val(response[0]['titulo_cuerpo']);
      $("#frm_pboton").val(response[0]['terminos_y_condiciones']);
      $("#frm_link").val(response[0]['terminos_y_condiciones_link']);
      $("#frm_t_y_c_aceptar").val(response[0]['terminos_y_condiciones_aceptar']);
      $("#frm_t_y_c_rechazar").val(response[0]['terminos_y_condiciones_rechazar']);
      $("#color_chatbot").val(response[0]['tipo_color_botones']);
      $("#color_chatbot_acciones").val(response[0]['tipo_color_header']);

      console.log("traer datos del estilo :",response[0]);

      if(response[0].tipo_color_header == "paleta"){
        $("#val_rpta_color_chatbot").val(response[0]['rpta_color_header']);
      }

      if(response[0].tipo_color_header == "personalizado"){
        $("#val_rpta_color_chatbot_per").val(response[0]['rpta_color_header']);
      }


      if(response[0].tipo_color_botones == "paleta"){
        $("#val_rpta_color_chatbot_acciones").val(response[0]['rpta_color_botones']);
      }

      if(response[0].tipo_color_botones == "personalizado"){
        $("#val_rpta_color_chatbot_acciones_per").val(response[0]['rpta_color_botones']);

      }






      if(response[0].tipo_color_botones == "paleta"){
        $(".val_seleccion_c_p").html(`<input class="form-control" id="color_chatbot_paleta" type="color" name="color_chatbot_paleta" value="${response[0].rpta_color_botones}">
        <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>
        `);
      }
      if (response[0].tipo_color_botones == "personalizado") {
        $(".val_seleccion_c_p").html(`<textarea class="form-control" name="color_chatbot_paleta" value="${response[0].rpta_color_botones}" id="color_chatbot_paleta" rows="5" placeholder="Ejemplo: -webkit-linear-gradient(right, #2c3b5ee0, #68b4cf)">${response[0].rpta_color_botones}</textarea>
        <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
      }


      if(response[0].tipo_color_header == "paleta"){
        $(".val_seleccion_c").html(`<input class="form-control" id="color_chatbot_personalizado" type="color" name="color_chatbot_personalizado" value="${response[0].rpta_color_header}">
        <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
      }
      if (response[0].tipo_color_header == "personalizado") {
        $(".val_seleccion_c").html(`<textarea class="form-control" name="color_chatbot_personalizado" id="color_chatbot_personalizado" rows="5" placeholder="Ejemplo: -webkit-linear-gradient(right, #2c3b5ee0, #68b4cf)" value="${response[0].rpta_color_header}">${response[0].rpta_color_header}</textarea>
        <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
      }

      document.querySelector('.pr_terminos_condiciones_link').innerHTML = response[0]['terminos_y_condiciones_link']
      document.querySelector('.pr_terminos_condiciones_link').setAttribute('href',response[0]['terminos_y_condiciones_link'])
      document.querySelector('.pr_terminos_condiciones_link_aceptar').innerHTML = response[0]['terminos_y_condiciones_aceptar']
      document.querySelector('.pr_terminos_condiciones_link_rechazar').innerHTML = response[0]['terminos_y_condiciones_rechazar']
      document.querySelector('.pr_terminos_condiciones').innerHTML = response[0]['terminos_y_condiciones'];
      document.querySelector('.pr_tl').innerHTML = response[0]['nombre_chatbot'];
      document.querySelector('.pr_tl2').innerHTML = response[0]['nombre_chatbot'];
      document.querySelector('#pr_frm').innerHTML = response[0]['titulo_cuerpo'];
  
  
  
      document.querySelector('#chat_color').style.background = response[0]['rpta_color_header'];
      document.querySelector('#chat_color2').style.background = response[0]['rpta_color_header']; 
  
  
  
  
      document.querySelector('#chat_third_screen').style.background = response[0]['rpta_color_botones'];
      document.querySelector('#t_y_c_a').style.background = response[0]['rpta_color_botones'];
      document.querySelector('#t_y_c_r').style.background = response[0]['rpta_color_botones'];
  
  
  
      document.querySelectorAll('.chat_rpta').forEach(rpta => {
        rpta.style.background = response[0]['rpta_color_header'];
      });

      if(response[0]['foto_logo'] != null){
        $(".reem_img_logo").attr('src',"/media/"+response[0]['foto_logo'])
        $(".previsualizar").attr('src',"/media/"+response[0]['foto_logo'])
        $("#logo_old__img").val(response[0]['foto_logo'])
      }

      $("#cam____logo").html(`<button type="button" class="btn btn-outline-warning mt-3" data-bs-toggle="modal" data-bs-target="#centermodal"> <i class="uil uil-robot me-1"></i> Cambiar logo del chatbot </button>`)

      $("#btn_save_upadte").html(`<button type="button" class="btn btn-outline-info" onclick="fn_editar_pr()"> <i class="uil uil-edit-alt me-1"></i> Guardar </button>`)
    }else{
      //Registrar nuevo
      $("#btn_save_upadte").html(`<button type="button" class="btn btn-outline-success" onclick="fn_guardar_pr()"> <i class="mdi mdi-cookie-check me-1"></i> Guardar </button>`)
    }





  })
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
const csrftoken = getCookie('csrftoken');
// inicio
function lblbl() {
  document.querySelector('#li_cb2').classList.remove("active");
  document.querySelector('#cuerpo_chatbot').classList.remove("active");
  document.querySelector('#li_cb').classList.add("active");
  document.querySelector('#inici_chatbot').classList.add("active");
}
// conversacion
function lblblconversacion(){
    document.querySelector('#li_cb').classList.remove("active");
    document.querySelector('#inici_chatbot').classList.remove("active");
    document.querySelector('#li_cb2').classList.add("active");
    document.querySelector('#cuerpo_chatbot').classList.add("active");
}
document.querySelector('#frm_ptitulo').addEventListener('click', function () {
  lblbl();
})
document.querySelector('#frm_pdatos').addEventListener('click', function () {
  lblbl();
})
document.querySelector('#frm_pboton').addEventListener('click', function () {
  lblblconversacion();
})
document.querySelector('#frm_link').addEventListener('click', function () {
  lblblconversacion();
})
document.querySelector('#frm_t_y_c_aceptar').addEventListener('click', function () {
  lblblconversacion();
})
document.querySelector('#frm_t_y_c_rechazar').addEventListener('click', function () {
  lblblconversacion();
})
function myFunctionT() {
  var x = document.getElementById("frm_ptitulo").value;
  if (x != '') {
    document.querySelector('.pr_tl2').innerText = x
  } else {
    document.querySelector('.pr_tl2').innerText = 'CHATBOT'
  }
  document.querySelector('#xyz01').innerText = '';
}
function myFunctionBTND() {
  var x = document.getElementById("frm_pdatos").value;
  if (x != '') {
    document.querySelector('#pr_frm').innerText = x
  } else {
    document.querySelector('#pr_frm').innerText = 'Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.'
  }
  document.querySelector('#xyz03').innerText = '';
}
function myFunctionBTN() {
  var x = document.getElementById("frm_pboton").value;
  if (x != '') {
    document.querySelector('.pr_terminos_condiciones').innerText = x
  } else {
    document.querySelector('.pr_terminos_condiciones').innerText = 'Terminos y condiciones'
  }
  document.querySelector('#xyz02').innerText = '';
}
function myFunctionLink() {
  var x = document.getElementById("frm_link").value;

  if (x != '') {
    document.querySelector('.pr_terminos_condiciones_link').innerText = x
  } else {
    document.querySelector('.pr_terminos_condiciones_link').innerText = 'www.url.com'
  }
  document.querySelector('#xyz04').innerText = '';
}
function myFunction_t_y_c_aceptar() {
  var x = document.getElementById("frm_t_y_c_aceptar").value;

  if (x != '') {
    document.querySelector('.pr_terminos_condiciones_link_aceptar').innerText = x
  } else {
    document.querySelector('.pr_terminos_condiciones_link_aceptar').innerText = 'Bienvenido a nuestro sitio, si necesita ayuda,simplemente responda a este mensaje, estamos en línea y listos para ayudar.'
  }
  document.querySelector('#xyz05').innerText = '';
}
function myFunction_t_y_c_rechazar() {
  var x = document.getElementById("frm_t_y_c_rechazar").value;

  if (x != '') {
    document.querySelector('.pr_terminos_condiciones_link_rechazar').innerText = x
  } else {
    document.querySelector('.pr_terminos_condiciones_link_rechazar').innerText = 'Nos apena que no aceptes nuestros T&C. Lamentablemente no podemos brindarte ayuda por este medio.'
  }
  document.querySelector('#xyz06').innerText = '';
}

/* ==== POST ===== */
function fn_guardar_pr() {

  let pnombre = document.querySelector('#frm_ptitulo').value;
  let pdatos = document.querySelector('#frm_pdatos').value;
  let pt_y_c = document.querySelector('#frm_pboton').value;
  let pfrm_link = document.querySelector('#frm_link').value;
  let pfrm_t_y_c_aceptar = document.querySelector('#frm_t_y_c_aceptar').value;
  let frm_t_y_c_rechazar = document.querySelector('#frm_t_y_c_rechazar').value;
  let color_chatbot = document.querySelector('#color_chatbot').value;
  let color_btn_acciones = document.querySelector('#color_chatbot_acciones').value;
  let rpta_color_chatbot;
  let rpta_color_btn_acciones;

  if(color_chatbot == "paleta"){
    rpta_color_chatbot = document.querySelector('#color_chatbot_paleta').value;
  }else{
    rpta_color_chatbot = document.querySelector('#color_chatbot_paleta').value;
  }

  if(color_btn_acciones == "paleta"){
    rpta_color_btn_acciones = document.querySelector('#color_chatbot_personalizado').value;
  }else{
    rpta_color_btn_acciones = document.querySelector('#color_chatbot_personalizado').value;
  }

  if (pnombre == '' || pdatos == '' || pt_y_c =='' || pfrm_link =='' || pfrm_t_y_c_aceptar =='' || frm_t_y_c_rechazar == '') {

    if (pnombre == '') {
      document.querySelector('#xyz01').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz01').innerText = '';
    }

    if (pt_y_c == '') {
      document.querySelector('#xyz02').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz02').innerText = '';
    }

    if (pdatos == '') {
      document.querySelector('#xyz03').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz03').innerText = '';
    }

    if (pfrm_link == '') {
      document.querySelector('#xyz04').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz04').innerText = '';
    }

    if (pfrm_t_y_c_aceptar == '') {
      document.querySelector('#xyz05').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz05').innerText = '';
    }

    if (frm_t_y_c_rechazar == '') {
      document.querySelector('#xyz06').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz06').innerText = '';
    }

  } else {

    var datos = {
      'id': document.querySelector('#id_pr_ct').value,
      'nombre_chatbot': pnombre,
      'titulo_cuerpo': pdatos,
      'terminos_y_condiciones': pt_y_c,
      'terminos_y_condiciones_link': pfrm_link,
      'terminos_y_condiciones_aceptar': pfrm_t_y_c_aceptar,
      'terminos_y_condiciones_rechazar': frm_t_y_c_rechazar,
      'tipo_color_header':color_chatbot,
      'rpta_color_header':rpta_color_chatbot,
      'tipo_color_botones':color_btn_acciones,
      'rpta_color_botones':rpta_color_btn_acciones,
      'id_empresa_cliente': empresa_id
    }

    fetch('/personalizar_chat/', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': getCookie('csrftoken')
      }
    }).then(rsp => rsp.json()).then(function (response) {

      if(response){
        chatbot_personalizado();
        $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
      }else{
          $.NotificationApp.send("Error!", "Error en el registro. Vulvalo a intentar luego", "top-right", "rgba(0,0,0,0.2)", "success")
      }

    })
  }
}
//Busca en toda la cadena un caracter en especifico
function replaceStr(str, find, replace) {
  for (var i = 0; i < find.length; i++) {
      str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
  }
  return str;
}


function fn_editar_pr() {

  let pnombre = document.querySelector('#frm_ptitulo').value;
  let pdatos = document.querySelector('#frm_pdatos').value;
  let pt_y_c = document.querySelector('#frm_pboton').value;
  let pfrm_link = document.querySelector('#frm_link').value;
  let pfrm_t_y_c_aceptar = document.querySelector('#frm_t_y_c_aceptar').value;
  let frm_t_y_c_rechazar = document.querySelector('#frm_t_y_c_rechazar').value.replace("&", "y");
  let color_chatbot = document.querySelector('#color_chatbot').value;
  let color_btn_acciones = document.querySelector('#color_chatbot_acciones').value;
  let rpta_color_chatbot;
  let rpta_color_btn_acciones;



  if(color_chatbot == "paleta"){
    rpta_color_chatbot = document.querySelector('#color_chatbot_paleta').value.slice(1); //quito el primer #
  }else{
    rpta_color_chatbot = replaceStr(document.querySelector('#color_chatbot_paleta').value, "#", '*');
  }

  if(color_btn_acciones == "paleta"){
    rpta_color_btn_acciones = document.querySelector('#color_chatbot_personalizado').value.slice(1); //quito el primer #
  }else{
    rpta_color_btn_acciones = replaceStr(document.querySelector('#color_chatbot_personalizado').value, "#", '*');
  }


  if (pnombre == '' || pdatos == '' || pt_y_c =='' || pfrm_link =='' || pfrm_t_y_c_aceptar =='' || frm_t_y_c_rechazar == '') {

    if (pnombre == '') {
      document.querySelector('#xyz01').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz01').innerText = '';
    }

    if (pt_y_c == '') {
      document.querySelector('#xyz02').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz02').innerText = '';
    }

    if (pdatos == '') {
      document.querySelector('#xyz03').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz03').innerText = '';
    }

    if (pfrm_link == '') {
      document.querySelector('#xyz04').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz04').innerText = '';
    }

    if (pfrm_t_y_c_aceptar == '') {
      document.querySelector('#xyz05').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz05').innerText = '';
    }

    if (frm_t_y_c_rechazar == '') {
      document.querySelector('#xyz06').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz06').innerText = '';
    }

  } else {

    let d_edit = [{
      'id': document.querySelector('#id_pr_ct').value,
      'nombre_chatbot': pnombre,
      'titulo_cuerpo': pdatos,
      'terminos_condiciones': pt_y_c,
      'terminos_condiciones_link': pfrm_link,
      't_y_c_aceptar': pfrm_t_y_c_aceptar,
      't_y_c_rechazar': frm_t_y_c_rechazar,
      'tipo_color_header':color_chatbot,
      'rpta_color_header':rpta_color_chatbot, 
      'tipo_color_botones':color_btn_acciones,
      'rpta_color_botones':rpta_color_btn_acciones,
      'id_empresa_cliente': empresa_id
    }]


    datos_rpta = JSON.stringify(d_edit)
    // datos_rpta = btoa(JSON.stringify(d_edit)) //ENVIAR BASE64

    fetch('/personalizar_edit/?datos=' + datos_rpta, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      if(response == "ok"){
        chatbot_personalizado();
        $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
      }
      if(response == "nook"){
        $.NotificationApp.send("Error!", "Verifique que el registro esté bien realizado", "top-right", "rgba(0,0,0,0.2)", "error")
      }
      console.log("RESPUESTA SERVER :",response)
    }).catch(e => {
      //mostrar mensaje de error
      console.log(e);
    })
  }


}
/*=============================================
COLOR PERSONALIZADO
=============================================*/
$("#color_chatbot").on("change", function () {
  let seleccion = $(this).val();
  
  if(seleccion == "paleta"){
    $(".val_seleccion_c").html(`<input class="form-control" id="color_chatbot_paleta" type="color" name="color_chatbot_paleta" value="${$("#val_rpta_color_chatbot").val()}">
    <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>
    `);
  }
  if(seleccion == "personalizado"){
    $(".val_seleccion_c").html(`<textarea class="form-control" name="color_chatbot_paleta" id="color_chatbot_paleta" rows="5" placeholder="Ejemplo: -webkit-linear-gradient(right, #2c3b5ee0, #68b4cf)">${$("#val_rpta_color_chatbot_per").val()}</textarea>
    <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
  }
})

$("#color_chatbot_acciones").on("change", function () {
  let seleccion = $(this).val();

  

  if(seleccion == "paleta"){
    $(".val_seleccion_c_p").html(`<input class="form-control" id="color_chatbot_personalizado" type="color" name="color_chatbot_personalizado" value="${$("#val_rpta_color_chatbot_acciones").val()}">
    <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
  }
  if(seleccion == "personalizado"){
    $(".val_seleccion_c_p").html(`<textarea class="form-control" name="color_chatbot_personalizado" id="color_chatbot_personalizado" rows="5" placeholder="Ejemplo: -webkit-linear-gradient(right, #2c3b5ee0, #68b4cf)">${$("#val_rpta_color_chatbot_acciones_per").val()}</textarea>
    <center><button type="button" class="btn btn-outline-dark mt-2 mb-1 btn-sm"><i class="mdi mdi-eye"></i> </button></center>`);
  }
})

function add_logo_chatbot(n){
  let card = n.closest('.cls_all_logo') //Todo el card del slider
  const fileInput = card.querySelectorAll('.imagen_logo')
  var img_lg = fileInput[0]['files'][0];
  const formData = new FormData();
  formData.append('file', img_lg);
  formData.append('empresa_id', empresa_id);
  // formData.append('logo_old', logo_old__img); OBTENGO EL NOMBRE PARA ELIMINAR
  $(".sav_lo_ed").html(`<button class="btn btn-success" type="button" disabled> <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Guardando... </button>`)
  fetch('/guardar_logo_chatbot/', {
    method: 'POST',
    body: formData,
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    }
  }).then(rsp => rsp.text()).then(function (response) {

    if(response == "ok"){
      chatbot_personalizado();
      $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
      $(".sav_lo_ed").html(`<button type="button" class="btn btn-success" onclick="add_logo_chatbot(this)"> <i class="mdi mdi-thumb-up-outline"></i> </button> `)
  
    }
    if(response == "nook"){
      $.NotificationApp.send("Error!", "Vuelva a intentarlo", "top-right", "rgba(0,0,0,0.2)", "error")
      $(".sav_lo_ed").html(`<button type="button" class="btn btn-success" onclick="add_logo_chatbot(this)"> <i class="mdi mdi-thumb-up-outline"></i> </button> `)
    }

  })
}