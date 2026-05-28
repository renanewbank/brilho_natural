import { PRODUTOS } from '../dados/produtos';

const URL_PRODUTOS = 'https://dummyjson.com/products/category/beauty';
const URL_PRODUTO = 'https://dummyjson.com/products';

function mapearCategoria(product) {
  const texto = `${product.category || ''} ${product.title || ''}`.toLowerCase();

  if (texto.includes('hair') || texto.includes('shampoo') || texto.includes('conditioner')) {
    return 'Cabelo';
  }

  if (texto.includes('skin') || texto.includes('serum') || texto.includes('face')) {
    return 'Rosto';
  }

  if (texto.includes('body') || texto.includes('lotion')) {
    return 'Corpo';
  }

  return 'Rosto';
}

function mapearProduto(product) {
  return {
    id: String(product.id),
    nome: product.title,
    categoria: mapearCategoria(product),
    preco: Number(product.price) || 0,
    nota: Number(product.rating) || 4.5,
    destaque: Number(product.rating) >= 4.5,
    imagem: product.thumbnail || product.images?.[0] || '',
    descricao: product.description || 'Produto de beleza natural com formula suave e uso diario.',
    ingredientes: 'Extratos naturais, oleos vegetais e ativos hidratantes selecionados.',
    volume: '100ml',
    avaliadores: Number(product.stock) || 120,
  };
}

export async function buscarProdutos() {
  try {
    const resposta = await fetch(URL_PRODUTOS);

    if (!resposta.ok) {
      throw new Error('Falha ao carregar produtos da API.');
    }

    const dados = await resposta.json();
    const produtos = Array.isArray(dados.products)
      ? dados.products.map(mapearProduto)
      : [];

    if (produtos.length === 0) {
      throw new Error('API sem produtos validos.');
    }

    return {
      produtos,
      usandoFallback: false,
      mensagem: '',
    };
  } catch (error) {
    console.warn('Falha ao consultar API de produtos. Usando fallback local.', error);
    return {
      produtos: PRODUTOS,
      usandoFallback: true,
      mensagem: 'Usando catalogo local no momento.',
    };
  }
}

export async function buscarProdutoPorId(id) {
  try {
    const resposta = await fetch(`${URL_PRODUTO}/${id}`);

    if (!resposta.ok) {
      throw new Error('Falha ao carregar detalhes do produto.');
    }

    const dados = await resposta.json();
    return mapearProduto(dados);
  } catch (error) {
    console.warn('Falha ao buscar detalhes do produto. Usando fallback local.', error);
    return PRODUTOS.find((produto) => produto.id === String(id)) || null;
  }
}
