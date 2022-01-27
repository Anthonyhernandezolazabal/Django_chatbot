$(document).ready(function () {


  /*=============================================
  AGREGAMOS DATOS AL LOCALSTORAGE
  =============================================*/
  var guardado = localStorage.getItem('datos')||'';

  console.log('objetoObtenido: ', guardado);

  if (guardado == '') {

    var id_cliente = $("#id_user_logueado").val();
    var username = $("#username_logueado").val();
    var nombrebd = $("#nombrebd_logueado").val();
    
  }else{

    var id_cliente =  JSON.parse(guardado).id_cliente;
    var username = JSON.parse(guardado).username;
    var nombrebd = JSON.parse(guardado).nombrebd;

    $('.username_user_ls').html(JSON.parse(guardado).username.toUpperCase()+' - Bienvenido')
    $('#id_id_user').val(JSON.parse(guardado).id_cliente)
    $('#id_nombreBD').val(JSON.parse(guardado).nombrebd+'.sqlite3')

  }

  datos = {
    id_cliente: id_cliente,
    username: username,
    nombrebd: nombrebd
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



  $(".chat-bot-icon").click(function (e) {
    $(this).children('svg').toggleClass('animate');
    $('.chat-screen').toggleClass('show-chat');
  });

  $('.chat-mail button').click(function () {

    if ($('#txtusuario').val() == "") {

      $('#alert_nom').show();
      $('#alert_nom').text('Ingresa tu nombre');

    } else {

      var nombre_usuario = $('#txtusuario').val();
      $('.chat-mail').addClass('hide');
      $('.chat-body').removeClass('hide');
      $('.chat-input').removeClass('hide');
      $('.chat-header-option').removeClass('hide');

      // MANDAR POR GET NOMBRE
      $.get('http://127.0.0.1:8000/getnombre', {
        nomb: nombre_usuario
      })
    }
  });
  $('.end-chat').click(function () {
    $('.chat-body').addClass('hide');
    $('.chat-input').addClass('hide');
    $('.chat-session-end').removeClass('hide');
    $('.chat-header-option').addClass('hide');
  });

  // === EMPEZAR CHAT ===
  var chat = document.getElementById("chat"); // Scrool
  chat.scrollTop = chat.scrollHeight - chat.clientHeight;

  function getBotResponse() {
    usuario_nomb = $('#nombre_text').val();
    $("#chat2").animate({
      scrollTop: $('#chat').prop("scrollHeight")
    }, 1000);

    var rawText = $("#textInput").val();
    var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
    $("#textInput").val("");
    $("#chat").append(userHtml);
    document.getElementById("userInput").scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    $.get("http://127.0.0.1:8000/getchat", {
      msg: rawText,
      id_user_create: id_cliente
    }).done(function (data) {

      var botHtml = '<div class="chat-bubble you">' + data + "</div>";

      $("#chat").append(botHtml);
      document.getElementById("userInput").scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    });
  }

  $("#textInput").keypress(function (e) {
    if (e.which == 13) {
      getBotResponse();
    }
  });


});