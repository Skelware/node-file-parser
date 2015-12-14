var NodeFileParser = require('../../src/NodeFileParser');

describe('CSV Parser', function() {

    var parser_a = NodeFileParser.link('data/valid/lorem.csv');
    var parser_b = NodeFileParser.link('data/valid/lorem.csv');
    var parser_c = NodeFileParser.link('data/valid/lorem.csv', {
        delimiter: ','
    });
    var parser_d = NodeFileParser.link('data/invalid/lorem.csv');

    it('should be instanced at all times', function() {
        expect(parser_a).not.toBe(parser_b);
    });

    it('should use a comma as default delimiter', function() {
        expect(parser_a._delimiter).toEqual(parser_c._delimiter);
    });

    it('should be able to read a CSV file', function() {
        var content_a = parser_a.modify(function(data) {
            return data;
        }).read().getContent();
        expect(content_a && content_a.splice).toBeDefined();
    });

    it('should discard invalid records silently', function() {
        expect(function() {
            parser_d.read().getContent();
        }).not.toThrow();
    });
});
