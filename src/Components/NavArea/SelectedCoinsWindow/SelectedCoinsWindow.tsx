import { useEffect, useState } from "react";
import "./SelectedCoinsWindow.css";
import { coinsStore } from "../../../Redux/CoinStates";
import { unsubscribe } from "diagnostics_channel";
import CoinModel from "../../../Models/CoinModel";
import { chartService } from "../../../Services/ChartService";

function SelectedCoinsWindow(): JSX.Element {
    const [selectedCoinsArr, setSelectedCoinsArr] = useState<CoinModel[]>([]);
    const classNameStyling: string = selectedCoinsArr.length > 5 ? "bad-color" : "good-color";
    const componentActiveStyle: string = selectedCoinsArr.length > 0 ? "active" : "";

    useEffect(() => {
        const unsubscribe = coinsStore.subscribe(() => {
            // Update local state with global data
            setSelectedCoinsArr(coinsStore.getState().selectedCoinsArray);
        });
        return unsubscribe;
    }, []);

    function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        if ((typeof event.target.value !== "number") || event.target.checked) return;
        chartService.removeCoin(selectedCoinsArr[event.target.value]);
        selectedCoinsArr.splice(event.target.value, 1);
    }

    return (
        <div className={"SelectedCoinsWindow " + componentActiveStyle}>
            {selectedCoinsArr.map((coin, index) => (
                <div className={classNameStyling} key={index}>
                    {coin.symbol}: {coin.name}
                    <input type="checkbox"
                        value={index}
                        onChange={handleCheckbox}
                         />
                </div>
            ))}
        </div>
    );
}

export default SelectedCoinsWindow;
