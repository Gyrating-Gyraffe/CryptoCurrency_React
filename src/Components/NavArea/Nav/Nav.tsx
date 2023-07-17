import { NavLink } from "react-router-dom";
import "./Nav.css";

import homeIcon from "../../../Assets/Images/Nav/HomeIcon.png";
import aboutIcon from "../../../Assets/Images/Nav/AboutIcon.png";
import liveReportIcon from "../../../Assets/Images/Nav/LiveReportIcon.png";
import activeElementIcon from "../../../Assets/Images/Nav/ActiveButtonIcon.png";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SelectedCoinsWindow from "../SelectedCoinsWindow/SelectedCoinsWindow";
import SelectNotification from "../../HomeArea/SelectNotification/SelectNotification";

enum CurrentPage {
    Home = "Home",
    Live = "Live",
    About = "About"
}

function Nav(): JSX.Element {
    const [currentPage, setCurrentPage] = useState<CurrentPage>(CurrentPage.Home);

    function switchPage(page: CurrentPage): undefined {
        setCurrentPage(page);
        return;
    }

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
                    <NavLink to={"/live"} className="NavLink">LiveReport</NavLink>
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
