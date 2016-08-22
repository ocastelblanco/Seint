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
        enableSelectAll: false,
        multiSelect: false,
        enableFiltering: true,
        selectionRowHeaderWidth: 24,
        rowHeight: 24,
        showGridFooter:true,
        paginationPageSizes: [100, 200, 500, 1000, 10000],
        paginationPageSize: 100,
        gridMenuShowHideColumns: false,
        columnDefs: [
                {name: 'id', visible: false},
                {name: 'Nombre', displayName: 'Nombre', enableColumnMenu: false},
                {name: 'Cedula', displayName: 'Cédula', enableColumnMenu: false},
                {name: 'Empresa', displayName: 'Empresa', enableColumnMenu: false},
                {name: 'FechaReg', visible: false}
        ]
    };
    cargaTabla();
    function cargaTabla() {
        cargaDatos.leer('usuarios').then(function(resp){
            salida.datosTabla.data = resp;
        });
    }
    // Captura cuando el usuario selecciona filas de la tabla
    salida.datosTabla.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            salida.filasSeleccionadas = gridApi.selection.getSelectedRows();
            abreModal();
        });
    };
    function abreModal() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalUsuarios.html',
            controller: modalEditarUsuarios,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(accion){
            $scope.gridApi.selection.clearSelectedRows();
            cargaDatos.datos(accion,'usuarios',salida.filasSeleccionadas[0]).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    }
    var modalEditarUsuarios = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Editar o eliminar usuario";
        $scope.usuario = salida.filasSeleccionadas[0];
        $scope.editando = true;
        $scope.accion = function(accion){
            $uibModalInstance.close(accion);
        };
    }];
    salida.nuevoUsuario = function() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalUsuarios.html',
            controller: modalNuevoUsuario,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(resp){
            $scope.gridApi.selection.clearSelectedRows();
            cargaDatos.datos(resp[0],'usuarios',resp[1]).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    };
    var modalNuevoUsuario = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Crear un nuevo usuario";
        $scope.editando = false;
        $scope.accion = function(accion){
            $uibModalInstance.close([accion, $scope.usuario]);
        };
    }];
}]);
seintAdmin.controller('adminCursos', ['i18nService', 'cargaDatos', '$scope', '$uibModal', function(i18nService, cargaDatos, $scope, $uibModal){
    i18nService.setCurrentLang('es');
    var salida = this;
    salida.datosTabla = {
        enableRowSelection: true,
        enableSelectAll: false,
        multiSelect: false,
        enableFiltering: true,
        selectionRowHeaderWidth: 24,
        rowHeight: 24,
        showGridFooter:true,
        paginationPageSizes: [20, 50, 100],
        paginationPageSize: 20,
        gridMenuShowHideColumns: false,
        columnDefs: [
                {name: 'id', visible: false},
                {name: 'NombreCurso', displayName: 'Curso', enableColumnMenu: false},
                {name: 'FechaReg', visible: false}
        ]
    };
    cargaTabla();
    function cargaTabla() {
        cargaDatos.leer('cursos').then(function(resp){
            salida.datosTabla.data = resp;
        });
    }
    // Captura cuando el usuario selecciona filas de la tabla
    salida.datosTabla.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            salida.filasSeleccionadas = gridApi.selection.getSelectedRows();
            abreModal();
        });
    };
    function abreModal() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalCursos.html',
            controller: modalEditarCursos,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(accion){
            $scope.gridApi.selection.clearSelectedRows();
            cargaDatos.datos(accion,'cursos',salida.filasSeleccionadas[0]).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    }
    var modalEditarCursos = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Editar o eliminar curso";
        $scope.curso = salida.filasSeleccionadas[0];
        $scope.editando = true;
        $scope.accion = function(accion){
            $uibModalInstance.close(accion);
        };
    }];
    salida.nuevoCurso = function() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalCursos.html',
            controller: modalNuevoCurso,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(resp){
            $scope.gridApi.selection.clearSelectedRows();
            cargaDatos.datos(resp[0],'cursos',resp[1]).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    };
    var modalNuevoCurso = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Crear un nuevo curso";
        $scope.editando = false;
        $scope.accion = function(accion){
            $uibModalInstance.close([accion, $scope.curso]);
        };
    }];
}]);
seintAdmin.controller('adminRegistros', ['i18nService', 'cargaDatos', '$scope', '$uibModal', function(i18nService, cargaDatos, $scope, $uibModal){
    i18nService.setCurrentLang('es');
    var salida = this;
    var usu = {};
    var cur = {};
    salida.datosTabla = {
        enableRowSelection: true,
        enableSelectAll: false,
        multiSelect: false,
        enableFiltering: true,
        selectionRowHeaderWidth: 24,
        rowHeight: 24,
        showGridFooter:true,
        paginationPageSizes: [20, 50, 100],
        paginationPageSize: 20,
        gridMenuShowHideColumns: false,
        columnDefs: [
                {name: 'id', visible: false},
                {name: 'Usuario', displayName: 'Cédula de usuario', enableColumnMenu: false},
                {name: 'Curso', displayName: 'Curso', enableColumnMenu: false},
                {name: 'CodigoCarta', displayName: 'Carta', enableColumnMenu: false},
                {name: 'NumCert', displayName: 'Certificado', enableColumnMenu: false},
                {name: 'Factura', displayName: 'Factura', enableColumnMenu: false},
                {name: 'Consecutivo', displayName: 'Consecutivo', enableColumnMenu: false},
                {name: 'ServExamen', displayName: 'Examen', enableColumnMenu: false},
                {name: 'FechaExp', displayName: 'Fecha', enableColumnMenu: false},
                {name: 'EjecutivoCuenta', displayName: 'Ejecutivo', enableColumnMenu: false},
                {name: 'FechaReg', visible: false}
        ]
    };
    cargaTabla();
    function cargaTabla() {
        cargaDatos.leer('registros').then(function(respReg){
            cargaDatos.leer('usuarios').then(function(respUsu){
                salida.usuarios = respUsu;
                cargaDatos.leer('cursos').then(function(respCur){
                    var resp = [];
                    salida.cursos = respCur;
                    angular.forEach(respUsu, function(valor, llave){
                        usu[valor.id] = valor.Cedula+' '+valor.Nombre;
                    });
                    angular.forEach(respCur, function(valor, llave){
                        cur[valor.id] = valor.NombreCurso;
                    });
                    angular.forEach(respReg, function(valor, llave){
                        resp.push({
                            'id': valor.id,
                            'Usuario': usu[valor.CodUsuario],
                            'Curso': cur[valor.CodCurso],
                            'CodUsuario': valor.CodUsuario,
                            'CodCurso': valor.CodCurso,
                            'CodigoCarta': valor.CodigoCarta,
                            'NumCert': valor.NumCert,
                            'Factura': valor.Factura,
                            'Consecutivo': valor.Consecutivo,
                            'ServExamen': valor.ServExamen,
                            'FechaExp': valor.FechaExp,
                            'EjecutivoCuenta': valor.EjecutivoCuenta,
                            'FechaReg': valor.FechaReg
                        });
                    });
                    salida.datosTabla.data = resp;
                });
            });
        });
    }
    // Captura cuando el usuario selecciona filas de la tabla
    salida.datosTabla.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            salida.filasSeleccionadas = gridApi.selection.getSelectedRows();
            abreModal();
        });
    };
    function abreModal() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalRegistros.html',
            controller: modalEditarRegistros,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(accion){
            $scope.gridApi.selection.clearSelectedRows();
            var postDatos = salida.filasSeleccionadas[0];
            delete postDatos.Usuario;
            delete postDatos.Curso;
            cargaDatos.datos(accion,'registros',postDatos).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    }
    var modalEditarRegistros = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Editar o eliminar registro";
        $scope.cursos = salida.cursos;
        $scope.registros = salida.filasSeleccionadas[0];
        $scope.Usuario = $scope.registros.Usuario;
        $scope.buscaUsuarios = function(item){
            return cargaDatos.consulta(item).then(function(resp){
                return resp;
            });
        };
        $scope.editando = true;
        $scope.accion = function(accion){
            if (accion != 'cerrar') {
                $scope.guardando = true;
                $scope.registros.Usuario = $scope.Usuario;
                $scope.registros.Curso = cur[$scope.registros.CodCurso];
                salida.filasSeleccionadas[0] = $scope.registros;
                angular.forEach(salida.usuarios, function(valor, llave){
                    var usur = valor.Cedula+' '+valor.Nombre;
                    if (usur == $scope.Usuario) {
                        $scope.registros.CodUsuario = valor.id;
                    }
                });
                $uibModalInstance.close(accion);
            } else {
                $uibModalInstance.close(accion);
            }
        };
    }];
    salida.nuevoRegistro = function() {
        salida.modalInstance = $uibModal.open({
            templateUrl: 'views/modalRegistros.html',
            controller: modalNuevoRegistro,
            keyboard: false,
            backdrop: 'static'
        });
        salida.modalInstance.result.then(function(resp){
            $scope.gridApi.selection.clearSelectedRows();
            delete resp[1].Usuario;
            cargaDatos.datos(resp[0],'registros',resp[1]).then(function(resp){
                console.log('Respuesta', resp);
                cargaTabla();
            }).catch(function(error){
                console.log('Error', error);
                cargaTabla();
            });
        });
    };
    var modalNuevoRegistro = ['$uibModalInstance', '$scope', function($uibModalInstance, $scope){
        $scope.titulo = "Crear un nuevo registro";
        $scope.cursos = salida.cursos;
        $scope.editando = false;
        $scope.buscaUsuarios = function(item){
            return cargaDatos.consulta(item).then(function(resp){
                return resp;
            });
        };
        $scope.accion = function(accion){
            if (accion != 'cerrar') {
                $scope.guardando = true;
                angular.forEach(salida.usuarios, function(valor, llave){
                    var usur = valor.Cedula+' '+valor.Nombre;
                    if (usur == $scope.Usuario) {
                        $scope.registros.CodUsuario = valor.id;
                    }
                });
                $uibModalInstance.close([accion, $scope.registros]);
            } else {
                $uibModalInstance.close([accion, $scope.registros]);
            }
        };
    }];
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
    var ruta = 'php/bd.php?accion=';
    var rutaPost = 'php/datos.php';
    var cargaDatos = {
        leer: function(tabla) {
            var accion = 'leer&tabla='+tabla;
            var promesa = $http.get(ruta+accion).then(function(resp){
                return resp.data;
            });
            return promesa;
        },
        datos: function(accion, tabla, datos) {
            var salida = {'accion': accion, 'tabla': tabla, 'datos': datos};
            var promesa = $http.post(rutaPost, salida).then(function(resp){
                return resp.data;
            });
            return promesa;
        },
        consulta: function(item) {
            var promesa = $http.post('php/consulta.php?item='+item).then(function(resp){
                return resp.data;
            });
            return promesa;
        }
    };
    return cargaDatos;
}]);
seintAdmin.directive('selectOnClick', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function() {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);