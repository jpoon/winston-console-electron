import { LEVEL, MESSAGE } from "triple-beam";
import * as TransportStream from "winston-transport";

export interface ConsoleForElectronOptions extends TransportStream.TransportStreamOptions {
  stderrLevels: string[]
}

export class ConsoleForElectron extends TransportStream {
  private name = 'console-for-electron';
  private stderrLevels : Set<string> | {};

  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options?: ConsoleForElectronOptions) {
    super(options);
    this.stderrLevels = this._stringArrayToSet(options.stderrLevels);
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   */
  public log(info: object, callback: Function) {
    if (this.stderrLevels[info[LEVEL]]) {
      // console.error adds a newline
      console.error(info[MESSAGE]);

      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    }

    // console.log adds a newline.
    console.log(info[MESSAGE]);

    if (callback) {
      callback(); // eslint-disable-line callback-return
    }
  }

  /**
   * Returns a Set-like object with strArray's elements as keys (each with the
   * value true).
   * @param {Array} strArray - Array of Set-elements as strings.
   * @returns {Set<string>} - Set of keys
   */
  _stringArrayToSet(strArray: Array<string>) : Set<string> | {} {
    if (!strArray) {
      return {};
    }

    if (!Array.isArray(strArray)) {
      throw new Error('Cannot make set from type other than Array of string elements');
    }

    return strArray.reduce((set, el) =>  {
      if (typeof el !== 'string') {
        throw new Error('Cannot make set from type other than Array of string elements');
      }
      set[el] = true;

      return set;
    }, {});
}
}
