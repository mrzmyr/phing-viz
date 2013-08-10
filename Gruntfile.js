var argv = require('optimist')  

  .usage('Usage: $0 -s [path] -d [path]')

  .alias('s', 'source')
  .describe('s', 'Path to source XML file')
  .default('s', './demo/build.xml')

  .argv;

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    bwr: grunt.file.readJSON('.bowerrc'),

    dirs: {
      'dist': './dist',
      'src': './src',
      'test': './test',
      'bwr': './bower_components',
      'root': '.'
    },

    watch: {
      coffee: {
        files: [
          '<%= dirs.src %>/js/*.coffee',
          '<%= dirs.root %>/*.coffee'
        ],
        tasks: ['coffee']
      },
      styles: {
        files: ['<%= dirs.src %>/scss/*.scss'],
        tasks: ['compass']
      },
      templates: {
        files: ['<%= dirs.src %>/views/**/*.html'],
        tasks: ['copy:views']
      },
      helper: {
        files: [],
        tasks: []
      }
    },
    coffee: {
      compile: {
        files: {
          'generate.js': 'generate.coffee',
          '<%= dirs.dist %>/js/phing-viz.js': '<%= dirs.src %>/js/phing-viz.coffee',
        },
        options: {
          sourceMap: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: '<%= dirs.src %>/scss',
          cssDir: '<%= dirs.dist %>/css',
          environment: 'production'
        }
      }
    },
    shell: {
      generate: {
        options: {
          stdout: true
        },
        command: 'node generate -s ' + argv.s
      },
      installCompassGem: {
        options: {
          stdout: true
        },
        command: 'gem install compass'
      }
    },
    copy: {
      views: {
        files: [{
          expand: true, 
          cwd: '<%= dirs.src %>/views/',
          src: ['**'], 
          dest: '<%= dirs.dist %>/', 
          filter: 'isFile'
        }]
      }
    },
    bower: {
      install: {
        options: {
          targetDir: '<%= bwr.directory %>',
          cleanBowerDir: true 
        }
      }
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: '<%= dirs.root %>'
        }
      }
    },
    open: {
      dist: {
        path: 'http://127.0.0.1:9001/dist/index.html'
      },
    },
    clean: [
      '<%= dirs.dist %>', 
      './.sass-cache',
      '<%= bwr.directory %>'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('build', ['clean', 'shell:installCompassGem', 'bower:install', 'compass', 'coffee', 'shell:generate', 'copy']);
  grunt.registerTask('run', ['open', 'connect', 'watch:helper']);
  grunt.registerTask('default', ['connect', 'watch']);
};