import { type } from "os";

export enum LogType {
    Log = "Log",
    Warn = "Warn",
    Error = "Error"
}
type GroupedLog = {
    [key: string]: string;
    logType: LogType
};

class Logger {
    constructor(private logArray: GroupedLog[] = [],
        private keySet: Set<string> = new Set<string>()) {
        setInterval(() => this.groupLogs(), 10000);
    }

    /**
     * 
     * @param message The message to be displayed in the console.
     * @param group Optional: Group these logs by a group name.
     */
    public log(message:string, group?: string) {
        this.push(message, LogType.Log, group);
    }
    public warn(message:string, group?: string) {
        this.push(message, LogType.Warn, group);
    }
    public error(message:string, group?: string) {
        this.push(message, LogType.Error, group);
    }
    
    private push(message: string, logType: LogType, group?: string) {
        const currentGroup = group ? group : "Undefined Log Group";
        const log: GroupedLog = {
            [currentGroup]: message,
            logType
        };
        this.logArray.push(log);
        this.keySet.add(currentGroup);
        this.consoleLog(message, logType);
    }

    private groupLogs(): void {
        console.clear();
        this.keySet.forEach((key) => {
            console.groupCollapsed(key);
            this.logArray.filter(log => {
                return !!log[key]
            })
                .forEach((log, index) => {
                    this.consoleLog(log[key], log.logType);
                });
            console.groupEnd();
        });
        console.log("."); console.log("."); console.log(".");
        // this.keySet.clear();
        // this.logArray = [];
    }

    private consoleLog(message: string, logType: LogType) {
        switch (logType) {
            case LogType.Log:
                console.log(message);
                break;
            case LogType.Warn:
                console.warn(message);
                break;
            case LogType.Error:
                console.error(message);
                break;
        }
    }

}

export const logger = new Logger();