var url_servidor = '192.168.18.23:8000';
var boddy = document.querySelector("body");
var div_chatbot = document.createElement("div");
chatbot_personalizado();
var htmlbot = `
    <input type="checkbox" id="click">
    <label for="click" id='label_l'><i class="fab fa-discourse"></i><i class="fas fa-times"></i></label>
    <div class="wrapper2">
      <div class="head-text" id='cb_tl'>¿Charlemos? - En línea</div>
        <div class="chat-box" id='chat-mai'>
          <div class="desc-text" id='cb_frm'>Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.</div>
            <div id="form_id">
              <div class="field">
                <input type="text" placeholder="Ingresa tu nombre" id="txtusuario" name="txtusuario">
              </div>
              <p style='text-align: center;color: red;display: none' id='camp_obli'>campo obligatorio</p>
              <div class="field">
                  <button type="button" onclick="comenzar_chat()" id='cb_btn'>Comenzar chat</button>
              </div>
            </div>
        </div>
        <div class="chat-box" id='body-chat' style='display: none !important;'>
            <div class="chat-body" id="chat2">
              <div class="chat-start" id='dia_hora_chat'></div>
              <div class="chat-bubble you"><i>Hola <strong id='nomb_chat'>{Nombre} </strong>, </i> <i  id='cb_bienv'> bienvenido a nuestro sitio, si necesita ayuda,
              simplemente responda a este mensaje, estamos en línea y listos para ayudar.</i></div>
            </div>
            <div class="chatbox__messages" style='display: none' id='carga_new'>
              <div class="messages__item messages__item--typing">
                <span class="messages__dot"></span>
                <span class="messages__dot"></span>
                <span class="messages__dot"></span>
              </div>
            </div>
            <div class="chat-bar-input-block">
              <div id="userInput">
                <input id="textInput" onkeypress='return escribir(event)' class="input-box" type="text" name="msg" placeholder="Escribe algo...">
                <input type='hidden' id='key_alias'>
                <input type='hidden' id='nombre_chat'>
                <p></p>
              </div>
              <div>
                <a style='font-size: 30px;margin-right: 15px;' id='chat-icon'  href="javascript: enviar_texto(this);"><i class="fab fa-telegram-plane"></i></a>
              </div>
              <div>
                <a style='font-size: 30px;' id="mic"><i class="fas fa-microphone"></i></a>
              </div>
        </div>
      </div>
    </div>`;
div_chatbot.innerHTML = htmlbot
div_chatbot.setAttribute('id', 'chatboot_anthony_2020')
boddy.append(div_chatbot);
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
/*=============================================
INGRESAR CAMPO NOMBRE 
=============================================*/
function comenzar_chat() {
  formatAMPM()
  var element = div_chatbot.querySelector('#chat-mai')
  var element2 = div_chatbot.querySelector('#body-chat')
  var camp_obli = div_chatbot.querySelector('#camp_obli')
  var nombre_usuario = div_chatbot.querySelector('#txtusuario').value
  aliasLS()
  if (nombre_usuario == "") {
    camp_obli.style.display = "block";
  } else {
    camp_obli.style.display = "none";
    element.style.display = "none";
    element2.style.display = "block";
    div_chatbot.querySelector('#nomb_chat').innerText = nombre_usuario.toUpperCase()
    let fromData = new FormData;
    fromData.append('nomb', nombre_usuario);
    fetch('https://' + url_servidor + '/getnombre/?nomb=' + nombre_usuario + '&user_alias=' + key_alias, {
      method: 'GET',
    }).then(jsonRsp => {}).catch(e => {
      console.log('e :', e);
    })
  }
}
/*=============================================
INICIAR CHATBOT
=============================================*/
var ls_LS = localStorage.getItem('datos')
var user_autenticate

