/* 1* Forma de consumir uma API - then = Então..., catch = se houver error, finally = executa independente de td.
var consultaCEP = fetch('https://viacep.com.br/ws/56700000/json/')
  .then(resposta => resposta.json())
  .then(r => {
    if(r.erro) {
      throw Error('Esse cep não existe!')
    } else
      console.log(r)})
  .catch(erro => console.log(erro))
  .finally(mensagem => console.log('Processamento concluído'));

console.log(consultaCEP);
*/

/* 2* Forma de consumir uma API  */
async function buscaEndereco(cep) {
  const mensagemErro = document.querySelector('#erro');
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    var consultaCEPConvertida = await consultaCEP.json()
    if (consultaCEPConvertida.erro) {
      throw Error('CEP não existente!');
    }

    const cidade = document.querySelector('#cidade');
    const logradouro = document.querySelector('#endereco');
    const estado = document.querySelector('#estado');
    const bairro = document.querySelector('#bairro');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado. value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro);
  }
};

/* Criando um array de ceps e atraves da function map, executando cada um deles na function buscaEndereco()
let ceps = ['56700000', '01001000'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));

Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/

const cep = document.querySelector('#cep');
cep.addEventListener("focusout", () => console.log(buscaEndereco(cep.value)))