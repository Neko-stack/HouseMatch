const modal = document.getElementById("loginModal");
const btn = document.getElementById("openLogin");
const span = document.getElementsByClassName("close")[0];

// Abrir o modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// Fechar o modal ao clicar no X
span.onclick = function() {
  modal.style.display = "none";
}

// Fechar o modal ao clicar fora do conteúdo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
