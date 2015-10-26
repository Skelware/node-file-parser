/**
 * @class ini
 * @module Parsers
 */
module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    var regex = {
        bad: /=|:/g,
        array: /\[\]/g,
        comment: /\s*;|#/g,
        section: /^\s*\[(.+)\]\s*$/g,
        keyValuePair: /\s*(.*)\s*(=|:)\s*(.*)(\s|;|#)*/g
    };

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
     * Encodes an ini object into an ini string that can be written to a file.
     *
     * @method encode
     * @param [data] {Object} An ini object formatted as explained in the class description.
     * @returns {string} A valid ini representation of the data.
     */
    Parser.prototype.encode = function(data) {
        var result = '';

        if (!data) {
            return result;
        }

        if (!data.section) {
            data.section = {};
        }

        if (!data.global) {
            data.global = {};
        }

        var globals = Object.keys(data.global);
        for (var i = 0; i < globals.length; i++) {
            var key = globals[i];
            var value = data.global[key];

            if (!Array.isArray(value)) {
                result += key + ' = ' + value + '\n';
            } else {
                /*
                 TODO: Create ESLint plugin
                 https://github.com/eslint/eslint/issues/3914
                 */
                for (var j = 0; j < value.length; j++) {
                    result += key + '[] = ' + value[j] + '\n';
                }
            }
        }

        var sections = Object.keys(data.section);
        for (var i = 0; i < sections.length; i++) {
            var name = sections[i];
            var section = data.section[name];
            var pairs = Object.keys(section);

            result += '[' + name + ']\n';

            for (var j = 0; j < pairs.length; j++) {
                var key = pairs[j];
                var value = section[key];

                if (!Array.isArray(section[key])) {
                    result += key + ' = ' + value + '\n';
                } else {
                    /*
                     TODO: Create ESLint plugin
                     https://github.com/eslint/eslint/issues/3914
                     */
                    for (var k = 0; k < section[key].length; k++) {
                        result += key + '[] = ' + value[k] + '\n';
                    }
                }
            }
        }

        return result;
    };

    /**
     * Decodes an ini string to an ini object.
     *
     * @method decode
     * @param [data] {String} A string of data to be decoded.
     * @returns {Object} A new object with two primary keys: `global` and `section`.
     */
    Parser.prototype.decode = function(data) {
        var lines = data.split('\n');

        var result = {
            global: {},
            section: {}
        };

        var section = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            if (_isComment(line) || _isNotValidIni(line)) {
                continue;
            }

            var newSection = _getNewSection(line);
            if (newSection) {
                section = newSection;
                result.section[section] = {};
                continue;
            }

            var pair = new RegExp(regex.keyValuePair).exec(line);
            if (pair) {
                var key = pair[1].trim();
                var value = pair[3].trim();
                var array = new RegExp(regex.array).test(key);

                if (array) {
                    key = key.replace(new RegExp(regex.array), '');
                }

                if (this._watcher) {
                    var feedback = this._watcher({
                        key: key,
                        value: value,
                        section: section
                    });
                    section = feedback.section;
                    key = feedback.key;
                    value = feedback.value;
                }

                if (section) {
                    addToSection(result, section, key, value, array);
                } else {
                    addToGlobal(result, key, value, array);
                }
            }
        }

        return result;
    };

    function addToSection(result, section, key, value, array) {
        var existing = result.section[section][key];

        if (existing && !!existing.push !== array) {
            if (!existing.push) {
                result.section[section][key] = [existing];
            }
            array = true;
            console.warn('Warning in "' + section + '": "' + key + '" is both defined as array and as single item!');
        }

        if (array) {
            if (existing) {
                result.section[section][key].push(value);
            } else {
                result.section[section][key] = [value];
            }
        } else {
            result.section[section][key] = value;
        }
    }

    function addToGlobal(result, key, value, array) {
        if (array) {
            if (result.global[key]) {
                result.global[key].push(value);
            } else {
                result.global[key] = [value];
            }
        } else {
            result.global[key] = value;
        }
    }

    /**
     * Checks whether a line is a comment or not.
     *
     * @method _isComment
     * @param [line] {String} The line to check.
     * @returns {Boolean}
     * @private
     */
    function _isComment(line) {
        return regex.comment.test(line || '');
    }

    /**
     * Checks whether a line indicates a new section or not.
     *
     * @method _getNewSection
     * @param [line] {String} The line to check.
     * @returns {String} The section name, if found.
     * @private
     */
    function _getNewSection(line) {
        var result = new RegExp(regex.section).exec(line || '');
        return result && result[1];
    }

    /**
     * Checks whether the line contains only valid ini syntax or not.
     *
     * @method _isNotValidIni
     * @param [line] {String} The line to check.
     * @returns {Boolean}
     * @private
     */
    function _isNotValidIni(line) {
        var check = (line || '').match(regex.bad);
        return !!(check && check.length > 1);
    }

    return Parser;
}());
