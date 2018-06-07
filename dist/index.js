"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const triple_beam_1 = require("triple-beam");
const TransportStream = require("winston-transport");
class ConsoleForElectron extends TransportStream {
    /**
     * Constructor function for the ConsoleForElectron transport object responsible for
     * persisting log messages and metadata to a terminal.
     * @param {ConsoleForElectronOptions} options - Options for this instance.
     */
    constructor(options) {
        super(options);
        this.stderrLevels = this._getStderrLevels(options);
    }
    /**
     * Core logging method exposed to Winston.
     * @param {Object} info
     * @param {Function} callback
     */
    log(info, callback) {
        if (this.stderrLevels[info[triple_beam_1.LEVEL]]) {
            console.error(info[triple_beam_1.MESSAGE]);
        }
        else {
            console.log(info[triple_beam_1.MESSAGE]);
        }
        if (callback) {
            callback();
        }
    }
    /**
     * Convert stderrLevels into an Object for faster key-lookup times than an
     * Array. stderrLevels defaults to ['error', 'debug']
     * @param {ConsoleForElectronOptions} options - Options for this instance.
     * @returns {string[]} - Set of stdErr levels
     */
    _getStderrLevels(options) {
        if (options === undefined || options.level === undefined) {
            return ['error', 'debug'];
        }
        else if (!(Array.isArray(options.level))) {
            throw new Error('Cannot set stderrLevels to type other than Array');
        }
        return this._stringArrayToSet(options.level);
    }
    /**
     * Returns a Set-like object with strArray's elements as keys (each with the
     * value true).
     * @param {Array} strArray - Array of Set-elements as strings.
     * @returns {Set<string>} - Set of keys
     */
    _stringArrayToSet(strArray) {
        if (!strArray) {
            return [];
        }
        if (!Array.isArray(strArray)) {
            throw new Error('Cannot make set from type other than Array of string elements');
        }
        return strArray.reduce((set, el) => {
            if (typeof el !== 'string') {
                throw new Error('Cannot make set from type other than Array of string elements');
            }
            set[el] = true;
            return set;
        }, []);
    }
}
exports.ConsoleForElectron = ConsoleForElectron;
//# sourceMappingURL=index.js.map