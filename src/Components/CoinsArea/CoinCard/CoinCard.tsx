import { useState, useEffect } from "react";
import CoinModel from "../../../Models/CoinModel";
import "./CoinCard.css";
import CoinInfoModel from "../../../Models/CoinInfoModel";
import { dataService } from "../../../Services/DataService";
import { appConfig } from "../../../Utils/AppConfig";

type CoinCardProps = {
    coin: CoinModel;
}


// Receives a coin object and builds a card for that coin
function CoinCard(props: CoinCardProps): JSX.Element {
    const moreInfoID = `moreInfo_${props.coin.id}`;
    const coinSelectID = `coinSelect_${props.coin.id}`;
    const collapseID = `collapse_${props.coin.id}`;

    const [coinInfo, setCoinInfo] = useState<CoinInfoModel>();

    const [showInfo, setShowInfo] = useState<boolean>(false);

    useEffect(() => {
        if (showInfo) {
            fetchData();
        }
    }, [showInfo]);

    const fetchData = async () => {
        console.log("fetching more info...");
        dataService.requestData(appConfig.coinsAPIUrl + props.coin.id)
            .then(info => setCoinInfo(info)
            )
            .catch(err => console.error("Unable to display coins: \n" + err.message));;
    }


    function ToggleInfo() {
        setShowInfo(!showInfo);
    }

    return (
        <div className="CoinCard">
            {!showInfo 
            
            && <div className="CartridgeFront">
                <div className="form-check form-switch">
                    <input className="form-check-input coin-select" type="checkbox" role="switch" id={coinSelectID} />
                </div>
                <h5 className="card-title">{props.coin.symbol}</h5>
                <p className="card-text">{props.coin.name}</p>

                <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={ToggleInfo}>
                    More Info
                </button>
                {showInfo && <div>
                    
                </div>}
            </div> 
            
            || <div className="CartridgeRear">
                <div className="form-check form-switch">
                    <input className="form-check-input coin-select" type="checkbox" role="switch" id={coinSelectID} />
                </div>
                <h5 className="card-title">{props.coin.symbol}</h5>
                <span className="card-text">
                    <div>EUR: {coinInfo?.market_data?.current_price?.eur}</div>
                    <div>USD: {coinInfo?.market_data?.current_price?.usd}</div>
                    <div>ILS: {coinInfo?.market_data?.current_price?.ils}</div></span>

                <button id={moreInfoID} className="btn btn-primary more-info" data-bs-toggle="collapse" onClick={ToggleInfo}>
                    Go Back
                </button>
            </div> }
        </div>
    );
}

export default CoinCard;
