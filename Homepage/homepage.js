
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

const popUp = document.getElementById("popupCadastro")

let users = getUsers()

if(users.find(users => users.cpf === cpf)){ 
  alert("Este CPF ja está registrado");
  return;

}
if(users.find(users => users.email === email)){ 
  alert("Este e-mail ja existe");
  return;

}

users.push({nome, senha, cpf,email})
saveUsers(users)
popUp.showModal()

setTimeout(() => {
  popUp.close()
}, 1800);

//clear nos inputs
document.getElementById("nome").value = ""
document.getElementById("senha").value = ""
document.getElementById("cpf").value = ""
document.getElementById("email").value = ""

mostrarLogin()

}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", login); 
});

function login(e){
e.preventDefault();
  
  const emailSalvo = document.getElementById("emailSalvo").value;
  const senhaSalvo = document.getElementById("senhaSalvo").value;
  
  let usersLogin = getUsers()
  let user = usersLogin.find(user => user.email === emailSalvo && user.senha === senhaSalvo)
  
  
  if(user){
    localStorage.setItem("usuariosLogados", JSON.stringify(user))
    esconderButtonLogin() 
    mostrarHome()
    document.getElementById("configuracoes").style.display = "inline-flex"

    // clear nos inputs
    document.getElementById("emailSalvo").value = "" 
    document.getElementById("senhaSalvo").value = "" 
  }else{
    messageLogin.style.color = "red"
    messageLogin.textContent = "Usuário/Senha incorreto(s)"
  }
 }

 function usuarioLogado(){
  const usuarioLogado = JSON.parse(localStorage.getItem("usuariosLogados")) 
  if(usuarioLogado){
    esconderButtonLogin() 
    mostrarHome()
    document.getElementById("configuracoes").style.display = "inline-block"
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
const closebtnExcluir = document.getElementById("closeModalExcluirConta")


 if (btnexcluirConta) { 
 btnexcluirConta.addEventListener("click", ()=>{
  document.getElementById("popupEditar").close()
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
  const popup = document.getElementById("popupExclusao")
  popup.innerText = "Exclusão Concluída!"
  users = users.filter(user => user.cpf !== userString.cpf)
  saveUsers(users)
  localStorage.removeItem("usuariosLogados")
  
  document.getElementById("modalExcluirConta").style.display = "none"
  deslogar()
  popup.showModal()
      setTimeout(() => {
        popup.close()
        mostrarHome()
        cardClose()
      }, 2400);
      geradorDeCards()
}



//LOGIN MODAL


const modal = document.getElementById("login-modal");
const btn = document.getElementById("open-login");
const closeBtn = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "flex";
    document.getElementById("emailSalvo").focus()
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
  document.getElementById("cards-perfil-modal").close()
  document.getElementById("popupEditar").close()
  document.getElementById("popupExclusao")
}

// Sistema de criação de cards ---------

//const imoveis = JSON.parse(localStorage.getItem("imoveis")) || []

document.addEventListener("DOMContentLoaded", () => {
  const formImovel = document.getElementById("formCadastroCasa");

  formImovel.addEventListener("submit", cadastrarImovel); 

  document.getElementById("casaLocal").focus()


});


function cadastrarImovel(c){
  c.preventDefault()
// const casaLocal = document.getElementById("casaLocal").value.trim();
// const casaTipo = document.getElementById("casaTipo").value.trim();
// const casaPreco = document.getElementById("casaPreco").value.trim();
// const casaDescricao = document.getElementById("casaDescricao").value.trim();
// const casaCaracteristicas = document.getElementById("casaCaracteristicas").value.trim();


  
  const imagemCasas = [
    "https://tuacasa.uol.com.br/wp-content/uploads/2024/06/casa-simples-0.png",
    "https://i.pinimg.com/736x/c9/a0/ab/c9a0ab36aac8f8600db50c7d2be5a45e.jpg",
    "https://www.plantapronta.com.br/projetos/185/01.jpg",
    "https://www.iprojetei.com.br/upload/1390/823x463-miniatura.jpg",
    "https://todadecorada.com.br/wp-content/uploads/2015/05/casas-com-alpendre01.jpg",
    "https://www.fashionbubbles.com/wp-content/uploads/2024/01/fachadas-de-casas-modernas-luxuosas-destaque.jpg",
    "https://projetopronto.com/imagens/CT85/01.jpg",
    "https://admin.archshop.com.br/uploads/001_d03cf96dde.jpg",
    "https://www.dlegend.com.br/blog/wp-content/uploads/2018/10/DLegend_Blog_CharmeCasasComerciais_02.png"

  ]
  let urlImagem = imagemCasas[NumeroRandom(0, imagemCasas.length - 1)]

  const imovel = {
    id: Date.now(),
    local: document.getElementById("casaLocal").value,
    preco: document.getElementById("casaPreco").value,
    tipo: document.getElementById("casaTipo").value,
    descricao: document.getElementById("casaDescricao").value,
    caracteristica: document.getElementById("casaCaracteristicas").value,
    imagem: urlImagem
  }

  if(imovel.preco.length > 10 || imovel.preco < 0){
    alert("O preço digitado é inválido.")
  }else{
    let userLogado = JSON.parse(localStorage.getItem("usuariosLogados"))
    
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
    
    //clear inputs
    document.getElementById("casaLocal").value = ""
    document.getElementById("casaDescricao").value = ""
    document.getElementById("casaPreco").value = "" 
    document.getElementById("casaTipo").value = ""
    document.getElementById("casaCaracteristicas").value = ""
  }
  }
  let imovel = null
  let usuarioCard = null
  function verMais(id){
    const allUsers = getUsers()
    for(let user of allUsers){
    const encontrado = user.imoveis?.find(imovel => imovel.id === id)
    
    if(encontrado){
      usuarioCard = user 

      imovel = encontrado
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
                            <p>Nome: ${usuarioCard.nome}</p> 
                            <p>Email: ${usuarioCard.email}</p>  
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

function verMaisEdicao(id){
  const allUsers = getUsers()
  for(let user of allUsers){
    const encontrado = user.imoveis?.find(imovel => imovel.id === id)
    
    if(encontrado){
      usuarioCard = user 

      imovel = encontrado
    }
  }

   document.getElementById("box-modal-perfil").innerHTML = 
  `<section id="box-modal-perfil">
                    <span class="close" onclick="cardClose()">&times;</span>
                    <div id="modal-card-cima">
                        <div id="modal-imagem-card">
                            <img src="${imovel.imagem}"
                            alt="PLACEHOLDER">
                            <span>R$${imovel.preco}</span>
                        </div>
                        <div id="modal-titulo-card">
                            <div class="titulo-chato">
                            <h1>${imovel.tipo} em ${imovel.local}</h1>
                            <span class="mdi--pencil-box-outline" onclick="editarCard()"></span>
                            </div>
                            <p>Características: ${imovel.caracteristica}</p>
                            <div id="modal-informacoes-card">
                            <p>Nome: ${usuarioCard.nome}</p> 
                            <p>Email: ${usuarioCard.email}</p>  
                            </div>
                        </div>
                    </div>
                    <div id="modal-descricao-card">

                        <p>${imovel.descricao}</p>
                    </div>
                </section>`

  console.log(imovel)
  document.getElementById("cards-perfil-modal").showModal()
}











function editarCard(){
  document.getElementById("box-modal-perfil").innerHTML = 
  `<section id="box-modal-perfil" class="edicao-de-card">
                        <span class="close" onclick="cardClose()">&times;</span>
                        <div id="modal-card-cima">
                            <div id="modal-imagem-card">
                                <img src="${imovel.imagem}"
                                alt="PLACEHOLDER">
                                <input type="number" id="edicaoPreco" required placeholder="PREÇO" value="${imovel.preco}">
                            </div>
                            <div id="divisorParteCima">
                                <div class="titulo-chato">
                                    <div>
                                        <input type="text" id="tipoEdicao" required placeholder="TIPO" value="${imovel.tipo}">
                                    </div>
                                        <h1>em</h1>
                                    <div>
                                        <input type="text" id="localEdicao" required placeholder="LOCAL" value="${imovel.local}">
                                    </div>
                                </div>
                                <div id="cardsEdicaoDivisao">
                                    <p>Características:</p>
                                    <textarea name="" id="caracteristicasEdicao" placeholder="CARACTERISTICAS" required>${imovel.caracteristica}</textarea>
                                </div>
                            </div>
                        </div>
                        <div id="modal-descricao-card" class="descricaoDaEdicao">
                            <textarea name="" id="descricaoEdicao" placeholder="DESCRIÇÃO" required>${imovel.descricao}</textarea>
                        </div>
                        <div id="salvar-card-perfil">
                        <button onclick="salvarAlteracoesCard(${imovel.id})">Salvar alterações</button>
                        <div id="deletar-card-perfil">
                        <button onclick="deletarCard(${imovel.id})">Deletar</button>
                        </div>
                        </div>
                        </section>`
}



function salvarAlteracoesCard(id){
  const local = document.getElementById("localEdicao").value.trim()
  const preco = document.getElementById("edicaoPreco").value.trim()
  const tipo = document.getElementById("tipoEdicao").value.trim()
  const caracteristica = document.getElementById("caracteristicasEdicao").value.trim()
  const descricao = document.getElementById("descricaoEdicao").value.trim()
  

  const allUsers = getUsers()

  const userIndex = allUsers.findIndex(u => u.cpf === usuarioCard.cpf)
  if (userIndex === -1) return;

  

  
  const indexImovel = allUsers[userIndex].imoveis.findIndex(imoveis=> imoveis.id === id)
   if (indexImovel === -1) return;




  allUsers[userIndex].imoveis[indexImovel] = {
    ...allUsers[userIndex].imoveis[indexImovel],
    local,
    preco,
    tipo,
    caracteristica,
    descricao
    // id: id,
    // local: local,
    // preco: preco,
    // tipo: tipo,
    // caracteristica: caracteristica,
    // descricao: descricao,
    // imagem: imagem
  }

  const logado = JSON.parse(localStorage.getItem("usuariosLogados"))
  
  if(local.length <= 0 || descricao.length <=0 || caracteristica.length <=0 || tipo.length <=0 || preco.length <=0){
    alert("Não deixe nenhum campo vazio!")
    return
  }
  if(logado && logado.cpf === usuarioCard.cpf){
    localStorage.setItem("usuariosLogados", JSON.stringify(allUsers[userIndex]))
  }
  saveUsers(allUsers)
      const avisoEdPerfil = document.getElementById("popupEdicaoPerfil")
      avisoEdPerfil.innerHTML = "Edição Concluída!"
      avisoEdPerfil.showModal()
      setTimeout(() => {
        avisoEdPerfil.close()
        mostrarPerfil()
        cardClose()
      }, 1800);
      geradorDeCards()
}

function deletarCard(id){

  const allUsers = getUsers()

  const userIndex = allUsers.findIndex(u => u.cpf === usuarioCard.cpf)
  if (userIndex === -1) return;

  const indexImovel = allUsers[userIndex].imoveis.findIndex(imoveis => imoveis.id === id)
   if (indexImovel === -1) return;

  allUsers[userIndex].imoveis.splice([indexImovel], 1)

  const logado = JSON.parse(localStorage.getItem("usuariosLogados"))
  
  if(logado && logado.cpf === usuarioCard.cpf){
    localStorage.setItem("usuariosLogados", JSON.stringify(allUsers[userIndex]))
  }
  saveUsers(allUsers)
      const avisoEdPerfil = document.getElementById("popupExclusao")
      avisoEdPerfil.innerText = "Card deletado!"
      avisoEdPerfil.showModal()
      setTimeout(() => {
        avisoEdPerfil.close()
        mostrarPerfil()
        cardClose()
      }, 1800);
      geradorDeCards()
}


//barra do ze pesquisa pinto
function pesquisaDeCards(){
  const pesquisabarra = document.getElementById('pesquisabarra')
  const cards = document.querySelectorAll('.card'); 
  pesquisabarra.addEventListener('input', ()=> {
    const query = pesquisabarra.value.toLowerCase();

    cards.forEach(card => {
      const pcard = Array.from(card.querySelectorAll(('p, span')))
      .map(p => p.textContent.toLowerCase())
      .join('');
      if (pcard.includes(query)){
        card.style.display = 'flex'
        document.getElementById("pagina-centro").style.justifyContent = "center";
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
usuarioLogado()
editarPerfilUsuario()


//Sistema de card acaba aqui ---------

function geradorDeCardsPerfil(){
    let container = document.getElementById("cards-perfil")
    container.innerHTML = ""
      const user = JSON.parse(localStorage.getItem("usuariosLogados"))
      
    if(!user || !user.imoveis || user.imoveis.length === 0){ 
    container.innerHTML = "<h1 id='mensagemCardsPerfil'> USUÁRIO AINDA NÃO POSSUI CARDS </h1>"
    return
    }

    for(i = 0; i < user.imoveis.length; i++){
    let descricao
    if(user.imoveis[i].descricao.length > 60){
      descricao = user.imoveis[i].descricao.slice(0,60) + "(...)"
    }else descricao = user.imoveis[i].descricao
    console.log(user.imoveis[i].id)
    
    document.getElementById("cards-perfil").innerHTML += 
    `<div class="card">
    <div class="conteudo-card">
    <img src=${user.imoveis[i].imagem}
    alt="PLACEHOLDER">
    <span>${user.imoveis[i].tipo}</span>
    <p>${user.imoveis[i].local}</p>
    <p>${descricao}</p>
    <button onclick="verMaisEdicao(${user.imoveis[i].id})">Ver detalhes</button>
    </div>
    </div>`
    }
}





// //edicaodecontaeditar
function editarPerfilUsuario(){

  document.addEventListener("DOMContentLoaded", () => {
    const popUp = document.getElementById("popupEditar");
    const btnEditarConta = document.getElementById("botaoEditarContaModal");
  
    if (btnEditarConta) {
      btnEditarConta.addEventListener("click", () => {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuariosLogados"));
        if (!usuarioLogado) {
          alert("Usuário não está logado.");
          return;
        }
        popUp.showModal()
        preencherCamposEdicao(usuarioLogado);
      });
    }
  });
  
  
  function preencherCamposEdicao(usuarioLogado) {
    document.getElementById("editar-nome").value = usuarioLogado.nome;
    document.getElementById("editar-senha").value = usuarioLogado.senha;
    document.getElementById("editar-cpf").placeholder = usuarioLogado.cpf;
    document.getElementById("editar-email").value = usuarioLogado.email;
  }
  
  function editamentoDeConta(e) {
  e.preventDefault();

  const nome = document.getElementById("editar-nome").value.trim();
  const senha = document.getElementById("editar-senha").value.trim();
  const email = document.getElementById("editar-email").value.trim();
  const popUp = document.getElementById("popupEditar")

  const userAntigo = JSON.parse(localStorage.getItem("usuariosLogados"));

  if (!userAntigo || !userAntigo.cpf) {
    alert("Erro ao localizar usuário logado.");
    return;
  }

  const cpf = userAntigo.cpf;

  let users = getUsers();
  const index = users.findIndex(user => user.cpf === cpf);

  if (index === -1) {
    alert("Usuário não encontrado.");
    return;
  } 
  
  if(users.find((user => user.email === email && user.cpf !== cpf))){
    alert("Este e-mail já existe")
    return
  }else{
   users[index] = {
  ...users[index],
  nome,
  senha,
  email
};
localStorage.setItem("usuariosLogados", JSON.stringify(users[index]));
    saveUsers(users);

    if (popUp && typeof popUp.showModal === "function") {
      const aviso = document.getElementById("popupEdicaoPerfil")
      aviso.showModal()
      setTimeout(() => {
        popUp.close()
        mostrarHome()
        aviso.close()
        
        // Limpar campos
        document.getElementById("editar-nome").value = "";
        document.getElementById("editar-senha").value = "";
        document.getElementById("editar-email").value = "";
        document.getElementById("editar-cpf").value = "";
      }, 1200);
    }
  }
}
  document.getElementById("editar-form").addEventListener("submit", editamentoDeConta);

}  

//esconder1

function esconderButtonLogin(){
  //esconder o botao depois
  document.getElementById("login-modal").style.display = "none"
  document.getElementById("open-login").style.display = "none"
}

function mostrarCadastro(){
  document.getElementById("login-modal").style.display = "none"
  document.getElementById("cadastro-modal").style.display = "flex"
  document.getElementById("nome").focus()

  // clear dos inputs
  document.getElementById("emailSalvo").value = "" 
  document.getElementById("senhaSalvo").value = "" 
}

function mostrarLogin(){
  document.getElementById("cadastro-modal").style.display = "none"
  document.getElementById("login-modal").style.display = "flex"
  document.getElementById("emailSalvo").focus()

  // clear dos inputs
  document.getElementById("nome").value = ""
  document.getElementById("senha").value = ""
  document.getElementById("cpf").value = ""
  document.getElementById("email").value = ""
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

  geradorDeCardsPerfil()
 
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




