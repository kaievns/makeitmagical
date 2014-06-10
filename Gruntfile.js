module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['index.js', 'app/*.js', 'views/*.jade']
      },
      css: {
        files: ['public/*.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
