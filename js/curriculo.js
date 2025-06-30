// A classe Curriculo e as constantes iniciais permanecem as mesmas...
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

// --- NOVAS FUNÇÕES PARA CONTROLAR ERROS NOS SPANS ---

/**
 * Exibe a mensagem de erro para um campo específico.
 * @param {string} inputId O ID do campo (ex: "nome").
 */
function showError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`erro-${inputId}`);
  if (errorSpan) {
    errorSpan.classList.remove("d-none"); // Mostra o span
  }
  if (input) {
    input.classList.add("is-invalid"); // Adiciona a borda vermelha do Bootstrap
  }
}

/**
 * Esconde a mensagem de erro para um campo específico.
 * @param {string} inputId O ID do campo (ex: "nome").
 */
function hideError(inputId) {
  const input = document.getElementById(inputId);
  const errorSpan = document.getElementById(`erro-${inputId}`);
  if (errorSpan) {
    errorSpan.classList.add("d-none"); // Esconde o span
  }
  if (input) {
    input.classList.remove("is-invalid"); // Remove a borda vermelha
  }
}

// --- LÓGICA DE VALIDAÇÃO ATUALIZADA ---

/**
 * Valida os campos de uma única etapa usando o sistema de validação do navegador.
 * @param {number} stepIndex O índice da etapa a ser validada.
 * @returns {boolean} Retorna true se a etapa for válida, false caso contrário.
 */
function validateStep(stepIndex) {
  const currentStepElement = steps[stepIndex];
  const inputs = currentStepElement.querySelectorAll("input, select, textarea");
  let isStepValid = true;

  inputs.forEach((input) => {
    // Esconde erros antigos antes de validar novamente
    hideError(input.id);

    // checkValidity() verifica required, pattern, min, max, etc.
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

  // Se o formulário for inválido, vai para a primeira etapa com erro
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

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? "block" : "none";
  });
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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    const dados = getFormData();
    const curriculo = new Curriculo(dados);
    divResultado.textContent = curriculo.formatar();
    divResultado.scrollIntoView({ behavior: "smooth" });
  }
});

// A função getFormData e os listeners de 'Limpar' e 'Imprimir' permanecem os mesmos.
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
  form.reset();
  steps.forEach((step) => {
    const inputs = step.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => hideError(input.id));
  });
  divResultado.textContent = "";
  showStep(0);
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

// Exibição inicial
showStep(0);
