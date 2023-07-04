class CacheService {
    // Retrieves data from the cache using the provided key
    // Return the cached data or null if not found
    get(key: string): any {
        const stringifiedJSON = localStorage.getItem(key);
        if(!stringifiedJSON)
            return null;  

        const storedObj = JSON.parse(stringifiedJSON);
        return storedObj ? { timestamp: storedObj.timestamp, content: storedObj.content } : null;
    }
    // Stores data in the cache using the provided key and value
    // Data is stored inside an object containing "timestamp" - the time of storing and "content" - what we are storing
    set(key: string, value: any): void {
        const obj = { timestamp: new Date(), content: value };
        localStorage.setItem(key, JSON.stringify(obj));
    }
    // Validates data (for cache retrieval)
    isValid(data: any): boolean {
        const timeout = 120000; // Timeout in milliseconds
        // Timestamp validation
        if(data.timestamp) return !((new Date().getTime() - new Date(data.timestamp).getTime()) > timeout);
        return false;
    }
}

export const cacheService = new CacheService();;