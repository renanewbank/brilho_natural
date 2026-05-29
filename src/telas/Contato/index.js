import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';

export default function ContatoScreen({ navegarPara }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('duvida');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const canais = [
    { icone: '📧', titulo: 'E-mail', valor: 'suporte@brilhonatural.shop', cor: '#E3F2FD' },
    { icone: '📱', titulo: 'WhatsApp', valor: '(13) 99125-8662', cor: '#E8F5E9' },
    { icone: '☎️', titulo: 'Telefone', valor: '(13) 3040-2020', cor: '#FFF3E0' },
    { icone: '🕐', titulo: 'Horário', valor: 'Segunda a sexta, das 10h às 18h', cor: '#F3E5F5' },
  ];

  const enviarMensagem = () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setNome('');
      setEmail('');
      setMensagem('');
      setAssunto('duvida');
    }, 1800);
  };

  return (
    <View style={styles.container}>
      <Header titulo="Contato" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Canais */}
        <Text style={styles.secaoTitulo}>Fale conosco</Text>
        <View style={styles.canaisGrid}>
          {canais.map((c) => (
            <View key={c.titulo} style={[styles.canalCard, { backgroundColor: c.cor }]}>
              <Text style={styles.canalIcone}>{c.icone}</Text>
              <Text style={styles.canalTitulo}>{c.titulo}</Text>
              <Text style={styles.canalValor}>{c.valor}</Text>
            </View>
          ))}
        </View>

        {/* Formulário */}
        <View style={styles.formulario}>
          <Text style={styles.formularioTitulo}>Enviar mensagem</Text>
          <Text style={styles.formularioAjuda}>
            Para assuntos relacionados a pedidos, informe o número do pedido na mensagem.
          </Text>

          {enviado && (
            <View style={styles.sucessoBanner}>
              <Text style={styles.sucessoEmoji}>🎉</Text>
              <View>
                <Text style={styles.sucessoTitulo}>Mensagem enviada!</Text>
                <Text style={styles.sucessoSub}>Retornaremos em até 24h.</Text>
              </View>
            </View>
          )}

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Nome *</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor="#BBB"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>E-mail *</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#BBB"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Assunto</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={assunto}
                onValueChange={setAssunto}
                style={styles.picker}
              >
                <Picker.Item label="Dúvida sobre produto" value="duvida" />
                <Picker.Item label="Número do pedido" value="pedido" />
                <Picker.Item label="Prazo de entrega" value="prazo" />
                <Picker.Item label="Troca ou devolução" value="troca" />
                <Picker.Item label="Promoções" value="promocoes" />
                <Picker.Item label="Outros" value="outros" />
              </Picker>
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Mensagem *</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Descreva sua dúvida ou solicitação..."
              placeholderTextColor="#BBB"
              value={mensagem}
              onChangeText={setMensagem}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.contadorCaracteres}>{mensagem.length}/500</Text>
          </View>

          <CustomButton
            titulo="Enviar Mensagem"
            onPress={enviarMensagem}
            carregando={enviando}
            desabilitado={!nome.trim() || !email.trim() || !mensagem.trim()}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
