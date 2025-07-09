
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
// Gustavo corrige um bug em que o usuario deslogava e não aparecia mais nenhum card
 function deslogar(){
    localStorage.removeItem("usuariosLogados")
    document.getElementById("configuracoes").style.display = "none"
    document.getElementById("open-login").style.display = "inline-block"
    esconderTudo()
    mostrarHome()
}

document.addEventListener("DOMContentLoaded", () => {
const btnexcluirConta = document.querySelector(".excluirConta")
 const modalExcluirConta = document.querySelector("#modalExcluirConta")
 const cancelarExcluir = document.querySelector("#cancelarExcluir")
 const closebtnExcluir =  document.getElementsByClassName("closeModalExcluir")[0];


 if (btnexcluirConta) { 
 btnexcluirConta.addEventListener("click", ()=>{
   modalExcluirConta.style.display = 'flex'
 })
 }
cancelarExcluir.addEventListener("click", ()=>{
  modalExcluirConta.style.display = 'none'
 })

closebtnExcluir.addEventListener("click", () => {
  modalExcluirConta.style.display = 'none'
  })

 const confirmaExcluir = document.getElementById("confirmaExcluir")
 confirmaExcluir.addEventListener("click", excluirConta)
});

function excluirConta(e){
  if (e) e.preventDefault();
  let userLogado = localStorage.getItem("usuariosLogados")
  if(!userLogado) return

  let userString = JSON.parse(userLogado)

 //


  //
  let users = getUsers()  
  users = users.filter(user => user.nome !== userString.nome)
  saveUsers(users)
  localStorage.removeItem("usuariosLogados")
  
  alert("conta excluida")
  document.getElementById("modalExcluirConta").style.display = "none"
  deslogar()
  geradorDeCards()
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

// Modal de ver detalhes da casa

function cardClose(){
  document.getElementById("modal-card").close()
}

// Sistema de criação de cards ---------

//const imoveis = JSON.parse(localStorage.getItem("imoveis")) || []

function cadastrarImovel(){
  let imagemCasa = NumeroRandom(1, 5)
  let urlImagem = ""

    switch (imagemCasa) {
      case 1: 
      urlImagem = "https://tuacasa.uol.com.br/wp-content/uploads/2024/06/casa-simples-0.png"
      break
      case 2: 
      urlImagem = "https://i.pinimg.com/736x/c9/a0/ab/c9a0ab36aac8f8600db50c7d2be5a45e.jpg"
      break
      case 3: 
      urlImagem = "https://www.plantapronta.com.br/projetos/185/01.jpg"
      break
      case 4: 
      urlImagem = "https://www.iprojetei.com.br/upload/1390/823x463-miniatura.jpg"
      break
      case 5: 
      urlImagem = "https://todadecorada.com.br/wp-content/uploads/2015/05/casas-com-alpendre01.jpg"
      break
    }

  const imovel = {
    id: Date.now(),
    local: document.getElementById("casaLocal").value,
    preco: document.getElementById("casaPreco").value,
    tipo: document.getElementById("casaTipo").value,
    descricao: document.getElementById("casaDescricao").value,
    caracteristica: document.getElementById("casaCaracteristicas").value,
    imagem: urlImagem
  }

  let userLogado =JSON.parse(localStorage.getItem("usuariosLogados"))

  let users = getUsers()  

  const index = users.findIndex(user => user.cpf === userLogado.cpf)
  if(index === -1) return

  if (!users[index].imoveis){
    users[index].imoveis = [];
  }

  users[index].imoveis.push(imovel)

  saveUsers(users)

  localStorage.setItem("usuariosLogados", JSON.stringify(users[index]))

  // imoveis.push(imovel)
  // localStorage.setItem("imoveis", JSON.stringify(imoveis))

  geradorDeCards()
  mostrarHome()
  pesquisaDeCards()

  document.getElementById("casaLocal").value = ""
  document.getElementById("casaDescricao").value = ""
  document.getElementById("casaPreco").value = "" 
  document.getElementById("casaTipo").value = ""
  document.getElementById("casaCaracteristicas").value = ""
}
let imovel = null

function verMais(id){
  const allUsers = getUsers()
  for(let user of allUsers){
    const encontrado = user.imoveis?.find(imovel => imovel.id === id)
    if(encontrado){
      imovel = encontrado
      break
    }
  }

   document.getElementById("box-modal-card").innerHTML = 
  `<section id="box-modal-card">
                    <span class="close" onclick="cardClose()">&times;</span>
                    <div id="modal-card-cima">
                        <div id="modal-imagem-card">
                            <img src="${imovel.imagem}"
                            alt="PLACEHOLDER">
                            <span>R$ ${imovel.preco}</span>
                        </div>
                        <div id="modal-titulo-card">
                            <h1>${imovel.tipo} em ${imovel.local}</h1>
                            <p>Características: ${imovel.caracteristica}</p>
                            <div id="modal-informacoes-card">
                            <p>Nome: Nao sei como Telefone: fazer </p> 
                            </div>
                        </div>
                    </div>
                    <div id="modal-descricao-card">
                        <p>${imovel.descricao}</p>
                    </div>
                </section>`

  console.log(imovel)
  document.getElementById("modal-card").showModal()
}

//barra do ze pesquisa pinto
function pesquisaDeCards(){
  const pesquisabarra = document.getElementById('pesquisabarra')
  const cards = document.querySelectorAll('.card'); 
  pesquisabarra.addEventListener('input', ()=> {
    const query = pesquisabarra.value.toLowerCase();

    cards.forEach(card => {
      const pcard = Array.from(card.querySelectorAll('p'))
      .map(p => p.textContent.toLowerCase())
      .join('');
      if (pcard.includes(query)){
        card.style.display = 'flex';
      }else{
        card.style.display = 'none';
      }
    })
  })
}

function geradorDeCards(){
    document.getElementById("pagina-centro").innerHTML = ""
    const allUsers = getUsers()
    let userImovel = []

    allUsers.forEach( user => {
      if (user.imoveis && Array.isArray(user.imoveis)){
        user.imoveis.forEach(imovel => {
          userImovel.push(imovel)
        })
      }
    })

    for(i = 0; i < userImovel.length; i++){
    let descricao
    if(userImovel[i].descricao.length > 60){
      descricao = userImovel[i].descricao.slice(0,60) + "(...)"
    }else descricao = userImovel[i].descricao
    
    document.getElementById("pagina-centro").innerHTML += 
    `<div class="card">
    <div class="conteudo-card">
    <img src=${userImovel[i].imagem}
    alt="PLACEHOLDER">
    <span>${userImovel[i].tipo}</span>
    <p>${userImovel[i].local}</p>
    <p>${descricao}</p>
    <button onclick="verMais(${userImovel[i].id})">Ver detalhes</button>
    </div>
    </div>`



    }

    // document.getElementById("box-modal-card").innerHTML +=
}

geradorDeCards()
pesquisaDeCards()

//Sistema de card acaba aqui ---------








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

function NumeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}




