import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import { buscarInformacoesEmpresa } from '../../services/empresaApi';
import {
  buscarAssuntosContato,
  buscarCanaisAtendimento,
  buscarFaqAtendimento,
  enviarMensagemContato,
} from '../../services/atendimentoApi';

export default function ContatoScreen({ navegarPara }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [empresa, setEmpresa] = useState(null);
  const [canais, setCanais] = useState([]);
  const [assuntos, setAssuntos] = useState([]);
  const [faq, setFaq] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [assuntoAberto, setAssuntoAberto] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setCarregando(true);
      setErro('');

      try {
        const [empresaResponse, canaisResponse, assuntosResponse, faqResponse] = await Promise.all([
          buscarInformacoesEmpresa(),
          buscarCanaisAtendimento(),
          buscarAssuntosContato(),
          buscarFaqAtendimento(),
        ]);

        if (!ativo) return;

        setEmpresa(empresaResponse);
        setCanais(canaisResponse);
        setAssuntos(assuntosResponse);
        setFaq(faqResponse);
        setAssunto(assuntosResponse[0]?.id || '');
        setAssuntoAberto(false);
      } catch (error) {
        if (!ativo) return;
        setErro('Não foi possível carregar os dados de atendimento agora.');
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

  const enviarMensagem = async () => {
    setErro('');
    setSucesso('');
    setProtocolo('');

    try {
      setEnviando(true);

      const resposta = await enviarMensagemContato({
        nome: nome.trim(),
        email: email.trim(),
        assunto,
        mensagem: mensagem.trim(),
      });

      setSucesso(`Mensagem enviada com sucesso. Protocolo: ${resposta.protocolo}`);
      setProtocolo(resposta.protocolo);
      setNome('');
      setEmail('');
      setMensagem('');
      setAssunto(assuntos[0]?.id || '');
      setAssuntoAberto(false);
    } catch (error) {
      setErro(error.message || 'Não foi possível enviar a mensagem agora.');
    } finally {
      setEnviando(false);
    }
  };

  const assuntoSelecionado =
    assuntos.find((item) => item.id === assunto)?.label || 'Selecione um assunto';

  const selecionarAssunto = (id) => {
    setAssunto(id);
    setAssuntoAberto(false);
  };

  return (
    <View style={styles.container}>
      <Header titulo="Contato" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.secaoTitulo}>Fale conosco</Text>
        <Text style={styles.secaoSubtitulo}>
          {empresa
            ? `Atendimento da ${empresa.nome} para dúvidas sobre produtos, pedidos e entregas.`
            : 'Atendimento para dúvidas sobre produtos, pedidos e entregas.'}
        </Text>

        {carregando ? (
          <View style={styles.loadingCard}>
            <Text style={styles.loadingTexto}>Carregando canais de atendimento...</Text>
          </View>
        ) : null}

        {erro && !canais.length ? <Text style={styles.erroBanner}>{erro}</Text> : null}

        {!carregando && canais.length > 0 ? (
          <View style={styles.canaisGrid}>
            {canais.map((canal) => (
              <View key={canal.id} style={styles.canalCard}>
                <Text style={styles.canalTitulo}>{canal.titulo}</Text>
                <Text style={styles.canalDescricao}>{canal.descricao}</Text>
                <Text style={styles.canalValor}>{canal.valor}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.formulario}>
          <Text style={styles.formularioTitulo}>Enviar mensagem</Text>
          <Text style={styles.formularioAjuda}>
            Preencha seus dados para registrar um atendimento com a equipe da loja.
          </Text>

          {sucesso ? (
            <View style={styles.sucessoBanner}>
              <Text style={styles.sucessoTitulo}>Mensagem enviada</Text>
              <Text style={styles.sucessoSub}>{sucesso}</Text>
            </View>
          ) : null}

          {erro && canais.length > 0 ? <Text style={styles.erroBanner}>{erro}</Text> : null}

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
            <View style={styles.selectWrapper}>
              <TouchableOpacity
                style={[styles.selectButton, assuntoAberto && styles.selectButtonAberto]}
                onPress={() => setAssuntoAberto((prev) => !prev)}
                activeOpacity={0.85}
              >
                <Text style={styles.selectButtonTexto}>{assuntoSelecionado}</Text>
                <Text style={styles.selectButtonIcone}>{assuntoAberto ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {assuntoAberto ? (
                <View style={styles.selectLista}>
                  {assuntos.map((item, index) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.selectOpcao,
                        index === assuntos.length - 1 && styles.selectOpcaoUltima,
                        assunto === item.id && styles.selectOpcaoAtiva,
                      ]}
                      onPress={() => selecionarAssunto(item.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.selectOpcaoTexto,
                          assunto === item.id && styles.selectOpcaoTextoAtivo,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
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

          {protocolo ? <Text style={styles.protocoloTexto}>Protocolo atual: {protocolo}</Text> : null}

          <CustomButton
            titulo="Enviar Mensagem"
            onPress={enviarMensagem}
            carregando={enviando}
            desabilitado={!nome.trim() || !email.trim() || !mensagem.trim()}
          />
        </View>

        {!carregando && faq.length > 0 ? (
          <View style={styles.faqCard}>
            <Text style={styles.formularioTitulo}>FAQ de atendimento</Text>
            {faq.map((item) => (
              <View key={item.id} style={styles.faqItem}>
                <Text style={styles.faqPergunta}>{item.pergunta}</Text>
                <Text style={styles.faqResposta}>{item.resposta}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
