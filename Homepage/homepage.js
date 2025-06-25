
//CADASTRO E LOGIN

function getUsers(){
  let data = localStorage.getItem("users")
  return data ? JSON.parse(data) : []
}

function saveUsers(users){
  localStorage.setItem("users", JSON.stringify(users)); 
}



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");

  form.addEventListener("submit", cadastro); 
  
  document.getElementById("nome").focus()
});


function cadastro(e){ 
e.preventDefault();

const nome = document.getElementById("nome").value.trim();
const senha = document.getElementById("senha").value.trim();
const cpf = document.getElementById("cpf").value.trim();
const email = document.getElementById("email").value.trim();

let users = getUsers()

if(users.find(users => users.cpf === cpf)){ 
  alert("usuario ja existe");
  return;

}

users.push({nome, senha, cpf,email})
saveUsers(users)
alert("Cadastro realizado")


mostrarLogin()

}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", login); 
});

function login(e){
e.preventDefault();
  
  const nomeSalvo = document.getElementById("nomeSalvo").value;
  const senhaSalvo = document.getElementById("senhaSalvo").value;
  
  let usersLogin = getUsers()
  let user = usersLogin.find(user => user.nome === nomeSalvo && user.senha === senhaSalvo)
  
  
  if(user){
    localStorage.setItem("usuariosLogados", JSON.stringify(user))
    esconderButtonLogin() 
    mostrarHome()
    document.getElementById("dashboard").style.display = "inline-block"
    document.getElementById("configuracoes").style.display = "inline-block"
  }else{
    messageLogin.style.color = "red"
    messageLogin.textContent = "Usuário/Senha incorreto(s)"
  }
 }

 //PERFIL

 function deslogar(){
  document.getElementById("container-home").style.display = "flex"
  document.getElementById("open-login").style.display = "flex"
  document.getElementById("dashboard").style.display = "none"
  document.getElementById("configuracoes").style.display = "none"
  document.getElementById("container-perfil").style.display = "none"

  localStorage.removeItem("usuariosLogados")
}

function excluirConta(){
  let userLogado = localStorage.getItem("usuariosLogados")
  if(!userLogado) return

  let userString = JSON.parse(userLogado)

  let users = getUsers()  
  users = users.filter(user => user.nome !== userString.nome)
  saveUsers(users)
  localStorage.removeItem("usuariosLogados")
  
  alert("conta excluida")

  deslogar()
  

}



//LOGIN MODAL


const modal = document.getElementById("login-modal");
const btn = document.getElementById("open-login");
const closeBtn = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "flex";
    document.getElementById("nomeSalvo").focus()
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

const message = document.getElementById("messageLogin")

//Dados do perfil

//esconder

function esconderButtonLogin(){
  //esconder o botao depois
  document.getElementById("login-modal").style.display = "none"
  document.getElementById("open-login").style.display = "none"
}

function mostrarCadastro(){
  document.getElementById("login-modal").style.display = "none"
  document.getElementById("cadastro-modal").style.display = "flex"
  document.getElementById("nome").focus()
}

function mostrarLogin(){
  document.getElementById("cadastro-modal").style.display = "none"
  document.getElementById("login-modal").style.display = "flex"
  document.getElementById("nomeSalvo").focus()
}

function mostrarHome(){
  esconderTudo()
  document.getElementById("container-home").style.display = "flex"
}

function mostrarPerfil(){
  esconderTudo()
  document.getElementById("container-perfil").style.display = "flex"
  const usuarioLogado = JSON.parse(localStorage.getItem("usuariosLogados"))
  
  document.getElementById("nomePerfil").innerHTML = "Nome: " + usuarioLogado.nome
  document.getElementById("emailPerfil").innerHTML =  "Email: " + usuarioLogado.email
  document.getElementById("cpfPerfil").innerHTML = "CPF: " + usuarioLogado.cpf
 
}

function esconderTudo(){
  document.getElementById("container-home").style.display = "none"
  document.getElementById("container-perfil").style.display = "none"
  document.getElementById("addCasaContainer").style.display = "none"
}

function mostrarAbaAdicionarCasa() {
  esconderTudo()
  document.getElementById("addCasaContainer").style.display = "flex"
}



