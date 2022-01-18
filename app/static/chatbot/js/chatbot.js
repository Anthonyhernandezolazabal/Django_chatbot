$(document).ready(function () {
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
      $.get('http://127.0.0.1:8000/getnombre/', {
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

  function getBotResponse(){
    $("#chat2").animate({scrollTop: $('#chat').prop("scrollHeight")}, 1000);

    var rawText = $("#textInput").val();
    var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
    $("#textInput").val("");
    $("#chat").append(userHtml);
    document.getElementById("userInput").scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    $.get("http://127.0.0.1:8000/getchat/", {
      msg: rawText
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