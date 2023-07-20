import { chartService } from "../../../Services/ChartService";
import "./About.css";

function About(): JSX.Element {
    console.log("About called");

    chartService.cleanUp();
    
    return (
        <div className="About">
			<h2>About</h2>
        </div>
    );
}

export default About;
