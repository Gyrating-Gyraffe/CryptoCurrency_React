import { NavLink } from "react-router-dom";
import aboutIcon from "../../../Assets/Images/Nav/AboutIcon.png";
import homeIcon from "../../../Assets/Images/Nav/HomeIcon.png";
import liveReportIcon from "../../../Assets/Images/Nav/LiveReportIcon.png";
import SearchBar from "../SearchBar/SearchBar";
import SelectedCoinsWindow from "../SelectedCoinsWindow/SelectedCoinsWindow";
import "./Nav.css";
import { useEffect, useState } from "react";
import { coinsStore } from "../../../Redux/CoinStates";

function Nav(): JSX.Element {
    const [liveReportAvailable, setLiveReportAvailable] = useState<boolean>(true);
    const liveReportClassname = liveReportAvailable ? "NavLink" : "NavLink Unavailable";

    useEffect(() => {
        const unsubscribe = coinsStore.subscribe(() => {
            setLiveReportAvailable(coinsStore.getState().selectedCoinsArray.length < 6);
        });

        return unsubscribe;
    }, []);

    return (
        <div className="Nav">     
            <div className="NavGroup">
                <div className="NavTitle">Menu</div>
                <div className="NavLinkWrapper">
                    <img src={homeIcon} />
                    <NavLink to={"/home"} className="NavLink">Home</NavLink>
                </div>
                <div className="NavLinkWrapper">
                    <img src={liveReportIcon} />
                    <NavLink to={liveReportAvailable ? "/live" : "/home"} className={liveReportClassname}>LiveReport</NavLink>
                </div>
                <div className="NavLinkWrapper">
                    <img src={aboutIcon} />
                    <NavLink to={"/about"} className="NavLink">About</NavLink>
                </div>
            </div>
            <div className="NavGroup">
                <div className="NavTitle">Library</div>
                <SearchBar />
                <SelectedCoinsWindow />
            </div>
        </div>
    );
}

export default Nav;
