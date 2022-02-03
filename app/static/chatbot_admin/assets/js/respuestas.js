  /*=============================================
    AGREGAR MAS PREGUNTAS
  =============================================*/
  conversaciones_pyr()
  let btn_quest = document.querySelector("#add_quest");
  var cont = 0
  btn_quest.addEventListener("click", () => {
    cont++
    let contenedor = document.querySelector('#add_input_new')
    let p = document.createElement('div')
    p.innerHTML = `
    <div class="mb-2 mt-2" id='add_input_new'>
      <input class="form-control" type="text" placeholder="Formular pregunta" id="question${cont}" name="question${cont}">
    </div>`
    contenedor.append(p);

    var b = document.querySelector(".btn_save");
    b.setAttribute("attr_cont", cont);
  })

  let check_inpt3 = document.querySelector("#customRadio3");
  check_inpt3.addEventListener("click", () => {

    var x = document.getElementById("add_chek_txt");
    var y = document.getElementById("alert_check");
    x.style.display = "block";
    y.style.display = "none";

  })
  let check_inpt4 = document.querySelector("#customRadio4");
  check_inpt4.addEventListener("click", () => {
    var x = document.getElementById("add_chek_txt");
    var y = document.getElementById("alert_check");
    x.style.display = "none";
    y.style.display = "block";
  })

  /*=============================================
    EVENTO ONCLICK
  =============================================*/
  function myFunction() {

    var b = document.querySelector(".btn_save");
    var align = b.getAttribute("attr_cont");
    var old_ques = []
    var preguntas = [];
    var est_campos = false;

    n = -1;
    x = 0;
    while (n < align) {
      n++;
      x = +n;
      var capId = "question" + x
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
      'respuesta_new': rpta_i
    })

    if (est_campos == false) {

      alert('Es necesario registrar preguntas')

    } else if (rpta_i == '') {

      alert('Es necesario registrar una respuesta')

    } else {

      agregarLS(preguntas)
      conversaciones_pyr()
      

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
    let pregunta, cont = 0;
    pregunta = recuperarLS();
    pregunta.forEach(prg => {
      cont++
      template = `
        <div class="col-lg-4">
          <div class="card border-secondary border">
            <div class="card-body">
              <div class="dropdown float-end">
                <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Preguntas</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Respuesta</a>
                </div>
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
                                    <td><i class="mdi mdi-format-quote-open font-20"></i> <b>¿Dónde se encuentra
                                        INGyTAL?¿Dónde se encuentra INGyTAL?</b> <i
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


      let contenedor = document.querySelector('#lista_template')
      let p = document.createElement('div')
      p.innerHTML = template
      contenedor.append(p);

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
    console.log('id_empresa :',id_empresa)
    if (preguntas.length === 0) {

      alert('No hay respuestas automaticas registradas')

    } else if (nombre_json == '') {
      alert('Debe asignarle un nombre')
    } else {

      var json_ls = JSON.stringify(preguntas);
      var nnn = nombre_json.split(" ").join("_")

      console.log('Mi preguntas :',preguntas)
      console.log('Mi json_ls :',json_ls)

      $.ajax({
        url: 'http://127.0.0.1:8000/getjson',
        data: {
          'json_rpt': json_ls,
          'json_nombre': nnn,
          'id_empresa':id_empresa,
          'id_usu':id_usu
        },
        type: "GET",
        success: function () {
          location.href = "../respuestas";
        }
      });

    }
  }

  function entrenar_chat() {

    var id_empresa = document.getElementById('empresa_rpta').value
    var id_usu = document.getElementById('usu_rpta').value

    $.ajax({
      url: 'http://127.0.0.1:8000/entrenar_chatbot',
      data: {
        'id_empresa':id_empresa,
        'id_user_create':id_usu
      },
      type: "GET",
      success: function () {
        location.href = "../respuestas";
      }
    });
  }