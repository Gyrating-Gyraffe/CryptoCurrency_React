type MarketData = {
    current_price: CurrentPrice;
}

type CurrentPrice = {
    eur: number;
    usd: number;
    ils: number;
}

class CoinInfoModel {
    public id?: string;
    public symbol?: string;
    public name?: string;

    public market_data?: MarketData;
}

export default CoinInfoModel;