/**
 * @class csv
 * @module Parsers
 */
module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    /**
     * @method Parser
     * @constructor
     */
    function Parser(file, options) {
        FileParser.apply(this, arguments);

        if (options && options.separator) {
            this._separator = options.separator;
        }
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.prototype._separator = ',';
    Parser.constructor = Parser;

    Parser.prototype.decode = function(data) {
        var lines = data.split('\n');
        var result = [];

        var length = null;
        lines.forEach(function(line) {
            if (!line) {
                return;
            }

            var values = line.split(this._separator);

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
