import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botao: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7B9E4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#CCC',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  trilho: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    position: 'relative',
  },
  progresso: {
    height: 6,
    borderRadius: 3,
  },
  marcador: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
  },
});
