module.exports = function (config) {

    var node_modules = "node_modules/";
    var dist = "dist/";
    var src = "src/";

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        'SL_IE_10': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '10',
            platform: 'Windows 7'
        },
        'SL_FireFox_Win_7': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 49,
            platform: 'Windows 7'
        },
        'SL_FireFox_Win_8': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 49,
            platform: 'Windows 8'
        },
        'SL_FireFox_Win_8_1': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 49,
            platform: 'Windows 8.1'
        },
        'SL_FireFox_Win_10': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 49,
            platform: 'Windows 10'
        },
        'SL_FireFox_Mac': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 49,
            platform: 'OS X 10.11'
        },
        'SL_FireFox_Linux': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 45,
            platform: 'Linux'
        }
    };

    var configuration = {
        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            // Polyfills for older browsers
            'node_modules/core-js/client/shim.min.js',
            'node_modules/web-animations-js/web-animations.min.js',

            // System.js for module loading
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',

            // Reflect and Zone.js
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // RxJs.
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false},

            // Angular 2 itself and the testing library
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

            {pattern: 'build/karma-test-shim.js', included: true, watched: false},

            // Clarity's bundles
            {pattern: dist + 'bundles/clarity-ui.min.css', included: true, watched: true},
            {pattern: dist + 'bundles/clarity-angular.min.js', included: true, watched: true},

            // Test files
            {pattern: dist + 'tests/**/*.js', included: false, watched: true},

            // Paths to support debugging with source maps in dev tools
            {pattern: src + '**/*.ts', included: false, watched: true},
            {pattern: dist + '**/*.js.map', included: false, watched: true},

            //PrismJS
            {pattern: 'node_modules/prismjs/themes/prism.css', included: true, watched: false},
            {pattern: 'node_modules/prismjs/prism.js', included: true, watched: false},
            {pattern: 'node_modules/prismjs/components/prism-typescript.min.js', included: true, watched: false}
        ],

        exclude: [],
        preprocessors: {},
        reporters: ['mocha'],

        // HtmlReporter configuration
        htmlReporter: {
            // Open this file to see results in browser
            outputFile: '_test-output/tests.html',

            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: __dirname
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        browserNoActivityTimeout: 100000,
        captureTimeout: 120000,

        // Sauce Labs configurations
        customLaunchers: customLaunchers,

        sauceLabs: {
            testName: 'Clarity Unit Tests',
            public: "public",
            build: process.env.TRAVIS_JOB_NUMBER,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY,
            startConnect: false
        }
    }

    // Only enable Sauce Labs for Travis CI
    if(process.env.TRAVIS) {
        configuration.browsers = Object.keys(customLaunchers);
        configuration.reporters = ['mocha', 'saucelabs'];
    }

    config.set(configuration);
}
