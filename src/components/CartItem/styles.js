import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imagem: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  categoria: { fontSize: 11, color: '#999', marginTop: 2 },
  rodape: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  preco: { fontSize: 15, fontWeight: 'bold', color: '#7B9E4F' },
  qtd: { backgroundColor: '#F0F7E6', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  qtdTexto: { fontSize: 12, color: '#7B9E4F', fontWeight: 'bold' },
  remover: { padding: 8 },
  removerTexto: { fontSize: 20 },
});