import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Header from '../../componente/Header';
import CustomButton from '../../componente/CustomButton';
import AulaSlider from '../../componente/AulaSlider';

const TIMELINE = [
  { ano: '2018', evento: 'Fundação da Brilho Natural em Santos, SP' },
  { ano: '2019', evento: 'Lançamento da linha capilar com 5 produtos' },
  { ano: '2021', evento: 'Certificação vegana e cruelty-free conquistada' },
  { ano: '2022', evento: 'Expansão para linha de cuidados faciais' },
  { ano: '2023', evento: 'Mais de 10.000 clientes satisfeitos' },
  { ano: '2024', evento: 'Loja virtual nacional com entrega para todo o Brasil' },
];

const VALORES = [
  { icone: '🌱', titulo: 'Natural', desc: 'Ingredientes 100% de origem natural, sem sintéticos agressivos.' },
  { icone: '🐰', titulo: 'Cruelty-free', desc: 'Nunca testamos em animais. Nunca.' },
  { icone: '♻️', titulo: 'Sustentável', desc: 'Embalagens recicláveis e compromisso com o meio ambiente.' },
  { icone: '💚', titulo: 'Transparente', desc: 'Fórmulas abertas e ingredientes listados sem mistério.' },
];

export default function SobreScreen({ navegarPara }) {
  const [satisfacao, setSatisfacao] = useState(5);
  const [abaAtiva, setAbaAtiva] = useState('missao');

  const abas = [
    { id: 'missao', label: 'Missão' },
    { id: 'historia', label: 'História' },
    { id: 'valores', label: 'Valores' },
  ];

  const textoMissao = 'A Brilho Natural nasceu do desejo de oferecer produtos de beleza que respeitem tanto quem usa quanto o planeta. Acreditamos que cuidar de si não precisa custar caro para a natureza.\n\nNossa missão é democratizar o acesso à beleza consciente, com produtos eficazes, transparentes e sustentáveis, feitos com amor em Santos, São Paulo.';

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
            <Text style={styles.heroLogo}>🌿 Brilho Natural</Text>
            <Text style={styles.heroSlogan}>Beleza que respeita a natureza</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { numero: '10k+', label: 'Clientes' },
            { numero: '30+', label: 'Produtos' },
            { numero: '6', label: 'Anos' },
            { numero: '4.8⭐', label: 'Avaliação' },
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

        <Text style={styles.rodape}>© 2025 Brilho Natural · Santos, SP · CNPJ 00.000.000/0001-00</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
