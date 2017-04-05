module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngdocs:{options: {
      title: "Joaninha",
      dest: 'docs',
      html5mode:false
    },
      all:['./*.js','./**/*.js','./**/**/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-ngdocs');

  // Default task(s).
  grunt.registerTask('default', ['ngdocs']);

};