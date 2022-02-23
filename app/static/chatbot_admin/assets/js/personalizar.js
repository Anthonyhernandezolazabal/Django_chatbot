var url_servidor = 'chatbot.demoregistro.xyz';
var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;
chatbot_personalizado();

function lblbl() {
  document.querySelector('#li_cb2').classList.remove("active");
  document.querySelector('#cuerpo_chatbot').classList.remove("active");
  document.querySelector('#li_cb').classList.add("active");
  document.querySelector('#inici_chatbot').classList.add("active");

}

document.querySelector('#frm_pbienvenida').addEventListener('click', function () {
  document.querySelector('#li_cb').classList.remove("active");
  document.querySelector('#inici_chatbot').classList.remove("active");
  document.querySelector('#li_cb2').classList.add("active");
  document.querySelector('#cuerpo_chatbot').classList.add("active");
})

document.querySelector('#frm_ptitulo').addEventListener('click', function () {
  lblbl();
})
document.querySelector('#frm_pboton').addEventListener('click', function () {
  lblbl();
})
document.querySelector('#frm_pdatos').addEventListener('click', function () {
  lblbl();
})


function myFunctionT() {
  var x = document.getElementById("frm_ptitulo").value;
  if (x != '') {
    document.querySelector('#pr_tl2').innerText = x
  } else {
    document.querySelector('#pr_tl2').innerText = '¿Charlemos? - En línea'
  }
}

function myFunctionBTN() {
  var x = document.getElementById("frm_pboton").value;
  if (x != '') {
    document.querySelector('#pr_btn').innerText = x
  } else {
    document.querySelector('#pr_btn').innerText = 'Comenzar chat'
  }
}

function myFunctionBTND() {
  var x = document.getElementById("frm_pdatos").value;
  if (x != '') {
    document.querySelector('#pr_frm').innerText = x
  } else {
    document.querySelector('#pr_frm').innerText = 'Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.'
  }
}

function myFunctionBN() {
  var x = document.getElementById("frm_pbienvenida").value;
  if (x != '') {
    document.querySelector('#pr_bienv').innerText = x
  } else {
    document.querySelector('#pr_bienv').innerText = 'bienvenido a nuestro sitio, si necesita ayuda, simplemente responda a este mensaje, estamos en línea y listos para ayudar.'
  }
}

/*=============================================
ENVIO AL APIVIEWS AL VIEWS DEL CHATBOT DATOS DE PERSONALIZACION
=============================================*/
/* ==== GET ==== */
function fn_edit_pr() {

  var titulo = document.querySelector('#frm_ptitulo');
  var datos = document.querySelector('#frm_pdatos');
  var bienvenida = document.querySelector('#frm_pbienvenida');
  var boton = document.querySelector('#frm_pboton');
  var id_pr_ct = document.querySelector('#id_pr_ct');

  document.querySelector('.btn_Habilitar_').style.display = 'none' //Oculta el habilitar

  fetch('https://' + url_servidor + '/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {

    console.log('response fn_edit_pr :', response)

    if (response.length > 0) {

      titulo.disabled = false;
      datos.disabled = false;
      bienvenida.disabled = false;
      boton.disabled = false;
      titulo.value = response[0]['titulo_header']
      datos.value = response[0]['titulo_cuerpo']
      bienvenida.value = response[0]['text_bienvenida']
      boton.value = response[0]['botones']
      id_pr_ct.value = response[0]['id']

      var html_btn_edit = ``;
      html_btn_edit += `<button type="button" class="btn btn-info" onclick="fn_editar_pr()"> <i class="mdi mdi-truck-fast me-1"></i> Guardar </button>`
      document.querySelector("#btn_save_upadte").innerHTML = html_btn_edit;

    } else {

      titulo.disabled = false;
      datos.disabled = false;
      bienvenida.disabled = false;
      boton.disabled = false;

      var html_btn_save = ``;
      html_btn_save += `<button type="button" class="btn btn-success" onclick="fn_guardar_pr()"> <i class="mdi mdi-truck-fast me-1"></i> Guardar </button>`
      document.querySelector("#btn_save_upadte").innerHTML = html_btn_save;

    }

  })

}

/* ==== POST ===== */
function fn_guardar_pr() {

  datos = {
    'titulo_header': document.querySelector('#frm_ptitulo').value,
    'titulo_cuerpo': document.querySelector('#frm_pdatos').value,
    'botones': document.querySelector('#frm_pboton').value,
    'text_bienvenida': document.querySelector('#frm_pbienvenida').value,
    'id_empresa_cliente': empresa_id
  }

  fetch('https://' + url_servidor + '/personalizar_chat/', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json"
    }

  }).then((data) => {

    document.querySelector('#frm_ptitulo').disabled = true;
    document.querySelector('#frm_pdatos').disabled = true;
    document.querySelector('#frm_pbienvenida').disabled = true;
    document.querySelector('#frm_pboton').disabled = true;
    document.querySelector('#id_pr_ct').disabled = true;

    $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
    chatbot_personalizado();

    document.querySelector('#frm_ptitulo').value = '';
    document.querySelector('#frm_pdatos').value = '';
    document.querySelector('#frm_pbienvenida').value = '';
    document.querySelector('#frm_pboton').value = '';
    document.querySelector('#id_pr_ct').value = '';

    document.querySelector('.btn_Habilitar_').style.display = 'block';

    var html_btn_save = ``;
    html_btn_save += ``
    document.querySelector("#btn_save_upadte").innerHTML = html_btn_edit;

  })

}
/*=============================================
CHATBOT PERSONALIZADO
=============================================*/
function chatbot_personalizado() {

  fetch('https://' + url_servidor + '/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {

    document.querySelector('#pr_tl').innerHTML = response[0]['titulo_header'];
    document.querySelector('#pr_tl2').innerHTML = response[0]['titulo_header'];
    document.querySelector('#pr_frm').innerHTML = response[0]['titulo_cuerpo'];
    document.querySelector('#pr_bienv').innerHTML = response[0]['text_bienvenida'];
    document.querySelector('#pr_btn').innerHTML = response[0]['botones'];

  })

}

function fn_editar_pr() {

  datos = [{

    'id': document.querySelector('#id_pr_ct').value,
    'titulo_header': document.querySelector('#frm_ptitulo').value,
    'titulo_cuerpo': document.querySelector('#frm_pdatos').value,
    'botones': document.querySelector('#frm_pboton').value,
    'text_bienvenida': document.querySelector('#frm_pbienvenida').value,
    'id_empresa_cliente': empresa_id
  }]

  datos_rpta = JSON.stringify(datos)

  fetch('https://' + url_servidor + '/personalizar_edit/?datos=' + datos_rpta, {
    method: 'GET',
  }).then((data) => {

    console.log('data PUT :', data);


    document.querySelector('#frm_ptitulo').disabled = true;
    document.querySelector('#frm_pdatos').disabled = true;
    document.querySelector('#frm_pbienvenida').disabled = true;
    document.querySelector('#frm_pboton').disabled = true;
    document.querySelector('#id_pr_ct').disabled = true;

    $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
    chatbot_personalizado();

    document.querySelector('#frm_ptitulo').value = '';
    document.querySelector('#frm_pdatos').value = '';
    document.querySelector('#frm_pbienvenida').value = '';
    document.querySelector('#frm_pboton').value = '';
    document.querySelector('#id_pr_ct').value = '';

    document.querySelector('.btn_Habilitar_').style.display = 'block';

    var html_btn_edit = ``;
    html_btn_edit += ``
    document.querySelector("#btn_save_upadte").innerHTML = html_btn_edit;



  })

}