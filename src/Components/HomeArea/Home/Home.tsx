import { useContext, useEffect, useState } from "react";
import CoinModel from "../../../Models/CoinModel";
import { searchStore } from "../../../Redux/SearchStates";
import { dataService } from "../../../Services/DataService";
import { appConfig } from "../../../Utils/AppConfig";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import { ScrollContext } from "../../LayoutArea/Layout/Layout";
import noCoinsFoundImage from "../../../Assets/Images/no_coins_found.png";
import coinLoadImage from "../../../Assets/Images/coin_loading_2.svg";
import "./Home.css";

export function Home(): JSX.Element {
    console.log("Home called", "Component Load Sequence");
    
    /* Main element scroll Context from Layout.tsx
     Accepted values: -1 means we're near the top, 1 means we're near the bottom, 0 means neither. */
    const scrollDirection = useContext(ScrollContext);

    // STATES
    const [coinsData, setCoinsData] = useState<CoinModel[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<CoinModel[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [coinSliceStart, setCoinSliceStart] = useState<number>(0);
    const [coinSliceEnd, setCoinSliceEnd] = useState<number>(60);
    const [loading, setLoading] = useState<boolean>(false); // Track whether new coins are being loaded

    // EFFECTS
    useEffect(initHome, []);  // Initial coin fetch from API or Storage
    useEffect(applyCoinFilter, [searchString, coinsData]);  // Filter coin list
    useEffect(infiniteScroll, [scrollDirection, loading]);     // Show new coins on scroll triggers for infinite scrolling
    useEffect(finishScrollLoad, [coinSliceStart, coinSliceEnd, loading]); // Loading switch

    // METHODS
    function initHome() {
        // Fetch coins
        dataService.requestData(appConfig.coinsAPIUrl + "list")
            .then(coins => setCoinsData(coins.map((coin: CoinModel, index: number) => { coin.jsxKey = index; return coin }))
            )
            .catch(err => console.error("Unable to display coins: \n" + err.message));

        // Set up search handling
        setSearchString(searchStore.getState().searchString);
        const unsubscribe = searchStore.subscribe(() => {
            setSearchString(searchStore.getState().searchString);
        })
        
        // Component cleanup
        return unsubscribe;
    }

    /** Handles filtering the coins based on following criteria: 
     * 1. Symbol Length, 2. Search string, 3. Search relevance sort. */
    function applyCoinFilter(): void {
        let filtered = filterBySymbolLength(coinsData, 7);
        // Exclamation mark means filter by ID and Exclusive (Only fully matching ID strings will pass)
        if(searchString[0] === "!") {
            filtered = filterExclusiveByID(filtered, searchString.substring(1));
        }
        else {
            filtered = filterInclusiveBySymbol(filtered, searchString);
        }
        setFilteredCoins(filtered);
    };
    function filterInclusiveBySymbol(array: CoinModel[], searchString: string): CoinModel[] {
        return array.filter((coin: CoinModel) => { return searchString ? coin.symbol!.startsWith(searchString) : true })
                .sort((a: CoinModel, b: CoinModel) => { return searchString ? (a.symbol!.startsWith(b.symbol!) ? 0 : -1) : 0 }); 
    }
    function filterExclusiveByID(array: CoinModel[], searchString: string): CoinModel[] {
        return array.filter((coin: CoinModel) => { return coin.id === searchString });
    }
    function filterBySymbolLength(array: CoinModel[], maxLength: number): CoinModel[] {
        return array.filter((coin: CoinModel) => { return coin.symbol ? coin.symbol.length <= maxLength : false });
    }

    /** Displaces the indices of the coins we render in reaction to scroll triggers. */
    function infiniteScroll(): void {
        // Don't run if still loading last request or no scroll trigger is detected
        if (loading) return;
        if (!scrollDirection) return;
        
        const sliceSize = filteredCoins.length >= 60 ? 60 : filteredCoins.length; // 100 by default. Or filteredCoins.length if it's smaller than 100

        const shift = (start: number, end: number, val: number) => {
            // Check if we're at either end of the page to stop setting states
            if (start + val === coinSliceStart || end + val === coinSliceEnd) return;
            setCoinSliceStart((start + val)); // Ternary prevents negative numbers as start values for the slice
            setCoinSliceEnd((end + val));
            setLoading(true);
        };

        // *Shift number should be a common denominator of all possible numbers of coin cards per row to avoid flex-related layout shifts 
        const shiftDirection: number = scrollDirection; // scrollTrigger used as direction multiplier        
        let coinShift: number = 12 * shiftDirection;

        // Prevent out of bounds
        if (coinSliceStart + coinShift < 0) return shift(0, 60, 0);
        if (coinSliceEnd + coinShift > filteredCoins.length) return shift(filteredCoins.length - sliceSize, filteredCoins.length - 1, 0);

        // Apply default shift
        shift(coinSliceStart, coinSliceEnd, coinShift);
    };

    /** Sets loading state to false. Called by Effect when the component re-renders with new coins on scroll. */
    function finishScrollLoad(): void {
        loading && setLoading(false);
    }

    return (
        <div className="Home">
            <div className="TextContainer">
                <h1 className="HomeTitle">Good Morning</h1>
                <h3 className="HomeDescription">Let's play the market!</h3>
               
            </div>

            <div className="CardContainer">
                {filteredCoins.length > 0
                    ? filteredCoins.slice(coinSliceStart, coinSliceEnd)
                        .map((coin: CoinModel) => (
                            <div className="CoinContainer" key={coin.jsxKey}>
                                <CoinCard key={coin.jsxKey} coin={coin} />
                            </div>
                        ))
                    : searchString.length > 0 && <div className="NoCoinsFound">I can't find any coins!<img src={noCoinsFoundImage} /></div> 
                    || <div className="LoadingCoins"><img src={coinLoadImage} /></div>}
                    {loading && <div className="LoadingCoins"><img src={coinLoadImage} /></div>}
            </div>
        </div>
    );
}

export default Home;