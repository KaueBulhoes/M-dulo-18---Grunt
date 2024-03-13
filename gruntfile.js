//npm i --save-dev grunt-contrib-less para instalar a contribuição do less no grunt

module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            less: {
                development: {
                    files: {
                        'dev/styles/main.css': 'src/styles/main.less'
                    }
                },
                production: {
                    options: {
                        compress: true,
                    },
                    files: {
                        'dist/styles/main.min.css': 'src/styles/main.less'
                    }
                }
            },
            watch: {
                less: {
                    files: ['src/styles/**/*.less'],
                    tasks: ['less:development']
                }
            },
            replace: {
                dev: {
                    options: {
                        patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.css'
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
                }
            },
            htmlmin: { //minificar o html
                dist: {
                    options: {
                        removeComments: true, //remove todos os comentarios
                        collpaseWhiteSpaces: true, //apaga espaços em branco
                    },
                    files: {
                        //1 - minificacao
                        //2 - substituicao
                    }
                }
            }
        })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production']) //termo para publicar a aplicação no ambiente produtivo (como a vercel)
}