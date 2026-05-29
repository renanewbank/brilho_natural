import { CATEGORIAS } from '../dados/categorias';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function buscarCategorias() {
  await delay();
  return CATEGORIAS;
}
