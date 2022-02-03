


function comenzar_chat() {
  var element = document.getElementById("chat-mai");
  var element2 = document.getElementById("body-chat");
  var camp_obli = document.getElementById("camp_obli");
  var nombre_usuario = document.getElementById('txtusuario').value

  console.log("nombre_usuario :",nombre_usuario)

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

} else {

  var id_cliente = JSON.parse(guardado).id_cliente;
  var username = JSON.parse(guardado).username;
  var nombrebd = JSON.parse(guardado).nombrebd;
  var id_empresa = JSON.parse(guardado).id_empresa;

  // $('.username_user_ls').html(JSON.parse(guardado).username.toUpperCase() + ' - Bienvenido')
  $('#id_nombreBD').val(JSON.parse(guardado).nombrebd + '.sqlite3')
  $('#nombrebd_logueado').val(JSON.parse(guardado).nombrebd + '.sqlite3')
  $('#empresa_rpta').val(JSON.parse(guardado).id_empresa)
  $('#usu_rpta').val(JSON.parse(guardado).id_cliente)

  $("#libreria_chatbot").attr('empresa_id',id_cliente);

}

datos = {
  id_cliente: id_cliente,
  username: username,
  nombrebd: nombrebd,
  id_empresa: id_empresa,
}

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
  
  var id_cliente_usu = $("#libreria_chatbot").attr('empresa_id');
  console.log('id_empresa y id_empresa :',id_cliente_usu);


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
    id_user_create: id_cliente_usu
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
  if (e.which == 13) {
    getBotResponse();
  }
});