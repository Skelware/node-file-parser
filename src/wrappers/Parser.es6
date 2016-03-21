/**
 * @abstract
 */
class Parser {

    static accepts(type) {
        _reject('accepts');
    }
}

function _reject(name) {
    throw new SyntaxError(`Abstract function Parser#${name} must be overridden!`);
}

export default Parser;
