var url_servidor = '192.168.18.23:8000';
var boddy = document.querySelector("body");
var div_chatbot = document.createElement("div");
var estado_terminos_condiciones = false // True= Aceptar T&C | False= Rechazo T&C
var htmlbot = `
<div class="fabs" style='z-index: 9999999;'>
  <div class="chat is-visible">
    <div class="chat_header">
      <div class="chat_option">
        <div class="header_img" style="margin-bottom: 8px;">
          <img class='chat_img_option' src="https://192.168.18.23:8000/static/chatbot_admin/assets/images/default.png" />
        </div>
        <span id="chat_head" style="font-weight: bold;">INGyBOT</span> <br> <span class="agent">.</span>
        <span class="online" style="font-weight: bold;">En Línea</span>
        <span id="chat_fullscreen_loader" class="chat_fullscreen_loader"><i class="fullscreen zmdi zmdi-window-maximize"></i></span>
      </div>
    </div>

    <div class="chat_body chat_login">
      <a id="chat_third_screen" class="fab is-visible chat_a_login"><i class="zmdi zmdi-arrow-right"></i></a>
      <p class='clss_p' id='cb_frm'>Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.</p>
      <div id="form_id">
        <div class="field">
          <input type="text" placeholder="Ingresa tu nombre" id="txtusuario" name="txtusuario">
        </div>
        <p style='text-align: center;color: red;display: none;animation: 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 normal none running zoomIn;' id='camp_obli'>campo obligatirio</p>
        <input type='hidden' id='key_alias'>
        <input type='hidden' id='nombre_chat'>
      </div>
    </div>


    <div id="chat_form" class="chat_converse chat_form">
      <span class="chat_msg_item chat_msg_item_admin">Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></span>
            
      <center class='t_y_c_cls'>

        <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c'>Aceptar</button>
        <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c'>Rechazar</button>
      
      </center>

    </div>
      
    <div>
      <span class="" style='display: none;left: 37px;position: absolute;bottom: 60px;animation: 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 normal none running zoomIn;' id='carga_new'>
      
        <div class="contenido_carga">
          <div class="point"></div>
          <div class="point"></div>
          <div class="point"></div>
        </div>
      
      </span>

      <div class="fab_field">
  
      </div>
    
    </div>
  </div>
  <a id="prime" class="fab is-float is-visible"><i class="prime zmdi zmdi-close"></i></a>
</div>`;
div_chatbot.innerHTML = htmlbot
div_chatbot.setAttribute('id', 'chatboot_anthony_2020')
boddy.append(div_chatbot);

/*=============================================
CONFIGURACION CHATBOT
=============================================*/
hideChat(0);
document.getElementById('prime').addEventListener('click', function () {
  console.log('click')
  toggleFab();
})
//Toggle chat and lchats
function toggleFab() {
  document.querySelector(".prime").classList.toggle("zmdi-comment-outline");
  document.querySelector(".prime").classList.toggle("zmdi-close");
  document.querySelector(".prime").classList.toggle("is-active");
  document.querySelector(".prime").classList.toggle("is-visible");
  document.querySelector("#prime").classList.toggle("is-float");
  document.querySelector(".chat").classList.toggle("is-visible");
  document.querySelectorAll('.fab').forEach(fab => {
    fab.classList.toggle("is-visible");
  });
}
document.querySelector('#chat_third_screen').addEventListener("click", function (e) {
  hideChat(2);
})
document.querySelector('#chat_fullscreen_loader').addEventListener("click", function (e) {
  document.querySelector(".fullscreen").classList.toggle("zmdi-window-maximize");
  document.querySelector(".fullscreen").classList.toggle("zmdi-window-restore");
  document.querySelector(".chat").classList.toggle("chat_fullscreen");
  document.querySelectorAll('.fab').forEach(fab => {
    fab.classList.toggle("is-hide");
  });
  document.querySelector(".header_img").classList.toggle("change_img");
  document.querySelector(".chat_header").classList.toggle("chat_header2");
  document.querySelector(".fab_field").classList.toggle("fab_field2");
  document.querySelector(".chat_converse").classList.toggle("chat_converse2");
});

