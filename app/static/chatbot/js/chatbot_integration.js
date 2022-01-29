var boddy = document.querySelector("body");
var body = document.createElement("div");

var htmlbot = `
                    
            <div class="chat-screen" style='overflow-y: hidden;'>
            <div class="chat-header">
                <div class="chat-header-title">
                Estamos en linea
                </div>
                <div class="chat-header-option hide">
                <span class="dropdown custom-dropdown">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-more-horizontal">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink1"
                    style="will-change: transform;">
                    <a class="dropdown-item end-chat" href="javascript:void(0);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#bc32ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-power">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                        </svg>
                        Chat finalizado
                    </a>
                    </div>
                </span>
                </div>

            </div>
            
            <div class="chat-mail">
                <div class="row">
                <div class="col-md-12 text-center mb-2">
                    <p>Hola! Complete el formulario a continuacion para comenzar a chatear con el proximo agente
                    disponible.</p>
                </div>
                </div>
                <div class="row">

                <div class="col-md-12">
                    <div class="form-group">
                    <input type="text" class="form-control" placeholder="Nombre" id='txtusuario' name='txtusuario' required>
                    <p style="text-align: center;color: red; display: none" id='alert_nom'></p>
                    </div>
                </div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary btn-rounded btn-block">Comenzar chat</button>
                </div>
                <div class="col-md-12">
                    <div class="powered-by">@INGyTAL</div>
                </div>
                </div>


            </div>
            <div class="chat-body hide" style='overflow-y: scroll;' id="chat2">

                <div id="chat">
                <div class="chat-start">Lunes, 1:27 PM</div>
                
                <div class="chat-bubble you">Bienvenido a nuestro sitio, si necesita ayuda, simplemente responda a este
                    mensaje, estamos en línea y listos para ayudar.</div>

                </div>
            </div>
            <div class="chat-input hide" id="userInput">
                <input type="text" placeholder="Escribir algo..." id='textInput'>
            </div>
            </div>
            <div class="chat-bot-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square animate">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x ">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            </div>
`;
body.innerHTML = htmlbot
boddy.append(body);