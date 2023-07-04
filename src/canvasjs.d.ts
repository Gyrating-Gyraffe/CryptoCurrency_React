declare module '@canvasjs/react-charts' {
    import { Component } from 'react';

    interface CanvasJSChartProps {
        options: object;
    }

    export class CanvasJSChart extends Component<CanvasJSChartProps> { }
}