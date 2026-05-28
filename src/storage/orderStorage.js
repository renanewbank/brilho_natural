import { lerValor, salvarValor } from './baseStorage';

const CHAVE_PEDIDOS = '@brilho-natural/pedidos';

export async function carregarPedidos() {
  return lerValor(CHAVE_PEDIDOS, []);
}

export async function salvarPedidos(pedidos) {
  return salvarValor(CHAVE_PEDIDOS, pedidos);
}

export async function adicionarPedido(pedido) {
  const pedidosAtuais = await carregarPedidos();
  const proximosPedidos = [pedido, ...pedidosAtuais];
  await salvarPedidos(proximosPedidos);
  return proximosPedidos;
}
