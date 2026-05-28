export async function buscarEnderecoPorCep(cep) {
  const cepLimpo = String(cep || '').replace(/\D/g, '');

  if (cepLimpo.length !== 8) {
    throw new Error('Digite um CEP válido com 8 números.');
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!resposta.ok) {
      throw new Error('Não foi possível consultar o CEP agora.');
    }

    const dados = await resposta.json();

    if (dados.erro) {
      throw new Error('CEP não encontrado.');
    }

    return {
      cep: cepLimpo,
      logradouro: dados.logradouro || '',
      bairro: dados.bairro || '',
      cidade: dados.localidade || '',
      uf: dados.uf || '',
      estado: dados.estado || '',
    };
  } catch (error) {
    if (
      error.message === 'Digite um CEP válido com 8 números.' ||
      error.message === 'CEP não encontrado.'
    ) {
      throw error;
    }

    throw new Error('Não foi possível consultar o CEP agora.');
  }
}
