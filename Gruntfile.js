/*global module, global*/
module.exports = function (grunt) {

    grunt.initConfig({
        /**
         * Clean
         *
         * Before generating any new files, remove any previously-created output files.
         */
        clean: {
            build: ["build"]
        },

        /**
         * JSHint
         *
         * Validate the source code files to ensure they follow our coding convention and
         * don"t contain any common errors.
         */
        jshint: {
            all: [
                "Gruntfile.js",
                "www/**/*.js",
                "!www/ext-4.1.1a/**/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        /**
         * Sencha Dependencies
         *
         * Calculate the list of files the app depends on and sort them in the order
         * in which they need to be concatenated
         */
        sencha_dependencies: {
            build: {
                options : {
                    appFile: "app/app.js",
                    pageRoot: "./www",
                    pageToProcess: "index.html"
                }
            }
        },

        /**
         * Uglify.js
         *
         * Concatenates & minifies the source code files. In addition we create a source map
         * so that in Chrome & FF we can debug with the source files in production.
         * Write the output file to our "build/www" directory
         */
        uglify: {
            build: {
                options: {
                    sourceMap: "build/www/source-map.map",
                    sourceMappingURL: "./source-map.map",
                    sourceMapRoot: ".."
                },
                files: {
                    "build/www/app.min.js": ["<%= sencha_dependencies_build %>"]
                }
            }
        },

        /**
         * Copy
         *
         * Any additional files our project still needs to run with in to the "build/www" directory
         * This includes CSS, images, mock data and our index.html
         * Note that we also do some replacement on the index.html to point it to our new
         * concat"d/minified JS file.
         */
        copy: {
            build: {
                files: [
                    {expand: true, src: ["ext-4.1.1a/resources/css/ext-all.css"], dest: "build/www", cwd: "www"},
                    {expand: true, src: ["ext-4.1.1a/resources/themes/images/**"], dest: "build/www", cwd: "www"},
                    {expand: true, src: ["data/**"], dest: "build/www", cwd: "www"},
                    {expand: true, src: ["index.html"], dest: "build/www", cwd: "www"}
                ],
                options: {
                    processContentExclude: ["**/*.{gif,jpg,png}"],
                    processContent: function (content, filePath) {
                        if (/index.html/.test(filePath)) {
                            // remove the ext script
                            content = content.replace(/<script.*ext.js"><\/script>/, "");
                            // now update the css location
                            content = content.replace(/\.\.\/libs\/ext-4.1.1a\//, "");
                            return content.replace(/app\/app.js/, "app.min.js");
                        }
                        return content;
                    }
                }
            }
        },

        /**
         * Sencha Jasmine
         *
         * Setups Jasmine and runs them using PhantomJS headlessly.
         */
        sencha_jasmine: {
            options: {
                specs: ["tests/specs/**/*.js"],
                extFramework: "www/ext-4.1.1a",
                extLoaderPaths   : {
                    "Pandora" : "www/app"
                }
            },
            // app configuration is for when we want to test without code coverage
            app: {},
            // coverage configuration is for when you want code coverage on your files
            coverage: {
                options: {
                    extLoaderPaths: {
                        "Pandora": "build/output/coverage/www/app"
                    }
                }
            }
        },

        /**
         * Istanbul Code Coverage Instrumentation
         *
         * This task instruments the JavaScript source files with Istanbul's code coverage tool
         */
        instrument: {
            files : "www/app/**/*.js",
            options : {
                basePath : "build/output/coverage"
            }
        },

        /**
         * Istanbul Store Code Coverage Results
         *
         * After a test has been run against the instrumented source code, this task will store
         * the code coverage results on disk
         */
        storeCoverage: {
            options : {
                dir : "build/output/coverage"
            }
        },

        /**
         * Istanbul Code Coverage Report Generation
         *
         * Using the stored coverage data we can generate an lcov HTML style set of reports which
         * show the code coverage output of running our tests against our instrumented code.
         */
        makeReport: {
            src : "build/output/coverage/*.json",
            options : {
                type : "lcov",
                dir : "build/reports"
            }
        },

        /**
         * Plato Code Complexity Report Generation
         *
         * This target uses Plato to generate code complexity reports about the code base. These can
         * be useful to know where the most complex pieces of our code are and can help decide if refactoring
         * is worth doing on one or more classes.
         */
        plato: {
            all: {
                files: {
                    "build/reports/plato": "www/app/**/*.js"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-sencha-dependencies");
    grunt.loadNpmTasks("grunt-sencha-jasmine");
    grunt.loadNpmTasks("grunt-istanbul");
    grunt.loadNpmTasks("grunt-plato");

    grunt.registerTask("default", [
        "jshint", "clean:build", "test_with_coverage", "plato:all",
        "sencha_dependencies:build", "uglify:build", "copy:build"
    ]);

    grunt.registerTask("test", ["sencha_jasmine:app"]);
    grunt.registerTask("test_with_coverage", ["instrument", "sencha_jasmine:coverage", "storeCoverage",  "makeReport"]);

    // needed to make grunt-istanbul storeReport
    grunt.event.on("jasmine.coverage", function (coverage) {
        global.__coverage__ = coverage;
    });

};
