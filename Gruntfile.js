module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',
        // Task configuration.
        uglify: {
            options: {
                banner: '<%= banner %>',
                report: 'gzip'
            },
            build: {
                src: 'src/ng-smartBanner.js',
                dest: 'ng-smartBanner.min.js'
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>',
                report: 'gzip'
            },
            minify: {
                src: 'src/ng-smartBanner.css',
                dest: 'ng-smartBanner.min.css'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                coverageReporter: {
                    type: 'text',
                    dir: 'coverage/'
                }
            },
            watch: {
                configFile: 'test/karma.conf.js',
                singleRun: false,
                reporters: ['progress'] // Don't display coverage
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', [ 'karma:unit', 'uglify', 'cssmin']);

    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma:watch']);
};