import { logger } from "../../../Utils/Logger";
import Chart from "../../ChartArea/Chart/Chart";
import "./LiveReport.css";

function LiveReport(): JSX.Element {
    logger.log("Live Report called", "Component Load Sequence");
    return (
        <div className="LiveReport">
			<h2>Live Report</h2>
            <Chart />
        </div>
    );
}

export default LiveReport;
