var url_servidor = '192.168.18.23:8000';
var ls = localStorage.getItem('datos')
var empresa_id = JSON.parse(ls).id_empresa;
chatbot_personalizado();

// inicio
function lblbl() {
  document.querySelector('#li_cb2').classList.remove("active");
  document.querySelector('#cuerpo_chatbot').classList.remove("active");
  document.querySelector('#li_cb').classList.add("active");
  document.querySelector('#inici_chatbot').classList.add("active");
}


document.querySelector('#frm_ptitulo').addEventListener('click', function () {
  lblbl();
})
document.querySelector('#frm_pdatos').addEventListener('click', function () {
  lblbl();
})

// conversacion
function lblblconversacion(){
  document.querySelector('#li_cb').classList.remove("active");
  document.querySelector('#inici_chatbot').classList.remove("active");
  document.querySelector('#li_cb2').classList.add("active");
  document.querySelector('#cuerpo_chatbot').classList.add("active");
}


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



document.querySelector('#frm_pbienvenida').addEventListener('click', function () {
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





/*=============================================
ENVIO AL APIVIEWS AL VIEWS DEL CHATBOT DATOS DE PERSONALIZACION
=============================================*/
/* ==== GET ==== */
function fn_edit_pr() {

  var titulo = document.querySelector('#frm_ptitulo');
  var datos = document.querySelector('#frm_pdatos');
  var terminos_y_condiciones = document.querySelector('#frm_pboton');
  var link_terminos_y_condiciones = document.querySelector('#frm_link');
  var aceptar_terminos_y_condiciones = document.querySelector('#frm_t_y_c_aceptar');
  var rechazar_terminos_y_condiciones = document.querySelector('#frm_t_y_c_rechazar');
  var c_cht = document.querySelector('#c_cht');
  var c_bt = document.querySelector('#c_bt');
  var id_pr_ct = document.querySelector('#id_pr_ct');

  document.querySelector('.btn_Habilitar_').style.display = 'none' //Oculta el habilitar

  fetch('https://' + url_servidor + '/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    console.log(response)
    if (response.length > 0) {

      titulo.disabled = false;
      datos.disabled = false;
      terminos_y_condiciones.disabled = false;
      link_terminos_y_condiciones.disabled = false;
      aceptar_terminos_y_condiciones.disabled = false;
      rechazar_terminos_y_condiciones.disabled = false;

      c_cht.style.display='block';
      c_bt.style.display='block';

      terminos_y_condiciones.value = response[0]['terminos_y_condiciones']
      link_terminos_y_condiciones.value = response[0]['terminos_y_condiciones_link']
      aceptar_terminos_y_condiciones.value = response[0]['terminos_y_condiciones_aceptar']
      rechazar_terminos_y_condiciones.value = response[0]['terminos_y_condiciones_rechazar']
      titulo.value = response[0]['nombre_chatbot']
      datos.value = response[0]['titulo_cuerpo']

      id_pr_ct.value = response[0]['id']


      var html_btn_edit = ``;
      html_btn_edit += `<button type="button" class="btn btn-info" onclick="fn_editar_pr()"> <i class="mdi mdi-truck-fast me-1"></i> Guardar </button>`
      document.querySelector("#btn_save_upadte").innerHTML = html_btn_edit;

    } else {

      titulo.disabled = false;
      datos.disabled = false;
      terminos_y_condiciones.disabled = false;
      link_terminos_y_condiciones.disabled = false;
      aceptar_terminos_y_condiciones.disabled = false;
      rechazar_terminos_y_condiciones.disabled = false;
      c_cht.style.display='block';
      c_bt.style.display='block';
      
      var html_btn_save = ``;
      html_btn_save += `<button type="button" class="btn btn-success" onclick="fn_guardar_pr()"> <i class="mdi mdi-truck-fast me-1"></i> Guardar </button>`
      document.querySelector("#btn_save_upadte").innerHTML = html_btn_save;
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
      'color_header': color_chatbot,
      'color_botones': color_btn_acciones,
      'id_empresa_cliente': empresa_id
    }

    fetch('https://' + url_servidor + '/personalizar_chat/', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': getCookie('csrftoken')
      }
    }).then((data) => {

      document.querySelector('#frm_ptitulo').disabled = true;
      document.querySelector('#frm_pdatos').disabled = true;
      document.querySelector('#frm_pboton').disabled = true;
      document.querySelector('#frm_link').disabled = true;
      document.querySelector('#frm_t_y_c_aceptar').disabled = true;
      document.querySelector('#frm_t_y_c_rechazar').disabled = true;

      $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
      chatbot_personalizado();

      document.querySelector('#frm_ptitulo').value = '';
      document.querySelector('#frm_pdatos').value = '';
      document.querySelector('#frm_pboton').value = '';
      document.querySelector('#frm_link').value = '';
      document.querySelector('#frm_t_y_c_aceptar').value = '';
      document.querySelector('#frm_t_y_c_rechazar').value = '';

      document.querySelector('.btn_Habilitar_').style.display = 'block';
      document.querySelector("#btn_save_upadte").innerHTML = '';
    })
  }
}
/*=============================================
CHATBOT PERSONALIZADO
=============================================*/
function chatbot_personalizado() {
  fetch('https://' + url_servidor + '/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    console.log(response)
    document.querySelector('.pr_terminos_condiciones_link').innerHTML = response[0]['terminos_y_condiciones_link']
    document.querySelector('.pr_terminos_condiciones_link').setAttribute('href',response[0]['terminos_y_condiciones_link'])
    document.querySelector('.pr_terminos_condiciones_link_aceptar').innerHTML = response[0]['terminos_y_condiciones_aceptar']
    document.querySelector('.pr_terminos_condiciones_link_rechazar').innerHTML = response[0]['terminos_y_condiciones_rechazar']
    document.querySelector('.pr_terminos_condiciones').innerHTML = response[0]['terminos_y_condiciones'];
    document.querySelector('.pr_tl').innerHTML = response[0]['nombre_chatbot'];
    document.querySelector('.pr_tl2').innerHTML = response[0]['nombre_chatbot'];
    document.querySelector('#pr_frm').innerHTML = response[0]['titulo_cuerpo'];


    document.querySelector('#chat_color').style.background = response[0]['color_header'];
    document.querySelector('#chat_color2').style.background = response[0]['color_header']; 

    document.querySelector('#color_chatbot').value = response[0]['color_header'];
    document.querySelector('#color_chatbot_acciones').value = response[0]['color_botones'];


    document.querySelector('#chat_third_screen').style.background = response[0]['color_botones'];
    document.querySelector('#t_y_c_a').style.background = response[0]['color_botones'];
    document.querySelector('#t_y_c_r').style.background = response[0]['color_botones'];

    document.querySelectorAll('.chat_rpta').forEach(rpta => {
      rpta.style.background = response[0]['color_header'];
      
    });

  })
}

