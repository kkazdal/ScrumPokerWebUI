import axios, { AxiosRequestConfig } from 'axios';

// Dinamik Axios GET isteği yapan fonksiyon
const getService = async (endpoint: string, params?: Record<string, any>, config?: AxiosRequestConfig) => {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}${endpoint}`; // Endpoint ile birleştir

    try {
        // İsteğe özel parametreler varsa bunları config içine ekle
        const finalConfig: AxiosRequestConfig = {
            ...config,
            params, // Query string parametreleri
        };

        const response = await axios.get(url, finalConfig);
        return {
            data: response.data,
            status: response.status
        }; // Başarılı yanıtı döndür
    } catch (error: any) {
        throw error; // Hata durumunda fırlat
    }
};

export default getService;
