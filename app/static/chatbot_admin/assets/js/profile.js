/*=============================================
  MOSTRAR CONFIGURACIONES
=============================================*/

var Ls = localStorage.getItem('datos')
var id_empresa = JSON.parse(Ls).id_empresa;

function editprofile(){
    if(id_empresa != ""){
            show____profile(id_empresa)
    }else{
        localStorage.removeItem('pregunta')
        window.location.href = '{% url "logout" %}'
    }
}


function show____profile(id){
    fetch('/api/all_profile/?id_empresa=' + id, {
        method: 'GET',
      }).then(rsp => rsp.json()).then(function (response) {
        console.log("response :_:: ",response)
        $("#empresapr").val(response[0].nombre)
        $("#direccionpr").val(response[0].direccion)
        $("#webpr").val(response[0].web)
        $("#residenciapr").val(response[0].residencia)
        $("#rubropr").val(response[0].rubro)

        $("#pr").val(btoa(response[0].id))

        $("#showbtn").html(`<button type="submit" class="btn btn-primary">Guardar</button>`)

      }) 
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}

$('#frmeditprofile').submit(e=>{
    e.preventDefault();

    let empresa = $("#empresapr").val();
    let direccion = $("#direccionpr").val();
    let web = $("#webpr").val();
    let residencia = $("#residenciapr").val();
    let rubro = $("#rubropr").val();
    let id = $("#pr").val();
    let save_data_update = {
        "nombre": empresa,
        "direccion": direccion,
        "web": web,
        "residencia": residencia,
        "rubro": rubro,
    }

    fetch('/api/update_profile/'+atob(id)+'/', {
        method: 'POST',
        body: JSON.stringify(save_data_update),
        headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': getCookie('csrftoken')
        }
    }).then(rsp => rsp.json()).then(function (response) {
        if(response.message == "editado"){
            $.NotificationApp.send("Registrado!", "Se registraron los cambios", "top-right", "rgba(0,0,0,0.2)", "success");

            $(".prfempresa").html(empresa)
            $("prdireccion").html(direccion)
            $(".prdweb").html(web)
            $(".prdresidencia").html(residencia)
            $(".prdrubro").html(rubro)
            $('#frmeditprofile').trigger('reset');
            $("#showbtn").html("");

        }else
        if(response.message == "error"){
            $.NotificationApp.send("Opps!", "Ocurrió un erro, vuelva a intentar mas tarde", "top-right", "rgba(0,0,0,0.2)", "error")
        }else{
            $.NotificationApp.send("Opps!", "Ocurrió un erro, vuelva a intentar mas tarde", "top-right", "rgba(0,0,0,0.2)", "error")
        }
    })
    
    
    
    
    

})