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
    const [selectedCoinsArr, setSelectedCoinsArr] = useState<CoinModel[]>([]);
    const [coinInfo, setCoinInfo] = useState<CoinInfoModel>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [liveDataExists, setLiveDataExists] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    








    // Classes controlling slider/selection button styling
    const selectButtonClasses: string = `form-check-input coin-select ${selectedCoinsArr.length > 5 ? "bad-color" : "good-color"}`;
    const sliderClasses: string = `slider round ${selectedCoinsArr.length > 4 ? "bad-color" : "good-color"}`;

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
    useEffect(subToSelectedCoinsArr, []); // Redux subscription
    useEffect(checkSelection, [selectedCoinsArr]);

    // METHODS
    /** Retrieves more info on the coin such as the price in USD/EUR/ILS and the Image. */
    function fetchMoreInfo(): void {
        if (!showInfo) return;
        dataService.requestData(appConfig.coinsAPIUrl + props.coin.id)
            .then(info => setCoinInfo(info))
            .catch(err => console.error("Unable to display coins: ", err.message));
    }

    /** Subscribes to the coinsStore's global Selected Coins Array state, and updates the local state when needed. */
    function subToSelectedCoinsArr(): Unsubscribe {
        setSelectedCoinsArr(coinsStore.getState().selectedCoinsArray);
        
        const unsubscribe = coinsStore.subscribe(() => {
            // Update local state with global data
            setSelectedCoinsArr(coinsStore.getState().selectedCoinsArray);
            // checkSelection(coinsStore.getState().selectedCoinsArray);
        });
        return unsubscribe;
    }

    /** Toggles this coin's selection on/off. When toggled on, if the coin has a symbol, uses chartService to add the coin to
     *  the Live Report. */
    const toggleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const selected  = event.target.checked;
        setIsSelected(selected);
        if (props.coin.symbol) selected ? chartService.addCoin(props.coin) : chartService.removeCoin(props.coin);
    }

    function checkSelection() {
        if(selectedCoinsArr.filter(coin => coin.id === props.coin.id).length <= 0) {
            setIsSelected(false);
        }
        else {
            setIsSelected(true);
        }
    }

    /** Toggles "More Info" on/off for the coin. */
    function toggleInfo() {
        setShowInfo(current => !current);
    }

    return (
        <div className="CoinCard">
            {!showInfo
                && <div className="CartridgeFront">
                    <div className="form-check form-switch">
                        {liveDataExists &&
                            <label className="switch">
                                <input className={selectButtonClasses} type="checkbox" onChange={toggleSelect} checked={isSelected} />
                                <span className={sliderClasses}><div className="slider-text card-title">{props.coin.symbol}</div></span>
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
                                <span className={sliderClasses}><div className="slider-text card-title">{props.coin.symbol}</div></span>
                            </label>}
                    </div>
                    <span className="card-text">
                        {props.coin.name}
                        
                        
                        {coinInfo?.market_data?.current_price.eur && 
                            <div>EUR: {coinInfo.market_data.current_price.eur.toLocaleString()}$</div> || <div className="LoadingMoreInfo">Loading EUR</div> }
                        {coinInfo?.market_data?.current_price.usd && 
                        <div>USD: {coinInfo.market_data.current_price.usd.toLocaleString()}€</div> || <div className="LoadingMoreInfo">Loading USD</div> }
                        {coinInfo?.market_data?.current_price.ils && 
                        <div>ILS: {coinInfo.market_data.current_price.ils.toLocaleString()}₪</div> || <div className="LoadingMoreInfo">Loading ILS</div> }
                        
                        {coinInfo?.image?.small &&
                        <img src={coinInfo.image.small}></img> || <div className="LoadingMoreInfoImage"></div>}
                    </span>

                    <button className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        Go Back
                    </button>
                </div>}
        </div>
    );
}

export default CoinCard;
