//Desarrollo
var URLactual = 'https://192.168.214.7:8000/';
//Desarrollo
// var URLactual = 'https://35.222.244.103:8000/';
var aceptar_terminos = false; //Aún no acepta T&C
chatbot_personalizado();
show____confi();
var boddy = document.querySelector("body");
var div_chatbot = document.createElement("div");
var habilidar_chat = false;
var htmlbot = `
<div class="fabs" style='z-index: 9999999;'>
  <div class="chat is-visible">
    <div id='color_bd_chatbot' class="chat_header">
      <div class="chat_option">
        <div class="header_img" style="margin-bottom: 8px;">
          <img class='chat_img_option' src="${URLactual}static/chatbot_admin/assets/images/default.png" />
        </div>
        <span id="chat_head" style="font-weight: bold;">INGyBOT</span> <br> <span class="agent">.</span>
        <span class="online" style="font-weight: bold;">En Línea</span>
        <span id="chat_fullscreen_loader" class="chat_fullscreen_loader"><i class="fullscreen zmdi zmdi-window-maximize"></i></span>
      </div>
    </div>

    <div class="chat_body chat_login" style="border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;">
      <a id="chat_third_screen" class="fab is-visible chat_a_login"><i class="zmdi zmdi-arrow-right"></i></a>
      <p class='clss_p' id='cb_frm'>Complete el siguiente formulario para comenzar a chatear con el próximo agente disponible.</p>

      <input type='hidden' id='chatbot_terminos_condiciones'>
      <input type='hidden' id='chatbot_terminos_condiciones_link'>
      <input type='hidden' id='t_c_rcz'>
      <input type='hidden' id='t_c_acept'>
      <input type='hidden' id='all_dat_conf'>


      <input type='hidden' id='cam_ps'>

      <div id="form_id" class="id__frm_show">

      </div>
    </div>
    <div id="chat_form" class="chat_converse chat_form">
    
      <div id="sh___ow__t__y__c">

      </div>

      <div id="sh___ow__bienvenida">

      </div>
     
 
    </div>
    <div id="d__chat" style="display: none !important" >
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
VALIDAR MÓDULO DE CONFIGURACION DEL CHATBOT
=============================================*/
function trae_data_conf(){
  
}

/*=============================================
FUNCIONAMIENTO DEL CHATBOT
=============================================*/
hideChat(0);
document.getElementById('prime').addEventListener('click', function () {
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
  let dat__a = [];
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    codigo += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  let nombre_usuario = div_chatbot.querySelectorAll('.cls_campos')
  for (let n = 0; n < nombre_usuario.length; n++) {
    let element = nombre_usuario[n].value;
    dat__a.push(element)
  }
  datosLS = {
    codigo: codigo,
    nombre: dat__a[0], //Obtengo solo el nombre
    email: dat__a[1], //Obtengo solo el email
    telefono: dat__a[2], //Obtengo solo el telefono
  }
  localStorage.setItem('alias_key', JSON.stringify(datosLS));
  key_alias = codigo
  div_chatbot.querySelector('#key_alias').value = key_alias
  div_chatbot.querySelector('#nombre_chat').value = dat__a[0]
  div_chatbot.querySelector('#email_chat').value = dat__a[1]
  div_chatbot.querySelector('#phone_chat').value = dat__a[2]
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
      var campos_input = document.querySelectorAll('.cls_campos')
      var error = false;
      campos_input.forEach(it______em => {

          let nombre_usuario = it______em.value

          if(nombre_usuario.length == 0){


            it______em.style = 'border: 1px solid #cd0008!important;';
            error = true

          }else{
            it______em.style = '2px solid lightgrey !important;';
          }

      });

      if(error == true){
        return;
      }
      aliasLS()
      var nom_usuario = document.getElementById('nombre_chat').value
      let fromData = new FormData;
      fromData.append('nomb', nom_usuario);

    
      var dat__a_ = [];
      let nombre_usuario_ = div_chatbot.querySelectorAll('.cls_campos')
      for (let n = 0; n < nombre_usuario_.length; n++) {
        let element = nombre_usuario_[n].value;
        dat__a_.push(element)
      }

      if(dat__a_[1] != undefined){
        email = dat__a_[1];
      }else{
        email = null;
      }

      if(dat__a_[2] != undefined){
        phone = dat__a_[1];
      }else{
        phone = null;
      }
  
      fetch(URLactual+'getnombre/?nomb=' + nom_usuario + '&user_alias=' + key_alias + '&email=' + email + '&phone=' + phone, {
        method: 'GET',
      }).then(jsonRsp => {}).catch(e => {
        console.log('e :', e);
      })
      document.querySelector(".fab_field").innerHTML =
      `
      <a id="fab_camera" class="fab fab_a_field"><i class="zmdi zmdi-mic"></i></a>
      <a href="javascript: enviar_texto(this);" id="fab_send" class="fab" style='z-index: 99999;'><i class="zmdi zmdi-mail-send"></i></a>

      <input type="text" id="textInput" onkeypress='return escribir(event,this)' name="chat_message" placeholder="Escribe algo..." class="chat_field chat_message">`;
      document.querySelectorAll('.fab').forEach(fab => {
        fab.classList.toggle("is-visible");
      });
      document.getElementById('chat_form').style.display = 'block'
      document.querySelector(".chat_login").style.display = 'none';
      document.querySelector(".chat_fullscreen_loader").style.display = 'block';
      document.getElementById("d__chat").style.display = 'block';
                  
      var dat_______os = document.querySelector("#all_dat_conf").value;
      validar_conf_chat(dat_______os) //Validar terminos y condiciones con bienvenida

 
 

      // CUANDO SÓLO EL NOMBRE Y EMAIL ESTÁN ACTIVO
      // if(nom_ext.length == 0 && email_ext.length == 0){
      //     document.getElementById("txtusuario").style = 'border: 1px solid #cd000870 !important;';
      //     document.getElementById("txtemail").style = 'border: 1px solid #cd000870 !important;';
      // }else if(nom_ext.length == 0 || email_ext.length == 0){
      //   if(nom_ext.length == 0){
      //     document.getElementById("txtusuario").style = 'border: 1px solid #cd000870 !important;';
      //   }else{
      //     document.getElementById("txtusuario").style = '2px solid lightgrey !important;';
      //   }
      //   if(email_ext.length == 0){
      //     document.getElementById("txtemail").style = 'border: 1px solid #cd000870 !important;';
      //   }else{
      //     document.getElementById("txtemail").style = '2px solid lightgrey !important;';
      //   }
      // }else{
      //   console.log("Registro completo")
      // }
      break;
  }
}




function presionar_click(){
  var presionar = document.querySelectorAll('.presionar');
  // presionar.forEach(element => {
  //   element.click();
  // });
  for (let i = 0; i < presionar.length; i++) {
    presionar[presionar.length-1].click();
  }
}



/*=============================================
EMPEZAR A CHATEAR
=============================================*/
function escribir(e,t) {

    if (e.keyCode == 13) {
      let inp___ = document.getElementById('textInput').value;
      if(aceptar_terminos == true){
        getBotResponse();
        document.getElementById('textInput').value = ''
      }else{

        //Eliminar todo los T&C
        document.querySelectorAll(".t_y_c_cls").forEach(element => {
          element.innerHTML = "";
        });
        let user___Html = '<span class="">' + inp___ + '</span>';
        let div_p__ = document.querySelector("#chat_form");
        let p = document.createElement("div");
        p.className = "chat_msg_item chat_msg_item_user cls_color_user"; //Agrego una clase dentro del div
        p.innerHTML = user___Html
        div_p__.append(p)
        document.querySelectorAll('.cls_color_user').forEach(col__ => {
          col__.style.background = document.querySelector('#cam_ps').value
        });


        document.getElementById('textInput').value = ''
        document.getElementById('carga_new').style.display = "block";
        setTimeout(function () {
          document.getElementById('carga_new').style.display = "none";
          let div___r3_ = document.querySelector("#chat_form");
          let r3__ = document.createElement("div");
          r3__.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
          r3__.innerHTML = `
          <span class="chatbot_terminos_condiciones">${document.getElementById('chatbot_terminos_condiciones').value}</span>: <a href="${document.getElementById('chatbot_terminos_condiciones_link').value}" class="chatbot_terminos_condiciones_link">${document.getElementById('chatbot_terminos_condiciones_link').value}</a>
          <center class='t_y_c_cls'>
            <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c aceptar_t_y_C' id='btn_aceptar' style='background: ${document.querySelector('#cam_ps').value}'>Aceptar</button>
            <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c rechazar_t_y_C' id='btn_rechazar' style='background: ${document.querySelector('#cam_ps').value}'>Rechazar</button>
          </center>`
          div___r3_.append(r3__)
        },2000)
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
INICIAR CHATBOT
=============================================*/
var ls_LS = localStorage.getItem('datos')
var user_autenticate
var aprendiendo = 0;
function getBotResponse() {
  var id_cliente_usu_attr = document.getElementById('libreria_chatbot').getAttribute('user')
  var id_empresa_e_attr = document.getElementById('libreria_chatbot').getAttribute('empresa')
  
  microfono(); 
  var html_all = '';
  var html_all_pre_rpta = '';
  if (ls_LS == null) {
    user_autenticate = false //Usuario final
  } else {
    user_autenticate = JSON.parse(ls_LS).user_autenticate;  //Usuario 
  }
  var key_alias = div_chatbot.querySelector('#key_alias').value
  var nombre_chat = div_chatbot.querySelector('#nombre_chat').value
  var rawText = document.getElementById('textInput').value

  if (rawText.length != 0 ) {
    var userHtml = '<span class="">' + rawText + '</span>';
    var div_p = document.querySelector("#chat_form");
    let p = document.createElement("div");
    p.className = "chat_msg_item chat_msg_item_user cls_color_user"; //Agrego una clase dentro del div
    p.innerHTML = userHtml
    div_p.append(p)
    div_p.scrollTop = div_p.scrollHeight;
    document.querySelectorAll('.cls_color_user').forEach(col => {
      col.style.background = document.querySelector('#cam_ps').value
    });
      var dat__a__ = [];
      let nombre_usuario_ = div_chatbot.querySelectorAll('.cls_campos')
      for (let n = 0; n < nombre_usuario_.length; n++) {
        let element = nombre_usuario_[n].value;
        dat__a__.push(element)
      }

      if(dat__a__[1] != undefined){
        email = dat__a__[1];
      }else{
        email = "null";
      }

      if(dat__a__[2] != undefined){
        phone = dat__a__[2];
      }else{
        phone = "null";
      }


    fetch(URLactual+'getchat/?msg=' + rawText + '&id_user_create=' + id_cliente_usu_attr + '&id_empresa_id=' + id_empresa_e_attr + '&user_autenticate=' + user_autenticate + '&user_alias=' + key_alias + '&nombre_chat=' + nombre_chat + '&email_chat=' + email + '&phone_chat=' + phone, {
      method: 'GET',
    }).then(rsp => rsp.text()).then(function (response) {
      let decodedStr = atob(response);
      const rpta_rpta = JSON.parse(decodedStr)

      let rpta1="Creo que no te entiendo, aquí te presento unas opciones que te pueden interesar";
      

      if(rpta_rpta['respuesta_tipo'][0]['tipo'] == 'no-entendi'){
        document.getElementById('carga_new').style.display = "block";

        rpta_rpta['respuesta_tipo'][0]['rpta'].forEach(rpta_one => {
          setTimeout(() => {
            document.getElementById('carga_new').style.display = "none";
            let div_r_null = document.querySelector("#chat_form");
            let r_n = document.createElement("div");
            r_n.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
            r_n.innerHTML = '<span>' +rpta1+ '</span>'
            div_r_null.append(r_n)
            div_r_null.scrollTop = div_r_null.scrollHeight;
          }, 1600);
          let dat_____os = document.querySelector("#all_dat_conf").value;
          let d = JSON.parse(dat_____os)
          mostrar_texto_personalizado_fn(d,"slider");
        });
      }



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
                        html_all += `<div class="img_new" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${URLactual}media/${elent_rpta['img']});background-position: center center;background-size: cover;    width: 100%;"></div>`
                      }

                      if (elent_rpta['img'] != ' ') {
                        html_all += `<div class="pos_accion">`
                      } else{
                        html_all += `<div class="pos_accion" style="position:inherit !important">`
                      }


                        html_all += `
                        <h5 style="margin-top: 5px;margin-bottom: 0;font-family: font_caja_sullana;font-size: 15px;">${elent_rpta['titulo_imagen']}</h5>
                        <h6 style="margin: 0;font-size: 14px;">${elent_rpta['descripcion']}</h6>
                        `
                        acciones_rpta.forEach(act => {
                          if (acciones_rpta.length == 1) {
                            html_all += `<button class="btn_accion" onclick="accion_rpta('${elent_rpta['titulo_imagen']}')" style="background-color: ${document.querySelector('#cam_ps').value} !important">${act}</button>`
                          } else {
                            html_all += `<button class="btn_accion"  onclick="accion_rpta('${act} de ${elent_rpta['titulo_imagen']}')" style="background-color: ${document.querySelector('#cam_ps').value} !important">${act}</button>`
                          }
                        });

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

                if(rpta_rpta['pre_respuesta']['pre_rpta'].length != 0){
                  // pre respuesta
                  document.getElementById('carga_new').style.display = "none";
                  var div_r2 = document.querySelector("#chat_form");
                  let r2 = document.createElement("div");
                  r2.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
                  r2.innerHTML = html_all_pre_rpta
                  div_r2.append(r2)
                  div_r2.scrollTop = div_r2.scrollHeight;
                }

      
                 // respuesta SLIDER
                document.getElementById('carga_new').style.display = "none";
                var div_r = document.querySelector("#chat_form");
                let r = document.createElement("div");
                r.className = "chat_msg_item chat_msg_item_admin2"; //Agrego una clase dentro del div
                r.innerHTML = html_all
                div_r.append(r)
                div_r.scrollTop = div_r.scrollHeight;
                presionar_click();

                document.querySelectorAll('.btn_accion').forEach(act_sld => {

                  act_sld.style.background = document.querySelector('#color_chat_acciones').value
                  
                });
                
      
              }, 1600)

      }
    }).catch(e => {
      //mostrar mensaje de error
      console.log(e);
    })
  }
}
/*=============================================
RESPUESTAS DE ACCIONES
=============================================*/
function accion_rpta(e) {


    document.getElementById('textInput').value = e
    getBotResponse();
    document.getElementById('textInput').value = ''

 

}

