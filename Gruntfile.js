module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server/app.js',
        options: {
          watch: ['server'],
          callback: function(nodemon){
            nodemon.on('restart', function(){
              require('fs').writeFileSync('tmp/.rebooted','rebooted');
            });
          }
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

    mocha: {
      test: {
        src: ['client/test/runner.html'],
        options: {
          run: true,
          log: true
        }
      }
    },

    watch: {
      serverTest: {
        files: ['server/**/*'],
        tasks: ['mochaTest']
      },
      clientTest: {
        files: ['client/**/*{.html,.js}'],
        tasks: ['mocha']
      },
      buildSass: {
        files: ['client/scss/*'],
        tasks: ['sass']
      },
      livereload: {
        files: ['client/**/*','tmp/.rebooted','tmp/css/*'],
        options: {
          livereload: true
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon','watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    sass: {
      dev: {
        files: {
          'client/css/app.css': 'client/scss/app.scss'
        },
        options: {
          sourcemap: true
        }
      }
    }

  });

   grunt.registerTask('default', ['concurrent']);

};
