
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  form.addEventListener("submit", cadastro); 
  document.getElementById("nomeCadastro").focus()
});

function cadastro(e){ 
e.preventDefault();

const nomeCadastro = document.getElementById("nomeCadastro").value;
const senhaCadastro = document.getElementById("senhaCadastro").value;
const cpfCadastro = document.getElementById("cpfCadastro").value;
const emailCadastro = document.getElementById("emailCadastro").value;


let cadastrados = [];

if(localStorage.hasOwnProperty("cadastrados")){
  cadastrados = JSON.parse(localStorage.getItem("cadastrados"))
}
cadastrados.push({nomeCadastro, senhaCadastro, cpfCadastro, emailCadastro});

localStorage.setItem("cadastrados", JSON.stringify(cadastrados));

console.log({nomeCadastro, senhaCadastro, emailCadastro, cpfCadastro})

mostrarLogin()
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", login); 
});

function login(e){
e.preventDefault();
  
  
   document.getElementById("nomeCadastro")
  
  const nomeLogin = document.getElementById("nomeLogin").value;
  const senhaLogin = document.getElementById("senhaLogin").value;
  
  
  cadastrados = JSON.parse(localStorage.getItem("cadastrados")) || [];
  
  const usuarioCadastrado = cadastrados.find(
    (usuario) => usuario.nomeCadastro === nomeLogin && usuario.senhaCadastro === senhaLogin
  )

  if(usuarioCadastrado){
    esconderButtonLogin()
  }else{
    console.log("erro")
  }




}











//LOGIN MODAL


const modal = document.getElementById("login-modal");
const btn = document.getElementById("open-login");
const closeBtn = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "flex";
    document.getElementById("nomeLogin").focus()
  }
  
  closeBtn.onclick = function(event) {
    if(event.target != modal) {
        
      modal.style.display = "none";
    }
  }

//Modal Cadastro
const modalCadastro = document.getElementById("cadastro-modal");
const closeBtnCadastro = document.getElementsByClassName("closeCadastro")[0];

  
  closeBtnCadastro.onclick = function(event) {
    if(event.target != modalCadastro) {
      
      modalCadastro.style.display = "none";
    }
  }

const message = document.getElementById("message")










//esconder

function esconderButtonLogin(){
  //esconder o botao depois


  document.getElementById("login-modal").style.display = "none"
  document.getElementById("open-login").style.display = "none"


}

function mostrarCadastro(){
  document.getElementById("login-modal").style.display = "none"
  document.getElementById("cadastro-modal").style.display = "flex"
  document.getElementById("nomeCadastro").focus()
}

function mostrarLogin(){
  document.getElementById("cadastro-modal").style.display = "none"
  document.getElementById("login-modal").style.display = "flex"
  document.getElementById("nomeLogin").focus()
}
 

