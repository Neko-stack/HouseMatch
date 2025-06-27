
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
const cards = [
  {
    tipoeLocal: 'Apartamento em Xique Xique',
    descricao: 'Casa com 4 quartos taran taran raaaaaa raaaaaa raaaaaa raaaaa raaaaaaa raaaaaaaaa raaaaaa',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Casa no Rio Vermelho',
    descricao: 'Imóvel com 3 quartos e piscina',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Cobertura no Centro',
    descricao: 'Cobertura de luxo com vista panorâmica',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Apartamento no Barra',
    descricao: 'Apartamento moderno com 2 quartos e varanda gourmet',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Casa no Itapuã',
    descricao: 'Casa com 5 quartos e jardim amplo',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Apartamento no Pituba',
    descricao: 'Apartamento com 3 quartos e sala ampla',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Studio no Rio Vermelho',
    descricao: 'Studio compacto e funcional',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Sobrado em Stella Maris',
    descricao: 'Sobrado com 4 quartos e área de lazer',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Casa em Lauro de Freitas',
    descricao: 'Casa com 6 quartos e piscina',
    detalhes: "Ver detalhes"
  },
  {
    tipoeLocal: 'Apartamento em Ondina',
    descricao: 'Apartamento de frente para o mar com 3 quartos',
    detalhes:  "Ver detalhes"
  }]


function testear(){
  for(i = 0; i < cards.length; i++){
    let descricao
    if(cards[i].descricao.length > 60){
      descricao = cards[i].descricao.slice(0,60) + "(...)"
    }else descricao = cards[i].descricao
    document.getElementById("pagina-centro").innerHTML += 
    `<div class="card">
    <div class="conteudo-card">
    <img src="https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder.png?ssl=1"
    alt="PLACEHOLDER">
    <p>${cards[i].tipoeLocal}</p>
    <p>${descricao}</p>
    <button>${cards[i].detalhes}</button>
    </div>
    </div>`
  }
}

testear()











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



