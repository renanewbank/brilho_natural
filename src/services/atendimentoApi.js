import {
  CANAIS_ATENDIMENTO,
  ASSUNTOS_CONTATO,
  FAQ_ATENDIMENTO,
} from '../dados/atendimento';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function buscarCanaisAtendimento() {
  await delay();
  return CANAIS_ATENDIMENTO;
}

export async function buscarAssuntosContato() {
  await delay();
  return ASSUNTOS_CONTATO;
}

export async function buscarFaqAtendimento() {
  await delay();
  return FAQ_ATENDIMENTO;
}

export async function enviarMensagemContato(payload) {
  await delay(600);

  if (!payload?.nome || !payload?.email || !payload?.mensagem) {
    throw new Error('Preencha nome, e-mail e mensagem.');
  }

  return {
    protocolo: `BN-${Date.now()}`,
    status: 'Mensagem recebida',
    mensagem:
      'Sua mensagem foi registrada. A equipe de atendimento retornará em breve.',
  };
}
