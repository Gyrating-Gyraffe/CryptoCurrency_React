import { useEffect, useState, ChangeEvent, useContext } from "react";
import { dataService } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import CoinModel from "../../../Models/CoinModel";
import { appConfig } from "../../../Utils/AppConfig";
import "./Home.css";
import { logger } from "../../../Utils/Logger";
import SelectNotification from "../SelectNotification/SelectNotification";
import { ScrollContext } from "../../LayoutArea/Layout/Layout";
import SelectedCoinsPopup from "../SelectedCoinsPopup/SelectedCoinsPopup";

export 

function Home(): JSX.Element {
    logger.log("Home called", "Component Load Sequence");


    const [coinsData, setCoinsData] = useState<CoinModel[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<CoinModel[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const [coinSliceStart, setCoinSliceStart] = useState<number>(0);
    const [coinSliceEnd, setCoinSliceEnd] = useState<number>(100);
    const [coinSliceShift, setCoinSliceShift] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); // Track whether new coins are being loaded

    /* Main element scroll Context from Layout.tsx
     Accepted values: 1 means we're near the top, -1 means we're near the bottom, 0 means neither. */
    const scrollTrigger = useContext(ScrollContext);
    
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

    // React to scroll triggers for infinite scrolling coin load
    useEffect(() => {
        if(loading) return;
        if(scrollTrigger == 0) return;
        const coinShift: number = 20;
        logger.log("COIN SHIFT: " + coinShift, "Scroll Debug");
        logger.log("InnerWidth: " + window.innerWidth, "Scroll Debug");
        if(scrollTrigger > 0) {
            if(coinSliceStart < coinShift) return;
            setCoinSliceStart(coinSliceStart - coinShift);
            setCoinSliceEnd(coinSliceEnd - coinShift);
        }
        else if(scrollTrigger < 0) {
            if(coinSliceEnd > coinsData.length - coinShift) return;
            setCoinSliceStart(coinSliceStart + coinShift);
            setCoinSliceEnd(coinSliceEnd + coinShift);
        }
        setLoading(true);
    }, [scrollTrigger, loading])

    useEffect(() => {
        if(loading)
            setLoading(false);
    }, [coinSliceStart, coinSliceEnd, loading])

    return (
        <div className="Home">
            <SelectNotification />  
            <SelectedCoinsPopup />
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