/*=============================================
LOCALSTORAGE PARA ALIAS SESION
=============================================*/
function aliasLS() {
  let num = 30
  const characters = '1234567890abcdefghijklmnopqrstuvwxyz';
  let codigo = '';
  var nombre_usuario = div_chatbot.querySelector('#txtusuario').value
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    codigo += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  datosLS = {
    codigo: codigo,
    nombre: nombre_usuario,
  }
  localStorage.setItem('alias_key', JSON.stringify(datosLS));
  key_alias = codigo
  div_chatbot.querySelector('#key_alias').value = key_alias
  div_chatbot.querySelector('#nombre_chat').value = nombre_usuario
  return key_alias
}

function hideChat(hide) {
  switch (hide) {
    case 0:
      document.getElementById('chat_form').style.display = 'none'; //conversaciones
      document.querySelector(".chat_header").style.display = 'block'; //bienvenida
      document.querySelector(".chat_fullscreen_loader").style.display = 'none'; //bienvenida
      break;
    case 2:
      aliasLS()
      var nombre_usuario = document.getElementById('txtusuario').value
      if (nombre_usuario != '') {
        let fromData = new FormData;
        fromData.append('nomb', nombre_usuario);
        fetch('https://' + url_servidor + '/getnombre/?nomb=' + nombre_usuario + '&user_alias=' + key_alias, {
          method: 'GET',
        }).then(jsonRsp => {}).catch(e => {
          console.log('e :', e);
        })
        document.querySelector(".fab_field").innerHTML =
          `
          <a id="fab_camera" class="fab fab_a_field"><i class="zmdi zmdi-mic"></i></a>
          <a href="javascript: enviar_texto(this);" id="fab_send" class="fab" style='z-index: 99999;'><i class="zmdi zmdi-mail-send"></i></a>

          <input type="text" id="textInput" onkeypress='return escribir(event)' name="chat_message" placeholder="Escribe algo..." class="chat_field chat_message">`;

        document.querySelectorAll('.fab').forEach(fab => {
          fab.classList.toggle("is-visible");
        });
        document.getElementById('chat_form').style.display = 'block'
        document.querySelector(".chat_login").style.display = 'none';
        document.querySelector(".chat_fullscreen_loader").style.display = 'block';

      } else {
        document.getElementById('camp_obli').style.display = 'block';
      }
      break;
  }
}

/*=============================================
    ACEPTAR | RECHAZAR TERMINOS Y CONDICIONES
=============================================*/
function btn_terminos_condiciones(action, ac) {
  var tmp = ''
  var tmp2 = ''
  if (action == 'Aceptar') {

    let userHtml = '<span class=""> Aceptar </span>';
    let div_p = document.querySelector("#chat_form");
    let acept = document.createElement("div");
    acept.className = "chat_msg_item chat_msg_item_user"; //Agrego una clase dentro del div
    acept.innerHTML = userHtml
    div_p.append(acept)
    div_p.scrollTop = div_p.scrollHeight;

    var nombre_usuario = div_chatbot.querySelector('#txtusuario').value
    estado_terminos_condiciones = true

    document.getElementById('carga_new').style.display = "block";
    tmp += `
    <span><i>Hola <strong id='nomb_chat'>${nombre_usuario.toUpperCase()} </strong>, </i> Gracias por aceptar nuestros T&C</span>`

    tmp2 += `
    <span><i  id='cb_bienv'> bienvenido a nuestro sitio, si necesita ayuda,simplemente responda a este mensaje, estamos en línea y listos para ayudar.</i></span>`
    setTimeout(() => {

      // TEXTO 01
      document.getElementById('carga_new').style.display = "none";
      var div_r2 = document.querySelector("#chat_form");
      let r2 = document.createElement("div");
      r2.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r2.innerHTML = tmp
      div_r2.append(r2)
      div_r2.scrollTop = div_r2.scrollHeight;
      // TEXTO 02
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat_form");
      let r = document.createElement("div");
      r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r.innerHTML = tmp2
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
      document.getElementById('textInput').value = 'Menú principal'
      getBotResponse();
      document.getElementById('textInput').value = ''
    }, 1600);
    ac.closest('.t_y_c_cls').style.display = 'none'
  }
  if (action == 'Rechazar') {
    estado_terminos_condiciones = false
    document.getElementById('carga_new').style.display = "block";
    tmp += `<span>Nos apena que no aceptes nuestros T&C. Lamentablemente no podemos brindarte ayuda por este medio.</span>`
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat_form");
      let r = document.createElement("div");
      r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
    }, 1600);
    ac.closest('.t_y_c_cls').style.display = 'none'
  }
}

