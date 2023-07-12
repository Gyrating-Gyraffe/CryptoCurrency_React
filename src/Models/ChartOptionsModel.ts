import ChartDataModel from "./ChartDataModel";

// This model describes the CanvasJS chart options parameter, which is a complex object that includes
// all necessary information and customization for the chart to render.
class ChartOptionsModel {
    constructor(
        public theme: string = "dark1",
        public backgroundColor?: string,
        public colorSet?: string[],
        public animationEnabled: boolean = false,
        public title: { text: string } = { text: "Real-time Coin Worth" },
        public subtitles: { text: string }[] = [
            { text: "Click Legend to Hide or Unhide Data Series" },
        ],
        public axisX: { title?: string } = { title: "States" },
        public axisY: [{
            title: string;
            titleFontColor?: string;
            lineColor?: string;
            labelFontColor?: string;
            tickColor?: string;
            minimum?: number;
            maximum?: number;
        }] = [{ title: "USD",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            labelFontColor: "#6D78AD",
            tickColor: "#6D78AD"}],
        public toolTip: { shared: boolean } = { shared: true },
        public legend: { cursor: string; itemclick: string } = {
            cursor: "pointer",
            itemclick: "",
        },
        public data?: ChartDataModel[]
    ) { };
}

export default ChartOptionsModel;