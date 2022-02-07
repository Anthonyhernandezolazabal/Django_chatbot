var boddy = document.querySelector("body");
var body = document.createElement("div");

var htmlbot = `
    <input type="checkbox" id="click">
    <label for="click" id='label_l'>
    <i class="fab fa-discourse"></i>
    <i class="fas fa-times"></i>
    </label>
    <div class="wrapper2">
    <div class="head-text">¿Charlemos? - En línea</div>
    <!-- NOMBRE -->
    <div class="chat-box" id='chat-mai'>
        <div class="desc-text">Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.
        </div>
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
    <!-- CHAT -->
    <div class="chat-box" id='body-chat' style='display: none !important;'>
        <div class="chat-body hide" id="chat2">
            <div id="chat">
                <div class="chat-start">Lunes, 1:27 PM</div>
                <div class="chat-bubble you">Bienvenido a nuestro sitio, si necesita ayuda, simplemente responda a este
                mensaje, estamos en línea y listos para ayudar.</div>
            </div>
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
              <input id="textInput" class="input-box" type="text" name="msg" placeholder="Tap 'Enter' to send a message">
              <p></p>
          </div>
          <div class="chat-bar-icons">
              <i id="chat-icon" style="color: #333;" class="fa fa-fw fa-send" onclick="enviar_texto()"></i>
          </div>
        </div>



    </div>
    </div>
`;
body.innerHTML = htmlbot
boddy.append(body);