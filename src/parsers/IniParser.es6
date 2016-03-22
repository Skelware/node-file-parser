import Parser from '../wrappers/Parser';

class IniParser extends Parser {

    static get DEFAULT_OPTIONS() {
        return {
            glob: {
                ignore: '**/!(*.ini)'
            }
        };
    }

    constructor(src, options) {
        super(src, Object.assign({}, IniParser.DEFAULT_OPTIONS, options));
    }

    static accepts(type) {
        return /^ini$/i.test(type);
    }
}

export default IniParser;
