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
const steps = document.querySelectorAll(".form-step");
const btnSeguinte = document.querySelectorAll(".next-step");
const btnAnterior = document.querySelectorAll(".prev-step");
let currentStep = 0;

function showError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`erro-${inputId}`);
  if (errorSpan) {
    errorSpan.classList.remove("d-none");
  }
  if (input) {
    input.classList.add("is-invalid");
  }
}

function hideError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`erro-${inputId}`);
  if (errorSpan) {
    errorSpan.classList.add("d-none");
  }
  if (input) {
    input.classList.remove("is-invalid");
  }
}

function validateStep(stepIndex) {
  const currentStepElement = steps[stepIndex];
  const inputs = currentStepElement.querySelectorAll("input, select, textarea");
  let isStepValid = true;

  inputs.forEach((input) => {
    hideError(input.id);
    if (!input.checkValidity()) {
      showError(input.id);
      isStepValid = false;
    }
  });

  return isStepValid;
}

function validateForm() {
  let isFormValid = true;
  for (let i = 0; i < steps.length; i++) {
    if (!validateStep(i)) {
      isFormValid = false;
    }
  }

  if (!isFormValid) {
    const firstInvalidInput = form.querySelector(".is-invalid");
    if (firstInvalidInput) {
      const stepWithError = firstInvalidInput.closest(".form-step");
      const stepIndex = Array.from(steps).indexOf(stepWithError);
      showStep(stepIndex);
    }
  }
  return isFormValid;
}

// ****** FUNÇÃO CORRIGIDA ******
function showStep(index) {
  steps.forEach((step, i) => {
    // Remove a classe 'active' de todas as etapas
    step.classList.remove("active");
    // Garante que todas as etapas, exceto a correta, estejam escondidas
    if (i !== index) {
      step.classList.add("d-none");
    }
  });

  // Mostra a etapa correta removendo 'd-none' e adicionando 'active'
  steps[index].classList.remove("d-none");
  steps[index].classList.add("active");

  currentStep = index;
}

btnSeguinte.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    }
  });
});

btnAnterior.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });
});

// VERSÃO UNIFICADA E CORRIGIDA DO EVENTO 'SUBMIT'
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    const dados = getFormData();

    // Lógica para salvar no localStorage
    const curriculosSalvos =
      JSON.parse(localStorage.getItem("curriculos")) || [];
    dados.id = Date.now();
    curriculosSalvos.push(dados);
    localStorage.setItem("curriculos", JSON.stringify(curriculosSalvos));

    // Exibe o currículo gerado na tela
    const curriculo = new Curriculo(dados);
    divResultado.textContent = curriculo.formatar();
    divResultado.scrollIntoView({ behavior: "smooth" });

    alert("Currículo gerado e salvo com sucesso!");
  }
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
if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    form.reset();
    steps.forEach((step) => {
      const inputs = step.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => hideError(input.id));
    });
    divResultado.textContent = "";
    showStep(0);
    document.querySelector("#nome").focus();
  });
}

const btnImprimir = document.querySelector("#btnImprimir");
if (btnImprimir) {
  btnImprimir.addEventListener("click", () => {
    if (divResultado.textContent.trim() !== "") {
      window.print();
    } else {
      alert("Gere um currículo antes de imprimir.");
    }
  });
}

// Exibição inicial
showStep(0);
