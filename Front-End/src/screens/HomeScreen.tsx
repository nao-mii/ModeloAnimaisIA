import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const TestScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/1436921059/pt/foto/closeup-shot-of-a-humpback-whale-under-the-sea.jpg?s=612x612&w=0&k=20&c=DbLBfQ04XZgE40eWARneRegbcsxig4EnethmEsJdx-U=',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>
        <Text style={styles.highlight}>Mergulhe</Text> nas profundezas dos{' '}
        <Text style={styles.highlight}>mares</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Test')}
      >
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
    backgroundColor: '#0D3B66', 
  },
  image: {
    width: '80%',
    height: 250,
    borderRadius: 16, 
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF', 
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF', 
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: '#9B5DE5', 
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#9B5DE5', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestScreen;
