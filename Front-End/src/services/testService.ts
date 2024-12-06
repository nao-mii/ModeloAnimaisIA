import axios from 'axios';

const API_URL = 'http://192.168.0.36:8081';

export const analyzeImage = async () => {
    try {
        const response = await axios.get(`${API_URL}/analyses/0`);
        return response.data;
    } catch (error) {
        throw new Error('Falha na análise da imagem. Tente novamente.');
    }
};
