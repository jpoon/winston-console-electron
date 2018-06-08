import * as TransportStream from "winston-transport";
export interface ConsoleForElectronOptions extends TransportStream.TransportStreamOptions {
    stderrLevels: string[];
}
export declare class ConsoleForElectron extends TransportStream {
    private stderrLevels;
    /**
     * Constructor function for the ConsoleForElectron transport object responsible for
     * persisting log messages and metadata to a terminal.
     * @param {ConsoleForElectronOptions} options - Options for this instance.
     */
    constructor(options?: ConsoleForElectronOptions);
    /**
     * Core logging method exposed to Winston.
     * @param {Object} info
     * @param {Function} callback
     */
    log(info: object, callback: Function): void;
    /**
     * Convert stderrLevels into a Set
     * stderrLevels defaults to ['error']
     * @param {ConsoleForElectronOptions} options - Options for this instance.
     * @returns {string[]} - Set of stdErr levels
     */
    private _getStderrLevels;
    /**
     * Returns a Set-like object with strArray's elements as keys (each with the
     * value true).
     * @param {Array} strArray - Array of Set-elements as strings.
     * @returns {Set<string>} - Set of keys
     */
    private _stringArrayToSet;
}
