import CoinModel from "../../../Models/CoinModel";
import { coinsStore } from "../../../Redux/CoinStates";
import { logger } from "../../../Utils/Logger";
import Chart from "../../ChartArea/Chart/Chart";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import LiveCoinCard from "../../CoinsArea/LiveCoinCard/LiveCoinCard";
import "./LiveReport.css";

function LiveReport(): JSX.Element {
    console.log("Live Report called", "Component Load Sequence");

    

    return (
        <div className="LiveReport">
			<h2>Live Report</h2>

            <LiveCoinCard coinNames={coinsStore.getState().selectedCoinsArray.map(coin => coin.symbol ? `-${coin.symbol}-` : "" )}/>
            
            {/* <Chart /> */}
            
        </div>
    );
}

export default LiveReport;
