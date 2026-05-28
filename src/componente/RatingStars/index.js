import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function RatingStars({ nota, mostrarNumero = true }) {
  const estrelas = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      {estrelas.map((e) => (
        <Text key={e} style={[styles.estrela, e <= Math.round(nota) ? styles.ativa : styles.inativa]}>
          ★
        </Text>
      ))}
      {mostrarNumero && <Text style={styles.numero}>({nota.toFixed(1)})</Text>}
    </View>
  );
}