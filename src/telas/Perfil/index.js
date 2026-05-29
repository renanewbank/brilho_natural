import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import CustomButton from '../../components/CustomButton';

export default function PerfilScreen({ navegarPara, perfil, pedidos, salvarPerfil }) {
  const [nome, setNome] = useState(perfil?.nome || 'Cliente Brilho Natural');
  const [email, setEmail] = useState(perfil?.email || '');
  const [telefone, setTelefone] = useState(perfil?.telefone || '');
  const [editando, setEditando] = useState(false);
  const [notifPromo, setNotifPromo] = useState(perfil?.notifPromo ?? true);
  const [notifPedido, setNotifPedido] = useState(perfil?.notifPedido ?? true);
  const [temaEscuro, setTemaEscuro] = useState(perfil?.temaEscuro ?? false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!perfil) return;

    setNome(perfil.nome || '');
    setEmail(perfil.email || '');
    setTelefone(perfil.telefone || '');
    setNotifPromo(perfil.notifPromo ?? true);
    setNotifPedido(perfil.notifPedido ?? true);
    setTemaEscuro(perfil.temaEscuro ?? false);
  }, [perfil]);

  const salvar = async () => {
    setSalvando(true);

    await salvarPerfil({
      nome,
      email,
      telefone,
      notifPromo,
      notifPedido,
      temaEscuro,
    });

    setSalvando(false);
    setEditando(false);
  };

  const corStatus = (s) => {
    if (s === 'Entregue') return '#4CAF50';
    if (s === 'Recebido') return '#2196F3';
    if (s === 'Em trânsito') return '#FF9800';
    return '#2196F3';
  };

  return (
    <View style={styles.container}>
      <Header titulo="Meu Perfil" navegarPara={navegarPara} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetra}>{nome.charAt(0)}</Text>
          </View>
          <Text style={styles.avatarNome}>{nome}</Text>
          <Text style={styles.avatarEmail}>{email || 'seu@email.com'}</Text>
        </View>

        {/* Dados pessoais */}
        <View style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Text style={styles.secaoTitulo}>Dados Pessoais</Text>
            <TouchableOpacity onPress={() => setEditando(!editando)}>
              <Text style={styles.editarTexto}>{editando ? 'Cancelar' : '✏️ Editar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Nome completo</Text>
            <TextInput
              style={[styles.campoInput, !editando && styles.campoReadonly]}
              value={nome}
              onChangeText={setNome}
              editable={editando}
              placeholder="Cliente Brilho Natural"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>E-mail</Text>
            <TextInput
              style={[styles.campoInput, !editando && styles.campoReadonly]}
              value={email}
              onChangeText={setEmail}
              editable={editando}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="seu@email.com"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Telefone</Text>
            <TextInput
              style={[styles.campoInput, !editando && styles.campoReadonly]}
              value={telefone}
              onChangeText={setTelefone}
              editable={editando}
              keyboardType="phone-pad"
              placeholder="(00) 00000-0000"
            />
          </View>

          {editando && (
            <CustomButton titulo="Salvar Alterações" onPress={salvar} carregando={salvando} />
          )}
        </View>

        {/* Preferências */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Preferências</Text>

          {[
            { label: 'Notificações de promoções', sub: 'Receba ofertas exclusivas', valor: notifPromo, setter: setNotifPromo },
            { label: 'Atualizações de pedido', sub: 'Status em tempo real', valor: notifPedido, setter: setNotifPedido },
            { label: 'Tema escuro', sub: 'Mudar aparência do app', valor: temaEscuro, setter: setTemaEscuro },
          ].map((item) => (
            <View key={item.label} style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>{item.label}</Text>
                <Text style={styles.switchSub}>{item.sub}</Text>
              </View>
              <Switch
                value={item.valor}
                onValueChange={item.setter}
                trackColor={{ false: '#DDD', true: '#A8CC7A' }}
                thumbColor={item.valor ? '#7B9E4F' : '#FFF'}
              />
            </View>
          ))}
        </View>

        {/* Histórico de pedidos */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Histórico de Pedidos</Text>
          {pedidos.length === 0 ? (
            <Text style={styles.semPedidos}>Nenhum pedido salvo ainda.</Text>
          ) : (
            pedidos.map((p) => (
              <View key={p.id} style={styles.pedidoCard}>
                <View style={styles.pedidoHeader}>
                  <Text style={styles.pedidoId}>{p.id}</Text>
                  <View style={[styles.pedidoStatus, { backgroundColor: corStatus(p.status) + '22' }]}>
                    <Text style={[styles.pedidoStatusTexto, { color: corStatus(p.status) }]}>{p.status}</Text>
                  </View>
                </View>
                <View style={styles.pedidoRodape}>
                  <Text style={styles.pedidoData}>{p.data}</Text>
                  <Text style={styles.pedidoTotal}>R$ {Number(p.total).toFixed(2)}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        <CustomButton titulo="Sair da Conta" variante="perigo" onPress={() => {}} />
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
