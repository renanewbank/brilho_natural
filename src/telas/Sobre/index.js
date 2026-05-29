import React, { useState } from 'react';
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

const TIMELINE = [
  { ano: '2015', evento: 'Início da Brilho Natural Shop em Santos, SP.' },
  { ano: '2016+', evento: 'Fortalecimento do atendimento personalizado e do relacionamento com clientes.' },
  { ano: 'Atual', evento: 'Expansão da experiência da loja para o ambiente digital.' },
];

const VALORES = [
  { icone: '✨', titulo: 'Qualidade', desc: 'Seleção de produtos de beleza e bem-estar para diferentes rotinas de cuidado.' },
  { icone: '🛍️', titulo: 'Diversidade', desc: 'Catálogo multimarca com cosméticos nacionais e importados.' },
  { icone: '💬', titulo: 'Atendimento', desc: 'Relacionamento próximo e suporte aos clientes antes e depois da compra.' },
  { icone: '🤝', titulo: 'Confiança', desc: 'Experiência construída com proximidade, cuidado e respeito ao cliente.' },
];

export default function SobreScreen({ navegarPara }) {
  const [satisfacao, setSatisfacao] = useState(5);
  const [abaAtiva, setAbaAtiva] = useState('missao');

  const abas = [
    { id: 'missao', label: 'Missão' },
    { id: 'historia', label: 'História' },
    { id: 'valores', label: 'Valores' },
  ];

  const textoMissao = 'A Brilho Natural Shop nasceu em Santos, no litoral de São Paulo, com o objetivo de oferecer produtos e soluções de beleza e bem-estar feminino. A loja trabalha com cosméticos multimarca, buscando unir qualidade, diversidade de produtos e atendimento próximo aos clientes.\n\nCom a presença digital, a Brilho Natural amplia essa experiência para o ambiente online, mantendo o foco em cuidado, confiança e relacionamento com o público.';

  return (
    <View style={styles.container}>
      <Header titulo="Sobre Nós" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800' }}
            style={styles.heroImagem}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>Beleza e bem-estar</Text>
            <Text style={styles.heroLogo}>Brilho Natural</Text>
            <Text style={styles.heroSlogan}>Produtos de beleza para realçar seu brilho natural</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { numero: 'Santos/SP', label: 'Origem' },
            { numero: 'Multimarcas', label: 'Catálogo' },
            { numero: 'Atendimento', label: 'Foco' },
            { numero: 'Online', label: 'Experiência' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statNumero}>{s.numero}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.abasContainer}>
          {abas.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={[styles.aba, abaAtiva === a.id && styles.abaAtiva]}
              onPress={() => setAbaAtiva(a.id)}
            >
              <Text style={[styles.abaTexto, abaAtiva === a.id && styles.abaTextoAtivo]}>
                {a.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {abaAtiva === 'missao' && (
          <View style={styles.secao}>
            <Text style={styles.textoMissao}>{textoMissao}</Text>
          </View>
        )}

        {abaAtiva === 'historia' && (
          <View style={styles.secao}>
            {TIMELINE.map((item, index) => (
              <View key={item.ano} style={styles.timelineItem}>
                <View style={styles.timelineLinha}>
                  <View style={styles.timelinePonto} />
                  {index < TIMELINE.length - 1 && <View style={styles.timelineConector} />}
                </View>
                <View style={styles.timelineConteudo}>
                  <Text style={styles.timelineAno}>{item.ano}</Text>
                  <Text style={styles.timelineEvento}>{item.evento}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {abaAtiva === 'valores' && (
          <View style={styles.secao}>
            {VALORES.map((v) => (
              <View key={v.titulo} style={styles.valorCard}>
                <Text style={styles.valorIcone}>{v.icone}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.valorTitulo}>{v.titulo}</Text>
                  <Text style={styles.valorDesc}>{v.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.avaliacaoContainer}>
          <Text style={styles.avaliacaoTitulo}>Como você avalia nossa loja?</Text>
          <Text style={styles.avaliacaoValor}>
            {'★'.repeat(Math.round(satisfacao))}{'☆'.repeat(5 - Math.round(satisfacao))}
            {' '}{satisfacao.toFixed(1)}
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

        <Text style={styles.rodape}>© 2025 Brilho Natural · Santos, SP</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
