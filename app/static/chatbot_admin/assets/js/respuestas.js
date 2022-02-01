/*=============================================
  AGREGAR MAS PREGUNTAS
=============================================*/
let btn_quest = document.querySelector("#add_quest");
var cont = 0
btn_quest.addEventListener("click", () => {
    cont ++
    let contenedor = document.querySelector('#add_input_new')
    let p = document.createElement('div')
    p.innerHTML = `
    <div class="mb-2 mt-2" id='add_input_new'>
      <input class="form-control" type="text" placeholder="Formular pregunta" id="question${cont}" name="question${cont}">
    </div>`
    contenedor.append(p);

    console.log(cont)
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