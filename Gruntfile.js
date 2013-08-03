'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata stored in magic.json
    pkg: grunt.file.readJSON('magic.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',
    // Task configuration.

    clean: { // empties out
      src: '<%= pkg.dest %>'
    },
    concat: {
      options: {
        banner: '<%= banner %>',
      },
      js: {
        src: '<%= pkg.src %>/js/*.js',
        dest: '<%= pkg.dest %>/js/magic.js'
      },
      css: {
        src: ['<%= pkg.src %>/css/*.css', '<%= pkg.src %>/css/temp/yeah.css'],
        dest: '<%= pkg.dest %>/css/magic.css'
      }
    }, 
    processhtml: {

        dist: {
              files: {
                'with/magic.html': ['without/magic.html']
              }
        }
    },
    montage: {
        simple: {
            files: {
                "without/img/sprites": [
                    "without/img/sprites/*.png"
                ]
            },
            options: {
                size: 30,
                prefix: "button",
                outputImage: "../img/sprites/sprites.png",
                outputStylesheet: "../../css/sprites.css",
                magick: {
                    background: "none"
                }
            }
        }
    },
    uglify: {
      options: {
        preserveComments: 'some',
        report: 'gzip'
      },
       dist: {
        files: {
          '<%= pkg.dest %>/js/<%= pkg.name %>.min.js': '<%= concat.js.dest %>',
          '<%= pkg.dest %>/js/slider/jquery.cycle.all.js': '<%= pkg.src %>/js/slider/jquery.cycle.all.js',
          '<%= pkg.dest %>/js/slider/jquery.easing.1.3.js': '<%= pkg.src %>/js/slider/jquery.easing.1.3.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          '<%= pkg.dest %>/css/<%= pkg.name %>.min.css': '<%= concat.css.dest %>'
        }
      }
    },
    useminPrepare: {
      html: '<%= pkg.src %>/magic.html'
    },
    usemin: {
        html: '<%= pkg.dest %>/magic.html'
    },
    copy: {
      main: {
        files: [
          {src: '<%= pkg.src %>/magic.html', dest: '<%= pkg.dest %>/magic.html'}
        ]
      }
    },
    imagemin: {                          
      dist: {                             
        options: {                       
          optimizationLevel: 7
        },
        files: {
          '<%= pkg.dest %>/img/slideshow/creepy-willy-wonka.jpg': '<%= pkg.src %>/img/slideshow/creepy-willy-wonka.jpg',
          '<%= pkg.dest %>/img/slideshow/david-c.jpg': '<%= pkg.src %>/img/slideshow/david-c.jpg',
          '<%= pkg.dest %>/img/slideshow/grumpy-cat.jpg': '<%= pkg.src %>/img/slideshow/grumpy-cat.jpg',
          '<%= pkg.dest %>/img/sprites/sprites.png': '<%= pkg.src %>/img/sprites/sprites.png',
          '<%= pkg.dest %>/img/sprites/left.png': '<%= pkg.src %>/img/sprites/left.png',
          '<%= pkg.dest %>/img/sprites/right.png': '<%= pkg.src %>/img/sprites/right.png'          
        }
      }
    },
   imageEmbed: {
    dist: {
      src: [ "<%= pkg.src %>/css/exclude/datauri.css" ],
      dest: "<%= pkg.src %>/css/temp/yeah.css",
      options: {
        deleteAfterEncoding : false
      },
    },
  },
  htmlcompressor: {
      compile: {
        files: {
          'with/magic.html': 'with/magic.html'
        },
        options: {
          type: 'html',
          preserveServerScript: true,
          compressJs: true
        }
      }
    },
    exec: {
        spofcheck: {
            command: 'spofcheck -f text -p <%= pkg.publicURL %>/magic.html',
            stdout: true
        }
    }       
      

  });

  // modules to be installed, run "npm install <TaskName>", e.g npm install grunt-closure-compiler
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-image-embed");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-htmlcompressor');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks("grunt-montage");
  grunt.loadNpmTasks("grunt-processhtml");




  // run your tasks in this order
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin', 'imagemin','montage', 'copy', 'imageEmbed', 'processhtml', 'useminPrepare', 'usemin', 'htmlcompressor','exec:spofcheck']);
 
 }