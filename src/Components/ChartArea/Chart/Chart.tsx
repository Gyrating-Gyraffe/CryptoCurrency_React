import "./Chart.css";
import { useRef, useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { chartService } from '../../../Services/ChartService';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Chart(): JSX.Element {
    const chartRef = useRef<CanvasJSReact.CanvasJSChart | null>(null);
    let [options, setOptions] = useState({});
    const [chartKey, setChartKey] = useState(0); // Add chartKey state

    useEffect(() => {
      setOptions(chartService.initialize());

      return () => {
        chartService.cleanUp();
      }
    }, []);


    useEffect(() => {
      if (chartRef.current) {   
        const chartUpdateInterval = setInterval(() => {
            const update = async () => {
            setOptions((await chartService.update()).GetOptions());
            setChartKey((prevKey) => prevKey + 1);
          }
          update();
          chartRef?.current?.render();
        }, 2000);
  
        return () => {
          clearInterval(chartUpdateInterval);
        };
      }
    }, [options]);

  return (
    <div className="Chart">
      <CanvasJSChart
        key={chartKey}
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