module.exports = {
    src: ['src/**/*.js'],
    options: {
        match: '.',
        extensions: 'js',
        specNameMatcher: 'spec',
        matchAll: false,
        isVerbose: true,
        forceExit: true,
        showColors: true,
        includeStackTrace: true,
        captureExceptions: true,
        specFolders: ['spec'],

        junitreport: {
            report: false,
            consolidate: true,
            useDotNotation: true,
            savePath: './build/reports/jasmine/'
        },

        coverage: {
            relativize: true,
            print: 'both', // none, summary, detail, both
            reportDir: 'coverage',
            reportFile: 'coverage.json',
            excludes: [],
            report: ['lcov'],
            collect: ['*coverage.json'],
            thresholds: {
                statements: 0,
                branches: 0,
                lines: 0,
                functions: 0
            }
        }
    }
};
