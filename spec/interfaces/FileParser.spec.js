var FileParser = require('../../src/interfaces/FileParser');

describe('FileParser', function() {

    var parser = new FileParser();

    it('should contain a "getFile" function', function() {
        expect(FileParser.getFile).toBe(undefined);
        expect(typeof parser.getFile).toBe('function');
    });

    it('should contain a "getContent" function', function() {
        expect(FileParser.getContent).toBe(undefined);
        expect(typeof parser.getContent).toBe('function');
    });

    it('should contain a "getRawContent" function', function() {
        expect(FileParser.getRawContent).toBe(undefined);
        expect(typeof parser.getRawContent).toBe('function');
    });

    it('should contain a "read" function', function() {
        expect(FileParser.read).toBe(undefined);
        expect(typeof parser.read).toBe('function');
    });

    it('should contain a "write" function', function() {
        expect(FileParser.write).toBe(undefined);
        expect(typeof parser.write).toBe('function');
    });

    it('should contain a "modify" function', function() {
        expect(FileParser.modify).toBe(undefined);
        expect(typeof parser.modify).toBe('function');
    });

    it('should contain a "encode" function', function() {
        expect(FileParser.encode).toBe(undefined);
        expect(typeof parser.encode).toBe('function');
    });

    it('should contain a "decode" function', function() {
        expect(FileParser.decode).toBe(undefined);
        expect(typeof parser.decode).toBe('function');
    });
});
