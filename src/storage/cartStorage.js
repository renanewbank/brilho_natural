import { lerValor, salvarValor } from './baseStorage';

const CHAVE_CARRINHO = '@brilho-natural/carrinho';

export async function carregarCarrinho() {
  return lerValor(CHAVE_CARRINHO, {
    itens: [],
    cupom: '',
    cupomAplicado: false,
  });
}

export async function salvarCarrinho(dados) {
  return salvarValor(CHAVE_CARRINHO, dados);
}
