import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';
import { buscarEnderecoPorCep } from '../../services/viacepApi';

export default function CheckoutScreen({
  navegarPara,
  carrinho,
  cupomAplicado,
  subtotal,
  desconto,
  frete,
  total,
  perfil,
  ultimoEndereco,
  confirmarPedido,
}) {
  const enderecoInicial = useMemo(
    () => ({
      cep: ultimoEndereco?.cep || '',
      logradouro: ultimoEndereco?.logradouro || '',
      bairro: ultimoEndereco?.bairro || '',
      cidade: ultimoEndereco?.cidade || '',
      uf: ultimoEndereco?.uf || '',
      estado: ultimoEndereco?.estado || '',
      numero: ultimoEndereco?.numero || '',
      complemento: ultimoEndereco?.complemento || '',
      destinatario: ultimoEndereco?.destinatario || perfil?.nome || '',
      telefone: ultimoEndereco?.telefone || perfil?.telefone || '',
    }),
    [perfil, ultimoEndereco]
  );
  const [formulario, setFormulario] = useState(enderecoInicial);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  const [erroFormulario, setErroFormulario] = useState('');
  const [confirmando, setConfirmando] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  useEffect(() => {
    setFormulario(enderecoInicial);
  }, [enderecoInicial]);

  const atualizarCampo = (campo, valor) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const consultarCep = async () => {
    setBuscandoCep(true);
    setErroCep('');

    try {
      const endereco = await buscarEnderecoPorCep(formulario.cep);
      setFormulario((prev) => ({
        ...prev,
        ...endereco,
      }));
    } catch (error) {
      setErroCep(error.message);
    } finally {
      setBuscandoCep(false);
    }
  };

  const validarFormulario = () => {
    const cepLimpo = formulario.cep.replace(/\D/g, '');

    if (carrinho.length === 0) {
      return 'Seu carrinho está vazio.';
    }

    if (cepLimpo.length !== 8) {
      return 'Informe um CEP válido antes de confirmar o pedido.';
    }

    if (!formulario.destinatario.trim()) {
      return 'Informe o nome do destinatário.';
    }

    if (!formulario.numero.trim()) {
      return 'Informe o número do endereço.';
    }

    return '';
  };

  const confirmar = async () => {
    const erro = validarFormulario();

    if (erro) {
      setErroFormulario(erro);
      return;
    }

    setErroFormulario('');
    setConfirmando(true);

    try {
      const pedido = await confirmarPedido({
        endereco: formulario,
        resumo: {
          subtotal,
          desconto,
          frete,
          total,
          cupomAplicado,
        },
        itens: carrinho,
      });

      setPedidoConfirmado(pedido);
    } finally {
      setConfirmando(false);
    }
  };

  if (pedidoConfirmado) {
    return (
      <View style={styles.container}>
        <Header titulo="Checkout" navegarPara={navegarPara} mostrarVoltar rotaVoltar="Home" />
        <View style={styles.sucessoContainer}>
          <Text style={styles.sucessoEmoji}>🎉</Text>
          <Text style={styles.sucessoTitulo}>Pedido confirmado!</Text>
          <Text style={styles.sucessoTexto}>
            Pedido {pedidoConfirmado.id} salvo com sucesso no seu histórico.
          </Text>
          <Text style={styles.sucessoResumo}>Total pago: R$ {pedidoConfirmado.total.toFixed(2)}</Text>
          <CustomButton titulo="Ver Meu Perfil" onPress={() => navegarPara('Perfil')} />
          <CustomButton
            titulo="Voltar para Home"
            variante="secundario"
            onPress={() => navegarPara('Home')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo="Checkout" navegarPara={navegarPara} mostrarVoltar rotaVoltar="Carrinho" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo dos itens</Text>
          {carrinho.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemMeta}>{item.quantidade}x · {item.categoria}</Text>
              </View>
              <Text style={styles.itemPreco}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo do pedido</Text>
          <View style={styles.linhaResumo}>
            <Text style={styles.chaveResumo}>Subtotal</Text>
            <Text style={styles.valorResumo}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          {cupomAplicado && (
            <View style={styles.linhaResumo}>
              <Text style={styles.chaveResumo}>Desconto</Text>
              <Text style={styles.valorDesconto}>- R$ {desconto.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.linhaResumo}>
            <Text style={styles.chaveResumo}>Frete</Text>
            <Text style={styles.valorResumo}>{frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.linhaResumo}>
            <Text style={styles.totalChave}>Total</Text>
            <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Entrega</Text>

          <Text style={styles.campoLabel}>CEP</Text>
          <View style={styles.cepRow}>
            <TextInput
              style={styles.input}
              placeholder="00000-000"
              value={formulario.cep}
              onChangeText={(texto) => atualizarCampo('cep', texto)}
              keyboardType="numeric"
            />
            <View style={styles.botaoCep}>
              <CustomButton titulo="Buscar CEP" onPress={consultarCep} carregando={buscandoCep} />
            </View>
          </View>
          {erroCep ? <Text style={styles.erroTexto}>{erroCep}</Text> : null}

          <Text style={styles.campoLabel}>Logradouro</Text>
          <TextInput style={styles.input} value={formulario.logradouro} onChangeText={(texto) => atualizarCampo('logradouro', texto)} />

          <Text style={styles.campoLabel}>Bairro</Text>
          <TextInput style={styles.input} value={formulario.bairro} onChangeText={(texto) => atualizarCampo('bairro', texto)} />

          <View style={styles.linhaCampos}>
            <View style={styles.campoFlex}>
              <Text style={styles.campoLabel}>Cidade</Text>
              <TextInput style={styles.input} value={formulario.cidade} onChangeText={(texto) => atualizarCampo('cidade', texto)} />
            </View>
            <View style={styles.campoUf}>
              <Text style={styles.campoLabel}>UF</Text>
              <TextInput style={styles.input} value={formulario.uf} onChangeText={(texto) => atualizarCampo('uf', texto)} />
            </View>
          </View>

          <View style={styles.linhaCampos}>
            <View style={styles.campoUf}>
              <Text style={styles.campoLabel}>Número</Text>
              <TextInput style={styles.input} value={formulario.numero} onChangeText={(texto) => atualizarCampo('numero', texto)} />
            </View>
            <View style={styles.campoFlex}>
              <Text style={styles.campoLabel}>Complemento</Text>
              <TextInput style={styles.input} value={formulario.complemento} onChangeText={(texto) => atualizarCampo('complemento', texto)} />
            </View>
          </View>

          <Text style={styles.campoLabel}>Destinatário</Text>
          <TextInput style={styles.input} value={formulario.destinatario} onChangeText={(texto) => atualizarCampo('destinatario', texto)} />

          <Text style={styles.campoLabel}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={formulario.telefone}
            onChangeText={(texto) => atualizarCampo('telefone', texto)}
            keyboardType="phone-pad"
          />

          {erroFormulario ? <Text style={styles.erroTexto}>{erroFormulario}</Text> : null}
        </View>

        <CustomButton titulo="Confirmar Pedido" onPress={confirmar} carregando={confirmando} desabilitado={carrinho.length === 0} />
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
