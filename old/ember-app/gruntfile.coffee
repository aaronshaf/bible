module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig

    clean:
      public: ['public/js']

    watch:
      build:
        files: ['app/**/*.{js,hbs}']
        tasks: ['public']

    emberTemplates:
      compile:
        options:
          templateBasePath: 'app/templates/'
        files:
          'public/js/templates.js': ['app/templates/{,*/}*.hbs','app/templates/{,*/}{,*/}*.hbs']

    concat:
      public:
        src: ['app/**/*.js']
        dest: 'public/js/main.js'

  grunt.registerTask 'public', ['clean', 'emberTemplates', 'concat']
  grunt.registerTask 'default', ['public', 'watch']
