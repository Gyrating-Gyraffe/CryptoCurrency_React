import { useEffect, useState } from "react";
import { dataService } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import CoinModel from "../../../Models/CoinModel";
import { appConfig } from "../../../Utils/AppConfig";
import "./Home.css";
import { LogType, logger } from "../../../Utils/Logger";

function Home(): JSX.Element {
    logger.log("Home called", "Component Load Sequence");

    const [coinsData, setCoinsData] = useState<CoinModel[]>([]);

    useEffect(() => {
        (() => {
            console.log("useEffect (Getting coins) executed");
            dataService.requestData(appConfig.coinsAPIUrl + "list")
            .then (coins => setCoinsData(coins)
            )
            .catch (err => console.error("Unable to display coins: \n" + err.message));
        })();
    }, []);


    return (
        <div className="Home">
            {coinsData.filter(coin => {return coin.symbol ? coin.symbol.length <= 5 : false})
            .filter((coin, index) => {return index % Math.floor(coinsData.length / 5) === 0})
            .map((coin: CoinModel, index: number) => (
                <div className="CardContainer" key={index}>
                    <CoinCard key={index} coin={coin} />
                </div>
            ))}
            
        </div>
    );
}

export default Home;
