$(document).ready(function () {

    var id_cliente = $("#id_user_logueado").val();
    var username = $("#username_logueado").val();
    datos = {
        id_cliente: id_cliente,
        username: username
    }

    var idClienteLS = [];
    /*=============================================
    ALMACENAR EN EL LOCALSTORAGE LOS DATOS DE CLIENTE LOGUEADO
    =============================================*/
    fnLS();
    function fnLS() {
        if (localStorage.getItem("obtenerId") == null) {

        idClienteLS = [];

        } else {

        idClienteLS.concat(localStorage.getItem("obtenerId"))

        }

        idClienteLS.push(datos)
        localStorage.setItem("obtenerId", JSON.stringify(idClienteLS))

        return idClienteLS;
    }

    /*=============================================
    LIMPIAR EL LOCALSTORAGE AL CERRAR SESSIÓN
    =============================================*/
    $(document).on('click', '#logout_sess', (e) => {

        localStorage.clear();

    })

})