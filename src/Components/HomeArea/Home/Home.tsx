import { useEffect, useState } from "react";
import { dataService } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import CoinModel from "../../../Models/CoinModel";
import { appConfig } from "../../../Utils/AppConfig";
import "./Home.css";

function Home(): JSX.Element {
    console.log("Home called");

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
            {coinsData.slice(0, 50).map((coin: CoinModel, index: number) => (
                <div className="CardContainer" key={index}>
                    <CoinCard key={index} coin={coin} />
                </div>
            ))}
        </div>
    );
}

export default Home;