function fn_editar_pr() {

  let pnombre = document.querySelector('#frm_ptitulo').value;
  let pdatos = document.querySelector('#frm_pdatos').value;
  let pt_y_c = document.querySelector('#frm_pboton').value;
  let pfrm_link = document.querySelector('#frm_link').value;
  let pfrm_t_y_c_aceptar = document.querySelector('#frm_t_y_c_aceptar').value;
  let frm_t_y_c_rechazar = document.querySelector('#frm_t_y_c_rechazar').value;

  let color_chatbot = document.querySelector('#color_chatbot').value;
  let color_btn_acciones = document.querySelector('#color_chatbot_acciones').value;

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

    var datos = [{
      'id': document.querySelector('#id_pr_ct').value,
      'nombre_chatbot': pnombre,
      'titulo_cuerpo': pdatos,
      'terminos_condiciones': pt_y_c,
      'terminos_condiciones_link': pfrm_link,
      't_y_c_aceptar': pfrm_t_y_c_aceptar,
      't_y_c_rechazar': frm_t_y_c_rechazar,
      'color_chatbot': color_chatbot,
      'color_btn_acciones': color_btn_acciones,
      'id_empresa_cliente': empresa_id
    }]
    datos_rpta = JSON.stringify(datos)
    fetch('https://' + url_servidor + '/personalizar_edit/?datos=' + datos_rpta, {
      method: 'GET',
    }).then((data) => {

      document.querySelector('#frm_ptitulo').disabled = true;
      document.querySelector('#frm_pdatos').disabled = true;
      document.querySelector('#frm_pboton').disabled = true;
      document.querySelector('#frm_link').disabled = true;
      document.querySelector('#frm_t_y_c_aceptar').disabled = true;
      document.querySelector('#frm_t_y_c_rechazar').disabled = true;
      
      $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success")
      chatbot_personalizado();


      document.querySelector('#frm_ptitulo').value = '';
      document.querySelector('#frm_pdatos').value = '';
      document.querySelector('#frm_pboton').value = '';
      document.querySelector('#frm_link').value = '';
      document.querySelector('#frm_t_y_c_aceptar').value = '';
      document.querySelector('#frm_t_y_c_rechazar').value = '';


      document.querySelector('.btn_Habilitar_').style.display = 'block';
      document.querySelector("#btn_save_upadte").innerHTML = '';


    })
  }


}