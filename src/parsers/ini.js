module.exports = (function() {

    var FileParser = require('../interfaces/FileParser');

    var regex = {
        array: /\[\]/g,
        comment: /\s*;|#/g,
        section: /^\s*\[(.+)\]\s*$/g,
        keyValuePair: /\s*(.*)\s*(=|:)\s*(.*)(\s|;|#)*/g
    };

    function Parser() {
        FileParser.apply(this, arguments);
    }

    Parser.prototype = Object.create(FileParser.prototype);
    Parser.constructor = Parser;

    Parser.prototype.encode = function(data) {
        var result = '';

        if (!data) {
            return '';
        } else if (!data.global && data.section) {
            data = {section: data};
        } else if (!data.section) {
            data.section = {};
        } else if (!data.global) {
            data.global = {};
        }

        var globals = Object.keys(data.global);
        for (var i = 0; i < globals.length; i++) {
            var key = globals[i];
            var value = data.global[key];

            result += key + ' = ' + value + '\n';
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
                } else for (var k = 0; k < section[key].length; k++) {
                    result += key + '[] = ' + value[k] + '\n';
                }
            }
        }

        return result;
    };

    Parser.prototype.decode = function(data) {
        var lines = data.split('\n');

        var result = {
            global: {},
            section: {}
        };

        var section = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            if (!line || new RegExp(regex.comment).test(line)) {
                continue;
            }

            var newSection = new RegExp(regex.section).exec(line);
            if (newSection) {
                section = newSection[1];
                result['section'][newSection[1]] = {};
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
                    var feedback = this._watcher({section: section, key: key, value: value});
                    section = feedback.section;
                    key = feedback.key;
                    value = feedback.value;
                }

                if (section) {
                    if (array) {
                        if (result.section[section][key]) {
                            result.section[section][key].push(value);
                        } else {
                            result.section[section][key] = [value];
                        }
                    } else {
                        result.section[section][key] = value;
                    }
                } else if (array) {
                    if (result.global[key]) {
                        result.global[key].push(value);
                    } else {
                        result.global[key] = [value];
                    }
                } else {
                    result.global[key] = value;
                }
            }
        }

        return result;
    };

    return Parser;
}());
