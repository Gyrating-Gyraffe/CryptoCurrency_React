import { useEffect, useState, ChangeEvent } from "react";
import { dataService } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import CoinModel from "../../../Models/CoinModel";
import { appConfig } from "../../../Utils/AppConfig";
import "./Home.css";
import { logger } from "../../../Utils/Logger";
import SelectNotification from "../SelectNotification/SelectNotification";

function Home(): JSX.Element {
    logger.log("Home called", "Component Load Sequence");


    const [coinsData, setCoinsData] = useState<CoinModel[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<CoinModel[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const [coinSliceStart, setCoinSliceStart] = useState<number>(0);
    const [coinSliceEnd, setCoinSliceEnd] = useState<number>(50);
    const [coinSliceShift, setCoinSliceShift] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); // Track whether new coins are being loaded

    useEffect(() => {
        (() => {
            console.log("useEffect (Getting coins) executed");
            dataService.requestData(appConfig.coinsAPIUrl + "list")
                .then(coins => setCoinsData(coins.map((coin: CoinModel, index: number) => { coin.jsxKey = index; return coin }))
                )
                .catch(err => console.error("Unable to display coins: \n" + err.message));
        })();
    }, []);

    useEffect(() => {
        handleFilter(searchValue);
    }, [searchValue, coinsData]);

    const handleFilter = (searchValue: string) => {
        const filtered: CoinModel[] =
            coinsData.filter((coin: CoinModel) => { return coin.symbol ? coin.symbol.length <= 7 : false })
                .filter((coin: CoinModel) => { return searchValue ? coin.symbol!.startsWith(searchValue) : true })
                .sort((a: CoinModel, b: CoinModel) => { return searchValue ? (a.symbol!.startsWith(b.symbol!) ? 0 : -1) : 0 });

        setFilteredCoins(filtered);
    };


    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        logger.log("Search: " + searchValue, "Search Test");
    };



    return (
        <div className="Home">
            <SelectNotification />  
            <div className="TextContainer">
                <h1 className="HomeTitle">Good Morning</h1>
                <h3 className="HomeDescription">Let's play the market!</h3>
            </div>
            <input className="SearchBar"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            
            <div className="CardContainer">
                {filteredCoins.length > 0 ?
                    filteredCoins.slice(coinSliceStart, coinSliceEnd)
                        .map((coin: CoinModel) => (
                            <div className="CoinContainer" key={coin.jsxKey}>
                                <CoinCard key={coin.jsxKey} coin={coin} />
                                {coin.jsxKey}
                            </div>
                        )) : coinsData.length > 0 && <h1>NO COINS FOUND</h1>}
            </div>            
        </div>
    );
}

export default Home;
