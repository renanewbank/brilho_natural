import React, { useEffect, useState } from 'react';
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
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import CustomButton from '../../components/CustomButton';
import { buscarCategorias } from '../../services/categoriasApi';
import heroBackground from '../../../assets/cosmetics-free-image.jpg';
import logoHome from '../../../assets/logo-bn-sem-fundo.png';

export default function HomeScreen({ navegarPara, produtos = [], carregandoProdutos, erroProdutos }) {
  const [notificacoes, setNotificacoes] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Cabelo');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      const categoriasResponse = await buscarCategorias();

      if (!ativo) return;

      setCategorias(categoriasResponse.filter((item) => item.nome !== 'Todos').slice(0, 4));
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  const destaquesBase = produtos.filter((p) => p.destaque);

  const destaques = destaquesBase
    .filter((p) => !categoriaSelecionada || p.categoria === categoriaSelecionada)
    .slice(0, 6);

  return (
    <View style={styles.container}>
      <Header
        navegarPara={navegarPara}
        logoSource={logoHome}
        logoVariant="home"
        semPaddingVertical
      />
      <View style={styles.faixaFrete}>
        <Text style={styles.faixaFreteTexto}>Frete Grátis para todo o Brasil!</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Hero */}
        <View style={styles.banner}>
          <Image
            source={heroBackground}
            style={styles.bannerImagem}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <View style={styles.heroConteudo}>
              <Text style={styles.bannerTag}>Beleza e bem-estar</Text>
              <Text style={styles.bannerTitulo}>Seleção multimarca para sua rotina de cuidado</Text>
              <Text style={styles.bannerDescricao}>
                Produtos para cabelo, corpo, perfumes e autocuidado em uma vitrine leve, atual e fácil de navegar.
              </Text>
              <View style={styles.heroAcoes}>
                <CustomButton
                  titulo="Ver Coleção"
                  onPress={() => navegarPara('Produtos')}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Categorias</Text>
          <View style={styles.categoriasRow}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat.nome}
                style={[styles.categoriaCard, categoriaSelecionada === cat.nome && styles.categoriaCardAtiva]}
                onPress={() => setCategoriaSelecionada(cat.nome)}
              >
                <Text style={[styles.categoriaTexto, categoriaSelecionada === cat.nome && styles.categoriaTextoAtiva]}>
                  {cat.nome}
                </Text>
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
