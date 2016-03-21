class NodeFileParser {

    static getDefaultOptions() {
        return _userDefaultOptions;
    }

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
