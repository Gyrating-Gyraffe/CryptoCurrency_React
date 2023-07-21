import CoinModel from "../../../Models/CoinModel";
import { chartService } from "../../../Services/ChartService";
import "./SelectionPopup.css";

type SelectionPopupProps = {
    className: string,
    coinsArray: CoinModel[],
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

function SelectionPopup(props: SelectionPopupProps): JSX.Element {

    const coinsLeftToRemove = props.coinsArray.length - 5;

    function handleRemove(index: number) {
        chartService.removeCoin(props.coinsArray[index]);
        props.coinsArray.splice(index, 1);
    }

    return (
        <div className={props.className}>   
            <div className="PopupInside">
                <div>You must remove &nbsp;
                    <span className="HighlightedText">{coinsLeftToRemove} more {coinsLeftToRemove > 1 ? "coins" : "coin"}</span>
                    &nbsp; to continue. 
                </div>
                {props.coinsArray.map((coin, index) => (
                    <div className="CoinWrapper" key={index}>
                        <button className="CoinButtonRemove"  onClick={() => handleRemove(index)} >❌</button>
                        <div className="CoinText">{index + 1}. {coin.name} <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({coin.symbol}) </div>
                    </div>
                ))}
            </div>
            <button className="ClosePopupButton" onClick={props.onClose}>Close</button>
        </div>
    );
}

export default SelectionPopup;
