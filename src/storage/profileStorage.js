import { lerValor, salvarValor } from './baseStorage';

const CHAVE_PERFIL = '@brilho-natural/perfil';

const PERFIL_PADRAO = {
  nome: 'Maria Silva',
  email: 'maria@email.com',
  telefone: '(13) 99999-0000',
  notifPromo: true,
  notifPedido: true,
  temaEscuro: false,
};

export async function carregarPerfil() {
  return lerValor(CHAVE_PERFIL, PERFIL_PADRAO);
}

export async function salvarPerfil(perfil) {
  return salvarValor(CHAVE_PERFIL, perfil);
}

export { PERFIL_PADRAO };
