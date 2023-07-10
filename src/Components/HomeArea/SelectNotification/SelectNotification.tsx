import { coinsStore } from "../../../Redux/CoinStates";
import "./SelectNotification.css";
import React, { useState, useEffect } from "react";
import errorIcon from "../../../Assets/Images/error_icon.png";

function SelectNotification(): JSX.Element {
    

    const [renderNotification, setRenderNotification] = useState<boolean>(false); // This decides whether the notification is rendered in the virtual DOM
    const [notificationCondition, setNotificationCondition] = useState<boolean>(false); // This is in charge of visually showing the notification or hiding it

    const[selectedCoinsCount, setSelectedCoinsCount] = useState<number>(0);

    const className = `SelectNotification ${notificationCondition ? "animate-enter" : "animate-exit"}`;
    

    useEffect(() => {
        const unsubscribe = coinsStore.subscribe(() => {
            const count = coinsStore.getState().selectedCoinsCount;
            setSelectedCoinsCount(count);
            setNotificationCondition(count > 5);
        })

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (!notificationCondition) {
            const timer = setTimeout(() => {
                setRenderNotification(false);
            }, 150); // Delay before removing the notification from the DOM
            return () => clearTimeout(timer);
        }
        setRenderNotification(true);
    }, [notificationCondition]);

    if(!renderNotification) return <></>;
    return (
        <div className={className}>
            <div className="error-content">
                <img src={errorIcon} />
                <div>
                    <span className="highlight-text">You can only select up to 5 coins</span> 
                    <br/>Currently selected: {selectedCoinsCount} <br />
                    <button className="fix-button">Fix</button>
                </div>
            </div>
            
        </div>
    );
}

export default SelectNotification;
