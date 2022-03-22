var url_servidor = '192.168.1.2:8000';
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
  document.querySelector('#xyz01').innerText = '';


}

function myFunctionBTN() {
  var x = document.getElementById("frm_pboton").value;
  if (x != '') {
    document.querySelector('#pr_btn').innerText = x
  } else {
    document.querySelector('#pr_btn').innerText = 'Comenzar chat'
  }
  document.querySelector('#xyz02').innerText = '';
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

function myFunctionBN() {
  var x = document.getElementById("frm_pbienvenida").value;
  if (x != '') {
    document.querySelector('#pr_bienv').innerText = x
  } else {
    document.querySelector('#pr_bienv').innerText = 'bienvenido a nuestro sitio, si necesita ayuda, simplemente responda a este mensaje, estamos en línea y listos para ayudar.'
  }
  document.querySelector('#xyz04').innerText = '';
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

  let ptitulo = document.querySelector('#frm_ptitulo').value;
  let pboton = document.querySelector('#frm_pboton').value;
  let pdatos = document.querySelector('#frm_pdatos').value;
  let pbienvenida = document.querySelector('#frm_pbienvenida').value;
  if (ptitulo == '' || pdatos == '' || pboton == '' || pbienvenida == '') {
    if (ptitulo == '') {
      document.querySelector('#xyz01').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz01').innerText = '';
    }
    if (pboton == '') {
      document.querySelector('#xyz02').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz02').innerText = '';
    }
    if (pdatos == '') {
      document.querySelector('#xyz03').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz03').innerText = '';
    }
    if (pbienvenida == '') {
      document.querySelector('#xyz04').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz04').innerText = '';
    }
  } else {

    var datos = {
      'titulo_header': ptitulo,
      'titulo_cuerpo': pdatos,
      'botones': pboton,
      'text_bienvenida': pbienvenida,
      'id_empresa_cliente': empresa_id
    }
    fetch('https://' + url_servidor + '/personalizar_chat/', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
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
    document.querySelector('#pr_tl').innerHTML = response[0]['titulo_header'];
    document.querySelector('#pr_tl2').innerHTML = response[0]['titulo_header'];
    document.querySelector('#pr_frm').innerHTML = response[0]['titulo_cuerpo'];
    document.querySelector('#pr_bienv').innerHTML = response[0]['text_bienvenida'];
    document.querySelector('#pr_btn').innerHTML = response[0]['botones'];
  })
}

function fn_editar_pr() {

  let ptitulo = document.querySelector('#frm_ptitulo').value;
  let pboton = document.querySelector('#frm_pboton').value;
  let pdatos = document.querySelector('#frm_pdatos').value;
  let pbienvenida = document.querySelector('#frm_pbienvenida').value;

  if (ptitulo == '' || pdatos == '' || pboton == '' || pbienvenida == '') {
    if (ptitulo == '') {
      document.querySelector('#xyz01').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz01').innerText = '';
    }
    if (pboton == '') {
      document.querySelector('#xyz02').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz02').innerText = '';
    }
    if (pdatos == '') {
      document.querySelector('#xyz03').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz03').innerText = '';
    }
    if (pbienvenida == '') {
      document.querySelector('#xyz04').innerText = 'Es necesario llenar este campo';
    } else {
      document.querySelector('#xyz04').innerText = '';
    }
  } else {
    var datos = [{
      'id': document.querySelector('#id_pr_ct').value,
      'titulo_header': ptitulo,
      'titulo_cuerpo': pdatos,
      'botones': pboton,
      'text_bienvenida': pbienvenida,
      'id_empresa_cliente': empresa_id
    }]
    datos_rpta = JSON.stringify(datos)
    fetch('https://' + url_servidor + '/personalizar_edit/?datos=' + datos_rpta, {
      method: 'GET',
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
      document.querySelector("#btn_save_upadte").innerHTML = '';
    })
  }


}