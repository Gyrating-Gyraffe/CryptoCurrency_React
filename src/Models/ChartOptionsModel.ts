import ChartDataModel from "./ChartDataModel";

// This model describes the CanvasJS chart options parameter, which is a complex object that includes
// all necessary information and customization for the chart to render.
class ChartOptionsModel {
    constructor(
        public height: number = 1000,
        public width: number = 1800,
        public theme: string = "dark1",
        public backgroundColor?: string,
        public colorSet?: string[],
        public animationEnabled: boolean = false,
        public title: { text: string } = { text: "Live Report" },
        public subtitles: { text: string }[] = [
            { text: "Real-time coin market prices" },
        ],
        public axisX: { title?: string, titleFontSize?: number, labelFontSize?: number } = { title: "States" },
        public axisY: [{
            title: string;
            titleFontColor?: string;
            titleFontSize?: number;
            lineColor?: string;
            labelFontColor?: string;
            labelFontSize?: number;
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