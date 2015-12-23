module.exports = {
    js: {
        name: '<%= pkg.name %>',
        version: '<%= pkg.version %>',
        description: '<%= pkg.description %>',
        url: '<%= pkg.homepage %>',
        lintNatives: true,
        options: {
            nocode: true,
            paths: './src/',
            outdir: './build/documentation'
        }
    }
};
