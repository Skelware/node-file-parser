/**
 * The text parser is a subclass of `FileParser` that does not modify the behaviour of `FileParser`.
 * All data read from the file is returned immediately without decoding and all data written to the file
 * is done without encoding the data.
 *
 * @class text
 * @module Parsers
 */
module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    /**
     * @method Parser
     * @constructor
     */
    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    return Parser;
}());
