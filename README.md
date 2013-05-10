# grunt-extjs-example

A simple Ext.js project with a full Grunt build showing concat, testing, code coverage

## Getting Started

You need the following installed:

- node.js
- grunt-cli - with node installed run  ```npm install -g grunt-cli```

### Sync up this repository

Run:

```
$ git clone git://github.com/mattgoldspink/grunt-extjs-example.git
$ cd grunt-extjs-example
$ npm install
$ grunt
```

To view it in your browser quickly I'd recommend installing the `servedir` npm module:

```
$ npm install -g servedir
$ servedir .
Serving /Users/matt_goldspink/development/grunt-extjs-example/ on http://localhost:8000
```

You should then be able to see the development version on

    http://localhost:8000/www/

and the built version on

    http://localhost:8000/build/www/

You can also see Code Coverage reports on

    http://localhost:8000/build/reports/lcov-report/index.html

And a Plato code complexity report on

    http://localhost:8000/build/reports/plato/index.html

## What's in this grunt file?

At the moment the grunt file runs the following tasks:

- JSHint              - for code validation and to enforce a coding standard
- Clean               - to clean out the build directory before building into it
- Sencha_Jasmine      - Runs any Jasmine tests and sets up the Ext framework to work nicely in it
- Sencha_Dependencies - Calculates the dependencies that your project uses in the correct order for them to work when concatenated
- Uglify.js           - Concatenate, minify and generate Source Maps so you can debug the minified code against the original source code
- Copy                - Copy over additional required files (CSS, images, extra JS files) and also the index.html which we'll process to inject our concatenated JS file
- Istanbul            - When the tests are run we also generate code coverage and output an html report in build/reports/lcov

## What else could be added

There's more tasks that I'll likely add over time. At my current company we also use the following Grunt tasks:

- JSDuck              - Generate documentation for all the files
- Compass             - Compile our Compass style sheets
- Plato               - Generate code complexity reports

