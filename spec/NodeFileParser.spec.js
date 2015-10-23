var NodeFileParser = require('../src/NodeFileParser');

describe('NodeFileParser', function() {

    it('should contain a "link" function', function() {
        expect(typeof NodeFileParser.link).toBe('function');
    });

    it('should contain a "parsers" array', function() {
        expect(NodeFileParser.parsers).toBeDefined();
        expect(NodeFileParser.parsers.length).toBeTruthy();
    });
});

describe('NodeFileParser.link', function() {

    var func = NodeFileParser.link;

    it('should return null for invalid input', function() {
        expect(func()).toBe(null);
        expect(func('')).toBe(null);
        expect(func(NaN)).toBe(null);
        expect(func(null)).toBe(null);
        expect(func(Infinity)).toBe(null);
    });

    it('should return the text parser if the file\'s extension is not supported', function() {
        expect(func('somefile').name).toBe('text');
        expect(func('somefile.txt').name).toBe('text');
        expect(func('somefile.some_extension').name).toBe('text');
    });

    it('should return "json" for .js and .json files', function() {
        expect(func('data.js').name).toBe('json');
        expect(func('data.json').name).toBe('json');
    });

    it('should return an ini parser for .ini files', function() {
        expect(func('.ini').name).toBe('ini');
        expect(func('data.ini').name).toBe('ini');
    });

    it('should return a json parser for .js and .json files', function() {
        expect(func('.js').name).toBe('json');
        expect(func('.json').name).toBe('json');
        expect(func('data.js').name).toBe('json');
        expect(func('data.json').name).toBe('json');
    });
});
