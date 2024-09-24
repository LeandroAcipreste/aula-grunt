module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Tarefa LESS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        // Minificação de HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        // Replace para development e production
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './script/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './script/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Minificação de JavaScript (Uglify)
        uglify: {
            production: {
                files: {
                    'dist/script/main.min.js': ['src/scripts/main.js']
                }
            }
        },

        // Copiar JavaScript para dev
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/scripts/main.js'],
                        dest: 'dev/script/'
                    }
                ]
            }
        },

        // Criação de pastas necessárias
        mkdir: {
            dev: {
                options: {
                    create: ['dev/script']
                }
            },
            dist: {
                options: {
                    create: ['dist/script']
                }
            }
        },

        // Watch (Monitoramento)
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development', 'less:production'] // Atualiza dev e dist
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['copy:dev', 'uglify:production'] // Atualiza dev e dist
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev', 'htmlmin:dist', 'replace:dist'] // Atualiza dev e dist
            }
        },

        // Tarefa de limpeza
        clean: ['prebuild', 'dist']
    });

    // Carregar tarefas do Grunt
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');

    // Registrar tarefas
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [
        'clean', 
        'mkdir:dev', 
        'mkdir:dist', 
        'less:production', 
        'htmlmin:dist', 
        'uglify:production', 
        'replace:dist'
    ]);
};
