import ChartDataModel from "../Models/ChartDataModel";
import ChartOptionsModel from "../Models/ChartOptionsModel";
import { apiService } from "./ApiService";
import { appConfig } from "../Utils/AppConfig";
import { logger, LogType } from "../Utils/Logger";

class ChartService {
    private chartData: ChartDataModel[] = [];
    private chartOptions: ChartOptionsModel = new ChartOptionsModel();
    
    private colorSet: string[] = [];

    private apiData: any; // ToDo: Add validation and strong typing

    private coinSet: Set<string> = new Set<string>();
    private currencySet: Set<string> = new Set<string>();

    private coinCodesArray?: string[];
    private currencyArray?: string[];

 
    /** Returns the options to be used by the chart.
     * @returns The 'options' object used by the chart to plot graphs for the coins.
     */
    public GetOptions(): ChartOptionsModel {
        return this.chartOptions;
    } 

    /** Initializes the properties in ChartService and prepares the class for updating.
     * @param coinCodesArray The codes we are going to pull data on.
     * @param currencyArray The currencyArray for which we will check coin pricing. (For the project only the USD currency is required)
     * @returns 
     */
    public initialize(): ChartService {
        this.currencySet.add("USD");
        // Set up this class' variables
        this.setUpColorSet();
        this.setParams();
        // In case of an error return
        if(!(this.coinCodesArray && this.currencyArray)) return this;
        this.chartData = [];
        this.chartOptions = new ChartOptionsModel();
        this.chartOptions.colorSet = this.colorSet;
        this.chartOptions.axisX.title = "Time";
        this.chartOptions.axisY.pop(); // Clear the default object in the array (There is 1 object by default)

        // For every coin we are graphing - create a dataModel with all customization and properties, and add it to the chartData object
        for(let i = 0; i < this.coinCodesArray.length; i++) {
            this.chartOptions.axisY.push({ title: this.coinCodesArray[i],
                                            titleFontColor: this.colorSet[i],
                                            lineColor: this.colorSet[i],
                                            labelFontColor: this.colorSet[i],
                                            tickColor: this.colorSet[i] });

            let dataModel = new ChartDataModel();
            dataModel.name = this.coinCodesArray[i];
            dataModel.axisYIndex = i;
            dataModel.color = this.colorSet[i];
            this.chartData.push(dataModel);
        }
        return this;
    }

    /** Updates the Chart properties in this class with new API data. 
     * @returns Promise of type ChartService
     */
    public async update(): Promise<ChartService> {
        if(!(this.coinCodesArray && this.currencyArray)) return this;
        // Example with Bitcoin(BTC) and Etherium (ETH) and currencyArray USD and ILS
        // {"BTC":{"USD":30801.96,"ILS":114850},"ETH":{"USD":1941.88,"ILS":7235.42}}
        try {
            this.apiData = await apiService.fetchJSON(appConfig.coinsRealtimeURL + 
                `?fsyms=${this.parseToURL(this.coinCodesArray)}&tsyms=${this.parseToURL(this.currencyArray)}`);
            
            logger.log("APIDATA: ", "ChartService Logs");
            logger.log(this.apiData, "ChartService Logs");

            const dateNow = new Date();
            for(const currency in this.currencyArray) {
                for(const code in this.coinCodesArray) {             
                    const yVal = this.apiData[this.coinCodesArray[code]][this.currencyArray[currency]];
                    
                    for(let i = 0; i < this.chartData.length; i++) {
                        if(this.chartData[i].name === this.coinCodesArray[code]) 
                            this.chartData[i].dataPoints.push({ x: dateNow, y: yVal});
                    }
                }
            }
        }
        catch (err) {
            logger.log("Error in ChartService, Update() \n" + err, "ChartService Errors");
        }

        this.chartOptions.data = this.chartData;

        return this;
    }

    public addCoin(code: string) {
        this.coinSet.add(code.toUpperCase());
        logger.log(this.parseToURL(Array.from(this.coinSet.values())), "ChartService Logs");
    }
    public removeCoin(code: string) {
        this.coinSet.delete(code.toUpperCase());
    }

    // Sets the code and currency parameters up. Converts sets to arrays for easy iteration
    public setParams(): void {
        this.coinCodesArray = Array.from(this.coinSet.values());
        this.currencyArray = Array.from(this.currencySet.values());
    }

    // Checks if live data exists in CryptoCompare for given coin
    public async checkLiveData(code: string): Promise<boolean> {
        try {
            this.apiData = await apiService.fetchJSON(appConfig.coinsRealtimeURL + 
                `?fsyms=${code.toUpperCase()}&tsyms=USD`);
            
            if(this.apiData[code.toUpperCase()]['USD']) return true;
        }
        catch(err: any) {
            logger.warn(`Coin with Symbol ${code} returns an API Error. therefore has no LIVE DATA\n` + err, "Coin Live Data Issues"); 
        }
        return false; 
    }

    // Chains elements of a string array together with commas ("string1,string2,string3")
    private parseToURL (strArr: string[]): string {
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