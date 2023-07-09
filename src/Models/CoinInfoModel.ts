type CurrentPrice = {
    eur: number;
    usd: number;
    ils: number;
}

class CoinInfoModel {
    public id?: string;
    public symbol?: string;
    public name?: string;

    public market_data?: {
        current_price: CurrentPrice
    };
    public image?: {
        large: string,
        small: string,
        thumb: string
    }
}

export default CoinInfoModel;