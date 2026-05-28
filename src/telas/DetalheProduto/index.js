import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CustomButton from '../../componente/CustomButton';
import RatingStars from '../../componente/RatingStars';
import Header from '../../componente/Header';
import AulaSlider from '../../componente/AulaSlider';
import { buscarProdutoPorId } from '../../services/produtosApi';

export default function DetalheProdutoScreen({ produto, navegarPara, adicionarAoCarrinho }) {
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState('descricao');
  const [produtoAtual, setProdutoAtual] = useState(produto);
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);

  useEffect(() => {
    setProdutoAtual(produto);
  }, [produto]);

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhes() {
      if (!produto?.id) return;

      setCarregandoDetalhe(true);
      const detalhe = await buscarProdutoPorId(produto.id);

      if (ativo && detalhe) {
        setProdutoAtual(detalhe);
      }

      if (ativo) {
        setCarregandoDetalhe(false);
      }
    }

    carregarDetalhes();

    return () => {
      ativo = false;
    };
  }, [produto?.id]);

  if (!produtoAtual) {
    return (
      <View style={styles.semProduto}>
        <Text style={styles.semProdutoTexto}>Produto não encontrado.</Text>
        <CustomButton titulo="Voltar" onPress={() => navegarPara('Produtos')} />
      </View>
    );
  }

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionarAoCarrinho(produtoAtual);
    }
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  };

  const abas = [
    { id: 'descricao', label: 'Descrição' },
    { id: 'ingredientes', label: 'Ingredientes' },
  ];

  return (
    <View style={styles.container}>
      <Header
        titulo="Detalhes"
        navegarPara={navegarPara}
        mostrarVoltar
        rotaVoltar="Produtos"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: produtoAtual.imagem }} style={styles.imagem} resizeMode="cover" />

        <View style={styles.conteudo}>
          <View style={styles.categoriaRow}>
            <Text style={styles.categoria}>{produtoAtual.categoria}</Text>
            <Text style={styles.volume}>📦 {produtoAtual.volume}</Text>
          </View>

          <Text style={styles.nome}>{produtoAtual.nome}</Text>

          <View style={styles.ratingRow}>
            <RatingStars nota={produtoAtual.nota} />
            <Text style={styles.avaliadores}>{produtoAtual.avaliadores} avaliações</Text>
          </View>

          {carregandoDetalhe ? <Text style={styles.avisoApi}>Atualizando detalhes do produto...</Text> : null}

          <Text style={styles.preco}>R$ {produtoAtual.preco.toFixed(2)}</Text>

          {/* Slider de quantidade */}
          <View style={styles.quantidadeContainer}>
            <Text style={styles.quantidadeLabel}>Quantidade: <Text style={styles.quantidadeValor}>{Math.round(quantidade)}</Text></Text>
            <AulaSlider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={quantidade}
              onValueChange={setQuantidade}
              minimumTrackTintColor="#7B9E4F"
              maximumTrackTintColor="#DDD"
              thumbTintColor="#7B9E4F"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1</Text>
              <Text style={styles.sliderLabel}>10</Text>
            </View>
          </View>

          {/* Abas de conteúdo */}
          <View style={styles.abas}>
            {abas.map((a) => (
              <TouchableOpacity
                key={a.id}
                style={[styles.aba, abaSelecionada === a.id && styles.abaAtiva]}
                onPress={() => setAbaSelecionada(a.id)}
              >
                <Text style={[styles.abaTexto, abaSelecionada === a.id && styles.abaTextoAtivo]}>
                  {a.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.textoConteudo}>
            {abaSelecionada === 'descricao' ? produtoAtual.descricao : produtoAtual.ingredientes}
          </Text>

          {/* Selos */}
          <View style={styles.selosRow}>
            {['🌱 Vegano', '♻️ Sustentável', '🐰 Cruelty-free'].map((s) => (
              <View key={s} style={styles.selo}>
                <Text style={styles.seloTexto}>{s}</Text>
              </View>
            ))}
          </View>

          {adicionado && (
            <View style={styles.sucessoBanner}>
              <Text style={styles.sucessoTexto}>✅ Adicionado ao carrinho!</Text>
            </View>
          )}

          <CustomButton
            titulo={adicionado ? '✓ Adicionado!' : `Adicionar ao Carrinho · R$ ${(produtoAtual.preco * quantidade).toFixed(2)}`}
            onPress={handleAdicionar}
            desabilitado={adicionado}
          />
          <CustomButton
            titulo="Ver Carrinho"
            variante="secundario"
            onPress={() => navegarPara('Carrinho')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
