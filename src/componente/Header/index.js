import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Header({
  titulo,
  navegarPara,
  mostrarVoltar = false,
  rotaVoltar = 'Home',
}) {
  return (
    <View style={styles.container}>
      {mostrarVoltar ? (
        <TouchableOpacity onPress={() => navegarPara(rotaVoltar)} style={styles.botaoVoltar}>
          <Text style={styles.iconeVoltar}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.espacador} />
      )}

      <View style={styles.centro}>
        <Text style={styles.titulo}>{titulo || 'Brilho Natural'}</Text>
        {!titulo && <Text style={styles.subtitulo}>cosméticos naturais</Text>}
      </View>

      <TouchableOpacity onPress={() => navegarPara('Carrinho')} style={styles.botaoIcone}>
        <Text style={styles.icone}>🛒</Text>
      </TouchableOpacity>
    </View>
  );
}
