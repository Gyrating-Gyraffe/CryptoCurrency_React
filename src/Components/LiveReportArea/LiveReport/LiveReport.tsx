import Chart from "../../ChartArea/Chart/Chart";
import "./LiveReport.css";

function LiveReport(): JSX.Element {
    console.log("Live Report called", "Component Load Sequence");

    return (
        <div className="LiveReport">
            <Chart />           
        </div>
    );
}

export default LiveReport;
