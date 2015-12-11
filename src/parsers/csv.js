/**
 * @class csv
 * @module Parsers
 */
module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    /**
     * @method Parser
     * @param [options] {Object}
     * @param [options.delimiter=','] {String} A delimiter to separate the fields in a record.
     * @constructor
     */
    function Parser(file, options) {
        FileParser.apply(this, arguments);

        if (options && options.delimiter) {
            this._delimiter = options.delimiter;
        }
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.prototype._delimiter = ',';
    Parser.constructor = Parser;

    Parser.prototype.decode = function(data) {
        var lines = data.split('\n');
        var result = [];

        var length = null;
        lines.forEach(function(line) {
            if (!line) {
                return;
            }

            var values = line.split(this._delimiter);

            if (values.length <= 1) {
                return;
            } else if (!length) {
                length = values.length;
            } else if (length !== values.length) {
                return;
            }

            result.push(values);
        }.bind(this));

        return result;
    };

    return Parser;
}());
