import Parser from '../wrappers/Parser';

class SrtParser extends Parser {

    static get DEFAULT_OPTIONS() {
        return {
            glob: {
                ignore: '**/!(*.srt)'
            }
        };
    }

    constructor(src, options) {
        super(src, Object.assign({}, SrtParser.DEFAULT_OPTIONS, options));
    }

    static accepts(type) {
        return /^srt$/i.test(type);
    }
}

export default SrtParser;
