import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import SliderNativo from '@react-native-community/slider';
import styles from './styles';

export default function AulaSlider({
  minimumValue = 0,
  maximumValue = 1,
  step = 1,
  value,
  onValueChange,
  style,
  minimumTrackTintColor = '#7B9E4F',
  maximumTrackTintColor = '#DDD',
  thumbTintColor = '#7B9E4F',
}) {
  if (Platform.OS === 'web') {
    return (
      <SliderNativo
        style={style}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbTintColor={thumbTintColor}
      />
    );
  }

  const valorAtual = Number(value) || minimumValue;
  const intervalo = maximumValue - minimumValue || 1;
  const percentual = ((valorAtual - minimumValue) / intervalo) * 100;
  const podeDiminuir = valorAtual > minimumValue;
  const podeAumentar = valorAtual < maximumValue;

  const alterarValor = (direcao) => {
    const proximoValor = valorAtual + step * direcao;
    const valorLimitado = Math.min(maximumValue, Math.max(minimumValue, proximoValor));
    onValueChange(valorLimitado);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.botao, !podeDiminuir && styles.botaoDesabilitado]}
        onPress={() => alterarValor(-1)}
        disabled={!podeDiminuir}
      >
        <Text style={styles.botaoTexto}>-</Text>
      </TouchableOpacity>

      <View style={[styles.trilho, { backgroundColor: maximumTrackTintColor }]}>
        <View
          style={[
            styles.progresso,
            { width: `${percentual}%`, backgroundColor: minimumTrackTintColor },
          ]}
        />
        <View
          style={[
            styles.marcador,
            { left: `${percentual}%`, backgroundColor: thumbTintColor },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[styles.botao, !podeAumentar && styles.botaoDesabilitado]}
        onPress={() => alterarValor(1)}
        disabled={!podeAumentar}
      >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
