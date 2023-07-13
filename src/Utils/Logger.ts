import { originalConsoleError, originalConsoleLog, originalConsoleWarn } from "./consoleLogOverride";

enum LogType {
    Log = "Log",
    Warn = "Warn",
    Error = "Error"
}
type GroupedLog = {
    [key: string]: string;
    logType: LogType
};

/** An alternative to the regular console.log/warn/error dev interface.
 * Has the same functionality with the added benefit of being able to group console entries across different
 * components/classes/areas of code, regardless of when or where the entry was made. 
 * 
 * How it works:
 * 1. When constructed (On page load/refresh) the class sets an interval for a grouping function.
 * 2. Logs normally to the console and stores the console message/group info in local variables.
 * 3. When the interval ticks, the console is cleared and all stored message/group pairs are printed to the console
 *      under their respective groups.
 * When used together with consoleLogOverride.js this logger replaces console.log/warn/error functions to store and render
 * external log calls as well.
 */
class Logger {
    constructor(private logArray: GroupedLog[] = [],
        private keySet: Set<string> = new Set<string>()) {
        setInterval(() => this.groupLogs(), 2000);
    }

    /** Logs a regular log message on the console.
     * @param arg1 The first message to be displayed in the console.
     * @param group Optional: Group these logs by a group name.
     * @param args The rest of the messages.
     */
    public log(arg1: any, group: string = "Undefined Log Group", ...args: any[]): void {
        this.push(arg1, LogType.Log, group);
        for (const arg of args) {
            this.push(arg, LogType.Log, group);
        } 
    }
    public warn(arg1: any, group: string = "Undefined Log Group", ...args: any[]): void {
        this.push(arg1, LogType.Warn, group);
        for (const arg of args) {
            this.push(arg, LogType.Log, group);
        }
    }
    public error(arg1: any, group: string = "Undefined Log Group", ...args: any[]): void {
        this.push(arg1, LogType.Error, group);
        for (const arg of args) {
            this.push(arg, LogType.Log, group);
        }
    }

    // Pushes a grouped message into the log array, and adds the group name to the keySet if not already there
    private push(message: string, logType: LogType, group: string): void {
        message = JSON.stringify(message);
        const currentGroup: string = group;
        const log: GroupedLog = {
            [currentGroup]: message,
            logType
        };
        this.logArray.push(log);
        this.keySet.add(currentGroup);
        this.consoleLog(message, logType);
    }

    // Groups all the logs currently stored in the singleton. Does this by clearing the console and then re-logging all the messages
    // This effectively "refreshes" the console. The end result is a categorized list of logs. 
    // **Pauses when the website document isn't in focus (Mostly to allow uninterrupted console exploration)
    private groupLogs(): void {
        if (!document.hasFocus()) return; // If we're focused on the dev console we want the grouping/refreshing to pause

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
        originalConsoleLog(".", ".", "."); // Separates the groups with the new ungrouped log entries
    }

    // Logs new entries that haven't been grouped yet
    private consoleLog(message: string, logType: LogType): void {
        switch (logType) {
            case LogType.Log:
                originalConsoleLog(message);
                break;
            case LogType.Warn:
                originalConsoleWarn(message);
                break;
            case LogType.Error:
                originalConsoleError(message);
                break;
        }
    }
}

export const logger = new Logger();