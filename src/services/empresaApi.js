import { EMPRESA } from '../dados/empresa';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function buscarInformacoesEmpresa() {
  await delay();
  return EMPRESA;
}

export async function buscarDiferenciaisEmpresa() {
  await delay();
  return EMPRESA.diferenciais || [];
}

export async function buscarCategoriasAtendidas() {
  await delay();
  return EMPRESA.categoriasAtendidas || [];
}
