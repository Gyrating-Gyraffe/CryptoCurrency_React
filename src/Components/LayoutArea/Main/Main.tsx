import Home from "../../HomeArea/Home/Home";
import "./Main.css";

function Main(): JSX.Element {
    console.log("Main called");
    return (
        <div className="Main">
			<Home />
        </div>
    );
}

export default Main;
