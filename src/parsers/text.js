module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    return Parser;
}());
