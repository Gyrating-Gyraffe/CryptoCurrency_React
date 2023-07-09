// import ChartDataModel from "../Models/ChartDataModel";
// import ChartOptionsModel from "../Models/ChartOptionsModel";
// import { apiService } from "./ApiService";
// import { appConfig } from "../Utils/AppConfig";
// import { logger } from "../Utils/Logger";

class ColChartService {
//     private chartData: ChartDataModel[] = [];
//     private chartOptions: ChartOptionsModel = new ChartOptionsModel();
//     private startYVals: number[] = []; // Starting coin price when the chart first loads

//     private colorSet: string[] = [];

//     private apiData: any; // ToDo: Add validation and strong typing

//     private coinSet: Set<string> = new Set<string>();
//     private currencySet: Set<string> = new Set<string>();

//     private coinCodesArray?: string[];
//     private currencyArray?: string[];

 
//     /** Returns the options to be used by the chart.
//      * @returns The 'options' object used by the chart to plot graphs for the coins.
//      */
//     public GetOptions(): ChartOptionsModel {
//         return this.chartOptions;
//     } 

//     /** Initializes the properties in ColChartService and prepares the class for updating.
//      * @returns ColChartService singleton reference (this).
//      */
//     public initialize(): ColChartService {
//         this.currencySet.add("USD");
//         this.coinSet.add("BTC");
//         this.coinSet.add("ETH");
//         // Set up this class' variables
//         this.setUpColorSet();
//         this.setParams();
//         // In case of an error return
//         if(!(this.coinCodesArray && this.currencyArray)) return this;
//         this.chartData = [];
//         this.chartOptions = new ChartOptionsModel();
//         this.chartOptions.colorSet = this.colorSet;
//         this.chartOptions.axisX = {};
//         this.chartOptions.axisY.pop(); // Clear the default object in the array (There is 1 object by default)

//         // For every coin we are graphing - create a dataModel with all customization and properties, and add it to the chartData object
//         this.chartOptions.axisY.push({ 
//             title: "Price Shift",
//             titleFontColor: this.colorSet[0],
//             lineColor: this.colorSet[0],
//             labelFontColor: this.colorSet[0],
//             tickColor: this.colorSet[0] });

//         let dataModel = new ChartDataModel();
//         dataModel.color = this.colorSet[0];
//         dataModel.type = "column";
//         this.chartData[0] = dataModel;
        

//         return this;
//     }

//     /** Updates the Chart properties in this class with new API data. 
//      * @returns Promise of type ColChartService
//      */
//     public async update(): Promise<ColChartService> {
//         if(!(this.coinCodesArray && this.currencyArray)) return this;
//         // Example with Bitcoin(BTC) and Etherium (ETH) and currencyArray USD and ILS
//         // {"BTC":{"USD":30801.96,"ILS":114850},"ETH":{"USD":1941.88,"ILS":7235.42}}
//         try {
//             this.apiData = await apiService.fetchJSON(appConfig.coinsRealtimeURL + 
//                 `?fsyms=${this.parseToURL(this.coinCodesArray)}&tsyms=${this.parseToURL(this.currencyArray)}`);
            
//             const currency = this.currencyArray[0];
//             if(this.startYVals.length === 0) {
//                 for(const code in this.coinCodesArray) {
//                     const yVal = this.apiData[this.coinCodesArray[code]][currency];
//                     this.startYVals.push(yVal);
//                 }
//             }

//             logger.log("APIDATA: ", "ColChartService Logs");
//             logger.log(this.apiData, "ColChartService Logs");

//             for(const index in this.coinCodesArray) {             
//                 const yVal = this.apiData[this.coinCodesArray[index]][currency];
//                 const yShift = (yVal / this.startYVals[index] - 1) * 100;

//                 this.chartData[0].dataPoints[index] = ( { y: yShift,  label: this.coinCodesArray[index]} );
//                 logger.log("DataPoint 0: " + this.chartData[0].dataPoints[0], "Chart Data Test");

//             }
//         }
//         catch (err) {
//             logger.log("Error in ColChartService, Update() \n" + err, "ColChartService Errors");
//         }

//         this.chartOptions.data = this.chartData;
//         logger.log(this.chartData, "Chart Data Test");
//         return this;
//     }

//     public addCoin(code: string) {
//         this.coinSet.add(code.toUpperCase());
//         logger.log(this.parseToURL(Array.from(this.coinSet.values())), "ColChartService Logs");
//     }
//     public removeCoin(code: string) {
//         this.coinSet.delete(code.toUpperCase());
//     }

//     // Sets the code and currency parameters up. Converts sets to arrays for easy iteration
//     public setParams(): void {
//         this.coinCodesArray = Array.from(this.coinSet.values());
//         this.currencyArray = Array.from(this.currencySet.values());
//     }

//     // Checks if live data exists in CryptoCompare for given coin
//     public async checkLiveData(code: string): Promise<boolean> {
//         try {
//             this.apiData = await apiService.fetchJSON(appConfig.coinsRealtimeURL + 
//                 `?fsyms=${code.toUpperCase()}&tsyms=USD`);
            
//             if(this.apiData[code.toUpperCase()]['USD']) return true;
//         }
//         catch(err: any) {
//             logger.warn(`Coin with Symbol ${code} returns an API Error. therefore has no LIVE DATA\n` + err, "Coin Live Data Issues"); 
//         }
//         return false; 
//     }

//     // Chains elements of a string array together with commas ("string1,string2,string3")
//     private parseToURL (strArr: string[]): string {
//         let parsed = "";
//         for(let i = 0; i < strArr.length; i++) {
//             parsed += strArr[i];
//             if(i < strArr.length - 1) parsed += ",";
//         }
//         return parsed;
//     }

//     // Set up a set of colors to be used by the chart
//     private setUpColorSet(): void {
//         this.colorSet = [//colorSet Array
//         "#4661EE",
//         "#EC5657",
//         "#1BCDD1",
//         "#8FAABB",
//         "#B08BEB",
//         "#3EA0DD",
//         "#F5A52A",
//         "#23BFAA",
//         "#FAA586",
//         "#EB8CC6"
//        ];
//     }
}

export const colChartService = new ColChartService();