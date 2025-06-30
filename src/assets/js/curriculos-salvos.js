document.addEventListener("DOMContentLoaded", function () {
  const listaCurriculosContainer = document.getElementById("lista-curriculos");
  const modalBody = document.getElementById("modal-body-content");
  const curriculoModal = new bootstrap.Modal(
    document.getElementById("modalCurriculo")
  );

  // 1. Carregar os currículos do localStorage
  const curriculosSalvos = JSON.parse(localStorage.getItem("curriculos")) || [];

  // 2. Verificar se existem currículos
  if (curriculosSalvos.length === 0) {
    listaCurriculosContainer.innerHTML =
      '<p class="text-center col-12">Nenhum currículo salvo ainda.</p>';
    return;
  }

  // 3. Criar os cards para cada currículo
  curriculosSalvos.forEach((curriculo) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    const cardContent = document.createElement("div");
    cardContent.className = "card card-body text-center shadow-sm";
    cardContent.style.cursor = "pointer";
    cardContent.innerHTML = `<h5 class="card-title mb-0">${curriculo.nome}</h5>`;

    // 4. Adicionar evento de clique para abrir o modal
    cardContent.addEventListener("click", () => {
      exibirCurriculoCompleto(curriculo);
    });

    card.appendChild(cardContent);
    listaCurriculosContainer.appendChild(card);
  });

  /**
   * Preenche o modal com os dados do currículo e o exibe
   * @param {object} curriculo O objeto completo do currículo
   */
  function exibirCurriculoCompleto(curriculo) {
    // Formata os dados no estilo da imagem fornecida
    modalBody.innerHTML = `
            <div class="text-center mb-4">
                <h1 class="display-5 fw-bold text-uppercase">${curriculo.nome}</h1>
                <p class="lead">${curriculo.objetivo}</p>
            </div>
            <hr>
            <div class="row mb-3">
                <div class="col-6 text-center"><strong>Telefone:</strong> ${curriculo.celular}</div>
                <div class="col-6 text-center"><strong>Email:</strong> ${curriculo.email}</div>
            </div>
            <hr>

            <h4 class="mb-3">Formação</h4>
            <p><strong>${curriculo.instituicao}</strong> (${curriculo.anoConclusao})</p>
            <p>${curriculo.curso}</p>
            <br>

            <h4 class="mb-3">Experiências</h4>
            <p><strong>${curriculo.empresa}</strong> (${curriculo.inicio} - ${curriculo.fim})</p>
            <p><strong>Cargo:</strong> ${curriculo.cargo}</p>
            <p>${curriculo.descricao}</p>
        `;

    // Usa o método do Bootstrap para mostrar o modal
    curriculoModal.show();
  }
});
