module.exports = {
    js: {
        lintNatives: true,
        name: '<%= pkg.name %> by <%= pkg.author.name %>',
        url: '<%= pkg.homepage %>',
        version: '<%= pkg.version %>',
        description: '<%= pkg.description %>',
        options: {
            nocode: true,
            paths: './src/',
            outdir: './build/documentation',
            themedir: './node_modules/yuidoc-theme-blue'
        }
    }
};
