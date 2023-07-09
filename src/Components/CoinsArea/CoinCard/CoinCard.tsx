import "./CoinCard.css";
import { useState, useEffect, ChangeEvent } from "react";
import CoinModel from "../../../Models/CoinModel";
import CoinInfoModel from "../../../Models/CoinInfoModel";
import { chartService } from "../../../Services/ChartService";
import { dataService } from "../../../Services/DataService";
import { appConfig } from "../../../Utils/AppConfig";
import { logger } from "../../../Utils/Logger";

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

    // Check if live data exists for this coin in CryptoCompare
    useEffect(() => {
        (async () => {
            if(props.coin.symbol)
                // setLiveDataExists(await chartService.checkLiveData(props.coin.symbol));
                setLiveDataExists(false);
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
        if(props.coin.symbol)
            selected ? chartService.addCoin(props.coin.symbol) : chartService.removeCoin(props.coin.symbol);
    }

    function toggleInfo() {
        setShowInfo(current => !current);
    }

    return (
        <div className="CoinCard">
            {!showInfo 
            
            && <div className="CartridgeFront">
                <div className="form-check form-switch">
                    {liveDataExists && <input className="form-check-input coin-select" type="checkbox" role="switch" id={coinSelectID} onChange={toggleSelect} checked={props.coin.selected}/>}
                </div>
                <h5 className="card-title">{props.coin.symbol}</h5>
                <p className="card-text">{props.coin.name}</p>

                <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                    More Info
                </button>
                {showInfo && <div>
                    
                </div>}
            </div> 
            
            || <div className="CartridgeRear">
                <div className="form-check form-switch">
                    {liveDataExists && <input className="form-check-input coin-select" type="checkbox" role="switch" id={coinSelectID} onChange={toggleSelect} />}
                </div>
                <h5 className="card-title">{props.coin.symbol}</h5>
                <span className="card-text">
                    <div>EUR: {coinInfo?.market_data?.current_price?.eur}</div>
                    <div>USD: {coinInfo?.market_data?.current_price?.usd}</div>
                    <div>ILS: {coinInfo?.market_data?.current_price?.ils}</div></span>
                <img src={coinInfo?.image?.small}></img>

                <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={toggleInfo}>
                    Go Back
                </button>
            </div> }
        </div>
    );
}

export default CoinCard;
