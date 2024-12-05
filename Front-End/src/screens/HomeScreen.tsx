import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

const HomeScreen: React.FC = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://media.istockphoto.com/id/1436921059/pt/foto/closeup-shot-of-a-humpback-whale-under-the-sea.jpg?s=612x612&w=0&k=20&c=DbLBfQ04XZgE40eWARneRegbcsxig4EnethmEsJdx-U=' }} // Substitua pela URL da sua imagem
                style={styles.image}
            />
            <Text style={styles.title}>
                <Text style={styles.highlight}>Mergulhe</Text> nas profundezas dos <Text style={styles.highlight}>mares</Text>
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Test')}>
                <Text style={styles.buttonText}>Teste a aplicação</Text>
            </TouchableOpacity>
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
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    highlight: {
        color: '#4CAF50',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
