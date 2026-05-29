import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import logoBrilhoNatural from '../../../assets/logo-brilho-natural.png';

export default function Header({
  titulo,
  navegarPara,
  mostrarVoltar = false,
  rotaVoltar = 'Home',
  logoSource,
  logoVariant = 'default',
  semPaddingVertical = false,
}) {
  return (
    <View style={[styles.container, semPaddingVertical && styles.containerSemPaddingVertical]}>
      <View style={styles.areaEsquerda}>
        {mostrarVoltar && (
          <TouchableOpacity onPress={() => navegarPara(rotaVoltar)} style={styles.botaoVoltar}>
            <Text style={styles.iconeVoltar}>←</Text>
          </TouchableOpacity>
        )}
        <Image
          source={logoSource || logoBrilhoNatural}
          style={logoVariant === 'home' ? styles.logoHome : styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.centro}>
        {titulo ? <Text style={styles.titulo}>{titulo}</Text> : null}
      </View>

      <View style={styles.areaDireita}>
        <TouchableOpacity onPress={() => navegarPara('Carrinho')} style={styles.botaoIcone}>
          <Text style={styles.icone}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
