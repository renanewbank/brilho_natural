import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import RatingStars from '../RatingStars';

export default function ProductCard({ produto, navegarPara }) {
  const mostrarDesconto = produto.precoOriginal && produto.precoOriginal > produto.preco;

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
      {!produto.disponivel && (
        <View style={styles.badgeEsgotado}>
          <Text style={styles.badgeTexto}>Esgotado</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.nome} numberOfLines={2}>{produto.nome}</Text>
        <RatingStars nota={produto.nota} />
        <View style={styles.rodape}>
          <View>
            {mostrarDesconto ? <Text style={styles.precoOriginal}>De R$ {produto.precoOriginal.toFixed(2)}</Text> : null}
            <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
          </View>
          {produto.disponivel ? (
            <TouchableOpacity style={styles.botao} onPress={() => navegarPara('DetalheProduto', produto)}>
              <Text style={styles.botaoTexto}>Ver</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.indisponivelContainer}>
              <Text style={styles.indisponivelTexto}>Indisponível</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