function getBotResponse() {
  var id_cliente_usu_attr = document.getElementById('libreria_chatbot').getAttribute('user')
  var id_empresa_e_attr = document.getElementById('libreria_chatbot').getAttribute('empresa')
  // var botHtml_texto;
  // var botHtml_slider;
  var html_all = '';

  if (ls_LS == null) {
    user_autenticate = false
  } else {
    user_autenticate = JSON.parse(ls_LS).user_autenticate;
  }
  var key_alias = div_chatbot.querySelector('#key_alias').value
  var nombre_chat = div_chatbot.querySelector('#nombre_chat').value
  var rawText = document.getElementById('textInput').value
  if (rawText != '') {
    var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
    var div_p = document.querySelector("#chat2");
    let p = document.createElement("div");
    p.innerHTML = userHtml
    div_p.append(p)
    div_p.scrollTop = div_p.scrollHeight;
    fetch('https://' + url_servidor + '/getchat/?msg=' + rawText + '&id_user_create=' + id_cliente_usu_attr + '&id_empresa_id=' + id_empresa_e_attr + '&user_autenticate=' + user_autenticate + '&user_alias=' + key_alias + '&nombre_chat=' + nombre_chat, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      let decodedStr = atob(response);
      const rpta_rpta = JSON.parse(decodedStr)

      console.log('decodedStr :', rpta_rpta)


        if (rpta_rpta[0]['tipo'] == 'texto') {
          document.getElementById('carga_new').style.display = "block";
          html_all += '<div class="chat-bubble you">' + rpta_rpta[0]['rpta'] + "</div>";
          setTimeout(function () {
            document.getElementById('carga_new').style.display = "none";
            var div_r = document.querySelector("#chat2");
            let r = document.createElement("div");
            r.innerHTML = html_all
            div_r.append(r)
            div_r.scrollTop = div_r.scrollHeight;
          }, 1600)
        }

        if (rpta_rpta[0]['tipo'] == 'slider') {

          document.getElementById('carga_new').style.display = "block";
          html_all += `
          <section id="container-slider" style='margin-top: 60px;margin-bottom: 35px;'>
            <a href="javascript: fntExecuteSlide('prev');" class="arrowPrev"><i class="fas fa-chevron-circle-left"></i></a>
            <a href="javascript: fntExecuteSlide('next');" class="arrowNext"><i class="fas fa-chevron-circle-right"></i></a>
            <ul class="listslider">
                <li><a itlist="itList_0" href="#" class="item-select-slid"></a></li>
                <li><a itlist="itList_1" href="#"></a></li>
                <li><a itlist="itList_2" href="#"></a></li>
            </ul>
            <ul id="slider">
              <li style="background-image: url('https://192.168.18.23:8000/static/chatbot_admin/img/canales.png'); z-index:0; opacity: 1;border-radius: 10px;">
                <div class="content_slider">
                    <div>
                      <h5>titulo_imagen</h5>
                      <p>descripcion</p>
                      <a href="#" class="btnSlider">act</a> <br><br>                        
                    </div>
                </div>
              </li>
            </ul>
          </section>`;
          setTimeout(function () {
            document.getElementById('carga_new').style.display = "none";
            var div_r = document.querySelector("#chat2");
            let r = document.createElement("div");
            r.innerHTML = html_all
            div_r.append(r)
            div_r.scrollTop = div_r.scrollHeight;
          }, 1600)
        }

      return;


      if (rpta_rpta[0]['tipo'] == 'texto') {
        document.getElementById('carga_new').style.display = "block";
        setTimeout(function () {
          document.getElementById('carga_new').style.display = "none";
          var div_r = document.querySelector("#chat2");
          let r = document.createElement("div");
          r.innerHTML = botHtml_texto
          div_r.append(r)
          div_r.scrollTop = div_r.scrollHeight;
        }, 1600)
      }

      if (rpta_rpta[0]['tipo'] == 'slider') {
        botHtml_slider += `
                  <section id="container-slider" style='margin-top: 60px;'>
                      <a href="javascript: fntExecuteSlide('prev');" class="arrowPrev"><i class="fas fa-chevron-circle-left"></i></a>
                      <a href="javascript: fntExecuteSlide('next');" class="arrowNext"><i class="fas fa-chevron-circle-right"></i></a>
                      <ul class="listslider">
                          <li><a itlist="itList_0" href="#" class="item-select-slid"></a></li>
                          <li><a itlist="itList_1" href="#"></a></li>
                          <li><a itlist="itList_2" href="#"></a></li>
                      </ul>
                      <ul id="slider">`;

        rpta_rpta.forEach(elent_rpta => {
          var acciones_rpta = elent_rpta['acciones'];


          botHtml_slider += `           
            <li
                style="background-image: url('https://192.168.18.23:8000/static/chatbot_admin/img/canales.png'); z-index:0; opacity: 1;">
                <div class="content_slider">
                    <div>
                        <h5>${elent_rpta['titulo_imagen']}</h5>
                        <p>${elent_rpta['descripcion']}</p>
                        `;
          acciones_rpta.forEach(act => {
            botHtml_slider += `<a href="#" class="btnSlider">${act}</a> <br><br>`
          });

          botHtml_slider += `                        
                    </div>
                </div>
            </li>`;

        });


        botHtml_slider += `
                          </ul>
                            </section>`;
        document.getElementById('carga_new').style.display = "block";
        setTimeout(() => {
          document.getElementById('carga_new').style.display = "none";
          var div_r = document.querySelector("#chat2");
          let r = document.createElement("div");
          r.innerHTML = botHtml_slider
          div_r.append(r)
          div_r.scrollTop = div_r.scrollHeight;
        }, 1600);
      }


    }).catch(e => {
      //mostrar mensaje de error
      console.log(e);
    })
  }
}

