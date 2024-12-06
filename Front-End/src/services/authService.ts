import axios from 'axios';

const API_URL = 'http://192.168.0.36:8081';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        throw new Error('Falha na autenticação. Tente novamente.');
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/users`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Falha ao registrar.');
    }
};