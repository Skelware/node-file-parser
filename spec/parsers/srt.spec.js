var NodeFileParser = require('../../src/NodeFileParser');

describe('SRT Parser', function() {

    var parser_a = NodeFileParser.link('data/valid/lorem.srt');
    var parser_b = NodeFileParser.link('data/valid/lorem.srt');
    var parser_c = NodeFileParser.link('data/invalid/lorem.srt');

    it('should be instanced at all times', function() {
        expect(parser_a).not.toBe(parser_b);
    });

    it('should be able to read a SRT file', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a).toBeDefined();
    });

    it('should be able to correctly count any amount of lines', function() {
        var content_a = parser_a.read().getContent();
        expect(Object.keys(content_a).length).toEqual(17);
        for (var i = 1312; i < 1329; i++) {
            expect(content_a[i]).toBeDefined();
        }
    });

    it('should be able to retrieve the starting and ending times of a given line', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a['1312'].start).toEqual('02:26:17,500');
        expect(content_a['1312'].end).toEqual('02:26:22,200');
    });

    it('should be able to retrieve the coordinates of a given line', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a['1312'].coordinates).toEqual('X1:69 X2:666 Y1:69 Y2:666');
        expect(content_a['1313'].coordinates).toBeUndefined();
    });

    it('should be able to retrieve the content of a given line', function() {
        var content_a = parser_a.read().getContent();
        expect(content_a['1312'].content).toEqual('I am a servant of the secret fire,\r\nwielder of the flame of Anor.\r\n\r\n');
        expect(content_a['1313'].content).toEqual('The dark fire will not avail you, flame of Udûn!\r\n\r\n');
    });

    it('should be able to save a SRT file', function() {
        var content_a = parser_a.read().getContent();
        var content_b = parser_b.read().write().read().getContent();
        expect(content_a['1312'].start).toEqual(content_b['1312'].start);
        expect(content_a['1312'].end).toEqual(content_b['1312'].end);
        expect(content_a['1312'].coordinates).toEqual(content_b['1312'].coordinates);
        expect(content_a['1312'].content).toEqual(content_b['1312'].content);
    });

    it('should be able to modify the content of a given line', function() {
        var content_a = parser_a.read().getContent();
        var content_b = parser_b.read().getContent();
        content_b['1312'].content = content_b['1312'].content.toUpperCase();
        content_b = parser_b.setContent(content_b).write().read().getContent();
        expect(content_a).not.toEqual(content_b);
        expect(content_b['1312'].content).toEqual(content_a['1312'].content.toUpperCase());
        parser_a.write();
        content_b = parser_b.read().getContent();
        expect(content_a).toEqual(content_b);
    });

    it('should not crash when the user provides invalid data', function() {
        var content_a = parser_a.read().getContent();
        parser_a.setContent(null);
        expect(parser_a.write.bind(parser_a)).not.toThrow();

        parser_a.setContent(content_a).write();
        expect(parser_a.read().getContent()).toEqual(content_a);
    });

    it('should be able to handle a broken or invalid SRT file', function() {
        var content_b = parser_b.read().getContent();
        var content_c = parser_c.read().getContent();
        expect(content_b['1312']).toEqual(content_c['1312']);
    });
});
