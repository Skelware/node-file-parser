var NodeFileParser = require('../../src/NodeFileParser');

describe('INI Parser', function() {

    var parser_a = NodeFileParser.link('data/lorem.ini');
    var parser_b = NodeFileParser.link('data/lorem.ini');

    it('should be instanced at all times', function() {
        expect(parser_a).not.toBe(parser_b);
    });

    it('should be able to read an INI file', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a).toBeDefined();
    });

    it('should read global parameters from INI file', function(){
        var debug = parser_a.read().getContent().global.debug;
        expect(debug).toEqual('true');
    });

    it('should support normal parameters (not array) in INI file', function(){
        var content_a = parser_a.read().getContent();
        expect(content_a.section.fourth_section.notarray).toEqual('file6');
    });

    it('should be able to save an INI file', function() {
        var content_a = parser_a.read().getContent();
        var content_b = parser_b.read().write().read().getContent();
        expect(content_a).toEqual(content_b);

        content_b.section['new section'] = {
            files: ['foo', 'bar'],
            and: 'more'
        };

        parser_b.setContent(content_b).write().read();
        expect(content_a).toEqual(parser_a.getContent());
        expect(content_a).not.toEqual(parser_b.getContent());

        parser_a.write().read();
        expect(content_a).toEqual(parser_a.getContent());
    });
});
