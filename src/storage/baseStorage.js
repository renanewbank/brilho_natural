import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarValor(chave, valor) {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch (error) {
    console.warn(`Erro ao salvar ${chave} no storage.`, error);
  }
}

async function lerValor(chave, valorPadrao) {
  try {
    const valor = await AsyncStorage.getItem(chave);
    return valor ? JSON.parse(valor) : valorPadrao;
  } catch (error) {
    console.warn(`Erro ao ler ${chave} do storage.`, error);
    return valorPadrao;
  }
}

export { lerValor, salvarValor };
