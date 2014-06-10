module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        node: true
      },
      files: ['index.js', 'app/*.js', 'config/*.js', 'public/*.js']
    },
    less: {
      compile: {
        files: {
          "public/application.css" : "public/application.less"
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
};
