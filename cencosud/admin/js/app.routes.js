/* global angular */
var seintAdmin = angular.module('seintAdmin');
// Enrutamientos
seintAdmin.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl :'views/admin.html'
        }).when('/login', {
            templateUrl : 'views/login.html'
        }).when('/admin', {
            templateUrl : 'views/admin.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);