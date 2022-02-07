function comenzar_chat() {
  var element = document.getElementById("chat-mai");
  var element2 = document.getElementById("body-chat");
  var camp_obli = document.getElementById("camp_obli");
  var nombre_usuario = document.getElementById('txtusuario').value

  console.log("nombre_usuario :", nombre_usuario)

  if (nombre_usuario == "") {
    camp_obli.style.display = "block";
  } else {

    camp_obli.style.display = "none";
    element.style.display = "none";
    element2.style.display = "block";

    $.ajax({
      url: 'http://127.0.0.1:8000/getnombre',
      type: "GET",
      data: {
        'nomb': nombre_usuario,
      },
    });
  }
}

/*=============================================
AGREGAMOS DATOS AL LOCALSTORAGE
=============================================*/
var guardado = localStorage.getItem('datos') || '';

if (guardado == '') {

  var id_cliente = $("#id_user_logueado").val();
  var username = $("#username_logueado").val();
  var nombrebd = $("#nombrebd_logueado").val();
  var id_empresa = $("#empresa_logueado").val();
  var tipo_usu = $("#permisos_logueado").val();

  if (tipo_usu == 'True') {
    $('.li_permisos').show()
  }

} else {

  var id_cliente = JSON.parse(guardado).id_cliente;
  var username = JSON.parse(guardado).username;
  var nombrebd = JSON.parse(guardado).nombrebd;
  var id_empresa = JSON.parse(guardado).id_empresa;
  var tipo_usu = JSON.parse(guardado).tipo_usu;

  $('.username_user_ls').html(JSON.parse(guardado).username.toUpperCase() + ' - Bienvenido')
  $('#id_nombreBD').val(JSON.parse(guardado).nombrebd + '.sqlite3')
  $('#nombrebd_logueado').val(JSON.parse(guardado).nombrebd + '.sqlite3')
  $('#empresa_rpta').val(JSON.parse(guardado).id_empresa)
  $('#usu_rpta').val(JSON.parse(guardado).id_cliente)

  $("#libreria_chatbot").attr('user', id_cliente);
  $("#libreria_chatbot").attr('empresa', id_empresa);

  if (tipo_usu == 'True') {
    $('.li_permisos').show()
  }

}

datos = {
  id_cliente: id_cliente,
  username: username,
  nombrebd: nombrebd,
  id_empresa: id_empresa,
  tipo_usu: tipo_usu
}

/*=============================================
GENERANDO LINK
=============================================*/
$('#linkcss01').html('"http://127.0.0.1:8000/static/chatbot/css/style_chatbot.css"')
$('#scriptjs01').html('"http://127.0.0.1:8000/static/chatbot/js/js.js"')
$('#scriptjs02').html('"http://127.0.0.1:8000/static/chatbot/js/a076d05399.js"')
$('#id_user').html('"' + id_cliente + '"')
$('#id_empr').html('"' + id_empresa + '"')
$('#scriptjs03').html('"http://127.0.0.1:8000/static/chatbot/js/chatbot.js"')
$('#scriptjs04').html('"http://127.0.0.1:8000/static/chatbot/js/chatbot_integration.js"')

// Guardo el objeto como un string
localStorage.setItem('datos', JSON.stringify(datos));

// Obtengo el string previamente salvado y luego
var guardado = localStorage.getItem('datos');


/*=============================================
LIMPIAR EL LOCALSTORAGE AL CERRAR SESSIÓN
=============================================*/
$(document).on('click', '#logout_sess', (e) => {

  localStorage.clear();

})

// === EMPEZAR CHAT ===
var chat = document.getElementById("chat"); // Scrool
chat.scrollTop = chat.scrollHeight - chat.clientHeight;

function getBotResponse() {

  var id_cliente_usu = $("#libreria_chatbot").attr('user');
  var id_empresa_e = $("#libreria_chatbot").attr('empresa');
  console.log('id_empresa y id_empresa :', id_empresa_e);


  $("#chat2").animate({
    scrollTop: $('#chat').prop("scrollHeight")
  }, 1000);

  var rawText = $("#textInput").val();
  var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
  $("#textInput").val("");
  $("#chat").append(userHtml);


  $("#chat2").animate({
    scrollTop: $('#chat').prop("scrollHeight")
  }, 1000);

  $.get("http://127.0.0.1:8000/getchat", {
    msg: rawText,
    id_user_create: id_cliente_usu,
    id_empresa_id: id_empresa_e
  }).done(function (data) {

    var botHtml = '<div class="chat-bubble you">' + data + "</div>";

    $('#carga_new').show();


    setTimeout(() => {

      $('#carga_new').hide();
      $("#chat").append(botHtml);


      $("#chat2").animate({
        scrollTop: $('#chat').prop("scrollHeight")
      }, 1000);
    }, 1600)



  });
}

$("#textInput").keypress(function (e) {

  console.log('enter')
  if (e.keyCode == 13) {
    getBotResponse();
  }
});



function enviar_texto(){
  getBotResponse();

}