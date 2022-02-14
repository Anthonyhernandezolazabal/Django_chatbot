var boddy = document.querySelector("body");
var div_chatbot = document.createElement("div");
var htmlbot = `
    <input type="checkbox" id="click">
    <label for="click" id='label_l'><i class="fab fa-discourse"></i><i class="fas fa-times"></i></label>
    <div class="wrapper2">
      <div class="head-text">¿Charlemos? - En línea</div>
        <div class="chat-box" id='chat-mai'>
          <div class="desc-text">Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.</div>
            <div id="form_id">
              <div class="field">
                <input type="text" placeholder="Ingresa tu nombre" id="txtusuario" name="txtusuario">
              </div>
              <p style='text-align: center;color: red;display: none' id='camp_obli'>campo obligatorio</p>
              <div class="field">
                  <button type="button" onclick="comenzar_chat()">Comenzar chat</button>
              </div>
            </div>
        </div>
        <div class="chat-box" id='body-chat' style='display: none !important;'>
            <div class="chat-body" id="chat2">
              <div class="chat-start" id='dia_hora_chat'>Lunes, 1:27 PM</div>
              <div class="chat-bubble you">Bienvenido a nuestro sitio, si necesita ayuda, simplemente responda a este mensaje, estamos en línea y listos para ayudar.</div>
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
                <input type='hidden' id='rpta_data'>
                <input type='hidden' id='historial_chat'>
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
INGRESAR CAMPO NOMBRE 
=============================================*/
function comenzar_chat() {
  var element = div_chatbot.querySelector('#chat-mai')
  var element2 = div_chatbot.querySelector('#body-chat')
  var camp_obli = div_chatbot.querySelector('#camp_obli')
  var nombre_usuario = div_chatbot.querySelector('#txtusuario').value
  if (nombre_usuario == "") {
    camp_obli.style.display = "block";
  } else {
    camp_obli.style.display = "none";
    element.style.display = "none";
    element2.style.display = "block";
    let fromData = new FormData;
    fromData.append('nomb', nombre_usuario);
    fetch(`https://{url_servidor}/getnombre/?nomb=` + nombre_usuario, {
      method: 'GET',
    }).then(jsonRsp => {}).catch(e => {
      console.log(e);
    })
  }
}
/*=============================================
INICIAR CHATBOT
=============================================*/
var ls_LS = localStorage.getItem('datos')
function getBotResponse() {
  var id_cliente_usu_attr = document.getElementById('libreria_chatbot').getAttribute('user')
  var id_empresa_e_attr = document.getElementById('libreria_chatbot').getAttribute('empresa')
  var user_autenticate = JSON.parse(ls_LS).user_autenticate;
  var rawText = document.getElementById('textInput').value
  if (rawText != '') {
    var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
    var div_p = document.querySelector("#chat2");
    let p = document.createElement("div");
    p.innerHTML = userHtml
    div_p.append(p)
    div_p.scrollTop = div_p.scrollHeight;
    fetch('https://{url_servidor}/getchat/?msg=' + rawText + '&id_user_create=' + id_cliente_usu_attr + '&id_empresa_id=' + id_empresa_e_attr + '&user_autenticate=' + user_autenticate, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      var botHtml = '<div class="chat-bubble you">' + response + "</div>";
      document.getElementById('carga_new').style.display = "block";
      setTimeout(function () {
        document.getElementById('carga_new').style.display = "none";
        var div_r = document.querySelector("#chat2");
        let r = document.createElement("div");
        r.innerHTML = botHtml
        div_r.append(r)
        div_r.scrollTop = div_r.scrollHeight;
      }, 1600)
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
  console.log(results);
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
  document.getElementById('dia_hora_chat').innerHTML = strTime
}