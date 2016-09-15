var NodeFileParser = require('../../src/NodeFileParser');

describe('INI Parser', function() {

    var parser_a = NodeFileParser.link('data/valid/lorem.ini');
    var parser_b = NodeFileParser.link('data/valid/lorem.ini');
    var parser_c = NodeFileParser.link('data/invalid/lorem.ini');
    var parser_d = NodeFileParser.link('data/valid/lorem2.ini');

    it('should be instanced at all times', function() {
        expect(parser_a).not.toBe(parser_b);
    });

    it('should be able to read an INI file', function() {
        var content_a = parser_a.modify(function(data) {
            return data;
        }).read().getContent();
        expect(content_a).toBeDefined();
    });

    it('should parse global parameters from an INI file', function() {
        var debug = parser_a.read().getContent().global.debug;
        expect(debug).toEqual('true');
    });

    it('should parse normal parameters from an INI file', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a.section.fourth_section).toBeDefined();
        expect(content_a.section.fourth_section.notarray).toEqual('file6');
    });

    it('should parse array parameters from an INI file', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a.section['second section']).toBeDefined();
        expect(typeof content_a.section['second section'].another).toEqual('string');
        expect(typeof content_a.section['second section'].files).toEqual('object');
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

    it('should be able to handle delimiters in the value', function() {
        var content_d = parser_d.read().getContent();
        expect(content_d.section['second section'].files).toEqual([
            'file1', 'fi=le2', 'file3'
        ]);
    });

    it('should be able to handle a broken or invalid INI file', function() {
        var content_b = parser_b.read().getContent();
        var content_c = parser_c.read().getContent();
        expect(content_b).toEqual(content_c);

        parser_b.setContent(false);
        expect(parser_b.write.bind(parser_b)).not.toThrow();

        parser_b.setContent({
            foo: 'bar'
        });
        expect(parser_b.write.bind(parser_b)).not.toThrow();

        parser_b.setContent(content_b).write();
    });
});
