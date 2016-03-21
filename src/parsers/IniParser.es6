import Parser from '../wrappers/Parser';

class IniParser extends Parser {

    static accepts(type) {
        return /^ini$/i.test(type);
    }
}

export default IniParser;
