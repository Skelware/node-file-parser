[![Build Status](https://drone.io/bitbucket.org/skelware/node-file-parser/status.png)](https://drone.io/bitbucket.org/skelware/node-file-parser/latest)

# Node File Parser
The Node File Parser package was initially created to support other packages with their configurations.

It can read and write many different file formats including json and ini, but can also default to plaintext. Being written for use with node.js, it can be used asynchronously or synchronously by choice.

## Why another package that parses files?
Imagine you have an .ini file that contains a list of all your source files nicely categorized into sections. Now you want to use a testing framework to load your source code, because you obviously cannot run tests when the source code is missing.

What do you do? Do you copy/paste the contents of the .ini file into your testing framework's configuration file and manually keep it up to date every time you (or someone else) updates the .ini file? Hell no! You want to keep using that .ini file without the need to ever think about having to fiddle around with any testing configurations ever again!

This is why we wrote this simple package, it's small yet very extensible and that makes it gorgeous: it can do anything! With the Node File Parser you can tell your testing framework to fetch its source files from any other file, with relative ease.

You want an example? Here, this is an example configuration for using Jasmine with Phantom through Grunt:
````javascript
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    /*
     * Get a reference to the Node File Parser
     */
    var parser = require('node-file-parser');

    /*
     * Create a new link to any file you want with the link function
     */
    var assets = parser.link('./foo/bar/configuration.ini');

    /*
     * Function chaining is supported!
     *
     * The modify function will allow you to modify data every time the read function is triggered.
     * The data you will be provided with may depend on the file's format. For .ini files, it's as follows:
     * {section:String, key:String, value:String}
     * The callback you provide is called for each entry, and allows you to modify that entry before it's submit.
     *
     * The read function tells the parser to read the file. You can optionally provide a callback function as parameter,
     * in which case the read function will execute asynchronously. However, we want to use a synchronous call in this case.
     *
     * The getContent function returns the data after it has been read and parsed. Modifying the result of this function
     * will allow you to call the write function to store changes with the setContent function.
     *
     * The "section" selector filters on sections, because an .ini file can also contain global variables, but we do not want them.
     * The result of getContent in this case would be {global:{}, section:{}}, but we only want section.
     */
    var asset_data = assets.modify(function(data) {
        data.value = 'foo/bar/' + data.value;
        return data;
    }).read().getContent()['section'];

    /*
     * The matchers are only needed for development, so with good reason they're not in our .ini.
     * These still need to be added manually, of course.
     *
     * "a.js" and "b.js" are example sections that your .ini file may contain, and in this case,
     * "files" is an array that contains our file paths after being modified by our modifier.
     *
     * When we're done, we'll merge everything into one new array and pass it to Jasmine.
     */
    var matchers = ['node_modules/jasmine-expect/dist/jasmine-matchers.js'];
    var section_a = asset_data['a.js'].files;
    var section_b = asset_data['b.js'].files;
    var src = matchers.concat(section_a, section_b);

    grunt.initConfig({
        jasmine: {
            test: {
                src: src,
                options: {
                    specs: [
                        'tests/**/*.spec.js'
                    ]
                }
            }
        }
    });
};
````
The only manual intervention in this case was the modification of the file paths (changing their relative paths to different relative paths). But now, whenever we change our .ini file, we will not have to worry about our Gruntfile. Great!

## Contributing
Whether you're a programmer or not, all contributions are very welcome! You could add features, improve existing features or request new features. Assuming the unit tests cover all worst-case scenarios, you will not be able to report bugs because there will be no bugs.

If you want to make changes to the source, you should fork this repository and create a pull-request to our master branch. Make sure that each individual commit does not break the functionality, and contains new unit tests for the changes you make. Existing assertions will not be edited until a major release to remain compatible with older versions, so please do not change them unless absolutely necessary.

To test your changes locally, run `npm install` followed by `npm test`.

## Versioning
As much as we want everyone to always use the latest version, we know that this is a utopia. Therefore, we adhere to a strict versioning system that is widely accepted: `major.minor.patch`. This is also known as the [SemVer](http://semver.org/spec/v2.0.0.html) method.