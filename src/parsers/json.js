/**
 * @class json
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

    /**
     * Encodes any JavaScript object into a JSON string that can be written to a file.
     *
     * @method encode
     * @param [data] {Object} Any JavaScript object to be encoded.
     * @return {String} A valid JSON representation of the data.
     */
    Parser.prototype.encode = function(data) {
        return JSON.stringify(data);
    };

    /**
     * Decodes a JSON string to a JavaScript object.
     *
     * @method decode
     * @param [data] The JSON string to be decoded.
     * @returns {Object} An Object with the decoded data, or an empty object if something went wrong.
     */
    Parser.prototype.decode = function(data) {
        var result;
        try {
            var temp = JSON.parse(data);
            result = temp;
        } catch (exception) {
            result = {};
        }
        return result;
    };

    return Parser;
}());
