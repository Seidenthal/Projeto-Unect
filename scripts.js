//Getters
let btnsubmit = document.getElementById("submit");
let input = document.getElementById("input");
let inputdesc = document.getElementById("inputdesc");
let tasks = document.querySelectorAll(".tasks");
let abrirjanela = document.getElementById("janelaadd");
let btnadd = document.getElementById("btnadd");
let btnfechar = document.getElementById("btnfechar");
let backfechar = document.querySelector(".background-nova");
let btnfrase = document.getElementById("btnfrase");
let abrirfrase = document.querySelector(".janelafrase");
let btnfrasefechar = document.querySelector(".frasefechar");
let backfrasefechar = document.querySelector(".background-frase");

//Abrir e fechar janela de adicionar tasks
btnadd.addEventListener("click", () => {
  abrirjanela.classList.add("visible");
});
btnfechar.addEventListener("click", () => {
  abrirjanela.classList.remove("visible");
});
backfechar.addEventListener("click", () => {
  abrirjanela.classList.remove("visible");
});

//Abrir frase do dia
btnfrase.addEventListener("click", () => {
  abrirfrase.classList.add("mostrar");
});
btnfrasefechar.addEventListener("click", () => {
  abrirfrase.classList.remove("mostrar");
});
backfrasefechar.addEventListener("click", () => {
  abrirfrase.classList.remove("mostrar");
});

//Adicionar tasks
btnsubmit.addEventListener("click", addTask);

//Funções das tasks
tasks.forEach((item) => {
  item.addEventListener("click", functions);
});

//Função para adicionar task
function addTask(event) {
  if (input.value === "") {
  } else {
    event.preventDefault();

    const prox_img = document.createElement("img");
    prox_img.classList.add("prox");
    prox_img.src = "images/proximo.png";

    const ant_img = document.createElement("img");
    ant_img.classList.add("ant");
    ant_img.src = "images/voltar.png";

    const setas_div = document.createElement("div");
    setas_div.classList.add("setas");
    setas_div.append(ant_img, prox_img);

    const desc_p = document.createElement("p");
    desc_p.classList.add("descricaoseta");
    desc_p.innerHTML = inputdesc.value;

    const seta_img = document.createElement("img");
    seta_img.classList.add("setaimagem");
    seta_img.src = "/images/seta.png";

    const desc_h1 = document.createElement("h1");
    desc_h1.classList.add("lerdescricao");
    desc_h1.innerHTML = "Ler Descrição";

    const seta_div = document.createElement("div");
    seta_div.classList.add("seta");
    seta_div.append(desc_h1, seta_img);

    const container_div = document.createElement("div");
    container_div.append(seta_div, desc_p);

    const ler_div = document.createElement("div");
    ler_div.classList.add("ler");
    ler_div.append(container_div, setas_div);

    const excluir_p = document.createElement("p");
    excluir_p.classList.add("excfunc");
    excluir_p.innerHTML = "Excluir";

    const excluir_img = document.createElement("img");
    excluir_img.classList.add("excfunc");
    excluir_img.src = "/images/Excluir.png";

    const excluir_div = document.createElement("div");
    excluir_div.classList.add("excluir");
    excluir_div.append(excluir_img, excluir_p);

    const vert_img = document.createElement("img");
    vert_img.classList.add("morevert");
    vert_img.src = "/images/more_vert.png";

    const title_h1 = document.createElement("h1");
    title_h1.innerHTML = input.value;

    const title_div = document.createElement("div");
    title_div.classList.add("title");
    title_div.append(title_h1, vert_img, excluir_div);

    const task_div = document.createElement("div");
    task_div.classList.add("task");
    task_div.append(title_div, ler_div);

    document.getElementById("afazer").append(task_div);

    input.value = "";
    inputdesc.value = "";
  }
}

function functions(event) {
  const item = event.target;

  // Abrir box de excluir
  if (item.classList.contains("morevert")) {
    item.parentElement.lastChild.classList.toggle("visible");
  }

  // Excluir
  if (item.classList.contains("excfunc")) {
    item.parentElement.parentElement.parentElement.remove();
  } else if (item.classList.contains("excluir")) {
    item.parentElement.parentElement.remove();
  }

  // Abrir Descrição
  if (item.classList.contains("seta")) {
    item.parentElement.lastChild.classList.toggle("mostrar");
    item.firstChild.classList.toggle("blue");
    if (item.parentElement.lastChild.classList.contains("mostrar")) {
      item.lastChild.src = "images/Expand.png";
      item.firstChild.innerHTML = "Esconder Descrição";
    } else {
      item.lastChild.src = "images/seta.png";
      item.firstChild.innerHTML = "Ler Descrição";
    }
  }
  if (
    item.classList.contains("setaimagem") ||
    item.classList.contains("lerdescricao")
  ) {
    item.parentElement.parentElement.lastChild.classList.toggle("mostrar");
    item.parentElement.firstChild.classList.toggle("blue");
    if (
      item.parentElement.parentElement.lastChild.classList.contains("mostrar")
    ) {
      item.parentElement.lastChild.src = "images/Expand.png";

      item.parentElement.firstChild.innerHTML = "Esconder Descrição";
    } else {
      item.parentElement.lastChild.src = "images/seta.png";
      item.parentElement.firstChild.innerHTML = "Ler Descrição";
    }
  }

  const task = item.parentElement.parentElement.parentElement;
  const atual = item.parentElement.parentElement.parentElement.parentElement.id;

  //  Mover para frente
  if (item.classList.contains("prox")) {
    if (atual == "afazer") {
      document.getElementById("andamento").append(task);
    } else if (atual == "andamento") {
      document.getElementById("feito").append(task);
      item.src = "/images/retornar.png";
    } else {
      document.getElementById("afazer").append(task);
      item.src = "/images/proximo.png";
    }
  }

  // Mover para trás
  if (item.classList.contains("ant")) {
    if (atual == "andamento") {
      document.getElementById("afazer").append(task);
    } else {
      document.getElementById("andamento").append(task);
      item.parentElement.lastChild.src = "/images/proximo.png";
    }
  }
}

//API frase do dia

const elementoErro = document.getElementById("erro");
const p = document.querySelector("#frase-paragrafo");

fetch("https://api.adviceslip.com/advice")
  .then((response) => response.json())
  .then((data) => {
    const fraseOriginal = data.slip.advice;
    const url = `https://api.mymemory.translated.net/get?q=${fraseOriginal}&langpair=en|pt&key=${"5be2f48704466091a687"}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const fraseTraduzida = data.responseData.translatedText;
        p.innerText = fraseTraduzida;
      })
      .catch((error) => {
        elementoErro.innerText =
          "Ocorreu um erro ao traduzir a frase aleatória.";
      });
  })
  .catch((error) => {
    elementoErro.innerText = "Ocorreu um erro ao obter a frase aleatória.";
  });
