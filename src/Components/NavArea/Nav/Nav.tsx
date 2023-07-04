import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav(): JSX.Element {
    return (
        <div className="Nav">
			<NavLink to={"/home"} className="NavLink">Home</NavLink>
			<NavLink to={"/live"} className="NavLink">LiveReport</NavLink>
			<NavLink to={"/about"} className="NavLink">About</NavLink>
        </div>
    );
}

export default Nav;
