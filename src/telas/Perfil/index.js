import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import styles from './styles';
import Header from '../../componente/Header';
import CustomButton from '../../componente/CustomButton';

export default function PerfilScreen({ navegarPara }) {
  const [nome, setNome] = useState('Maria Silva');
  const [email, setEmail] = useState('maria@email.com');
  const [telefone, setTelefone] = useState('(13) 99999-0000');
  const [editando, setEditando] = useState(false);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifPedido, setNotifPedido] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const salvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      setEditando(false);
    }, 1500);
  };

  const pedidos = [
    { id: '#4821', data: '05/04/2025', status: 'Entregue', total: 'R$ 89,90' },
    { id: '#4612', data: '18/03/2025', status: 'Em trânsito', total: 'R$ 154,80' },
    { id: '#4391', data: '02/02/2025', status: 'Entregue', total: 'R$ 64,90' },
  ];

  const corStatus = (s) => {
    if (s === 'Entregue') return '#4CAF50';
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
          <Text style={styles.avatarEmail}>{email}</Text>
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
              placeholder="Seu nome"
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
          {pedidos.map((p) => (
            <View key={p.id} style={styles.pedidoCard}>
              <View style={styles.pedidoHeader}>
                <Text style={styles.pedidoId}>{p.id}</Text>
                <View style={[styles.pedidoStatus, { backgroundColor: corStatus(p.status) + '22' }]}>
                  <Text style={[styles.pedidoStatusTexto, { color: corStatus(p.status) }]}>{p.status}</Text>
                </View>
              </View>
              <View style={styles.pedidoRodape}>
                <Text style={styles.pedidoData}>{p.data}</Text>
                <Text style={styles.pedidoTotal}>{p.total}</Text>
              </View>
            </View>
          ))}
        </View>

        <CustomButton titulo="Sair da Conta" variante="perigo" onPress={() => {}} />
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}