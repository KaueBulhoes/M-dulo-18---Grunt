//npm i --save-dev grunt-contrib-less para instalar a contribuição do less no grunt

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'main.css': 'main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'main.min.css': 'main.less'
                }
            }
        },
        sass: {
            dist: {
                options:{
                    style: 'compressed'
                },
                files: {
                    'main2.css': 'main.scss'
                }
            }
        },
        concurrent: {
            target: ['olaGrunt', 'less', 'sass', 'tarefaDemorada']
        }
    })

    //concurrent é uma extensao npm usada para rodar as tarefas em paralelo
    //npm run grunt olaGrunt <- necessario chamar o nome da tarefa caso nao haja uma tareja default
    grunt.registerTask('olaGrunt', function(){
        const done = this.async() //feito para dizer ao grunt para esperar o tempo dado na função
        setTimeout(function() {
            console.log('Olá Grunt');
            done()
        }, 3000)
    })

    grunt.registerTask('tarefaDemorada', function(){
        const done = this.async() //feito para dizer ao grunt para esperar o tempo dado na função
        setTimeout(function() {
            console.log('Olá Grunt');
            done()
        }, 3000)
    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-concurrent')

    //pode-se colocar o nome de todas as tarefas dentro do array
    grunt.registerTask('default', ['concurrent'])
}