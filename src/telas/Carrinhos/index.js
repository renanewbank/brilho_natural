import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';
import Header from '../../componente/Header';
import CartItem from '../../componente/CartItem';
import CustomButton from '../../componente/CustomButton';

export default function CarrinhoScreen({
  carrinho,
  navegarPara,
  removerDoCarrinho,
  cupom,
  cupomAplicado,
  setCupom,
  aplicarCupom,
  resumoPedido,
}) {
  const [cupomErro, setCupomErro] = useState(false);

  const { subtotal, desconto, frete, total } = resumoPedido;

  const handleAplicarCupom = () => {
    const sucesso = aplicarCupom();
    setCupomErro(!sucesso);
    if (sucesso) {
      setCupomErro(false);
    }
  };

  if (carrinho.length === 0) {
    return (
      <View style={styles.container}>
        <Header titulo="Carrinho" navegarPara={navegarPara} />
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>🛒</Text>
          <Text style={styles.vazioTitulo}>Carrinho vazio</Text>
          <Text style={styles.vazioSub}>Adicione produtos para continuar</Text>
          <CustomButton titulo="Ver Produtos" onPress={() => navegarPara('Produtos')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo="Carrinho" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem item={item} onRemover={removerDoCarrinho} />
          )}
          scrollEnabled={false}
        />

        {/* Cupom */}
        <View style={styles.cupomContainer}>
          <Text style={styles.cupomLabel}>Cupom demonstrativo do app</Text>
          <View style={styles.cupomRow}>
            <TextInput
              style={[styles.cupomInput, cupomErro && styles.cupomInputErro, cupomAplicado && styles.cupomInputSucesso]}
              placeholder="Ex: APP10"
              placeholderTextColor="#BBB"
              value={cupom}
              onChangeText={(t) => { setCupom(t); setCupomErro(false); }}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[styles.cupomBotao, cupomAplicado && styles.cupomBotaoSucesso]}
              onPress={handleAplicarCupom}
              disabled={cupomAplicado}
            >
              <Text style={styles.cupomBotaoTexto}>{cupomAplicado ? '✓' : 'Aplicar'}</Text>
            </TouchableOpacity>
          </View>
          {cupomErro && <Text style={styles.cupomErro}>❌ Cupom inválido. Tente APP10</Text>}
          {cupomAplicado && <Text style={styles.cupomSucesso}>✅ 10% de desconto aplicado!</Text>}
        </View>

        {/* Resumo */}
        <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>Resumo do pedido</Text>

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoChave}>Subtotal</Text>
            <Text style={styles.resumoValor}>R$ {subtotal.toFixed(2)}</Text>
          </View>

          {cupomAplicado && (
            <View style={styles.resumoLinha}>
              <Text style={[styles.resumoChave, { color: '#4CAF50' }]}>Desconto (10%)</Text>
              <Text style={[styles.resumoValor, { color: '#4CAF50' }]}>- R$ {desconto.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.resumoLinha}>
            <Text style={styles.resumoChave}>Frete</Text>
            <Text style={[styles.resumoValor, frete === 0 && { color: '#4CAF50' }]}>
              {frete === 0 ? 'Grátis 🎉' : `R$ ${frete.toFixed(2)}`}
            </Text>
          </View>
          <Text style={styles.freteInfo}>Frete gratuito conforme política vigente da loja.</Text>

          <View style={styles.divisor} />

          <View style={styles.resumoLinha}>
            <Text style={styles.totalChave}>Total</Text>
            <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>

        <CustomButton titulo="Finalizar Compra" onPress={() => navegarPara('Checkout', { resumoPedido })} />
        <CustomButton titulo="Continuar Comprando" variante="secundario" onPress={() => navegarPara('Produtos')} />

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
