document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault()




const user = document.getElementById("username").value
const password = document.getElementById("password").value
const message = document.getElementById("message")

const user1 = "1"
const password1 = "1"


if(user === user1 && password === password1){
    message.style.color = "green"
    message.textContent = "Login Efetuado"

    //login efetuado


    document.getElementById("loginForm").style.display = "none"
    document.getElementById("dashboard").style.display = "block";

    showTab("home");
   
}else{
    message.style.color = "red"
    message.textContent = "Usuário ou senha incorreto"
    //  erro
}

});

function showTab(tab) {
    const content = {
      home: "<p> SLA.</p>",
      profile: "<p> Perfil .</p>",
      settings: "<p> Configurações.</p>",
      livros: "<p> Livros.</p>"
    };
    document.getElementById("tabContent").innerHTML = content[tab] || "<p>Aba não encontrada.</p>";
 }



    /*padding: 10px 20px;
       margin: 20px ;
       background-color: black;
       color: white;
       border: none;
       border-radius: 10px;
       font-size: 20px;
       cursor: pointer;
       display: inline-block;
       width:auto; */