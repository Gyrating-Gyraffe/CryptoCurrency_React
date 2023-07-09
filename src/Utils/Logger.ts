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
 * components/classes/areas of code, regardless of when the entry was made. 
 * 
 * How it works:
 * 1. When constructed (On page refresh -- Singleton) the class sets an interval for a grouping function.
 * 2. Logs normally to the console and stores the console message/group info in local variables.
 * 3. When the interval ticks, the console is cleared and all stored message/group pairs are printed to the console
 *      under their respective groups.
 */
class Logger {
    constructor(private logArray: GroupedLog[] = [],
        private keySet: Set<string> = new Set<string>()) {
        setInterval(() => this.groupLogs(), 10000);
    }

    /** Logs a regular log message on the console.
     * @param message The message to be displayed in the console.
     * @param group Optional: Group these logs by a group name.
     */
    public log(message: string | object, group?: string): void {
        this.push(message, LogType.Log, group);
    }
    public warn(message: string, group?: string): void {
        this.push(message, LogType.Warn, group);
    }
    public error(message: string, group?: string): void {
        this.push(message, LogType.Error, group);
    }

    // Pushes a grouped message into the log array, and adds the group name to the keySet if not already there
    private push(message: string | object, logType: LogType, group?: string): void {
        message = JSON.stringify(message);
        const currentGroup = group ? group : "Undefined Log Group";
        const log: GroupedLog = {
            [currentGroup]: message,
            logType
        };
        this.logArray.push(log);
        this.keySet.add(currentGroup);
        this.consoleLog(message, logType);
    }

    // Groups all the logs currenty stored in the singleton. Does this by clearing the console and then relogging all the messages
    // This effectively "refreshes" the console. The end result is a categorized list of logs. **Pauses when viewing the console
    // Only runs the refresh if the website's document is in focus.
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
        console.log("."); console.log("."); console.log("."); // Separates the groups with the new ungrouped log entries
    }

    // Logs new entries that haven't been grouped yet
    private consoleLog(message: string, logType: LogType): void {
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