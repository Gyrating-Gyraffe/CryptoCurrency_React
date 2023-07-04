class AppConfig {
    // Must add {id}/list at the end
    public readonly coinsAPIUrl: string = "https://api.coingecko.com/api/v3/coins/";
    public readonly coinsRealtimeURL: string = "https://min-api.cryptocompare.com/data/pricemulti";
}

export const appConfig = new AppConfig();