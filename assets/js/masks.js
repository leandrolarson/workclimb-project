$(document).ready(() => {
  $("#cep").mask("00000-000");

  const options = {
    onKeyPress(cep, e, field, options) {
      const masks = ["(00) 0000-00009", "(00) 00000-0000"];
      const mask = cep.length > 14 ? masks[1] : masks[0];
      $("#celular").mask(mask, options);
    },
  };

  $("#celular").mask("(00) 0000-00009", options);

  $("#telefone").mask("(00) 0000-0000");
});
