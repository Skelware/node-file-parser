module.exports = (function() {

    var parsers = [
        {
            name: 'ini',
            pattern: /\.ini$/i,
            handler: require('./parsers/ini')
        },
        {
            name: 'json',
            pattern: /\.(json)|(js)$/i,
            handler: require('./parsers/json')
        },
        {
            name: 'text',
            pattern: /.*/i,
            handler: require('./parsers/text')
        }
    ];

    function link(file) {
        if (file == null || file.length === 0 || typeof file !== 'string') {
            return null;
        }

        for (var i = 0; i < parsers.length; i++) {
            var parser = parsers[i];
            if (parser.pattern.test(file)) {
                var handler = new parser.handler(file);
                handler.name = parser.name;
                return handler;
            }
        }
    }

    return {
        link: link
    }
}());
