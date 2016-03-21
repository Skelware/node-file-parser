/**
 * The main entry-point for the Node File Parser.
 */
class NodeFileParser {

    /**
     * Gets the default options that are currently in use.
     *
     * Note that the default options can be modified at runtime!
     *
     * @return {object} The current default options.
     */
    static getDefaultOptions() {
        return _userDefaultOptions;
    }

    /**
     * Sets new default options to be used.
     *
     * @param {object} [options] Leave empty to reset the default options to initial state.
     * @param {boolean} [merge=true] `false` to completely override the current options with the new options,
     * leave empty or `true` to preserve options that are not specified.
     * @return {object} The new (current) default options.
     */
    static setDefaultOptions(options = undefined, merge = true) {
        if (!options) {
            return _userDefaultOptions = _defaultOptions;
        } else if (merge) {
            return Object.assign(_userDefaultOptions, options);
        } else {
            return _userDefaultOptions = options;
        }
    }
}

const _defaultOptions = {};
let _userDefaultOptions = Object.create(_defaultOptions);

export default NodeFileParser;
