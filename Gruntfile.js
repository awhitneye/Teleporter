module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    eslint: {
      target: [
        '*.js',
        //'client/**/*.js'
      ]
    },

    shell: {
      repoPush: {
        command: 'git add . && git commit && git push origin master'
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('transpile', [
    'shell:transpile'
  ]);

  grunt.registerTask('push', [
    'eslint', 'shell:repoPush'
  ]);

};

