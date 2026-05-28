import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default function CustomButton({ titulo, onPress, variante = 'primario', carregando = false, desabilitado = false }) {
  const estiloContainer = [
    styles.botao,
    variante === 'secundario' && styles.botaoSecundario,
    variante === 'perigo' && styles.botaoPerigo,
    (desabilitado || carregando) && styles.botaoDesabilitado,
  ];

  const estiloTexto = [
    styles.texto,
    variante === 'secundario' && styles.textoSecundario,
  ];

  return (
    <TouchableOpacity
      style={estiloContainer}
      onPress={onPress}
      disabled={desabilitado || carregando}
      activeOpacity={0.8}
    >
      {carregando ? (
        <ActivityIndicator color={variante === 'secundario' ? '#7B9E4F' : '#FFF'} />
      ) : (
        <Text style={estiloTexto}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}