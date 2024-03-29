var boddy = document.querySelector("body");
var div_chatbot = document.createElement("div");
var estado_terminos_condiciones = false // True= Aceptar T&C | False= Rechazo T&C
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
              
              <div class="chat-bubble you">Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></div>

              <center class='t_y_c'>

                <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones'>Aceptar</button>
                <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones'>Rechazar</button>
              
              </center>

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

                
                <input type='hidden' id='texto_bienve'>
                <p></p>
              </div>
              <div>
                <a style='font-size: 30px;margin-right: 15px;' id='chat-icon' href="javascript: enviar_texto(this);"><i class="fab fa-telegram-plane"></i></a>
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

    let fromData = new FormData;
    fromData.append('nomb', nombre_usuario);
    fetch('/getnombre/?nomb=' + nombre_usuario + '&user_alias=' + key_alias, {
      method: 'GET',
    }).then(jsonRsp => {}).catch(e => {
      console.log('e :', e);
    })
  }
}

/*=============================================
                     SLIDER 
=============================================*/
function btn_terminos_condiciones(action, ac) {
  var tmp = ''
  if (action == 'Aceptar') {
    var  nombre_usuario = div_chatbot.querySelector('#txtusuario').value
    estado_terminos_condiciones = true
    document.getElementById('carga_new').style.display = "block";
    tmp += `
      <div class="chat-bubble you" style="margin-top: 12px;"><i>Hola <strong id='nomb_chat'>${nombre_usuario.toUpperCase()} </strong>, </i> <i  id='cb_bienv'> bienvenido a nuestro sitio, si necesita ayuda,simplemente responda a este mensaje, estamos en línea y listos para ayudar.</i></div>
    `
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat2");
      let r = document.createElement("div");
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;

      document.getElementById('textInput').value = 'Menú principal'
      getBotResponse();
      document.getElementById('textInput').value = ''

    }, 1600);
    ac.closest('.t_y_c').style.display = 'none'
  }

  if (action == 'Rechazar') {

    estado_terminos_condiciones = false

    document.getElementById('carga_new').style.display = "block";
    tmp += `
      <div class="chat-bubble you" style="margin-top: 12px;">Nos apena que no aceptes nuestros T&C. Lamentablemente no podemos brindarte ayuda por este medio.</div>
    `
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat2");
      let r = document.createElement("div");
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;

    }, 1600);
    ac.closest('.t_y_c').style.display = 'none'

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
    var userHtml = '<div class="chat-bubble me"> ' + rawText + ' </div>';
    var div_p = document.querySelector("#chat2");
    let p = document.createElement("div");
    p.classList.add("cl_div");
    p.innerHTML = userHtml
    div_p.append(p)
    div_p.scrollTop = div_p.scrollHeight;
    fetch('/getchat/?msg=' + rawText + '&id_user_create=' + id_cliente_usu_attr + '&id_empresa_id=' + id_empresa_e_attr + '&user_autenticate=' + user_autenticate + '&user_alias=' + key_alias + '&nombre_chat=' + nombre_chat, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      // console.log('response desde pythooon :', response)
      let decodedStr = atob(response);
      const rpta_rpta = JSON.parse(decodedStr)
      console.log('decodedStr rptaa:', rpta_rpta)
      if (rpta_rpta['respuesta_tipo'][0]['tipo'] == 'texto') {
        document.getElementById('carga_new').style.display = "block";
        rpta_rpta['respuesta_tipo'][0]['rpta'].forEach(rpta_one => {
          html_all += '<div class="chat-bubble you">' + rpta_one['respueta_sl_texto'] + "</div>";
        });
        setTimeout(function () {
          document.getElementById('carga_new').style.display = "none";
          var div_r = document.querySelector("#chat2");
          let r = document.createElement("div");
          r.innerHTML = html_all
          div_r.append(r)
          div_r.scrollTop = div_r.scrollHeight;
        }, 1600)
      }
      if (rpta_rpta['respuesta_tipo'][0]['tipo'] == 'slider') {
        document.getElementById('carga_new').style.display = "block";

        html_all_pre_rpta += '<div class="chat-bubble you">' + rpta_rpta['pre_respuesta']['pre_rpta'] + "</div>"
        html_all += `
            <section id="container-slider" class='slider_all'>
                <a href="#" onclick="fntExecuteSlide('prev',this);" class="arrowPrev"><i style='color: #808080a3;' class="fas fa-chevron-circle-left"></i></a>
                <a href="#" onclick="fntExecuteSlide('next',this);" class="arrowNext"><i style='color: #808080a3;' class="fas fa-chevron-circle-right"></i></a>
            
                <ul id="slider">
                `;
          
        let opacity = false;
        rpta_rpta['respuesta_tipo'].forEach(elent_rpta => {
          var acciones_rpta = elent_rpta['acciones'];
          // console.log(acciones_rpta)
          // console.log('elent_rpta img', elent_rpta['img'])
          if (elent_rpta['img'] != ' ') {
            html_all += `<li style="z-index:0; opacity: ${opacity==false?'1':'0'};"><img class='img_new' src="/media/${elent_rpta['img']}"></img>`
          } else {
            html_all += `<li style="z-index:0; opacity: ${opacity==false?'1':'0'};"><img class='img_new' src="/media/slider/ahorros.png"></img>`
          }
          opacity = true;
          html_all += `
                    <div class="content_slider" >
                      <div>
                        <h5>${elent_rpta['titulo_imagen']}</h5>
                        <p>${elent_rpta['descripcion']}</p>`;
          //console.log('descripcion :',elent_rpta['descripcion'])
          //console.log('img :',elent_rpta['img'])
          //console.log('titulo_imagen :',elent_rpta['titulo_imagen'])
          acciones_rpta.forEach(act => {
            //console.log('actt :',act)
            //console.log('acciones_rpta.length :',acciones_rpta.length)
            if (acciones_rpta.length == 1) {
              html_all += `<div class='btnAccion' onclick="accion_rpta('${elent_rpta['titulo_imagen']}')" ><a href="#" class="btnSlider">${act}</a></div>`
            } else {
              html_all += `<div class='btnAccion' onclick="accion_rpta('${act} de ${elent_rpta['titulo_imagen']}')" ><a href="#" class="btnSlider">${act}</a></div>`
            }
          });
          html_all += `
                      </div>
                    </div>
                  </li>`
        });
        html_all += `
                </ul>
            </section>`;
        setTimeout(function () { 


          
          // pre respuesta
          document.getElementById('carga_new').style.display = "none";
          var div_r2 = document.querySelector("#chat2");
          let r2 = document.createElement("div");
          r2.innerHTML = html_all_pre_rpta
          div_r2.append(r2)
          div_r2.scrollTop = div_r2.scrollHeight;


           // respuesta SLIDER
          document.getElementById('carga_new').style.display = "none";
          var div_r = document.querySelector("#chat2");
          let r = document.createElement("div");
          r.innerHTML = html_all
          div_r.append(r)
          div_r.scrollTop = div_r.scrollHeight;

        }, 1600)
      }
    }).catch(e => {
      //mostrar mensaje de error
      console.log(e);
    })
  }
}
//-------------------------------- SLIDER HOME --------------------------------
function fntExecuteSlide(side, objeto) {
  // let parentTarget = document.getElementById('slider');
  let slider = objeto.closest('#container-slider').querySelector('#slider');
  let elements = slider.getElementsByTagName('li');
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
  elements[curElement].style.opacity = 0;
  elements[curElement].style.zIndex = 0;
  elements[nextElement].style.opacity = 1;
  elements[nextElement].style.zIndex = 1;
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
      <div class="chat-bubble you" style='margin-top: 10px;'>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></div>

      <center class='t_y_c'>

        <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones'>Aceptar</button>
        <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones'>Rechazar</button>
    
      </center>
      `
      setTimeout(() => {
        document.getElementById('carga_new').style.display = "none";
        var div_r = document.querySelector("#chat2");
        let r = document.createElement("div");
        r.innerHTML = tmp
        div_r.append(r)
        div_r.scrollTop = div_r.scrollHeight;
      }, 1600);
    }
  }
}

function enviar_texto(e) {

  if (estado_terminos_condiciones == true) {
    estado_terminos_condiciones = true
    getBotResponse();
    document.getElementById('textInput').value = ''
  } else {
    estado_terminos_condiciones = false
    document.getElementById('carga_new').style.display = "block";
    var tmp = `
    <div class="chat-bubble you" style='margin-top: 10px;'>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></div>
    <center class='t_y_c'>
      <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones'>Aceptar</button>
      <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones'>Rechazar</button>
    </center>
    `
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat2");
      let r = document.createElement("div");
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
    }, 1600);
  }
}

function accion_rpta(e) {

  if (estado_terminos_condiciones == true) {

    document.getElementById('textInput').value = e
    getBotResponse();
    document.getElementById('textInput').value = ''

  } else {
    estado_terminos_condiciones = false
    document.getElementById('carga_new').style.display = "block";
    var tmp = `
    <div class="chat-bubble you" style='margin-top: 10px;'>Por favor, lee y acepta los siguientes términos de uso para continuar con el uso del asistente virtual cognitivo. <a href='https://bit.ly/3dbjnBg'>https://bit.ly/3dbjnBg</a></div>
    
    <center class='t_y_c'>

      <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones'>Aceptar</button>
      <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones'>Rechazar</button>
    
    </center>
    
    `
    setTimeout(() => {
      document.getElementById('carga_new').style.display = "none";
      var div_r = document.querySelector("#chat2");
      let r = document.createElement("div");
      r.innerHTML = tmp
      div_r.append(r)
      div_r.scrollTop = div_r.scrollHeight;
    }, 1600);
  }
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
  var empresa_id = document.querySelector("#libreria_chatbot").getAttribute("empresa")
  fetch('/personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    // console.log('responseresponse :',response)
    // console.log('responseresponse :',response[0]['text_bienvenida'])

    document.querySelector('#cb_tl').innerText = response[0]['titulo_header']
    document.querySelector('#cb_frm').innerText = response[0]['titulo_cuerpo']
    

    div_chatbot.querySelector('#texto_bienve').value = response[0]['text_bienvenida']
    document.querySelector('#cb_btn').innerText = response[0]['botones']
  })
}