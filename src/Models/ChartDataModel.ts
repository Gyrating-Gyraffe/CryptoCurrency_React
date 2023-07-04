export type Point = {
    x: Date;
    y: number;
}

// This model describes the X,Y points and their parameters on the CanvasJS chart.
class ChartDataModel {
    constructor(
        public type: string = "spline",
        public name: string = "Units Sold",
        public showInLegend: boolean = true,
        public xValueFormatString: string = "MMM YYYY",
        public yValueFormatString: string = "#,##0 Units",
        public dataPoints: Point[] = []
        ){};
}

export default ChartDataModel;