function escribir(e) {
  if (e.keyCode == 13) {
    getBotResponse();
    document.getElementById('textInput').value = ''
  }
}

function enviar_texto(e) {
  getBotResponse();
  document.getElementById('textInput').value = ''
}
/*=============================================
CHAT MICROFONO
=============================================*/
let mic = document.getElementById("mic");
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
  mic.style.color = '#6C757D';
}
mic.addEventListener("click", function () {
  recognition.start();
  mic.style.color = '#009805';
})

function formatAMPM() {
  let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  let date = new Date();
  var day = dias[date.getDay() - 1]
  date = new Date;
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = day + ', ' + hours + ':' + minutes + ' ' + ampm;
  document.getElementById('dia_hora_chat').innerText = strTime
}
/*=============================================
CHATBOT PERSONALIZADO
=============================================*/
function chatbot_personalizado() {
  var ls = localStorage.getItem('datos')
  var empresa_id = JSON.parse(ls).id_empresa;

  fetch('https://' + url_servidor + '/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {

    document.querySelector('#cb_tl').innerText = response[0]['titulo_header']
    document.querySelector('#cb_frm').innerText = response[0]['titulo_cuerpo']
    document.querySelector('#cb_bienv').innerText = response[0]['text_bienvenida']
    document.querySelector('#cb_btn').innerText = response[0]['botones']

  })

}



/*=============================================
                     SLIDER 
=============================================*/

// if (document.querySelector('#container-slider')) {
//   setInterval('fntExecuteSlide("next")', 5000);
// }
//------------------------------ LIST SLIDER -------------------------
if (document.querySelector('.listslider')) {
  let link = document.querySelectorAll(".listslider li a");
  link.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      let item = this.getAttribute('itlist');
      let arrItem = item.split("_");
      fntExecuteSlide(arrItem[1]);
      return false;
    });
  });
}

//-------------------------------- SLIDER HOME --------------------------------
function fntExecuteSlide(side) {

  let parentTarget = document.getElementById('slider');
  let elements = parentTarget.getElementsByTagName('li');
  let curElement, nextElement;

  for (var i = 0; i < elements.length; i++) {

    if (elements[i].style.opacity == 1) {
      curElement = i;
      break;
    }
  }
  if (side == 'prev' || side == 'next') {

    if (side == "prev") {
      nextElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
    } else {
      nextElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
    }
  } else {
    nextElement = side;
    side = (curElement > nextElement) ? 'prev' : 'next';

  }
  //RESALTA LOS PUNTOS
  let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
  elementSel[curElement].classList.remove("item-select-slid");
  elementSel[nextElement].classList.add("item-select-slid");
  elements[curElement].style.opacity = 0;
  elements[curElement].style.zIndex = 0;
  elements[nextElement].style.opacity = 1;
  elements[nextElement].style.zIndex = 1;
}