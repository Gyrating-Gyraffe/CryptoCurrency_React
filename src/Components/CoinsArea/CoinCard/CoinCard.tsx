import "./CoinCard.css";
import { useState, useEffect, ChangeEvent } from "react";
import CoinModel from "../../../Models/CoinModel";
import CoinInfoModel from "../../../Models/CoinInfoModel";
import { chartService } from "../../../Services/ChartService";
import { dataService } from "../../../Services/DataService";
import { appConfig } from "../../../Utils/AppConfig";
import { coinsStore } from "../../../Redux/CoinStates";
import { Unsubscribe } from "redux";

type CoinCardProps = {
    coin: CoinModel;
    hideSwitch?: boolean
}


/** Receives a coin object and builds a card for that coin */
function CoinCard(props: CoinCardProps): JSX.Element {
    // STATES
    const [coinInfo, setCoinInfo] = useState<CoinInfoModel>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [liveDataExists, setLiveDataExists] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(!!props.coin.selected);
    const [selectedCoinsCount, setSelectedCoinsCount] = useState<number>(0);
    
    // Classes controlling slider/selection button styling
    const selectButtonClasses: string = `form-check-input coin-select ${selectedCoinsCount > 5 ? "bad-color" : "good-color"}`;
    const sliderClasses: string = `slider round ${selectedCoinsCount > 4 ? "bad-color" : "good-color"}`;

    // Check if live data exists for this coin in CryptoCompare
    useEffect(() => {
        (async () => {
            if (props.coin.symbol)
                // setLiveDataExists(await chartService.checkLiveData(props.coin.symbol));
                setLiveDataExists(true);
        })();
    }, []);

    // EFFECTS
    useEffect(fetchMoreInfo, [showInfo]);   // Loads additional info when "More Info" button is pressed
    useEffect(subToSelectedCoinsCount, []); // Redux subscription

    // METHODS
    /** Retrives more info on the coin such as the price in USD/EUR/ILS and the Image. */
    function fetchMoreInfo(): void {
        if (!showInfo) return;
        dataService.requestData(appConfig.coinsAPIUrl + props.coin.id)
            .then(info => setCoinInfo(info))
            .catch(err => console.error("Unable to display coins: ", err.message));
    }

    /** Subscribes to the coinsStore's global Selected Coins Count state, and updates the local state when needed. */
    function subToSelectedCoinsCount(): Unsubscribe {
        setSelectedCoinsCount(coinsStore.getState().selectedCoinsCount);

        // Subscribe to changes in the global state
        const unsubscribe = coinsStore.subscribe(() => {
            // Update local state with the correct data
            setSelectedCoinsCount(coinsStore.getState().selectedCoinsCount);
        });

        // Call unsubscribe when our component is destroyed
        return unsubscribe;
    }

    /** Toggles this coin's selection on/off. When toggled on, if the coin has a symbol, uses chartService to add the coin to
     *  the Live Report. */
    const toggleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = props.coin.selected = event.target.checked;
        setIsSelected(selected);
        if (props.coin.symbol) selected ? chartService.addCoin(props.coin) : chartService.removeCoin(props.coin);
    }

    /** Toggles "More Info" on/off for the coin. */
    function toggleInfo() {
        setShowInfo(current => !current);
    }

    return (
        <div className="CoinCard">
            {!showInfo
                && <div className="CartridgeFront">
                    <div className="form-check form-switch card-title">
                        {liveDataExists &&
                            <label className="switch">
                                <input className={selectButtonClasses} type="checkbox" onChange={toggleSelect} checked={isSelected} />
                                <span className={sliderClasses}><span className="slider-text card-title">{props.coin.symbol}</span></span>
                            </label>}

                    </div>
                    <p className="card-text">{props.coin.name}</p>

                    <button className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        More Info
                    </button>
                </div>

                || <div className="CartridgeRear">
                    <div className="form-check form-switch">
                        {liveDataExists &&
                            <label className="switch">
                                <input className={selectButtonClasses} type="checkbox" onChange={toggleSelect} checked={isSelected} />
                                <span className={sliderClasses}><span className="slider-text card-title">{props.coin.symbol}</span></span>
                            </label>}
                    </div>
                    <span className="card-text">
                        {props.coin.name}
                        <div>EUR: {coinInfo?.market_data?.current_price?.eur}</div>
                        <div>USD: {coinInfo?.market_data?.current_price?.usd}</div>
                        <div>ILS: {coinInfo?.market_data?.current_price?.ils}</div>
                        <img src={coinInfo?.image?.small}></img>
                    </span>

                    <button className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        Go Back
                    </button>
                </div>}
        </div>
    );
}

export default CoinCard;
