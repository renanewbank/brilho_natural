import React, { useState } from 'react';
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

export default function DetalheProdutoScreen({ produto, navegarPara, adicionarAoCarrinho }) {
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState('descricao');

  if (!produto) {
    return (
      <View style={styles.semProduto}>
        <Text style={styles.semProdutoTexto}>Produto não encontrado.</Text>
        <CustomButton titulo="Voltar" onPress={() => navegarPara('Produtos')} />
      </View>
    );
  }

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionarAoCarrinho(produto);
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
        <Image source={{ uri: produto.imagem }} style={styles.imagem} resizeMode="cover" />

        <View style={styles.conteudo}>
          <View style={styles.categoriaRow}>
            <Text style={styles.categoria}>{produto.categoria}</Text>
            <Text style={styles.volume}>📦 {produto.volume}</Text>
          </View>

          <Text style={styles.nome}>{produto.nome}</Text>

          <View style={styles.ratingRow}>
            <RatingStars nota={produto.nota} />
            <Text style={styles.avaliadores}>{produto.avaliadores} avaliações</Text>
          </View>

          <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>

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
            {abaSelecionada === 'descricao' ? produto.descricao : produto.ingredientes}
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
            titulo={adicionado ? '✓ Adicionado!' : `Adicionar ao Carrinho · R$ ${(produto.preco * quantidade).toFixed(2)}`}
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
