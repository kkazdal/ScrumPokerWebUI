import axios, { AxiosRequestConfig } from 'axios';

// Dinamik Axios POST isteği yapan fonksiyon
const postService = async (endpoint: string, data: Record<string, any>, config?: AxiosRequestConfig) => {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${endpoint}`; // Endpoint ile birleştir

    try {
        const response = await axios.post(url, data, config);
        return {
            data: response.data,
            status: response.status
        }; // Başarılı yanıtı döndür
    } catch (error: any) {
        throw error; // Hata durumunda fırlat
    }
};

export default postService;
