class Curriculo {
  constructor(dados) {
    Object.assign(this, dados);
  }

  formatar() {
    return `
      Nome: ${this.nome}
      Email: ${this.email}
      Idade: ${this.idade}
      Gênero: ${this.genero}
      Estado Civil: ${this.estadoCivil}
      Telefone: ${this.telefone}
      Celular: ${this.celular}
      Endereço: ${this.endereco}
      Cidade: ${this.cidade} - ${this.estado} - CEP: ${this.cep}
      
      Objetivo:
      ${this.objetivo}
      
      Formação Acadêmica:
      ${this.curso} - ${this.instituicao} - ${this.anoConclusao}
      
      Experiência Profissional:
      Empresa: ${this.empresa} - Início: ${this.inicio} - Fim: ${this.fim}
      Cargo: ${this.cargo}
      Descrição: ${this.descricao}
    `;
  }
}

const form = document.querySelector("#formCurriculo");
const divResultado = document.querySelector("#curriculoGerado");

const btnSeguinte = document.querySelectorAll(".next-step");
const btnAnterior = document.querySelectorAll(".prev-step");

const steps = document.querySelectorAll(".form-step");
let currentStep = 0;

btnSeguinte.forEach((btn) => {
  btn.addEventListener("click", function () {
    const dados = getFormData();
    if (currentStep === 0) {
      // Validate first step
      if (!dados.nome || !dados.email) {
        alert("Preencha os dados pessoais antes de seguir.");
        return;
      }
    }
    if (currentStep === 1) {
      // Validate second step
      if (!dados.curso || !dados.instituicao) {
        alert("Preencha os dados da formação acadêmica antes de seguir.");
        return;
      }
    }
    if (currentStep === 2) {
      // Validate third step
      if (!dados.empresa || !dados.cargo) {
        alert("Preencha os dados de experiência profissional antes de seguir.");
        return;
      }
    }

    steps[currentStep].classList.add("d-none");
    currentStep++;
    steps[currentStep].classList.remove("d-none");
  });
});

btnAnterior.forEach((btn) => {
  btn.addEventListener("click", function () {
    steps[currentStep].classList.add("d-none");
    currentStep--;
    steps[currentStep].classList.remove("d-none");
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const dados = getFormData();
  const curriculo = new Curriculo(dados);
  divResultado.textContent = curriculo.formatar();
});

function getFormData() {
  return {
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    idade: document.querySelector("#idade").value,
    genero: document.querySelector("#genero").value,
    estadoCivil: document.querySelector("#estadoCivil").value,
    telefone: document.querySelector("#telefone").value,
    celular: document.querySelector("#celular").value,
    endereco: document.querySelector("#endereco").value,
    cidade: document.querySelector("#cidade").value,
    estado: document.querySelector("#estado").value,
    cep: document.querySelector("#cep").value,
    objetivo: document.querySelector("#objetivo").value,
    curso: document.querySelector("#curso").value,
    instituicao: document.querySelector("#instituicao").value,
    anoConclusao: document.querySelector("#anoConclusao").value,
    empresa: document.querySelector("#empresa").value,
    inicio: document.querySelector("#inicio").value,
    fim: document.querySelector("#fim").value,
    cargo: document.querySelector("#cargo").value,
    descricao: document.querySelector("#descricao").value,
  };
}

const btnLimpar = document.querySelector("#btnLimpar");

btnLimpar.addEventListener("click", () => {
  const campos = document.querySelectorAll("input, textarea");
  campos.forEach((el) => (el.value = ""));
  divResultado.textContent = "";
  document.querySelector("#nome").focus();
});

const btnImprimir = document.querySelector("#btnImprimir");

btnImprimir.addEventListener("click", () => {
  if (divResultado.textContent.trim() !== "") {
    window.print();
  } else {
    alert("Gere um currículo antes de imprimir.");
  }
});
