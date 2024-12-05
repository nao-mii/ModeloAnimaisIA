import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Input from 'components/Input';
import Button from 'components/Button';
import { register } from 'services/authService';

const RegisterScreen: React.FC = ({ navigation }: any) => {
    const [nome, setNome] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = async () => {
        if (!nome || !dataNascimento || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            setLoading(true);

            await register(nome, email, password, dataNascimento); // Enviando todos os dados para o backend

            Alert.alert('Sucesso', 'Registro bem-sucedido!');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>

            <Input
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome}
            />
            <Input
                placeholder="Data de nascimento (YYYY-MM-DD)"
                value={dataNascimento}
                onChangeText={setDataNascimento}
            />
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
            <Input
                placeholder="Confirme sua senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <Button text="Registrar" onPress={handleRegister} loading={loading} />

            <Button
                text="Já tem uma conta? Faça login"
                onPress={() => navigation.navigate('Login')}
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

export default RegisterScreen;
