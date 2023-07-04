import { apiService } from "./ApiService";
import ChartDataModel from "../Models/ChartDataModel";
import ChartOptionsModel from "../Models/ChartOptionsModel";
import { appConfig } from "../Utils/AppConfig";


class ChartService {
    private chartData: ChartDataModel[] = [];
    private chartOptions: ChartOptionsModel = new ChartOptionsModel();
    

    private apiData: any; // Add validation and strong typing


    private coinCodes?: string[];
    private currencies?: string[];

    

    public Initialize() {
        for(const code in this.coinCodes) {
            let dataModel = new ChartDataModel();
            dataModel.name = code;
            this.chartData.push(dataModel);
        }
    }

    public Update() {
        if(!(this.coinCodes && this.currencies)) return;
        // Example with Bitcoin(BTC) and Etherium (ETH) and currencies USD and ILS
        // {"BTC":{"USD":30801.96,"ILS":114850},"ETH":{"USD":1941.88,"ILS":7235.42}}
        try {
            this.apiData = apiService.fetchJSON(appConfig.coinsRealtimeURL + 
                `?fsyms=${this.ParseToURL(this.coinCodes)}&tsyms=${this.ParseToURL(this.currencies)}`);

            const dateNow = new Date();
            for(const currency in this.currencies) {
                for(const code in this.coinCodes) {
                    const yVal = this.apiData[code][currency];
                }
            }
        }
    }

    public SetParams(coinCodes: string[], currencies: string[]) {
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
}

export const chartService = new ChartService();