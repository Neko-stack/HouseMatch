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
    

    showTab("home");
   
}else{
    message.style.color = "red"
    message.textContent = "Usuário ou senha incorreto"
    //  erro
}

});


