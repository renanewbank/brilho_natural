# Brilho Natural

**Brilho Natural** é uma aplicação de e-commerce de cosméticos desenvolvida com React, React Native Web e Vite. O app apresenta um fluxo de compra com catálogo, detalhes de produto, carrinho, checkout com consulta de CEP e histórico de pedidos.

## Visão geral

A aplicação foi desenvolvida com base na Brilho Natural Shop, loja de cosméticos multimarca com atuação em beleza e bem-estar. O projeto organiza a experiência de compra em telas simples e responsivas, mantendo dados locais do usuário e integrando APIs públicas para enriquecer o fluxo.

## Funcionalidades

- Tela inicial com banner, categorias e produtos em destaque.
- Catálogo de cosméticos com busca e filtro por categoria.
- Tela de detalhes do produto com descrição, preço e seleção de quantidade.
- Exibição de disponibilidade e preço promocional quando aplicável.
- Carrinho com resumo de pedido e cupom demonstrativo.
- Checkout com consulta de endereço pela API ViaCEP.
- Persistência local de carrinho, endereço, perfil e pedidos.
- Histórico de pedidos no perfil do usuário.
- Tela de contato com canais, FAQ e envio por serviço interno.
- Tela sobre com dados institucionais centralizados e categorias atendidas.

## Tecnologias utilizadas

- React
- React Native
- React Native Web
- Vite
- Async Storage
- React Native Picker
- React Native Community Slider

## APIs utilizadas

### Catálogo de produtos

A aplicação busca produtos a partir do catálogo público da Brilho Natural Shop. Caso a consulta não esteja disponível, o app utiliza uma lista local de produtos compatíveis com o catálogo da loja.

### ViaCEP

A tela de checkout utiliza a API pública ViaCEP para buscar endereço a partir do CEP informado.

Endpoint:

```text
https://viacep.com.br/ws/{cep}/json/
````

## Persistência local

O app utiliza Async Storage para manter dados importantes salvos localmente:

* itens do carrinho;
* cupom aplicado;
* último endereço utilizado;
* pedidos confirmados;
* dados básicos do perfil.

## Dados institucionais

Os dados principais da loja ficam centralizados em `src/dados/empresa.js`, incluindo nome, descrição, segmento, canais de atendimento, categorias atendidas e diferenciais.

## Serviços internos da aplicação

Além do catálogo remoto e do ViaCEP no checkout, o projeto utiliza serviços internos para organizar os dados da aplicação:

* `src/services/empresaApi.js` para informações institucionais da loja.
* `src/services/atendimentoApi.js` para canais, FAQ e envio de mensagens de contato.
* `src/services/categoriasApi.js` para categorias exibidas em Home e Produtos.

## Executando o projeto

Instale as dependências:

```bash
npm install
```

Execute em desenvolvimento:

```bash
npm run dev
```

A aplicação será disponibilizada pelo Vite, normalmente em:

```text
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Fluxo principal de teste

1. Acesse a tela inicial.
2. Entre em Produtos.
3. Busque ou filtre um produto.
4. Abra os detalhes do produto.
5. Adicione o produto ao carrinho.
6. Acesse o carrinho.
7. Aplique o cupom demonstrativo `APP10`, se desejar.
8. Avance para o checkout.
9. Informe um CEP válido, por exemplo `01001000`.
10. Busque o endereço pela API ViaCEP.
11. Preencha os dados restantes de entrega.
12. Confirme o pedido.
13. Acesse o perfil e verifique o histórico de pedidos.

## Observações

* O catálogo remoto pode depender da disponibilidade pública da loja.
* Se a consulta remota falhar, a aplicação carrega um catálogo local compatível com a proposta da Brilho Natural.
* O cupom `APP10` é apenas demonstrativo dentro do aplicativo.

