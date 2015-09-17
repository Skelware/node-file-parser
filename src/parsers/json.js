module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    Parser.prototype.encode = function(data) {
        return JSON.stringify(data);
    };

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
