import { apiService } from "./ApiService";
import ChartDataModel from "../Models/ChartDataModel";
import ChartOptionsModel from "../Models/ChartOptionsModel";
import { appConfig } from "../Utils/AppConfig";

class ChartService {
    private chartData: ChartDataModel[] = [];
    private chartOptions: ChartOptionsModel = new ChartOptionsModel();
    
    private colorSet: string[] = [];

    private apiData: any; // ToDo: Add validation and strong typing

    private coinCodes?: string[];
    private currencies?: string[];

 
    /** Returns the options to be used by the chart.
     * @returns The 'options' object used by the chart to plot graphs for the coins.
     */
    public GetOptions(): ChartOptionsModel {
        return this.chartOptions;
    } 

    /** Initializes the properties in ChartService and prepares the class for updating.
     * @param coinCodes The codes we are going to pull data on.
     * @param currencies The currencies for which we will check coin pricing. (For the project only the USD currency is required)
     * @returns 
     */
    public Initialize(coinCodes: string[], currencies: string[]): ChartService {
        // Set up this class' variables
        this.setUpColorSet();
        this.SetParams(coinCodes, currencies);
        // In case of an error return
        if(!(this.coinCodes && this.currencies)) return this;
        this.chartData = [];
        this.chartOptions = new ChartOptionsModel();
        this.chartOptions.colorSet = this.colorSet;
        this.chartOptions.axisX.title = "Time";
        this.chartOptions.axisY.pop(); // Clear the default object in the array (There is 1 object by default)

        // For every coin we are graphing - create a dataModel with all customization and properties, and add it to the chartData object
        for(let i = 0; i < coinCodes.length; i++) {
            this.chartOptions.axisY.push({ title: coinCodes[i],
                                            titleFontColor: this.colorSet[i],
                                            lineColor: this.colorSet[i],
                                            labelFontColor: this.colorSet[i],
                                            tickColor: this.colorSet[i] });

            let dataModel = new ChartDataModel();
            dataModel.name = this.coinCodes[i];
            dataModel.axisYIndex = i;
            dataModel.color = this.colorSet[i];
            this.chartData.push(dataModel);
        }
        return this;
    }

    /** Updates the Chart properties in this class with new API data. 
     * @returns Promise of type ChartService
     */
    public async Update(): Promise<ChartService> {
        if(!(this.coinCodes && this.currencies)) return this;
        // Example with Bitcoin(BTC) and Etherium (ETH) and currencies USD and ILS
        // {"BTC":{"USD":30801.96,"ILS":114850},"ETH":{"USD":1941.88,"ILS":7235.42}}
        try {
            this.apiData = await apiService.fetchJSON(appConfig.coinsRealtimeURL + 
                `?fsyms=${this.ParseToURL(this.coinCodes)}&tsyms=${this.ParseToURL(this.currencies)}`);
            console.log(this.apiData);
            
            const dateNow = new Date();
            for(const currency in this.currencies) {
                for(const code in this.coinCodes) {
                    console.log(`this.apiData[${this.coinCodes[code]}][${this.currencies[currency]}]`);
                    
                    const yVal = this.apiData[this.coinCodes[code]][this.currencies[currency]];
                    
                    for(let i = 0; i < this.chartData.length; i++) {
                        if(this.chartData[i].name === this.coinCodes[code]) 
                            this.chartData[i].dataPoints.push({ x: dateNow, y: yVal});
                    }
                }
            }
        }
        catch (err) {
            console.error("Error in ChartService, Update() \n" + err);
        }

        this.chartOptions.data = this.chartData;

        return this;
    }

    // Sets the codes and currencies parameters up
    public SetParams(coinCodes: string[], currencies: string[]): void {
        this.coinCodes = coinCodes;
        this.currencies = currencies;
    }

    // Chains elements of a string array together with commas ("string1,string2,string3")
    private ParseToURL (strArr: string[]): string {
        let parsed = "";
        for(let i = 0; i < strArr.length; i++) {
            parsed += strArr[i];
            if(i < strArr.length - 1) parsed += ",";
        }
        return parsed;
    }

    // Set up a set of colors to be used by the chart
    private setUpColorSet(): void {
        this.colorSet = [//colorSet Array
        "#4661EE",
        "#EC5657",
        "#1BCDD1",
        "#8FAABB",
        "#B08BEB",
        "#3EA0DD",
        "#F5A52A",
        "#23BFAA",
        "#FAA586",
        "#EB8CC6"
       ];
    }
}

export const chartService = new ChartService();