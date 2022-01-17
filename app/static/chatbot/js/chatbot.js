$(document).ready(function () {
    $(".chat-bot-icon").click(function (e) {
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');
    });

    $('.chat-mail button').click(function () {

        if ($('#txtusuario').val() == "") {

            $('#alert_nom').show();
            $('#alert_nom').text('Ingresa tu nombre');

        }else{
            $('.chat-mail').addClass('hide');
            $('.chat-body').removeClass('hide');
            $('.chat-input').removeClass('hide');
            $('.chat-header-option').removeClass('hide');
        }
    });
    $('.end-chat').click(function () {
        $('.chat-body').addClass('hide');
        $('.chat-input').addClass('hide');
        $('.chat-session-end').removeClass('hide');
        $('.chat-header-option').addClass('hide');
    });

});