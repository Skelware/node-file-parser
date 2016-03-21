import Parser from '../wrappers/Parser';

class SrtParser extends Parser {

    static accepts(type) {
        return /^srt$/i.test(type);
    }
}

export default SrtParser;
