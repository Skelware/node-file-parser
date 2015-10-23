var NodeFileParser = require('../../src/NodeFileParser');

describe('JSON Parser', function() {

    var parser_a = NodeFileParser.link('data/lorem.json');
    var parser_b = NodeFileParser.link('data/lorem.json');
    var parser_c = NodeFileParser.link('data/lorem.ini', 'json');

    it('should be instanced at all times', function() {
        expect(parser_a).not.toBe(parser_b);
    });

    it('should be able to read a JSON file', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a).toBeDefined();
    });

    it('should be able to save a JSON file', function() {
        var content_a = parser_a.read().getContent();
        var content_b = parser_b.read().write().read().getContent();
        expect(content_a).toEqual(content_b);

        content_b['added/value'] = 'a good test';
        parser_b.setContent(content_b).write().read();
        expect(content_a).toEqual(parser_a.getContent());
        expect(content_a).not.toEqual(parser_b.getContent());

        parser_a.write().read();
        expect(content_a).toEqual(parser_a.getContent());
    });

    it('should be able to handle a broken or invalid JSON file', function() {
        var content_c = parser_c.read().getContent();
        expect(content_c).toEqual({});
    });
});