/*=============================================
INICIAR CHATBOT
=============================================*/
var ls_LS = localStorage.getItem('datos')
var user_autenticate

function getBotResponse() {
  
  microfono();
  var id_cliente_usu_attr = document.getElementById('libreria_chatbot').getAttribute('user')
  var id_empresa_e_attr = document.getElementById('libreria_chatbot').getAttribute('empresa')
  var html_all = '';
  var html_all_pre_rpta = '';
  if (ls_LS == null) {
    user_autenticate = false
  } else {
    user_autenticate = JSON.parse(ls_LS).user_autenticate;
  }
  var key_alias = div_chatbot.querySelector('#key_alias').value
  var nombre_chat = div_chatbot.querySelector('#nombre_chat').value
  var rawText = document.getElementById('textInput').value
  if (rawText != '') {
    var userHtml = '<span class="">' + rawText + '</span>';
    var div_p = document.querySelector("#chat_form");
    let p = document.createElement("div");
    p.className = "chat_msg_item chat_msg_item_user"; //Agrego una clase dentro del div
    p.innerHTML = userHtml
    div_p.append(p)
    div_p.scrollTop = div_p.scrollHeight;
    
    fetch('https://' + url_servidor + '/getchat/?msg=' + rawText + '&id_user_create=' + id_cliente_usu_attr + '&id_empresa_id=' + id_empresa_e_attr + '&user_autenticate=' + user_autenticate + '&user_alias=' + key_alias + '&nombre_chat=' + nombre_chat, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      let decodedStr = atob(response);
      const rpta_rpta = JSON.parse(decodedStr)
      if (rpta_rpta['respuesta_tipo'][0]['tipo'] == 'texto') {
        document.getElementById('carga_new').style.display = "block";
        rpta_rpta['respuesta_tipo'][0]['rpta'].forEach(rpta_one => {

          setTimeout(() => {
            document.getElementById('carga_new').style.display = "none";
            var div_r = document.querySelector("#chat_form");
            let r = document.createElement("div");
            r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
            r.innerHTML = '<span>'+ rpta_one['respueta_sl_texto'] +'</span>'
            div_r.append(r)
            div_r.scrollTop = div_r.scrollHeight;
          }, 1600);
        });
      }

      if (rpta_rpta['respuesta_tipo'][0]['tipo'] == 'slider') {




        document.getElementById('carga_new').style.display = "block";
        html_all_pre_rpta += '<span>'+ rpta_rpta['pre_respuesta']['pre_rpta'] +'</span>'
        html_all += `
                <div style="padding: 0px 10px 0px 20px;margin-bottom: 90px;" id="container-slider">
                  <div class="slideshow-container">
                    <div id="slider">`

                    rpta_rpta['respuesta_tipo'].forEach(elent_rpta => {
                      var acciones_rpta = elent_rpta['acciones'];
                      html_all += `
                      <div class="mySlides fade_">`
                      
                        if (elent_rpta['img'] != ' ') {
                          html_all += `<img class="img_new" src="https://192.168.18.23:8000/media/${elent_rpta['img']}">`
                        } else {
                          html_all += `<img class="img_new" src="https://192.168.18.23:8000/media/slider/ahorros.png">`
                        }

                          html_all += `
                        <div>
                          <p class="text">${elent_rpta['titulo_imagen']}</p>
                          <p class="text2">${elent_rpta['descripcion']}</p>
                        </div>
                        <div class="pos_accion">`

                        acciones_rpta.forEach(act => {
                          if (acciones_rpta.length == 1) {
                            html_all += `<button class="btn_accion" onclick="accion_rpta('${elent_rpta['titulo_imagen']}')" >${act}</button>`
                          } else {
                            html_all += `<button class="btn_accion"  onclick="accion_rpta('${act} de ${elent_rpta['titulo_imagen']}')" >${act}</button>`
                          }
                        });

                        // prev.click;
                        

                        



                    html_all += `
                              </div>
                            </div>`
                    });
      html_all += `
                    </div>
                    <a class="prev" onclick="plusSlides(-1,this)">❮</a>
                    <a class="next presionar" onclick="plusSlides(1,this)">❯</a>
                  </div>
                  <br>
                </div>`;
              setTimeout(function () { 
                
                // pre respuesta
                document.getElementById('carga_new').style.display = "none";
                var div_r2 = document.querySelector("#chat_form");
                let r2 = document.createElement("div");
                r2.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
                r2.innerHTML = html_all_pre_rpta
                div_r2.append(r2)
                div_r2.scrollTop = div_r2.scrollHeight;
      
                 // respuesta SLIDER
                document.getElementById('carga_new').style.display = "none";
                var div_r = document.querySelector("#chat_form");
                let r = document.createElement("div");
                r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
                r.innerHTML = html_all
                div_r.append(r)
                div_r.scrollTop = div_r.scrollHeight;

                presionar_click();
      
              }, 1600)

      }
    }).catch(e => {
      //mostrar mensaje de error
      console.log(e);
    })
  }
}

