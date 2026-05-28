import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import Header from '../../componente/Header';
import ProductCard from '../../componente/ProductCard';
import { PRODUTOS, CATEGORIAS } from '../../dados/produtos';

export default function ProdutosScreen({ navegarPara }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const produtosFiltrados = PRODUTOS.filter((p) => {
    const matchCategoria = categoriaAtiva === 'Todos' || p.categoria === categoriaAtiva;
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <View style={styles.container}>
      <Header titulo="Produtos" navegarPara={navegarPara} />

      {/* Busca */}
      <View style={styles.buscaContainer}>
        <Text style={styles.buscaIcone}>🔍</Text>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar produto..."
          placeholderTextColor="#AAA"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Text style={styles.limpar}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Categorias */}
      <View style={styles.categoriasContainer}>
        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoriaChip, categoriaAtiva === cat && styles.categoriaAtiva]}
            onPress={() => setCategoriaAtiva(cat)}
          >
            <Text style={[styles.categoriaTexto, categoriaAtiva === cat && styles.categoriaTextoAtivo]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contagem */}
      <Text style={styles.contagem}>{produtosFiltrados.length} produto(s) encontrado(s)</Text>

      {/* Lista */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard produto={item} navegarPara={navegarPara} />
          </View>
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🌿</Text>
            <Text style={styles.vazioTexto}>Nenhum produto encontrado</Text>
          </View>
        )}
      />
    </View>
  );
}