import { StyleSheet, Platform, StatusBar } from 'react-native';

const topoAndroid = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 50;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7B9E4F',
    paddingTop: topoAndroid,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  botaoVoltar: { padding: 6 },
  iconeVoltar: { fontSize: 22, color: '#FFFFFF' },
  espacador: { width: 36 },
  centro: { alignItems: 'center', flex: 1 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.5 },
  subtitulo: { fontSize: 11, color: '#D8EDBB', marginTop: 1, letterSpacing: 1.5 },
  botaoIcone: { padding: 6 },
  icone: { fontSize: 22 },
});
