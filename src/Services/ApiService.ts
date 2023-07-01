class ApiService {
    // Fetches data from the API 
    // Returns a JSON object
    async fetchJSON(url: string): Promise<any> {
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        }
        catch(err: any) {
            console.error("ApiService Error!", err);
        }
    }
}

export default ApiService;