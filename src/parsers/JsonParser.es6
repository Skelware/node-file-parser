import Parser from '../wrappers/Parser';

class JsonParser extends Parser {

    static accepts(type) {
        return /^json|js$/i.test(type);
    }
}

export default JsonParser;
