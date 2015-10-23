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

    it('should be able to retrieve the current file url', function() {
        var parser = new FileParser('./data/lorem.txt');
        expect(parser.getFile()).toBe('./data/lorem.txt');
    });

    it('should be able to read a file synchronously', function() {
        var parser = new FileParser('./data/lorem.txt');
        expect(parser.read()).toBe(parser);
    });

    it('should be able to read a file asynchronously', function(done) {
        var parser = new FileParser('./data/lorem.txt');

        expect(parser.read(function(data) {
            expect(data).toBeDefined();
            done();
        })).toBe(parser);
    });

    it('should be able to reject a file asynchronously', function(done) {
        var parser = new FileParser('./data/lorem.txt');

        expect(parser.read(function(data) {
            setTimeout(function() {
                expect(parser.getContent()).toBe(undefined);
                done();
            }, 1);
            return false;
        })).toBe(parser);
    });

    it('should be able to get the raw content of a file', function() {
        var parser = new FileParser('./data/lorem.txt');
        var content = parser.read().getRawContent();
        expect(typeof content).toBe('string');
    });

    it('should be able to get the processed content of a file', function() {
        var parser = new FileParser('./data/lorem.txt');
        var content = parser.read().getContent();
        expect(typeof content).toBe('string');
    });

    it('should be able to modify the read content while reading it from a file synchronously', function() {
        var parser = new FileParser('./data/lorem.txt');
        var content = parser.modify(function(data) {
            return 'sync modified content';
        }).read().getContent();
        expect(content).toBe('sync modified content');
    });

    it('should be able to modify the read content while reading it from a file asynchronously', function(done) {
        var parser = new FileParser('./data/lorem.txt');
        var content = parser.modify(function(data) {
            return 'async modified content';
        }).read(function(data) {
            expect(data).toBe('async modified content');
            done();
        });
    });
});
