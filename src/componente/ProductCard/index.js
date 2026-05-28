import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import RatingStars from '../RatingStars';

export default function ProductCard({ produto, navegarPara }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navegarPara('DetalheProduto', produto)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: produto.imagem }} style={styles.imagem} resizeMode="cover" />
      {produto.destaque && (
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>Destaque</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.nome} numberOfLines={2}>{produto.nome}</Text>
        <RatingStars nota={produto.nota} />
        <View style={styles.rodape}>
          <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
          <TouchableOpacity style={styles.botao} onPress={() => navegarPara('DetalheProduto', produto)}>
            <Text style={styles.botaoTexto}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}