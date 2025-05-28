function salvarCadastro(){
    const nome = document.getElementById("nome").value
    const senha = document.getElementById("senha").value
    const senha2 = document.getElementById("senha2").value
    const cpf = document.getElementById("cpf").value
    const sla = document.getElementById("sla").value


    const cadastro = {nome: nome, senha: senha, senha2: senha2, cpf: cpf,
     sla: sla}
    
    console.table(nome, senha, senha2, cpf, sla)

    header.innerHTML = nome+"    ", senha+"    ", senha2+"    ",
     cpf+"    ", sla+ "    "

    localStorage.setItem("cadastro", JSON.stringify(cadastro));

}