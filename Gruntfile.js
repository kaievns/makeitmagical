module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        node: true,
        boss: true
      },
      files: ['index.js', 'app/*.js', 'config/*.js', 'public/*.js']
    },
    less: {
      options: {
        paths: ["./public", "./bower_components/pain.less.css/src"]
      },
      compile: {
        files: {
          "public/application.css" : "public/application.less"
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 2 versions"]
      },
      production: {
        src: "./public/application.css"
      }
    },
    cssmin: {
      production: {
        files: {
          './public/application.css' : ['./public/application.css']
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['index.js', 'app/*.js', 'config/*.js'],
        tasks: ["jshint"]
      },
      less: {
        files: ['public/*.less'],
        tasks: ['less:compile'],
      },
      jade: {
        files: ['views/*.jade']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['less:compile', 'autoprefixer:production', 'cssmin:production']);
};
