import { NavLink } from "react-router-dom";
import "./Nav.css";

enum CurrentPage {
    Home = "Home",
    Live = "Live",
    About = "About"
}

function Nav(): JSX.Element {

    function switchPage(page: CurrentPage): undefined {

        return;
    }

    return (
        <div className="Nav">
			<NavLink to={"/home"} className="NavLink">Home</NavLink>
			<NavLink to={"/live"} className="NavLink">LiveReport</NavLink>
			<NavLink to={"/about"} className="NavLink">About</NavLink>
        </div>
    );
}

export default Nav;
