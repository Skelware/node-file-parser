import Parser from '../wrappers/Parser';

class JsonParser extends Parser {

    static get DEFAULT_OPTIONS() {
        return {
            glob: {
                ignore: '**/!(*.json)'
            }
        };
    }

    constructor(src, options) {
        super(src, Object.assign({}, JsonParser.DEFAULT_OPTIONS, options));
    }

    static accepts(type) {
        return /^json$/i.test(type);
    }
}

export default JsonParser;
