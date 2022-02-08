  conversaciones_pyr()  
  /*=============================================
    AGREGAR MAS PREGUNTAS
  =============================================*/
  let btn_quest = document.querySelector("#add_quest");

  var cont = 0
  var micont = 0
  btn_quest.addEventListener("click", () => {
    cont++
    let contenedor = document.querySelector('#add_input_new')
    let p = document.createElement('div')
    p.innerHTML = `

    <div class="mb-2 mt-2" id='add_input_new'>
      <div class='row'>
        <div class='col-10'>
          <input class="form-control" type="text" placeholder="Formular pregunta" id="question${cont}" name="question${cont}">
        </div>
        <div class='col-2'>
          <button type="button" id='btn_del' onclick='del_btn(this)' class="btn btn-danger"><i class="mdi mdi-window-close"></i> </button>
        </div>
      </div>
    </div> `
    contenedor.append(p);

    var b = document.querySelector(".btn_save");
    b.setAttribute("attr_cont", cont);
  })


  function uuidv4(){
    var hoy = new Date();
    var fecha = hoy.getDate() + '' + ( hoy.getMonth() + 1 );
    var hora = hoy.getMinutes() + '' + hoy.getSeconds();
    var alias_id = fecha + '' + hora;

    return alias_id
  }


  /*=============================================
    QUITAR PREGUNTAS
  =============================================*/
  function del_btn(btn){
    cont--

    'btn :',btn.closest('.mb-2').parentNode.remove()
    // var padre = document.getElementById('del_quest').parentNode.parentNode.parentNode.childNodes;

    var b = document.querySelector(".btn_save");
    b.setAttribute("attr_cont", cont);

  }

  function quitar_prg(btn){

    let prg_id = btn.closest('.col-lg-4').getAttribute('id_prg')
    btn.closest('.col-lg-4').remove()
    let prg;
    prg = recuperarLS();
    prg.forEach(function (pre,indice) {

      if (pre[0].id === prg_id) {

        prg.splice(indice,1);
        
      }
      
    });
    localStorage.setItem("pregunta", JSON.stringify(prg))
    
  }

  let check_inpt3 = document.querySelector("#customRadio3");
  check_inpt3.addEventListener("click", () => {

    var x = document.getElementById("add_chek_txt");
    var y = document.getElementById("alert_check");
    let titulo = document.getElementById('rptatit')

    x.style.display = "block";
    y.style.display = "none";
    titulo.style.display = "block";

  })
  let check_inpt4 = document.querySelector("#customRadio4");
  check_inpt4.addEventListener("click", () => {
    var x = document.getElementById("add_chek_txt");
    var y = document.getElementById("alert_check");
    let titulo = document.getElementById('rptatit')
    x.style.display = "none";
    y.style.display = "block";
    titulo.style.display = "none";
  })

  /*===========================
    VACIAR TODO LOS PRODUCTO DEL LOCASLTORAGE
    =============================*/
  function eliminarLS() {
    // localStorage.clear(); /*Elimina todo del localstorage */
    localStorage.removeItem('pregunta')
  }
  /*=============================================
    EVENTO ONCLICK
  =============================================*/
  function myFunction() {

    let id = uuidv4()
    let b = document.querySelector(".btn_save");
    let align = b.getAttribute("attr_cont");
    let old_ques = []
    let preguntas = [];
    let est_campos = false;
    micont++;

    n = -1;
    x = 0;
    while (n < align) {
      n++;
      x = +n;
      let capId = "question" + x
      let inputValue = document.getElementById(capId).value
      if (inputValue != '') {
        est_campos = true
        old_ques.push(inputValue);
      } else {
        est_campos = false
      }
    }
    let rpta_i = document.getElementById('txt_autorpta').value
    preguntas.push({
      'preguntas_new': old_ques,
      'respuesta_new': rpta_i,
      'id':id
    })
    let id_tmp = preguntas[0].id

    if (est_campos == false) {

      alert('Es necesario registrar preguntas')

    } else if (rpta_i == '') {

      alert('Es necesario registrar una respuesta')

    } else {

      agregarLS(preguntas)

      $("#form-crear-rpta").trigger('reset');
      $('#full-width-modal').modal('hide');

      template = `
        <div class="col-lg-4" id_prg='${id_tmp}'>
          <div class="card border-secondary border">
            <div class="card-body">
              <div class="dropdown float-end">
                <i onclick='quitar_prg(this)' class="mdi mdi-close-circle" style='color: #c01f1f;cursor:pointer'></i>
              </div>
              <h4 class="header-title mb-3">CONVERSACIÓN N° ${micont}</h4>
              <div data-simplebar="init" style="max-height: 320px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Pregunta</th>
                                  </tr>
                                </thead>
                                <tbody class="simplebar-content-wrapper;">`;
      var arr = preguntas[0].preguntas_new
      arr.forEach(element => {
        template += `<tr><td>${element}</td></tr>`;
      });
      template += `
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
              <div data-simplebar="init" style="max-height: 200px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper" style="height: auto; overflow: hidden scroll;">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Respuesta</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="text-align: justify;">
                                    <td><i class="mdi mdi-format-quote-open font-20"></i> <b>
                                    ${rpta_i}
                                        </b> <i
                                        class="mdi mdi-format-quote-close font-20"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

        $("#lista_template").append(template);
    }
  }
  /*===========================
  RECUPERAR LAS PREGUNTAS AL LOCAL STORAGE
  =============================*/
  function recuperarLS() {
    let pregunta;
    if (localStorage.getItem('pregunta') === null) {
      pregunta = [];
    } else {
      pregunta = JSON.parse(localStorage.getItem("pregunta"));
    }
    return pregunta;
  }

  /*=============================================
    AGREGAR LAS PREGUNTAS AL LOCAL STORAGE
  =============================================*/
  function agregarLS(preguntas) {
    let pregunta = recuperarLS()
    pregunta.push(preguntas);
    localStorage.setItem("pregunta", JSON.stringify(pregunta));
  }
  /*=============================================
    MOSTRAR SECCIONES DE PREGUNTAS Y RESPUESTAS
  =============================================*/
  function conversaciones_pyr() {
    let id = uuidv4()
    let pregunta, cont = 0;
    pregunta = recuperarLS();
    pregunta.forEach(prg => {
      cont++
      template = `
        <div class="col-lg-4" id_prg='${prg[0].id}'>
          <div class="card border-secondary border">
            <div class="card-body">
              <div class="dropdown float-end">
                <i onclick='quitar_prg(this)' class="mdi mdi-close-circle" style='color: #c01f1f;cursor:pointer'></i>
              </div>
              <h4 class="header-title mb-3">CONVERSACIÓN N° ${cont}</h4>
              <div data-simplebar="init" style="max-height: 320px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive" id="divu1">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Pregunta</th>
                                  </tr>
                                </thead>
                                <tbody class="simplebar-content-wrapper;">`;

      for (let i = 0; i < (prg[0]['preguntas_new']).length; i++) {
        template += `<tr><td>${prg[0]['preguntas_new'][i]}</td></tr>`
      }
      template += `
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
              <div data-simplebar="init" style="max-height: 200px; overflow-x: hidden;">
                <div class="simplebar-wrapper" style="margin: 0px;">
                  <div class="simplebar-height-auto-observer-wrapper">
                    <div class="simplebar-height-auto-observer"></div>
                  </div>
                  <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                      <div class="simplebar-content-wrapper" style="height: auto; overflow: hidden scroll;">
                        <div class="simplebar-content" style="padding: 0px;">
                          <div class="row py-1 align-items-center">
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="table-light">
                                  <tr>
                                    <th>Respuesta</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="text-align: justify;">
                                    <td><i class="mdi mdi-format-quote-open font-20"></i> <b>
                                    ${prg[0]['respuesta_new']}
                                        </b> <i
                                        class="mdi mdi-format-quote-close font-20"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="simplebar-placeholder" style="width: 340px; height: 485px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

      $("#lista_template").append(template);

      // txt = document.getElementById("lista_template");
      // console.log(txt.innerHTML = template)

    });
  }


  /*=============================================
    ENVIO AL VIEWS DE CHATBOT EL NOMBRE Y LAS RESPUESTAS AUTOMATICAS DEL LS
  =============================================*/

  function rpt_aut_save() {
    preguntas = recuperarLS();
    var nombre_json = document.getElementById('rpta_json_nomb').value
    var id_empresa = document.getElementById('empresa_rpta').value
    var id_usu = document.getElementById('usu_rpta').value
    console.log('id_empresa :', id_empresa)
    if (preguntas.length === 0) {

      alert('No hay respuestas automaticas registradas')

    } else if (nombre_json == '') {
      alert('Debe asignarle un nombre')
    } else {

      var json_ls = JSON.stringify(preguntas);
      var nnn = nombre_json.split(" ").join("_")

      console.log('Mi preguntas :', preguntas)
      console.log('Mi json_ls :', json_ls)

      $.ajax({
        url: 'http://127.0.0.1:8000/getjson',
        data: {
          'json_rpt': json_ls,
          'json_nombre': nnn,
          'id_empresa': id_empresa,
          'id_usu': id_usu
        },
        type: "GET",
        success: function () {
          eliminarLS()
          $('.btn_sav').hide();
          $('.btn_loader').show();
          location.href = "../respuestas";


        }
      });

    }
  }

  function entrenar_chat() {

    $('.btn_sav2').hide();
    $('.btn_loadersav').show();

    var id_empresa = document.getElementById('empresa_rpta').value
    var id_usu = document.getElementById('usu_rpta').value

    $.ajax({
      url: 'http://127.0.0.1:8000/entrenar_chatbot',
      data: {
        'id_empresa': id_empresa,
        'id_user_create': id_usu
      },
      type: "GET",
      success: function () {
        location.href = "../respuestas";
      }
    });
  }