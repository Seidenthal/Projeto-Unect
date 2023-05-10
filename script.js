const motrarModal = () => {
  const modal = document.querySelector("#fundomodal");
  modal.classList.add("mostrar");
};

const abrirModal = document.querySelector("#addtask");
abrirModal.onclick = mostarModal;

const esconderModal = () => {
  const modal = document.querySelector("#fundomodal");
  modal.classList.remove("mostrar");
};

const fecharModal = document.querySelector("#fecharmodal");
fecharModal.onclick = esconderModal;
