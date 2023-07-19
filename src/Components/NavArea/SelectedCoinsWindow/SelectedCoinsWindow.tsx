import { useEffect, useState } from "react";
import CoinModel from "../../../Models/CoinModel";
import { coinsStore } from "../../../Redux/CoinStates";
import { SearchActionType, searchStore } from "../../../Redux/SearchStates";
import { chartService } from "../../../Services/ChartService";
import "./SelectedCoinsWindow.css";

function SelectedCoinsWindow(): JSX.Element {
    const [selectedCoinsArr, setSelectedCoinsArr] = useState<CoinModel[]>([]);
    const classNameStyling: string = selectedCoinsArr.length > 5 ? "bad-color" : "good-color";
    const componentActiveStyle: string = selectedCoinsArr.length > 0 ? "active" : "";

    useEffect(subToSelectedCoinsArr, []);

    function subToSelectedCoinsArr() {
        const unsubscribe = coinsStore.subscribe(() => {
            // Update local state with global data
            setSelectedCoinsArr(coinsStore.getState().selectedCoinsArray);
        });
        return unsubscribe;
    }

    function handleRemove(index: number) {
        chartService.removeCoin(selectedCoinsArr[index]);
        selectedCoinsArr.splice(index, 1);
    }
    
    function handleSearch(searchString: string | undefined) {
        searchStore.dispatch({type: SearchActionType.UpdateSearchString, payload: `!${searchString}`});
    }

    return (
        <div className={"SelectedCoinsWindow " + componentActiveStyle + " " + classNameStyling}>
            {selectedCoinsArr.map((coin, index) => (
                <div className={"CoinButton " + classNameStyling} key={index}>
                <button className="CoinButtonRemove"  onClick={() => handleRemove(index)} >❌</button>
                <button className="CoinButtonSearch" onClick={() => handleSearch(coin.id)}  value={index}>
                    <div>{coin.symbol}: {coin.name}</div> <span className="magnifier">🔍</span>
                </button>
                </div>
            ))}
        </div>
    );
}

export default SelectedCoinsWindow;
