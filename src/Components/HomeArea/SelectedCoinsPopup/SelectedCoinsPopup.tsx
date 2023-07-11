import { useEffect, useState } from "react";
import CoinModel from "../../../Models/CoinModel";
import CoinCard from "../../CoinsArea/CoinCard/CoinCard";
import "./SelectedCoinsPopup.css";
import { coinsStore } from "../../../Redux/CoinStates";
import { logger } from "../../../Utils/Logger";

function SelectedCoinsPopup(): JSX.Element {

    const [selectedCoinsArray, setSelectedCoinsArray] = useState<CoinModel[]>([]);

    useEffect(() => {
        const unsubscribe = coinsStore.subscribe(() => {
            const arr = coinsStore.getState().selectedCoinsArray;
            logger.log(coinsStore.getState().selectedCoinsArray.length.toString(), "LOGS");
            setSelectedCoinsArray(arr);
        })

        return () => unsubscribe();
    }, []);

    return (
        <div className="SelectedCoinsPopup">
			{ selectedCoinsArray.length > 0 && selectedCoinsArray.map((coin: CoinModel, index) => (
                            <div className="CoinContainer" key={index}>
                                <CoinCard key={index} coin={coin} />
                                {coin.jsxKey}
                            </div>
                        )) }
        </div>
    );
}

export default SelectedCoinsPopup;
