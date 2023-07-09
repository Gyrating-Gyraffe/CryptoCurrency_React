class CoinModel {
    public id?: string;
    public symbol?: string;
    public name?: string;

    public jsxKey?: number; // Unique key given when pulling the coins from the API. Used for React's JSX key property
    public selected?: boolean; // Is this coin selected for live report
}

export default CoinModel;