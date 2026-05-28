import { lerValor, salvarValor } from './baseStorage';

const CHAVE_ENDERECO = '@brilho-natural/endereco';

const ENDERECO_PADRAO = {
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  uf: '',
  numero: '',
  complemento: '',
  destinatario: '',
  telefone: '',
};

export async function carregarEndereco() {
  return lerValor(CHAVE_ENDERECO, ENDERECO_PADRAO);
}

export async function salvarEndereco(endereco) {
  return salvarValor(CHAVE_ENDERECO, endereco);
}

export { ENDERECO_PADRAO };
