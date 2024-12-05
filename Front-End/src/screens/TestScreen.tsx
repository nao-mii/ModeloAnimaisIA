import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage } from 'services/testService';

const TestScreen: React.FC = ({ navigation }: any) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<{ name: string; match: number } | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageUploadAndAnalyze = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permissão Negada', 'É necessário permitir acesso à galeria para continuar.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setImageUri(selectedImageUri);
            setLoading(true);

            try {
                const analysisData = await analyzeImage(); // Usando o testService
                setAnalysisResult(analysisData);
            } catch (error: any) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReset = () => {
        setImageUri(null);
        setAnalysisResult(null);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
                <Text style={styles.homeButtonText}>Voltar para Home</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Faça sua análise</Text>

            <TouchableOpacity onPress={handleImageUploadAndAnalyze} disabled={loading}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                    <View style={styles.uploadPlaceholder}>
                        <Text style={styles.placeholderText}>
                            {loading ? 'Analisando...' : 'Toque para fazer upload'}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />}

            {analysisResult && (
                <>
                    <Text style={styles.resultText}>
                        Resultado: <Text style={styles.resultHighlight}>{analysisResult.name}</Text>
                    </Text>
                    <Text style={styles.resultText}>
                        Porcentagem de correspondência:{' '}
                        <Text style={styles.resultHighlight}>{analysisResult.match}%</Text>
                    </Text>
                    <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                        <Text style={styles.resetButtonText}>Fazer teste novamente</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    uploadPlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
    },
    placeholderText: {
        color: '#999',
        textAlign: 'center',
    },
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    resultText: {
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
        color: '#333',
    },
    resultHighlight: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    resetButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    homeButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    homeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default TestScreen;
