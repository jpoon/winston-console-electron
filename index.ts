import { LEVEL, MESSAGE } from "triple-beam";
import TransportStream from "winston-transport";

export interface ConsoleForElectronOptions extends TransportStream.TransportStreamOptions {
  prefix?: string
  stderrLevels?: string[],
}

export class ConsoleForElectron extends TransportStream {
  private readonly prefix?: string;
  private readonly stderrLevels: Set<string>;

  /**
   * Constructor function for the ConsoleForElectron transport object responsible for
   * persisting log messages and metadata to a terminal.
   * @param {ConsoleForElectronOptions} options - Options for this instance.
   */
  constructor(options?: ConsoleForElectronOptions) {
    super(options);
    this.prefix = options.prefix;
    this.stderrLevels = this._getStderrLevels(options.stderrLevels);
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info
   * @param {Function} callback
   */
  public log(info: object, callback: Function) {
    let message = info[MESSAGE];
    if (this.prefix) {
      message = this.prefix + ': ' + message;
    }

    if (this.stderrLevels.has(info[LEVEL])) {
      console.error(message);
    } else {
      console.log(message);
    }

    if (callback) {
      callback();
    }
  }

  /**
   * Convert stderrLevels into a Set
   * stderrLevels defaults to ['error']
   * @param {ConsoleForElectronOptions} options - Options for this instance.
   * @returns {string[]} - Set of stdErr levels
   */
  private _getStderrLevels(stdErrLevels?: string[]): Set<string> {
    if (stdErrLevels === undefined) {
      return new Set(['error'])
    }

    if (!(Array.isArray(stdErrLevels))) {
      throw new Error('Cannot set stderrLevels to type other than Array');
    }

    return this._stringArrayToSet(stdErrLevels);
  }

  /**
   * Returns a Set-like object with strArray's elements as keys (each with the
   * value true).
   * @param {Array} strArray - Array of Set-elements as strings.
   * @returns {Set<string>} - Set of keys
   */
  private _stringArrayToSet(strArray: Array<string>): Set<string> {
    if (!strArray) {
      return new Set();
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
    }, new Set() as Set<string>);
  }
}
