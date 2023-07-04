import Chart from "../../ChartArea/Chart/Chart";
import "./LiveReport.css";

function LiveReport(): JSX.Element {
    console.log("Live Report called");
    return (
        <div className="LiveReport">
			<h2>Live Report</h2>
            <Chart />
        </div>
    );
}

export default LiveReport;
