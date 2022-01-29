function init() {
 
  let a = document.createElement("link");
  a.setAttribute("src", "static/chatbot/css/style.css");
  // let aTexto = document.createTextNode("Google");
  // a.appendChild(aTexto);
  document.body.appendChild(a);

  let b = document.createElement("link");
  b.setAttribute("src", "static/chatbot/css/chatBot.css");
  document.body.appendChild(b);

  // let c = document.createElement("script");
  // c.setAttribute("src", "static/chatbot/js/jquery-3.1.1.min.js");
  // document.body.appendChild(c);

  // let d = document.createElement("script");
  // d.setAttribute("src", "static/chatbot/js/chatbot.js");
  // document.body.appendChild(d);

}

window.onload = init;