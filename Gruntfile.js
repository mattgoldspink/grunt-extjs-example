/*global module*/
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
         * Write the output file to our "build" directory
         */
        uglify: {
            build: {
                options: {
                    sourceMap: "build/source-map.map",
                    sourceMappingURL: "./source-map.map",
                    sourceMapRoot: ".."
                },
                files: {
                    "build/app.min.js": ["<%= sencha_dependencies_build %>"]
                }
            }
        },

        /**
         * Copy
         *
         * Any additional files our project still needs to run with in to the "build" directory
         * This includes CSS, images, mock data and our index.html
         * Note that we also do some replacement on the index.html to point it to our new
         * concat"d/minified JS file.
         */
        copy: {
            build: {
                files: [
                    {expand: true, src: ["ext-4.1.1a/resources/css/ext-all.css"], dest: "build/", cwd: "www"},
                    {expand: true, src: ["ext-4.1.1a/resources/themes/images/**"], dest: "build/", cwd: "www"},
                    {expand: true, src: ["data/**"], dest: "build/", cwd: "www"},
                    {expand: true, src: ["index.html"], dest: "build/", cwd: "www"}
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
            app: {
                options: {
                    specs: ["tests/specs/**/*.js"],
                    extFramework: "www/ext-4.1.1a",
                    extLoaderPaths   : {
                        "Pandora" : "www/app"
                    }
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

    grunt.registerTask("default", [
            "jshint", "sencha_jasmine:app",
            "clean:build", "sencha_dependencies:build", "uglify:build", "copy:build"
        ]);

};
