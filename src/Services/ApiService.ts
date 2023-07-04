import axios from "axios";

class ApiService {
    // Fetches data from the API 
    // Returns a JSON object
    async fetchJSON(url: string): Promise<any> {
        try {
            const response = await axios.get(url);
            const json = response.data;
            return json;
        }
        catch(err: any) {
            console.error("ApiService Error!", err);
        }
        return undefined;
    }
}

export const apiService = new ApiService();