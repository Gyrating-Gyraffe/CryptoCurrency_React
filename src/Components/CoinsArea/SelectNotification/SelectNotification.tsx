import { coinsStore } from "../../../Redux/CoinStates";
import "./SelectNotification.css";
import { useState, useEffect } from "react";
import errorIcon from "../../../Assets/Images/error_icon2.png";
import SelectionPopup from "../SelectionPopup/SelectionPopup";
import CoinModel from "../../../Models/CoinModel";
import PopupOverlay from "../PopupOverlay/PopupOverlay";

// The select notification has a timeout before it is removed from the DOM. This allows it to animate its destruction.
function SelectNotification(): JSX.Element {
    // STATES
    const [renderNotification, setRenderNotification] = useState<boolean>(false); // This decides whether the notification is rendered in the virtual DOM
    const [notificationCondition, setNotificationCondition] = useState<boolean>(false); // This is in charge of visually showing the notification or hiding it
    const [selectedCoinsArray, setSelectedCoinsArray] = useState<CoinModel[]>([]);
    const [selectedCoinsPopup, setSelectedCoinsPopup] = useState<boolean>(false);

    const className = `SelectNotification ${notificationCondition ? "animate-enter" : "animate-exit"}`;
    const popupClassName = `SelectionPopup ${selectedCoinsPopup ? "animate-enter" : "animate-exit"}`;

    useEffect(() => {
        const unsubscribe = coinsStore.subscribe(() => {
            const array = coinsStore.getState().selectedCoinsArray;
            setSelectedCoinsArray(array);
            setNotificationCondition(array.length > 5);
        })

        return () => {unsubscribe();}
    }, []);


    useEffect(() => {
        if (!notificationCondition) {
            const timer = setTimeout(() => {
                setRenderNotification(false);
                setSelectedCoinsPopup(false);
            }, 150); // Delay before removing the notification from the DOM
            return () => clearTimeout(timer);
        }
        setRenderNotification(true);
    }, [notificationCondition]);

    const handleFixClick = () => {
        setSelectedCoinsPopup(true);
    };
    const handlePopupClose = () => {
        setSelectedCoinsPopup(false);
    };

    if(!renderNotification) return <></>;
    return (
        <div className={className}>
            <div className="error-content">
                <img src={errorIcon} />
                <div>
                    <span className="highlight-text">You can only select up to 5 coins</span> 
                    <br/>Currently selected: {selectedCoinsArray.length} <br />
                    <button className="fix-button" onClick={handleFixClick}>Fix</button>
                </div>
            </div>
            { selectedCoinsPopup && <PopupOverlay />}
            { selectedCoinsPopup && <SelectionPopup className={popupClassName} coinsArray={selectedCoinsArray} onClose={handlePopupClose}/>}
        </div>
    );
}

export default SelectNotification;