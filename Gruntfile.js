module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server/app.js',
        options: {
          watch: ['server']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/test/**/*.js']
      }
    },

    watch: {
      serverTest: {
        files: ['server/**/*'],
        tasks: ['mochaTest']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon','watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

   grunt.registerTask('default', ['concurrent']);

};
