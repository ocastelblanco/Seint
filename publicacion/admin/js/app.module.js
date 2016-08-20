/* global angular */
// Módulos de la app principal eirdAdmin
var seintAdmin = angular.module('seintAdmin', [
    'ngRoute',
    'ngTouch',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.pagination'
]);
// Controladores
seintAdmin.controller('controladorPrincipal', [function() {}]);
seintAdmin.controller('adminGeneral', ['sesion', '$location', function(sesion, $location) {
    var salida = this;
    sesion.comprobar().then(function(resp){
        if(!resp.id) {
            $location.path('/login');
        }
    });
    salida.salir = function() {
        sesion.cerrar().then(function(resp){
            $location.path('/login');
        });
    };
}]);
seintAdmin.controller('adminLogin', ['sesion', '$location', function(sesion, $location){
    var salida = this;
    salida.ingreso = function() {
        sesion.md5(salida.user, salida.clave).then(function(resp){
            if (resp.usuario == '21232f297a57a5a743894a0e4a801fc3' && resp.clave == '661341e8ff3955bf75bd2204bbd30b7b') {
                var sess = new Date();
                sesion.crear(sess.getTime(), salida.user).then(function(resp){
                    if (resp.sesionID) {
                        $location.path('/');
                    } else {
                        console.log('Error en la creación de la sesión');
                    }
                });
            } else {
                console.log('No sesion', resp);
            }
        });
    };
}]);
seintAdmin.controller('adminUsuarios', ['i18nService', 'cargaDatos', '$scope', '$uibModal', function(i18nService, cargaDatos, $scope, $uibModal){
    i18nService.setCurrentLang('es');
    var salida = this;
    salida.datosTabla = {
        enableRowSelection: true,
        enableSelectAll: true,
        enableFiltering: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true,
        paginationPageSizes: [100, 200, 500, 1000, 10000],
        paginationPageSize: 100,
        gridMenuShowHideColumns: false,
        columnDefs: [
                {name: 'id', visible: false},
                {name: 'nombre', displayName: 'Nombre', enableColumnMenu: false},
                {name: 'cedula', displayName: 'Cédula', enableColumnMenu: false},
                {name: 'empresa', displayName: 'Empresa', enableColumnMenu: false},
                {name: 'fecha', displayName: 'Fecha', enableColumnMenu: false}
        ]
    };
    salida.datosTabla.data = [{'id': 1, 'nombre': 'Pepe Perez', 'cedula': '9999','empresa':'Pachucos Ltda.', 'fecha':'5'},{'id': 2, 'nombre': 'Pepe2 Perez2', 'cedula': '2222','empresa':'Pachucos2 Ltda.', 'fecha':'2'}];
}]);
// Servicios
seintAdmin.service('sesion', ['$http', function($http){
    var ruta = 'php/sesion.php?accion=';
    var sesion = {
        comprobar: function() {
            var accion = 'comprobar';
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data;
            });
            return promesa;
        },
        md5: function(user,pass){
            var accion = 'md5&usuario='+user+'&clave='+pass;
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data;
            });
            return promesa;
        },
        crear: function(sesionID,nombre) {
            var accion = 'crear&sesionID='+sesionID+'&nombre='+nombre;
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data;
            });
            return promesa;
        },
        cerrar: function() {
            var accion = 'cerrar';
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data;
            });
            return promesa;
        }
    };
    return sesion;
}]);
seintAdmin.service('cargaDatos', ['$http', function($http){
    var ruta = 'php/datos.php?accion=';
    var cargaDatos = {
        usuarios: function() {
            var accion = 'usuarios';
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data.textos;
            });
            return promesa;
        }
    };
    return cargaDatos;
}]);