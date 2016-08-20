module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'node_modules/angular/angular.min.js',
                            'node_modules/angular-route/angular-route.min.js',
                            'node_modules/angular-touch/angular-touch.min.js',
                            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                            'node_modules/angular-ui-grid/ui-grid.min.js'
                        ],
                        dest: 'publicacion/admin/js/',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: [
                            'node_modules/angular-ui-grid/ui-grid.eot',
                            'node_modules/angular-ui-grid/ui-grid.min.css',
                            'node_modules/angular-ui-grid/ui-grid.svg',
                            'node_modules/angular-ui-grid/ui-grid.ttf',
                            'node_modules/angular-ui-grid/ui-grid.woff'
                        ],
                        dest: 'publicacion/admin/css/',
                        flatten: true
                    }
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['copy']);
};