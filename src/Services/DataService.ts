import { cacheService } from "./CacheService";
import { apiService } from "./ApiService";

class DataService {
    /** Requests Data from API/Storage
     * 
     * @param url API url to be used for fetching data from REST API
     * @param ignoreCache Optional: If set to true function ignores the cache (false by default)
     * @returns JSON Object data
     */
    requestData = async (url: string, ignoreCache?: boolean, timeoutOffset?: number): Promise<any> => {
        const cachedData = cacheService.get(url);

        // Return cached data if it exists, it's valid, and we don't intentionally want to ignore it
        if(cachedData && cacheService.isValid(cachedData) && !ignoreCache) {
            console.log("RETURNING CACHEDDATA because IT IS VALID"); // DEVLOG
            return cachedData.content;    
        } 

        try {
            const apiData = await apiService.fetchJSON(url); // Fetch API data
            if(apiData.error) throw new Error(apiData.error); // if API returns an error on its side
            cacheService.set(url, apiData, timeoutOffset); // Store data

            console.log("RETURNING APIDATA because CACHEDATA IS INVALID"); // DEVLOG
            return apiData;
        } 
        catch (error) {
            // Handle API error
            console.error('Failed to fetch data from API:', error);
            console.log("RETURNING CACHEDDATA because API UNRESPONSIVE"); // DEVLOG
            // Return cache if exists (valid or not doesn't matter), undefined if doesn't exist
            return cachedData ? cachedData.content : { undefined }; 
        }
    }
}

export const dataService = new DataService();