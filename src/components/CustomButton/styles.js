import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  botao: {
    backgroundColor: '#7B9E4F',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#7B9E4F',
  },
  botaoPerigo: {
    backgroundColor: '#E85D4A',
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  textoSecundario: {
    color: '#7B9E4F',
  },
});