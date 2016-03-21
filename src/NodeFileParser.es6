/**
 * The main entry-point for the Node File Parser.
 */
class NodeFileParser {

    /**
     * The standard configuration used by default for all parsers.
     * @type {Object}
     * @property {boolean} verbose=true Enable verbose logging to debug.
     */
    static get STANDARD_CONFIGURATION() {
        return {
            verbose: false
        };
    }

    /**
     * Gets the configuration that are currently in use.
     *
     * @return {object} The current configuration.
     */
    static getConfiguration() {
        return _configuration;
    }

    /**
     * Sets a new configuration to be used, or modifies the existing configuration.
     *
     * @param {object} [configuration] Leave empty to reset the configuration to initial state.
     * @param {boolean} [merge=true] `false` to completely override the current configuration with the new configuration,
     * leave empty or `true` to preserve attributes that are not specified.
     * @return {object} The modified configuration.
     */
    static setConfiguration(configuration = undefined, merge = true) {
        if (!configuration) {
            return _configuration = NodeFileParser.STANDARD_CONFIGURATION;
        } else if (merge) {
            return Object.assign(_configuration, configuration);
        } else {
            return _configuration = configuration;
        }
    }

    /**
     * Validate a file against conventional rules.
     *
     * @param {string} file The location of the file to validate.
     * @param {object} [options] A set of options to override the default rules.
     * @return {object} The results of the validation.
     */
    static validate(file, options) {
        return {};
    }
}

//Assure we create a copy of the values, instead of the references.
let _configuration = Object.create(NodeFileParser.STANDARD_CONFIGURATION);

export default NodeFileParser;
