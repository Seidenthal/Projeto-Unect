const mostrarModal = () => {
  const modal = document.getElementById("fundomodal");
  modal.classList.add("mostrar");
};

const abrirModal = document.getElementById("addtask");
abrirModal.onclick = mostrarModal;

const esconderModal = () => {
  const modal = document.getElementById("fundomodal");
  modal.classList.remove("mostrar");
};

const fecharModal = document.getElementById("fecharmodal");
fecharModal.onclick = esconderModal;
