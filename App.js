import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';

import HomeScreen from './src/telas/Home/index';
import ProdutosScreen from './src/telas/Produto/index';
import DetalheProdutoScreen from './src/telas/DetalheProduto/index';
import CarrinhoScreen from './src/telas/Carrinhos/index';
import PerfilScreen from './src/telas/Perfil/index';
import ContatoScreen from './src/telas/Contato/index';
import SobreScreen from './src/telas/Sobre/index';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('Home');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  const navegarPara = (tela, params = null) => {
    if (params) setProdutoSelecionado(params);
    setTelaAtual(tela);
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((p) => p.id === produto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const renderTela = () => {
    switch (telaAtual) {
      case 'Home':
        return <HomeScreen navegarPara={navegarPara} />;
      case 'Produtos':
        return <ProdutosScreen navegarPara={navegarPara} />;
      case 'DetalheProduto':
        return (
          <DetalheProdutoScreen
            produto={produtoSelecionado}
            navegarPara={navegarPara}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        );
      case 'Carrinho':
        return (
          <CarrinhoScreen
            carrinho={carrinho}
            navegarPara={navegarPara}
            removerDoCarrinho={removerDoCarrinho}
          />
        );
      case 'Perfil':
        return <PerfilScreen navegarPara={navegarPara} />;
      case 'Contato':
        return <ContatoScreen navegarPara={navegarPara} />;
      case 'Sobre':
        return <SobreScreen navegarPara={navegarPara} />;
      default:
        return <HomeScreen navegarPara={navegarPara} />;
    }
  };

  const abas = [
    { nome: 'Home', icone: '🏠' },
    { nome: 'Produtos', icone: '🌿' },
    { nome: 'Carrinho', icone: '🛒' },
    { nome: 'Perfil', icone: '👤' },
    { nome: 'Sobre', icone: 'ℹ️' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>{renderTela()}</View>
      <View style={styles.tabBar}>
        {abas.map((aba) => (
          <TouchableOpacity
            key={aba.nome}
            style={[styles.tabItem, telaAtual === aba.nome && styles.tabAtiva]}
            onPress={() => navegarPara(aba.nome)}
          >
            <Text style={styles.tabIcone}>{aba.icone}</Text>
            <Text style={[styles.tabTexto, telaAtual === aba.nome && styles.tabTextoAtivo]}>
              {aba.nome}
            </Text>
            {aba.nome === 'Carrinho' && carrinho.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{carrinho.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  conteudo: {
    flex: 1,
    paddingBottom: 72,
  },
  tabBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E0D5',
    paddingBottom: Platform.OS === 'android' ? 24 : 6,
    paddingTop: 6,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  tabAtiva: {
    borderTopWidth: 2,
    borderTopColor: '#7B9E4F',
  },
  tabIcone: { fontSize: 20 },
  tabTexto: { fontSize: 10, color: '#999', marginTop: 2 },
  tabTextoAtivo: { color: '#7B9E4F', fontWeight: 'bold' },
  badge: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: '#E85D4A',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTexto: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
});
