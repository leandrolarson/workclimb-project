$(document).ready(() => {
  // Máscara para o campo de CEP
  $('#cep').mask('00000-000');

  // Máscara para o campo de telefone que aceita 8 ou 9 dígitos
  const options = {
    onKeyPress(cep, e, field, options) {
      const masks = ['(00) 0000-00009', '(00) 00000-0000'];
      const mask = cep.length > 14 ? masks[1] : masks[0];
      $('#celular').mask(mask, options);
    },
  };

  $('#celular').mask('(00) 0000-00009', options);

  // A máscara de telefone pode ser mais simples se for apenas para fixo
  $('#telefone').mask('(00) 0000-0000');
});
