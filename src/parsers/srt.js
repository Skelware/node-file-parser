/**
 * The srt parser is a subclass of `FileParser` that is able to read .srt files,
 * provided they adhere to the following conditions:
 *
 * Each subtitle starts with a unique number that is greater than zero;
 * After each number, on a new line, two timestamps will be included in standard format;
 * The two timestamps will be separated by means of an arrow with any amount of whitespace;
 * The timestamps may or may not be followed by coordinates on the same line;
 * Coordinates, if present, will be in standard format, with any amount of whitespace;
 * After the timestamps, on a new line, content may or may not be added;
 * Any subsequent lines that are not a number will be treated as content.
 *
 * @class srt
 * @module Parsers
 */
module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    var regex = {
        number: /^\s*(\d+)\s*$/g,
        times: /(\d+:\d{2}:\d{2},\d{3})/g,
        coordinates: /X1:\d+\s+X2:\d+\s*Y1:\d+\s*Y2:\d+/g
    };

    var arrow = ' --> ';
    var line_separator = '\r\n';

    /**
     * @method Parser
     * @constructor
     */
    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    Parser.prototype.encode = function(data) {
        var result = '';

        Object.keys(data || {}).forEach(function(number) {
            var sub = data[number];

            result += number + line_separator;
            result += sub.start + arrow + sub.end;

            if (sub.coordinates) {
                result += ' ' + sub.coordinates;
            }

            result += line_separator + sub.content;
        });

        return result;
    };

    Parser.prototype.decode = function(data) {
        var lines = data.split('\n');
        var result = {};

        var times;
        var number;
        var coordinates;
        var content = '';

        function store() {
            number && times && content && (result[number] = {
                start: times && times[0],
                end: times && times[1],
                coordinates: coordinates,
                content: content
            });

            return reset();
        }

        function reset() {
            content = '';
            times = undefined;
            number = undefined;
            coordinates = undefined;
        }

        lines.forEach(function(line) {
            var _number = new RegExp(regex.number).exec(line);

            if (_number) {
                if (number) {
                    store();
                }
                number = _number[1];
                return;
            } else if (!number) {
                return;
            }

            var _coordinates = line.match(regex.coordinates);
            if (_coordinates && !coordinates) {
                coordinates = _coordinates[0];
            }

            var _times = line.match(regex.times);
            if (_times && !times) {
                times = _times;
                return;
            }

            if (line.length) {
                content += line + '\n';
            }
        });

        store();

        return result;
    };

    return Parser;
}());
