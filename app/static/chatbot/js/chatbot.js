/*=============================================
AGREGAMOS DATOS AL LOCALSTORAGE
=============================================*/
var guardado = localStorage.getItem('datos') || '';
if (guardado == '') {
  var id_cliente = document.getElementById('id_user_logueado').value
  var username = document.getElementById('username_logueado').value
  var nombrebd = document.querySelector('#nombrebd_logueado').value
  var id_empresa = document.getElementById('empresa_logueado').value
  var tipo_usu = document.getElementById('permisos_logueado').value
  if (tipo_usu == 'True') {
    document.getElementById('li_Clientes').style.display = "block";
    document.getElementById('li_Usuarios').style.display = "block";
  }
} else {
  var id_cliente = JSON.parse(guardado).id_cliente;
  var username = JSON.parse(guardado).username;
  var nombrebd = JSON.parse(guardado).nombrebd;
  var id_empresa = JSON.parse(guardado).id_empresa;
  var tipo_usu = JSON.parse(guardado).tipo_usu;
  document.querySelector('.username_user_ls').innerHTML = username.toUpperCase() + ' - Bienvenido'
  // document.getElementById('id_nombreBD').value = nombrebd + '.sqlite3'
  document.getElementById('nombrebd_logueado').value = nombrebd + '.sqlite3'
  document.querySelector('#libreria_chatbot').setAttribute('user', id_cliente)
  document.querySelector('#libreria_chatbot').setAttribute('empresa', id_empresa)
  if (tipo_usu == 'True') {
    document.getElementById('li_Clientes').style.display = "block";
    document.getElementById('li_Usuarios').style.display = "block";
  }
}
datos = {
  id_cliente: id_cliente,
  username: username,
  nombrebd: nombrebd,
  id_empresa: id_empresa,
  tipo_usu: tipo_usu
}
// Guardo el objeto como un string
localStorage.setItem('datos', JSON.stringify(datos));
// Obtengo el string previamente salvado y luego
var guardado = localStorage.getItem('datos');
/*=============================================
LIMPIAR EL LOCALSTORAGE AL CERRAR SESSIÓN
=============================================*/
document.querySelector("#logout_sess").addEventListener("click", () => {
  localStorage.clear();
})