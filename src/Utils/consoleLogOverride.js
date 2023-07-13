import { logger } from "./Logger";

export const originalConsoleLog = console.log;
export const originalConsoleWarn = console.warn;
export const originalConsoleError = console.error;

console.log = (...args) => {
    logger.log(...args);
    originalConsoleLog.apply(console, args);
};

console.warn = (...args) => {
    logger.warn(...args);
    originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
    logger.error(...args);
    originalConsoleError.apply(console, args);
};

