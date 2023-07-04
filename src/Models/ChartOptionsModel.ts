import Chart from "../Components/ChartArea/Chart/Chart";
import ChartDataModel from "./ChartDataModel";

// This model describes the CanvasJS chart options parameter, which is a complex object that includes
// all necessary information and customization for the chart to render.
class ChartOptionsModel {
    constructor(
        public theme: string = "light2",
        public animationEnabled: boolean = true,
        public title: { text: string } = { text: "Real-time Coin Worth" },
        public subtitles: { text: string }[] = [
            { text: "Click Legend to Hide or Unhide Data Series" },
        ],
        public axisX: { title: string } = { title: "States" },
        public axisY: {
            title: string;
            titleFontColor: string;
            lineColor: string;
            labelFontColor: string;
            tickColor: string;
        } = {
                title: "USD",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                labelFontColor: "#6D78AD",
                tickColor: "#6D78AD",
            },
        public axisY2: {
            title: string;
            titleFontColor: string;
            lineColor: string;
            labelFontColor: string;
            tickColor: string;
        } = {
                title: "ILS",
                titleFontColor: "#51CDA0",
                lineColor: "#51CDA0",
                labelFontColor: "#51CDA0",
                tickColor: "#51CDA0",
            },
        public toolTip: { shared: boolean } = { shared: true },
        public legend: { cursor: string; itemclick: string } = {
            cursor: "pointer",
            itemclick: "toggleDataSeries",
        },
        public data?: ChartDataModel[]
    ) { }
}

export default ChartOptionsModel;