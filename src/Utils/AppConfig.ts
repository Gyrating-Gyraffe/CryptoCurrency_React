class AppConfig {
    // Must add {id}/list at the end
    public readonly coinsAPIUrl: string = "https://api.coingecko.com/api/v3/coins/";
}

export const appConfig = new AppConfig();