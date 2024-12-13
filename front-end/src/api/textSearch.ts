import axios from 'axios';
import { SimilaritySearchResponse } from '../types/similaritySearchRespoonse';

const API_BASE_URL = 'http://127.0.0.1:8000/api/similarity-search/'; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const sendData = async (inputString : string) : Promise<SimilaritySearchResponse> => {
    try {
        const response = await apiClient.post('', { input_string: inputString });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
  };