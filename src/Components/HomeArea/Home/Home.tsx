import { useEffect, useState, ChangeEvent } from "react";
import { dataService } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import CoinModel from "../../../Models/CoinModel";
import { appConfig } from "../../../Utils/AppConfig";
import "./Home.css";
import { logger } from "../../../Utils/Logger";

function Home(): JSX.Element {
    logger.log("Home called", "Component Load Sequence");


    const [coinsData, setCoinsData] = useState<CoinModel[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<CoinModel[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');


    useEffect(() => {
        (() => {
            console.log("useEffect (Getting coins) executed");
            dataService.requestData(appConfig.coinsAPIUrl + "list")
                .then(coins => setCoinsData(coins.map((coin: CoinModel, index: number) => {coin.jsxKey = index; return coin}))
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
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
            />
            <div className="CardContainer">
                {filteredCoins.length > 0 ?
                filteredCoins.slice(0, 50)
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
