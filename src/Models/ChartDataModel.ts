type Point = {
    x?: Date;
    y: number;
    label?: string;
}

// This model describes the X,Y points and their parameters on the CanvasJS chart.
class ChartDataModel {
    constructor(
        public type: string = "spline",
        public name: string = "Units Sold",
        public showInLegend: boolean = true,
        public xValueFormatString: string = "hh:mm:ss TT",
        public yValueFormatString: string = "###,###,###,##0.########## $",
        public axisYIndex: number = 0,
        public dataPoints: Point[] = [],
        public color?: string
    ) { };
}

export default ChartDataModel;