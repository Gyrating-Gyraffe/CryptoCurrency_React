import { useEffect, useState } from "react";
import { requestData } from "../../../Services/DataService";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import "./Home.css";

function Home(): JSX.Element {
    console.log("Home called");

    const [coinsData, setCoinsData] = useState([]);

    useEffect(() => {
        async function fetchCoinsData() {
            console.log("fetchCoinsData executed");
            try {
                const coins = await requestData("https://api.coingecko.com/api/v3/coins/list");
                setCoinsData(coins);
            }
            catch (err) {
                console.error("Unable to display coins: \n" + err);
            }
        }

        fetchCoinsData();
    }, []);


    return (
        <div className="Home">
            {coinsData.slice(0, 50).map((coin: any, index: number) => (
                <div className="CardContainer">
                    <CoinCard key={index} coin={coin} />
                </div>
            ))}
        </div>
    );
}

export default Home;
