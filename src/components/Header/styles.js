import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F1E7',
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  containerSemPaddingVertical: {
    paddingVertical: 0,
  },
  areaEsquerda: {

    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'center',
  },
  areaDireita: {
    width: 172,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  botaoVoltar: { padding: 6, marginTop: 10 },
  centro: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoHome: {
    width: 90,
    height: 90,
  },
  titulo: { fontSize: 20, fontWeight: 500, color: '#5D7B35', letterSpacing: 0.2 },
  botaoIcone: { padding: 6, marginTop: 8 },
  icone: { fontSize: 22, color: '#5D7B35' },
  iconeVoltar: { fontSize: 22, color: '#5D7B35' },
});
