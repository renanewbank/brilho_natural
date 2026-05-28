import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import styles from './styles';
import Header from '../../componente/Header';
import ProductCard from '../../componente/ProductCard';
import CustomButton from '../../componente/CustomButton';

export default function HomeScreen({ navegarPara, produtos = [], carregandoProdutos, erroProdutos }) {
  const [notificacoes, setNotificacoes] = useState(true);

  const destaques = produtos.filter((p) => p.destaque).slice(0, 6);

  const categorias = [
    { nome: 'Cabelo', icone: '💆', cor: '#E8F5E9' },
    { nome: 'Corpo', icone: '🧴', cor: '#FFF3E0' },
    { nome: 'Perfumes', icone: '🌸', cor: '#FCE4EC' },
    { nome: 'Rosto', icone: '✨', cor: '#E3F2FD' },
    { nome: 'Mãos & Pés', icone: '🫶', cor: '#F3E5F5' },
  ];

  return (
    <View style={styles.container}>
      <Header navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Banner Hero */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800' }}
            style={styles.bannerImagem}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTag}>Beleza e bem-estar</Text>
            <Text style={styles.bannerTitulo}>Realce seu{'\n'}brilho natural</Text>
            <CustomButton
              titulo="Ver Coleção"
              onPress={() => navegarPara('Produtos')}
            />
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Categorias</Text>
          <View style={styles.categoriasRow}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.nome}
                style={[styles.categoriaCard, { backgroundColor: cat.cor }]}
                onPress={() => navegarPara('Produtos')}
              >
                <Text style={styles.categoriaIcone}>{cat.icone}</Text>
                <Text style={styles.categoriaTexto}>{cat.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Destaques */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Text style={styles.secaoTitulo}>Destaques</Text>
            <TouchableOpacity onPress={() => navegarPara('Produtos')}>
              <Text style={styles.verTodos}>Ver todos →</Text>
            </TouchableOpacity>
          </View>
          {erroProdutos ? <Text style={styles.avisoApi}>{erroProdutos}</Text> : null}
          {carregandoProdutos ? (
            <View style={styles.loadingCard}>
              <Text style={styles.loadingTexto}>Carregando produtos em destaque...</Text>
            </View>
          ) : (
            <FlatList
              data={destaques}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ width: 200 }}>
                  <ProductCard produto={item} navegarPara={navegarPara} />
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={styles.loadingCard}>
                  <Text style={styles.loadingTexto}>Nenhum produto encontrado no momento.</Text>
                </View>
              )}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          )}
        </View>

        {/* Banner promo */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoEmoji}>🚚</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitulo}>Frete gratuito</Text>
            <Text style={styles.promoSubtitulo}>Conforme política vigente da loja</Text>
          </View>
        </View>

        {/* Notificações Switch */}
        <View style={styles.secao}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Receber novidades</Text>
              <Text style={styles.switchSub}>Promoções e lançamentos</Text>
            </View>
            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{ false: '#DDD', true: '#A8CC7A' }}
              thumbColor={notificacoes ? '#7B9E4F' : '#FFF'}
            />
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