function enviar_texto(){
    getBotResponse();
    document.getElementById('textInput').value = ''
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

/*=============================================
VALIDAR CONFIGURACIÓN AL INICIAR CHAT
=============================================*/
function show____confi(){

  var id = document.querySelector("#libreria_chatbot").getAttribute("empresa")
  let tmp_bot = ``;

  fetch(URLactual+'mostrar_data__config/?id_empr=' + id, {
      method: 'GET',
    }).then(rsp => rsp.json()).then(function (response) {

   

      document.getElementById("all_dat_conf").value = JSON.stringify(response[0].fields)


      if(response[0].fields.horariocomercial == "24horas"){


        if(response[0].fields.c_nombre == "1"){
          tmp_bot += `
                    <div class="field">
                      <input type="text" placeholder="Nombre" class="cls_campos" id="txtusuario" name="txtusuario">
                    </div>
                    <input type='hidden' id='key_alias'>
                    <input type='hidden' id='nombre_chat'>
                    <input type='hidden' id='email_chat'>
                    <input type='hidden' id='phone_chat'>`
        }
        if(response[0].fields.c_email == "1"){
          tmp_bot += `
            <div class="field">
              <input type="email" placeholder="Correo electrónico" class="cls_campos" id="txtemail" name="txtemail">
            </div>`
        }
        if(response[0].fields.c_telefono == "1"){
          tmp_bot += `
            <div class="field">
              <input type="number" placeholder="Número de teléfono" class="cls_campos" id="txttelefono" name="txttelefono">
            </div>`
        }


      }

      // HORARIO PERSONALIZADO EN DESARROLLO
      if(response[0].fields.horariocomercial == "personalizado"){
        //Definiendo la hora comercial
        let now = new Date();
        let h_actual = now.getHours()+':'+now.getMinutes();
        let h_in = response[0].fields.h_inicio;
        let h_ci = response[0].fields.h_cierre;
        // console.log("Horario comercial :",response[0].fields.horariocomercial)
        console.log("h_actual :",h_actual)
        console.log("h_in :",h_in)
        console.log("h_ci :",h_ci)

        // document.getElementById("cb_frm").innerHTML = response[0].fields.h_cierre_des
      }
      document.querySelector(".id__frm_show").innerHTML = tmp_bot

      
        
    }) 
}
function validar_conf_chat(datos){
  let d = JSON.parse(datos)

  //MOSTRAR TERMINOS Y CONDICIONES
  if(d.terminosycondiciones == "mostrar"){
    document.getElementById('carga_new').style.display = "block";
    
    setTimeout(function () {
      document.getElementById('carga_new').style.display = "none";
      // console.log("Ver input :",document.getElementById('textInput'))
      document.querySelector("#sh___ow__t__y__c").innerHTML = `
      <div class="chat_msg_item chat_msg_item_admin">
        <span class="chatbot_terminos_condiciones">${document.getElementById('chatbot_terminos_condiciones').value}</span>: <a href="${document.getElementById('chatbot_terminos_condiciones_link').value}" class="chatbot_terminos_condiciones_link">${document.getElementById('chatbot_terminos_condiciones_link').value}</a>
        <center class='t_y_c_cls'>
          <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c aceptar_t_y_C' id='btn_aceptar' style='background: ${document.querySelector('#cam_ps').value}'>Aceptar</button>
          <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c rechazar_t_y_C' id='btn_rechazar' style='background: ${document.querySelector('#cam_ps').value}'>Rechazar</button>
        </center>
      </div>`
    },2000)


  }else{

    //Mensaje de bienvenida
    let d__bienvenida = JSON.parse(d.texto_bienvenida)
    if(d__bienvenida[0].tipo == "texto"){
      d__bienvenida[0].rptas.forEach(el__ement => {
        let bo__ddy = document.querySelector("#sh___ow__bienvenida");
        let div___chatbot = document.createElement("div");
        div___chatbot.innerHTML = `
        <div class="chat_msg_item chat_msg_item_admin">
          ${el__ement}
        </div>`
        bo__ddy.append(div___chatbot);
      });
    }

    if(d__bienvenida[0].tipo == "slider"){
      mostrar_texto_personalizado_fn(d,"todo")
    }


  }
}
function btn_terminos_condiciones(action, ac) {
  console.log("Términos y condiciones :",action)
  let dat__ = JSON.parse(document.querySelector("#all_dat_conf").value)
  console.log("Términos y condiciones2 :",dat__)
  if(action == "Aceptar"){
    aceptar_terminos = true; //Aceptar T&C

    // document.getElementById('t_c_rcz').value
    
    document.getElementById('carga_new').style.display = "block";
    
    setTimeout(function () {
      document.getElementById('carga_new').style.display = "none";
      let div___r2_ = document.querySelector("#chat_form");
      let r2__ = document.createElement("div");
      r2__.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r2__.innerHTML = '<span>'+ document.querySelector('#t_c_acept').value +'</span>'
      div___r2_.append(r2__)
    },2000)

    setTimeout(function () {
      mostrar_texto_personalizado_fn(dat__,"todo")
    },4000)


  }
  if(action == "Rechazar"){
    aceptar_terminos = false; //Rechaza aceptar T&C
    document.getElementById('carga_new').style.display = "block";
    setTimeout(function () {
      document.getElementById('carga_new').style.display = "none";
      let div___r2_ = document.querySelector("#chat_form");
      let r2__ = document.createElement("div");
      r2__.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r2__.innerHTML = '<span>'+ document.getElementById('t_c_rcz').value +'</span>'
      div___r2_.append(r2__)


      let div___r3_ = document.querySelector("#chat_form");
      let r3__ = document.createElement("div");
      r3__.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
      r3__.innerHTML = `
      <span class="chatbot_terminos_condiciones">${document.getElementById('chatbot_terminos_condiciones').value}</span>: <a href="${document.getElementById('chatbot_terminos_condiciones_link').value}" class="chatbot_terminos_condiciones_link">${document.getElementById('chatbot_terminos_condiciones_link').value}</a>
      <center class='t_y_c_cls'>
        <button onclick='javascript: btn_terminos_condiciones("Aceptar",this);' class='terminos_condiciones t_y_c aceptar_t_y_C' id='btn_aceptar' style='background: ${document.querySelector('#cam_ps').value}'>Aceptar</button>
        <button onclick='javascript: btn_terminos_condiciones("Rechazar",this);' class='terminos_condiciones t_y_c rechazar_t_y_C' id='btn_rechazar' style='background: ${document.querySelector('#cam_ps').value}'>Rechazar</button>
      </center>`
      div___r3_.append(r3__)
    },2000)
  }

  ac.closest('.t_y_c_cls').innerHTML = ""

}

/*=============================================
Esta funcion lo uso para mostrar los textos de bienvenida sea por terminos y condiciones o no
=============================================*/
function mostrar_texto_personalizado_fn(data,muestrame){

  let fn__d__bienvenida = JSON.parse(data.texto_bienvenida)

  let html_all = "";

  html_all += `
  <div style="padding: 0px 10px 0px 20px;margin-bottom: 90px;" id="container-slider">
    <div class="slideshow-container">
      <div id="slider">`

      fn__d__bienvenida[0].rptas.forEach(elent_rpta => {

        var acciones_rpta = elent_rpta['acciones'];
        html_all += `
        <div class="mySlides fade_">`
        
          if (elent_rpta['img'] != '') {
            html_all += `<div class="img_new" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${URLactual}media/${elent_rpta['img']});background-position: center center;background-size: cover"></div>`
          }

          if (elent_rpta['img'] != '') {
            html_all += `<div class="pos_accion">`
          } else{
            html_all += `<div class="pos_accion" style="position:inherit !important">`
          }


          html_all += `
          <h5 style="margin-top: 5px;margin-bottom: 0;font-family: font_caja_sullana;font-size: 15px;">${elent_rpta['titulo_imagen']}</h5>
          <h6 style="margin: 0;font-size: 14px;">${elent_rpta['descripcion']}</h6>
          `

          acciones_rpta.forEach(act => {
            if (acciones_rpta.length == 1) {
              html_all += `<button class="btn_accion" onclick="accion_rpta('${elent_rpta['titulo_imagen']}')" style="background-color: ${document.querySelector('#cam_ps').value} !important">${act}</button>`
            } else {
              html_all += `<button class="btn_accion"  onclick="accion_rpta('${act} de ${elent_rpta['titulo_imagen']}')" style="background-color: ${document.querySelector('#cam_ps').value} !important">${act}</button>`
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

              document.getElementById('carga_new').style.display = "block";

              setTimeout(function () {

                document.getElementById('carga_new').style.display = "none";

                if(muestrame == "todo"){

                  let div___r2 = document.querySelector("#chat_form");
                  let r2 = document.createElement("div");
                  r2.className = "chat_msg_item chat_msg_item_admin"; //Agrego una clase dentro del div
                  r2.innerHTML = '<span>'+ fn__d__bienvenida[0].pre_rpta +'</span>'
                  div___r2.append(r2)

                        
                  // respuesta SLIDER
                  let div_r = document.querySelector("#chat_form");
                  let r = document.createElement("div");
                  r.className = "chat_msg_item chat_msg_item_admin_2"; //Agrego una clase dentro del div
                  r.innerHTML = html_all
                  div_r.append(r)
                  presionar_click();

                }

                if(muestrame == "slider"){
                        
                  // respuesta SLIDER
                  let div_r = document.querySelector("#chat_form");
                  let r = document.createElement("div");
                  r.className = "chat_msg_item chat_msg_item_admin_2"; //Agrego una clase dentro del div
                  r.innerHTML = html_all
                  div_r.append(r)
                  presionar_click();

                }


              },2000)

}
/*=============================================
CHATBOT PERSONALIZADO
=============================================*/
function chatbot_personalizado() {

  var empresa_id = document.querySelector("#libreria_chatbot").getAttribute("empresa")

  fetch(URLactual+'personalizar_chat/?id_empr=' + empresa_id, {
    method: 'GET',
  }).then(rsp => rsp.json()).then(function (response) {
    console.log("A VER TODO :",response)

    if(response[0]['foto_logo'] != null){
      document.querySelector('.chat_img_option').setAttribute("src", URLactual+"media/"+response[0]['foto_logo'])
    }
    document.querySelector('#chat_head').innerText = response[0]['nombre_chatbot']
    document.querySelector('#cb_frm').innerText = response[0]['titulo_cuerpo']
    document.getElementById('chatbot_terminos_condiciones').value = response[0]['terminos_y_condiciones']
    document.getElementById('chatbot_terminos_condiciones_link').value = response[0]['terminos_y_condiciones_link']
    document.getElementById('t_c_rcz').value = response[0]['terminos_y_condiciones_rechazar']
    document.querySelector('#t_c_acept').value = response[0]['terminos_y_condiciones_aceptar']
    document.querySelector('#color_bd_chatbot').style.background = response[0]['rpta_color_header']
    document.querySelector('#prime').style.background = response[0]['rpta_color_header']
    document.querySelector('#chat_third_screen').style.background = response[0]['rpta_color_botones']
    document.querySelector('#cam_ps').value = response[0]['rpta_color_botones']

    
  })




}