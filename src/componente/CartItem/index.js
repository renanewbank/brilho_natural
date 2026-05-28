import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function CartItem({ item, onRemover }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <View style={styles.rodape}>
          <Text style={styles.preco}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
          <View style={styles.qtd}>
            <Text style={styles.qtdTexto}>x{item.quantidade}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemover(item.id)} style={styles.remover}>
        <Text style={styles.removerTexto}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}