function presionar_click(){
  var presionar = document.querySelectorAll('.presionar');
  // presionar.forEach(element => {
  //   element.click();
  // });
  for (let i = 0; i < presionar.length; i++) {
    console.log(presionar.length-1); //Click en el ultimo slider
    presionar[presionar.length-1].click();
  }
}

function escribir(e) {
  if (e.keyCode == 13) {

    if (estado_terminos_condiciones == true) {

      getBotResponse();
      document.getElementById('textInput').value = ''

    } else {

      estado_terminos_condiciones = false

      document.getElementById('carga_new').style.display = "block";
      
      var tmp = `
      <span>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></span>
      <center class='t_y_c_cls'>
        <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c'>Aceptar</button>
        <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c'>Rechazar</button>
      </center>`;
      setTimeout(() => {
        document.getElementById('carga_new').style.display = "none";
        var div_r = document.querySelector("#chat_form");
        let r = document.createElement("div");
        r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
        r.innerHTML = tmp
        div_r.append(r)
        div_r.scrollTop = div_r.scrollHeight;
      }, 1600);
    }
  }
}
/*=============================================
CONFIGURACION SLIDER
=============================================*/
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n,objeto) {
  showSlides(slideIndex += n,objeto);
}
function showSlides(n,objeto) {
  let slider = objeto.closest('#container-slider').querySelector('#slider');
  let i;
  let slides = slider.getElementsByClassName("mySlides");
  let dots = slider.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
}

/*=============================================
RESPUESTAS DE ACCIONES
=============================================*/
function accion_rpta(e) {

  if (estado_terminos_condiciones == true) {

    document.getElementById('textInput').value = e
    getBotResponse();
    document.getElementById('textInput').value = ''

  }else{
    estado_terminos_condiciones = false
    document.getElementById('carga_new').style.display = "block";
      
    var tmp = `
    <span>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></span>
    <center class='t_y_c_cls'>
      <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c'>Aceptar</button>
      <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c'>Rechazar</button>
    </center>`;
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat_form");
      let r = document.createElement("div");
      r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
    }, 1600);
  }

}

function enviar_texto(){
  if (estado_terminos_condiciones == true) {
    estado_terminos_condiciones = true
    getBotResponse();
    document.getElementById('textInput').value = ''
  }else{
    estado_terminos_condiciones = false
    document.getElementById('carga_new').style.display = "block";
    var tmp = `
    <span>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></span>
    <center class='t_y_c_cls'>
      <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c'>Aceptar</button>
      <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c'>Rechazar</button>
    </center>`;
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat_form");
      let r = document.createElement("div");
      r.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
    }, 1600);
  }
}

/*=============================================
CHAT MICROFONO
=============================================*/
function microfono(){
  let mic = document.getElementById("fab_camera");
  let texto = document.getElementById('textInput');
  let recognition = new webkitSpeechRecognition()
  recognition.lang = 'es-ES';
  recognition.continuous = true; //Siga grabando
  recognition.interimResults = false; //Si nos quedamos callado que deje de grabar
  recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    texto.value += frase
    getBotResponse();
    texto.value = ''
    recognition.abort();
    mic.style.background = '#ffffff';
  }
  document.getElementById("fab_camera").addEventListener("click", function () {
    recognition.start();
    mic.style.background = '#009805';
  })
}
