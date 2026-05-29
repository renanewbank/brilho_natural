import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import AulaSlider from '../../components/AulaSlider';
import {
  buscarCategoriasAtendidas,
  buscarDiferenciaisEmpresa,
  buscarInformacoesEmpresa,
} from '../../services/empresaApi';

const TEXTO_INSTITUCIONAL =
  'A Brilho Natural reúne produtos de beleza e cosméticos para diferentes rotinas de cuidado pessoal. A proposta da loja é oferecer variedade, atendimento próximo e uma experiência simples para quem busca produtos para cabelo, rosto, corpo, mãos e pés.';

export default function SobreScreen({ navegarPara }) {
  const [satisfacao, setSatisfacao] = useState(5);
  const [abaAtiva, setAbaAtiva] = useState('visao');
  const [empresa, setEmpresa] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [diferenciais, setDiferenciais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const abas = [
    { id: 'visao', label: 'Visão' },
    { id: 'categorias', label: 'Categorias' },
    { id: 'diferenciais', label: 'Diferenciais' },
  ];

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setCarregando(true);

      try {
        const [empresaResponse, categoriasResponse, diferenciaisResponse] = await Promise.all([
          buscarInformacoesEmpresa(),
          buscarCategoriasAtendidas(),
          buscarDiferenciaisEmpresa(),
        ]);

        if (!ativo) return;

        setEmpresa(empresaResponse);
        setCategorias(categoriasResponse);
        setDiferenciais(diferenciaisResponse);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  const nomeEmpresa = empresa?.nome || 'Brilho Natural';
  const cidadeEstado = empresa ? `${empresa.cidade}/${empresa.estado}` : 'Santos/SP';

  return (
    <View style={styles.container}>
      <Header titulo="Sobre Nós" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800' }}
            style={styles.heroImagem}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>Beleza e bem-estar</Text>
            <Text style={styles.heroLogo}>{nomeEmpresa}</Text>
            <Text style={styles.heroSlogan}>
              Loja de cosméticos e produtos de beleza com variedade, atendimento e bem-estar.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { numero: cidadeEstado, label: 'Localização' },
            { numero: empresa?.segmento || 'Cosméticos', label: 'Segmento' },
            { numero: 'Multimarcas', label: 'Catálogo' },
            { numero: 'Atendimento', label: 'Foco' },
          ].map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statNumero}>{item.numero}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.abasContainer}>
          {abas.map((aba) => (
            <TouchableOpacity
              key={aba.id}
              style={[styles.aba, abaAtiva === aba.id && styles.abaAtiva]}
              onPress={() => setAbaAtiva(aba.id)}
            >
              <Text style={[styles.abaTexto, abaAtiva === aba.id && styles.abaTextoAtivo]}>
                {aba.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {carregando ? (
          <View style={styles.secao}>
            <Text style={styles.textoMissao}>Carregando informações da loja...</Text>
          </View>
        ) : null}

        {!carregando && abaAtiva === 'visao' ? (
          <View style={styles.secao}>
            <Text style={styles.localizacaoTitulo}>{empresa?.nome}</Text>
            <Text style={styles.textoMissao}>{empresa?.descricao}</Text>
            <Text style={styles.localizacaoAjuda}>{TEXTO_INSTITUCIONAL}</Text>
            <View style={styles.localizacaoBox}>
              <Text style={styles.localizacaoLinha}>Segmento: {empresa?.segmento}</Text>
              <Text style={styles.localizacaoLinha}>Cidade: {empresa?.cidade} - {empresa?.estado}</Text>
              <Text style={styles.localizacaoLinha}>E-mail: {empresa?.email}</Text>
              <Text style={styles.localizacaoLinha}>
                Atendimento: {empresa?.horarioAtendimento}
              </Text>
            </View>
          </View>
        ) : null}

        {!carregando && abaAtiva === 'categorias' ? (
          <View style={styles.secao}>
            {categorias.map((categoria) => (
              <View key={categoria} style={styles.valorCard}>
                <Text style={styles.valorIcone}>🌿</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.valorTitulo}>{categoria}</Text>
                  <Text style={styles.valorDesc}>
                    Categoria atendida pela loja dentro da proposta de beleza e cuidado pessoal.
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {!carregando && abaAtiva === 'diferenciais' ? (
          <View style={styles.secao}>
            {diferenciais.map((diferencial) => (
              <View key={diferencial} style={styles.valorCard}>
                <Text style={styles.valorIcone}>✨</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.valorTitulo}>{diferencial}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.avaliacaoContainer}>
          <Text style={styles.avaliacaoTitulo}>Como você avalia nossa loja?</Text>
          <Text style={styles.avaliacaoValor}>
            {'★'.repeat(Math.round(satisfacao))}
            {'☆'.repeat(5 - Math.round(satisfacao))} {satisfacao.toFixed(1)}
          </Text>
          <AulaSlider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={0.5}
            value={satisfacao}
            onValueChange={setSatisfacao}
            minimumTrackTintColor="#F5A623"
            maximumTrackTintColor="#DDD"
            thumbTintColor="#F5A623"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>😐 Regular</Text>
            <Text style={styles.sliderLabel}>😍 Excelente</Text>
          </View>
        </View>

        <CustomButton titulo="Ver Produtos" onPress={() => navegarPara('Produtos')} />
        <CustomButton titulo="Fale Conosco" variante="secundario" onPress={() => navegarPara('Contato')} />

        <Text style={styles.rodape}>{nomeEmpresa} · {cidadeEstado}</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
