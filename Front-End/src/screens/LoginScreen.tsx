import Button from 'components/Button';
import Input from 'components/Input';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { login } from 'services/authService';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password); // Usando o authService

      if (data.length) {
        Alert.alert('Bem-vindo', 'Login bem-sucedido!');
        navigation.navigate('Home');
      }
      else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button text="Entrar" onPress={handleLogin} loading={loading} />

      <Button
        text="Não tem conta? Cadastre-se"
        onPress={() => navigation.navigate('Register')}
        style={{ backgroundColor: 'grey', marginTop: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;