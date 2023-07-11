import "./CoinCard.css";
import { useState, useEffect, ChangeEvent } from "react";
import CoinModel from "../../../Models/CoinModel";
import CoinInfoModel from "../../../Models/CoinInfoModel";
import { chartService } from "../../../Services/ChartService";
import { dataService } from "../../../Services/DataService";
import { appConfig } from "../../../Utils/AppConfig";
import { logger } from "../../../Utils/Logger";
import { coinsStore } from "../../../Redux/CoinStates";

type CoinCardProps = {
    coin: CoinModel;
}


// Receives a coin object and builds a card for that coin
function CoinCard(props: CoinCardProps): JSX.Element {
    const moreInfoID = `moreInfo_${props.coin.id}`;
    const coinSelectID = `coinSelect_${props.coin.id}`;

    const [coinInfo, setCoinInfo] = useState<CoinInfoModel>();

    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [liveDataExists, setLiveDataExists] = useState<boolean>(false);

    const [isSelected, setIsSelected] = useState<boolean>(!!props.coin.selected);
    const [selectedCoinsCount, setSelectedCoinsCount] = useState<number>(0);
    const selectButtonClasses: string = `form-check-input coin-select ${selectedCoinsCount > 5 ? "bad-color" : "good-color"}`;
    const sliderClasses: string = `slider round ${selectedCoinsCount > 4 ? "bad-color" : "good-color"}`;

    console.log(selectButtonClasses);


    // Check if live data exists for this coin in CryptoCompare
    useEffect(() => {
        (async () => {
            if (props.coin.symbol)
                // setLiveDataExists(await chartService.checkLiveData(props.coin.symbol));
                setLiveDataExists(true);
        })();
    })

    useEffect(() => {
        if (showInfo) {
            fetchData();
        }
    }, [showInfo]);

    const fetchData = async () => {
        logger.log("fetching more info...", "CoinCard Logs");
        dataService.requestData(appConfig.coinsAPIUrl + props.coin.id)
            .then(info => setCoinInfo(info))
            .catch(err => logger.error("Unable to display coins: \n" + err.message, "CoinCard Errors"));
    }

    const toggleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.checked;
        props.coin.selected = selected;
        setIsSelected(selected);
        // LOG
        logger.log(`Coin <${props.coin.symbol}> ${selected ? "Selected" : "Deselected"}`, "CoinCard Logs");
        if (props.coin.symbol) selected ? chartService.addCoin(props.coin) : chartService.removeCoin(props.coin);
    }

    useEffect(() => {
        setSelectedCoinsCount(coinsStore.getState().selectedCoinsCount);

        // Subscribe to changes in the global state:
        const unsubscribe = coinsStore.subscribe(() => {
            // Update local state with the correct data:
            setSelectedCoinsCount(coinsStore.getState().selectedCoinsCount);
        });

        // Calling unsubscribe when our component destroyed:
        return () => unsubscribe();
    }, []);


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
                                <input className={selectButtonClasses} type="checkbox" id={coinSelectID} onChange={toggleSelect} checked={isSelected} />
                                <span className={sliderClasses}><span className="slider-text card-title">{props.coin.symbol}</span></span>
                            </label>}

                    </div>
                    <p className="card-text">{props.coin.name}</p>

                    <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        More Info
                    </button>
                    {showInfo && <div>

                    </div>}
                </div>

                || <div className="CartridgeRear">
                    <div className="form-check form-switch">
                        {liveDataExists &&
                            <label className="switch">
                                <input className={selectButtonClasses} type="checkbox" id={coinSelectID} onChange={toggleSelect} checked={isSelected} />
                                <span className={sliderClasses}><span className="slider-text card-title">{props.coin.symbol}</span></span>
                            </label>}
                    </div>
                    <span className="card-text">
                        <div>EUR: {coinInfo?.market_data?.current_price?.eur}</div>
                        <div>USD: {coinInfo?.market_data?.current_price?.usd}</div>
                        <div>ILS: {coinInfo?.market_data?.current_price?.ils}</div>
                        <img src={coinInfo?.image?.small}></img>
                    </span>

                    <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                        Go Back
                    </button>
                </div>}
        </div>
    );
}

export default CoinCard;
