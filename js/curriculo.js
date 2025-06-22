class Curriculo {
  constructor(dados) {
    Object.assign(this, dados);
  }

  formatar() {
    return `Nome: ${this.nome}\nEmail: ${this.email}\nIdade: ${this.idade}\nGênero: ${this.genero}\nEstado Civil: ${this.estadoCivil}\nTelefone: ${this.telefone}\nCelular: ${this.celular}\nEndereço: ${this.endereco}\nCidade: ${this.cidade} - ${this.estado} - CEP: ${this.cep}\n\nObjetivo:\n${this.objetivo}`;
  }
}

const form = document.querySelector("#formCurriculo");
const btnLimpar = document.querySelector("#btnLimpar");
const btnImprimir = document.querySelector("#btnImprimir");
const divResultado = document.querySelector("#curriculoGerado");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const dados = {
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
  };
  const curriculo = new Curriculo(dados);
  divResultado.textContent = curriculo.formatar();
});

btnLimpar.addEventListener("click", () => {
  const campos = document.querySelectorAll("input, textarea");
  campos.forEach((el) => (el.value = ""));
  divResultado.textContent = "";
  document.querySelector("#nome").focus();
});

btnImprimir.addEventListener("click", () => {
  if (divResultado.textContent.trim() !== "") {
    window.print();
  } else {
    alert("Gere um currículo antes de imprimir.");
  }
});
