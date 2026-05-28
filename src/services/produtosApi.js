import { PRODUTOS } from '../dados/produtos';

const URL_PRODUTOS = 'https://brilho-natural-shop.myshopify.com/collections/cosmeticos-1/products.json?limit=50';

function limparHtml(html) {
  if (!html) {
    return '';
  }

  return html
    .replace(/<\/(p|div|li|ul|ol|br)>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[•·]/g, '\n• ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function formatarDescricao(texto) {
  if (!texto) {
    return 'Seleção de cosméticos e cuidados pessoais alinhada ao catálogo da Brilho Natural Shop.';
  }

  return texto
    .replace(/\s+(PASSO A PASSO DE UTILIZAÇÃO|MODO DE USO|COMO USAR)\s*/gi, '\n\n$1\n')
    .replace(/\.\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '.\n\n')
    .replace(/\s+•\s+/g, '\n• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extrairVolumeDoTitulo(titulo) {
  const texto = String(titulo || '');
  const match = texto.match(/(\d+\s?(ml|g|kg|l)|\d+x\d+\s?(ml|g))/i);
  return match ? match[0].replace(/\s+/g, '') : 'Consulte a embalagem';
}

function mapearCategoria(product) {
  const tags = Array.isArray(product.tags) ? product.tags.join(' ') : product.tags || '';
  const texto = `${product.title || ''} ${product.product_type || ''} ${tags}`.toLowerCase();

  if (
    texto.includes('shampoo') ||
    texto.includes('condicionador') ||
    texto.includes('máscara') ||
    texto.includes('mascara') ||
    texto.includes('progressiva') ||
    texto.includes('hair') ||
    texto.includes('cabelo')
  ) {
    return 'Cabelo';
  }

  if (
    texto.includes('body') ||
    texto.includes('corpo') ||
    texto.includes('hidratante') ||
    texto.includes('loção') ||
    texto.includes('locao')
  ) {
    return 'Corpo';
  }

  if (texto.includes('perfume') || texto.includes('victoria') || texto.includes('fragrance')) {
    return 'Perfumes';
  }

  if (texto.includes('rosto') || texto.includes('face')) {
    return 'Rosto';
  }

  if (texto.includes('mãos') || texto.includes('maos') || texto.includes('pés') || texto.includes('pes')) {
    return 'Mãos & Pés';
  }

  return 'Outros';
}

function mapearProduto(product) {
  const variantePrincipal = product.variants?.[0] || {};
  const descricaoLimpa = limparHtml(product.body_html);
  const categoria = mapearCategoria(product);
  const preco = Number(variantePrincipal.price || 0);
  const precoOriginal = Number(variantePrincipal.compare_at_price || 0);
  const disponivel = Boolean(product.variants?.some((variant) => variant.available));

  return {
    id: String(product.id),
    nome: product.title,
    categoria,
    preco,
    precoOriginal,
    disponivel,
    nota: precoOriginal > preco ? 4.9 : 4.8,
    destaque: precoOriginal > preco || categoria === 'Perfumes',
    imagem: product.images?.[0]?.src || product.image?.src || '',
    descricao: formatarDescricao(descricaoLimpa),
    ingredientes: 'Consulte a embalagem do produto para composição completa e modo de uso.',
    volume: extrairVolumeDoTitulo(product.title),
    avaliadores: 80 + ((product.variants?.length || 1) * 18),
    handle: product.handle || '',
  };
}

export async function buscarProdutos() {
  try {
    const resposta = await fetch(URL_PRODUTOS);

    if (!resposta.ok) {
      throw new Error('Falha ao carregar catálogo da loja.');
    }

    const dados = await resposta.json();
    const produtos = Array.isArray(dados.products) ? dados.products.map(mapearProduto) : [];

    if (produtos.length === 0) {
      throw new Error('Catálogo remoto sem produtos válidos.');
    }

    return {
      produtos,
      usandoFallback: false,
      mensagem: '',
    };
  } catch (error) {
    console.warn('Falha ao consultar catálogo da Brilho Natural Shop. Usando fallback local.', error);
    return {
      produtos: PRODUTOS,
      usandoFallback: true,
      mensagem: 'Catálogo local carregado no momento.',
    };
  }
}

export async function buscarProdutoPorId(id) {
  const resposta = await buscarProdutos();
  return resposta.produtos.find((produto) => produto.id === String(id)) || PRODUTOS.find((produto) => produto.id === String(id)) || null;
}
