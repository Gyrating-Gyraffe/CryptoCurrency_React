import { useRef, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chart(): JSX.Element {
  const chartRef = useRef<CanvasJSReact.CanvasJSChart | null>(null);

  const toggleDataSeries = (e: any) => {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    if (chartRef.current) {
      chartRef.current.render();
    }
  };
  
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.render();
    }
  }, []);

  const options = {
    // Options object properties
  };

  return (
    <div className="Chart">
      <CanvasJSChart
        options={options}
        ref={(ref) => {
            chartRef.current = ref as CanvasJSReact.CanvasJSChart;
          }}
        /* You can get reference to the chart instance as shown above using onRef.
           This allows you to access all chart properties and methods */
      />
    </div>
  );
}

export default Chart;


// ======== OPTIONS OBJECT EXAMPLE ============

//     const options = {
//         theme: "light2",
//         animationEnabled: true,
//         title: {
//             text: "Units Sold VS Profit"
//         },
//         subtitles: [{
//             text: "Click Legend to Hide or Unhide Data Series"
//         }],
//         axisX: {
//             title: "States"
//         },
//         axisY: {
//             title: "Units Sold",
//             titleFontColor: "#6D78AD",
//             lineColor: "#6D78AD",
//             labelFontColor: "#6D78AD",
//             tickColor: "#6D78AD"
//         },
//         axisY2: {
//             title: "Profit in USD",
//             titleFontColor: "#51CDA0",
//             lineColor: "#51CDA0",
//             labelFontColor: "#51CDA0",
//             tickColor: "#51CDA0"
//         },
//         toolTip: {
//             shared: true
//         },
//         legend: {
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },
//         data: [
//             {
//                 type: "spline",
//                 name: "Units Sold",
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "#,##0 Units",
//                 dataPoints: [
//                     { x: new Date(2017, 0, 1), y: 120 },
//                     { x: new Date(2017, 1, 1), y: 135 },
//                     { x: new Date(2017, 2, 1), y: 144 },
//                     { x: new Date(2017, 3, 1), y: 103 },
//                     { x: new Date(2017, 4, 1), y: 93 },
//                     { x: new Date(2017, 5, 1), y: 129 },
//                     { x: new Date(2017, 6, 1), y: 143 },
//                     { x: new Date(2017, 7, 1), y: 156 },
//                     { x: new Date(2017, 8, 1), y: 122 },
//                     { x: new Date(2017, 9, 1), y: 106 },
//                     { x: new Date(2017, 10, 1), y: 137 },
//                     { x: new Date(2017, 11, 1), y: 142 }
//                 ]
//             },
//             {
//                 type: "spline",
//                 name: "Profit",
//                 axisYType: "secondary",
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "$#,##0.#",
//                 dataPoints: [
//                     { x: new Date(2017, 0, 1), y: 19034.5 },
//                     { x: new Date(2017, 1, 1), y: 20015 },
//                     { x: new Date(2017, 2, 1), y: 27342 },
//                     { x: new Date(2017, 3, 1), y: 20088 },
//                     { x: new Date(2017, 4, 1), y: 20234 },
//                     { x: new Date(2017, 5, 1), y: 29034 },
//                     { x: new Date(2017, 6, 1), y: 30487 },
//                     { x: new Date(2017, 7, 1), y: 32523 },
//                     { x: new Date(2017, 8, 1), y: 20234 },
//                     { x: new Date(2017, 9, 1), y: 27234 },
//                     { x: new Date(2017, 10, 1), y: 33548 },
//                     { x: new Date(2017, 11, 1), y: 32534 }
//                 ]
//             }
//         ]
//     };

