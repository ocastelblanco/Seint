$(function(){
    var tablaUsuarios, tablaRegistros, tablaCurs;
    $('body').show();
    $('.resultadoCursos').hide();
    $('.noResultados').hide();
    $('.filaAdmin').hide();
    $('#formLogin').hide();
    activarAccionLogin();
    function activarAccionLogin() {
        $('#accionLogin').click(function(e){
            e.preventDefault();
            $(this).unbind();
            $('#formLogin').show(500);
            $(this).hide(500);
        });
    }
    $('#formLogin').on('submit', function(e){
        e.preventDefault();
        var usuario = $('#formLogin #admin').val();
        var clave = $('#formLogin #claveAdmin').val();
        //$('#formLogin').reset();
        $.getJSON('php/md5.php?usuario='+usuario+'&clave='+clave, function(datos){
            // usuario: admin
            // clave: S31nt!
            if (datos.usuario == '21232f297a57a5a743894a0e4a801fc3' &&
                datos.clave == '661341e8ff3955bf75bd2204bbd30b7b') {
                $('.filaAdmin').show();
                $('.filaUsuarios').hide();
                iniciaListaAdmin();
                $('#formLogin').hide(500);
                $('#accionLogin').html('<i class="fa fa-sign-out"></i> Salir');
                $('#accionLogin').show();
                $('#accionLogin').click(function(e){
                    e.preventDefault();
                    $(this).unbind();
                    $(this).html('<i class="fa fa-sign-in"></i> Ingresar');
                    limpiarAdmin();
                    activarAccionLogin();
                });
            } else {
                activarAccionLogin();
            }
        });
    });
    //---------------------> Registro de cursos nuevos
    $('#nuevoCurso').click(function(e){
        e.preventDefault();
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreCurso" class="col-sm-2 control-label">Nombre del curso</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreCurso" placeholder="Nombre del curso"></div></div></form>';
        $('#ventanaModal .modal-title').html('Registrar un nuevo curso');
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal #guardarRegistro').show();
        $('#ventanaModal').modal();
        guardarRegistroCurso(contenido);
    });
    function guardarRegistroCurso(contenido) {
        $('#ventanaModal #guardarRegistro').click(function(e){
            $(this).unbind();
            e.preventDefault();
            var data = {'nombre': $('#ventanaModal .modal-body #nombreCurso').val()};
            console.log(data);
            $.getJSON('php/save.php', data, function(datos){
                $('#ventanaModal .modal-body').html(datos.mensaje);
                if (datos.resultado) {
                    actualizaTablas();
                    $('#ventanaModal #guardarRegistro').html('Registrar otro curso');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        var blanco = {'nombre':''};
                        iniciarContenidoCurso(contenido, blanco);
                    });
                } else {
                    $('#ventanaModal #guardarRegistro').html('Intentar de nuevo');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        iniciarContenidoCurso(contenido, data);
                    });
                }
            });
        });
    }
    function iniciarContenidoCurso(contenido, data){
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal .modal-body #nombreCurso').val(data.nombre);
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        guardarRegistroCurso(contenido);
    }
    // --------------------------------------------> Registro de nuevo usuario
    $('#nuevoUsuario').click(function(e){
        e.preventDefault();
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreUsuario" class="col-sm-2 control-label">Nombre</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreUsuario" placeholder="Nombres y apellidos"></div></div><div class="form-group"><label for="cedulaUsuario" class="col-sm-2 control-label">Cédula</label><div class="col-sm-10"><input type="number" class="form-control" id="cedulaUsuario" placeholder="Cédula"></div></div> <div class="form-group"><label for="empresaUsuario" class="col-sm-2 control-label">Empresa</label><div class="col-sm-10"><input type="text" class="form-control" id="empresaUsuario" placeholder="Empresa"></div></div></form>';
        $('#ventanaModal .modal-title').html('Registrar un nuevo usuario');
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal #guardarRegistro').show();
        $('#ventanaModal').modal();
        guardarRegistroUsuario(contenido);
    });
    function guardarRegistroUsuario(contenido) {
        $('#ventanaModal #guardarRegistro').click(function(e){
            $(this).unbind();
            e.preventDefault();
            var data = {'nombre': $('#ventanaModal .modal-body #nombreUsuario').val(), 'cedula': $('#ventanaModal .modal-body #cedulaUsuario').val(), 'empresa': $('#ventanaModal .modal-body #empresaUsuario').val()};
            $.getJSON('php/save.php', data, function(datos){
                $('#ventanaModal .modal-body').html(datos.mensaje);
                if (datos.resultado) {
                    actualizaTablas();
                    $('#ventanaModal #guardarRegistro').html('Registrar otro usuario');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        var blanco = {'nombre':'', 'cedula':'', 'empresa':''};
                        iniciarContenidoUsuario(contenido, blanco);
                    });
                } else {
                    $('#ventanaModal #guardarRegistro').html('Intentar de nuevo');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        iniciarContenidoUsuario(contenido, data);
                    });
                }
            });
        });
    }
    function iniciarContenidoUsuario(contenido, data){
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal .modal-body #nombreUsuario').val(data.nombre);
        $('#ventanaModal .modal-body #cedulaUsuario').val(data.cedula);
        $('#ventanaModal .modal-body #empresaUsuario').val(data.empresa);
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        guardarRegistroUsuario(contenido);
    }
    //-----------------------------------------------------------------------------> Registro de cursos nuevos
    $('#nuevoRegistro').click(function(e){
        e.preventDefault();
        $.getJSON('php/uscur.php', function(datos){
            $('#ventanaModal #guardarRegistro').html('Guardar cambios');
            var selectUsuarios = '', selectCursos = '';
            datos.usuarios.forEach(function(elem, index, array){
                selectUsuarios += '<option value="'+elem.id+'">'+elem.cedula+' '+elem.nombre+'</option>';
            });
            datos.cursos.forEach(function(elem, index, array){
                selectCursos += '<option value="'+elem.id+'">'+elem.curso+'</option>';
            });
            var contenido = '<form class="form-horizontal"><div class="form-group"><label for="codigoCarta" class="col-sm-4 control-label">Código de carta</label><div class="col-sm-8"><input type="text" class="form-control" id="codigoCarta" placeholder="Código de carta"></div></div><div class="form-group"><label for="qr" class="col-sm-4 control-label">Número de serie consecutivo QR</label><div class="col-sm-8"><input type="text" class="form-control" id="qr" placeholder="Número de serie consecutivo QR"></div></div><div class="form-group"><label for="factura" class="col-sm-4 control-label">Factura</label><div class="col-sm-8"><input type="text" class="form-control" id="factura" placeholder="Factura"></div></div><div class="form-group"><label for="consecutivo" class="col-sm-4 control-label">Consecutivo operaciones</label><div class="col-sm-8"><input type="text" class="form-control" id="consecutivo" placeholder="Consecutivo operaciones"></div></div><div class="form-group"><label for="examen" class="col-sm-4 control-label">Servicio de examen</label><div class="col-sm-8"><input type="text" class="form-control" id="examen" placeholder="Servicio de examen"></div></div>';
            contenido += '<div class="form-group"><label for="idUsuario" class="col-sm-4 control-label">Usuario</label><div class="col-sm-8"><select class="form-control selectpicker" id="idUsuario" data-live-search="true">'+selectUsuarios+'</select></div></div>';
            contenido += '<div class="form-group"><label for="idCurso" class="col-sm-4 control-label">Curso</label><div class="col-sm-8"><select class="form-control selectpicker" id="idCurso" data-live-search="true">'+selectCursos+'</select></div></div>';
            contenido += '<div class="form-group"><label for="fechaExp" class="col-sm-4 control-label">Fecha de expedición</label><div class="col-sm-8"><input type="text" class="form-control" id="fechaExp" placeholder="Fecha de expedición"></div></div><div class="form-group"><label for="ejecutivoCuenta" class="col-sm-4 control-label">Ejecutivo de cuenta</label><div class="col-sm-8"><input type="text" class="form-control" id="ejecutivoCuenta" placeholder="Ejecutivo de cuenta"></div></div></form>';
            $('#ventanaModal .modal-title').html('Crear un nuevo registro');
            $('#ventanaModal .modal-body').html(contenido);
            $('.selectpicker').selectpicker('show');
            $('#ventanaModal #guardarRegistro').show();
            $('#ventanaModal').modal();
            guardarRegistro(contenido, $('#ventanaModal form .form-control'));
        });
    });
    function guardarRegistro(contenido, formulario) {
        $('#fechaExp').datetimepicker({
            locale: 'es'
        });
        $('#ventanaModal #guardarRegistro').click(function(e){
            $(this).unbind();
            e.preventDefault();
            var data = {};
            $(formulario).each(function(){
                if($(this).attr('id') !== undefined) {
                    data[$(this).attr('id')] = $(this).val();
                }
            });
            $.getJSON('php/save.php', data, function(datos){
                $('#ventanaModal .modal-body').html(datos.mensaje);
                if (datos.resultado) {
                    actualizaTablas();
                    $('#ventanaModal #guardarRegistro').html('Crear otro registro');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        var blanco = {'nombre':''};
                        iniciarContenido(contenido, blanco);
                    });
                } else {
                    $('#ventanaModal #guardarRegistro').html('Intentar de nuevo');
                    $('#ventanaModal #guardarRegistro').click(function(e){
                        $(this).unbind();
                        iniciarContenido(contenido, data);
                    });
                }
            });
        });
    }
    function iniciarContenido(contenido, data){
        $('#ventanaModal .modal-body').html(contenido);
        for (var indice in data) {
            $('#ventanaModal .modal-body form #'+indice).val(data[indice]);
        }
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        guardarRegistro(contenido, $('#ventanaModal form .form-control'));
    }
    // ---------------------------------------------> Ingreso de cédula por usuario normal
    $('#ingresaCedula').on('submit', function(e){
        $('.resultadoCursos').hide();
        e.preventDefault();
        var valCedula = $('#numCedula').val();
        $.getJSON('php/lee.php?cedula='+valCedula, function(datos){
            if (datos.nombre) {
                $('.noResultados').hide();
                $('#tablaCursos').show();
                $('#tablaCursos tbody').html('');
                $.each(datos.cursos, function(num, curso){
                    $('#tablaCursos tbody').append('<tr><td>'+curso[2]+'</td><td>'+curso[9]+'</td><td>'+curso[6]+'</td></tr>');
                });
                $('#nombreUsuario').html('Nombre: ' + datos.nombre);
                $('#cedulaUsuario').html('Número de cédula: ' + datos.cedula);
                $('.resultadoCursos').animate({
                    height: 'toggle'
                }, 200);
            } else {
                $('.noResultados').show();
            }
        });
    });
    // ------------------------------------> Inicia funciones de administración de tablas
    function iniciaListaAdmin() {
        $('#tablaCurs').html('');
        $('#tablaRegistros').html('');
        $('#tablaUsuarios').html('');
        // Carga la tabla de listado general de registros de curso
        tablaRegistros = $('#tablaRegistros').WATable({
            url: 'php/lista.php',
            rowClicked: function(data){
                activaEdicionTablaRegistros($(this));
            },
            pageSizes: [100, 200, 500, 1000, 10000],
            pageSize: 100,
            tableCreated: function(data){
                $('#tablaRegistros tbody tr').css('cursor', 'pointer');
            }
        }).data('WATable');
        // Carga la tabla de listado general de usuarios
        tablaUsuarios = $('#tablaUsuarios').WATable({
            url: 'php/lista.php?tabla=usuarios',
            rowClicked: function(data){
                activaEdicionTablaUsuarios($(this));
            },
            pageSizes: [100, 200, 500, 1000, 10000],
            pageSize: 100,
            tableCreated: function(data){
                $('#tablaUsuarios tbody tr').css('cursor', 'pointer');
            }
        }).data('WATable');
        // Carga la tabla de listado general de cursos
        tablaCurs = $('#tablaCurs').WATable({
            url: 'php/lista.php?tabla=cursos',
            rowClicked: function(data){
                activaEdicionTablaCursos($(this));
            },
            pageSizes: [10, 20, 50, 100],
            pageSize: 10,
            tableCreated: function(data){
                $('#tablaCurs tbody tr').css('cursor', 'pointer');
            }
        }).data('WATable');
        function activaEdicionTablaRegistros(objeto) {
            $.getJSON('php/uscur.php', function(datos){
                var fila = $(objeto).parent();
                var id = $(fila).children('td:nth-child(1)').html();
                var codCarta = $(fila).children('td:nth-child(2)').html();
                var numQR = $(fila).children('td:nth-child(3)').html();
                var factura = $(fila).children('td:nth-child(4)').html();
                var consecutivo = $(fila).children('td:nth-child(5)').html();
                var examen = $(fila).children('td:nth-child(6)').html();
                var actualCedula = $(fila).children('td:nth-child(8)').html();
                var actualCurso = $(fila).children('td:nth-child(10)').html();
                var fecha = $(fila).children('td:nth-child(11)').html();
                var fechaReg = fecha.substr(-2)+'-'+fecha.substr(5, 2)+'_'+fecha.substr(0, 4);
                var ejecutivo = $(fila).children('td:nth-child(12)').html();
                var selectUsuarios = '', selectCursos = '';
                datos.usuarios.forEach(function(elem, index, array){
                    var seleccionado = '';
                    if (elem.cedula == actualCedula){
                        seleccionado = ' selected';
                    }
                    selectUsuarios += '<option value="'+elem.id+'"'+seleccionado+'>'+elem.cedula+' '+elem.nombre+'</option>';
                });
                datos.cursos.forEach(function(elem, index, array){
                    var seleccionado = '';
                    if (elem.cedula == actualCurso){
                        seleccionado = ' selected';
                    }
                    selectCursos += '<option value="'+elem.id+'"'+seleccionado+'>'+elem.curso+'</option>';
                });
                var contenido = '<form class="form-horizontal"><div class="form-group"><label for="codigoCarta" class="col-sm-4 control-label">Código de carta</label><div class="col-sm-8"><input type="text" class="form-control" id="codigoCarta" placeholder="Código de carta" value="'+codCarta+'"></div></div><div class="form-group"><label for="qr" class="col-sm-4 control-label">Número de serie consecutivo QR</label><div class="col-sm-8"><input type="text" class="form-control" id="qr" placeholder="Número de serie consecutivo QR" value="'+numQR+'"></div></div><div class="form-group"><label for="factura" class="col-sm-4 control-label">Factura</label><div class="col-sm-8"><input type="text" class="form-control" id="factura" placeholder="Factura" value="'+factura+'"></div></div><div class="form-group"><label for="consecutivo" class="col-sm-4 control-label">Consecutivo operaciones</label><div class="col-sm-8"><input type="text" class="form-control" id="consecutivo" placeholder="Consecutivo operaciones" value="'+consecutivo+'"></div></div><div class="form-group"><label for="examen" class="col-sm-4 control-label">Servicio de examen</label><div class="col-sm-8"><input type="text" class="form-control" id="examen" placeholder="Servicio de examen" value="'+examen+'"></div></div>';
                contenido += '<div class="form-group"><label for="idUsuario" class="col-sm-4 control-label">Usuario</label><div class="col-sm-8"><select class="form-control selectpicker" id="idUsuario" data-live-search="true">'+selectUsuarios+'</select></div></div>';
                contenido += '<div class="form-group"><label for="idCurso" class="col-sm-4 control-label">Curso</label><div class="col-sm-8"><select class="form-control selectpicker" id="idCurso" data-live-search="true">'+selectCursos+'</select></div></div>';
                contenido += '<div class="form-group"><label for="fechaExp" class="col-sm-4 control-label">Fecha de expedición</label><div class="col-sm-8"><input type="text" class="form-control" id="fechaExp" placeholder="Fecha de expedición" value="'+fechaReg+'"></div></div><div class="form-group"><label for="ejecutivoCuenta" class="col-sm-4 control-label">Ejecutivo de cuenta</label><div class="col-sm-8"><input type="text" class="form-control" id="ejecutivoCuenta" placeholder="Ejecutivo de cuenta" value="'+ejecutivo+'"></div></div></form><a href="#" id="preliminarReg" class="btn btn-danger"><i class="fa fa-trash"></i> Eliminar el curso</a>';
                $('#ventanaModal .modal-title').html('Editar un curso');
                $('#ventanaModal .modal-body').html(contenido);
                $('#ventanaModal #guardarRegistro').show();
                $('.selectpicker').selectpicker('show');
                $('#ventanaModal').modal();
                $('#fechaExp').datetimepicker({
                    locale: 'es'
                });
                $('#ventanaModal #guardarRegistro').click(function(e){
                    $(this).unbind();
                    e.preventDefault();
                    var data = {};
                    $('#ventanaModal form .form-control').each(function(){
                        if($(this).attr('id') !== undefined) {
                            data[$(this).attr('id')] = $(this).val();
                        }
                    });
                    data.accion = 'editar';
                    data.tabla = 'registros';
                    data.id = id;
                    $.getJSON('php/editar.php', data, function(datos){
                        $('#ventanaModal .modal-body').html(datos.mensaje);
                        if (datos.resultado) {
                            $('#ventanaModal #guardarRegistro').hide();
                            $('#ventanaModal #cancelarForm').html('Cerrar');
                            actualizaTablas();
                        }
                    });
                });
                $('#ventanaModal #preliminarReg').click(function(e){
                    $(this).unbind();
                    e.preventDefault();
                    $('#ventanaModal .modal-body').html('¿Seguro que quiere eliminar el registro '+consecutivo+'?<br><a href="#" id="eliminarReg" class="btn btn-danger btn-block"><i class="fa fa-trash"></i> Eliminar el registro</a>');
                    $('#ventanaModal #guardarRegistro').hide();
                    $('#ventanaModal #eliminarReg').click(function(e){
                        $(this).unbind();
                        e.preventDefault();
                        var data = {'id': id, 'accion': 'eliminar', 'tabla': 'registros'};
                        $.getJSON('php/editar.php', data, function(datos){
                            $('#ventanaModal .modal-body').html(datos.mensaje);
                            if (datos.resultado) {
                                $('#ventanaModal #cancelarForm').html('Cerrar');
                                actualizaTablas();
                            }
                        });
                    });
                });
            });
        }
        function activaEdicionTablaUsuarios(objeto) {
            var fila = $(objeto).parent();
            var id = $(fila).children('td:nth-child(1)').html();
            var nombre = $(fila).children('td:nth-child(2)').html();
            var cedula = $(fila).children('td:nth-child(3)').html();
            var empresa = $(fila).children('td:nth-child(4)').html();
            var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreUsuario" class="col-sm-2 control-label">Nombre</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreUsuario" placeholder="Nombres y apellidos" value="'+nombre+'"></div></div><div class="form-group"><label for="cedulaUsuario" class="col-sm-2 control-label">Cédula</label><div class="col-sm-10"><input type="number" class="form-control" id="cedulaUsuario" placeholder="Cédula" value="'+cedula+'"></div></div> <div class="form-group"><label for="empresaUsuario" class="col-sm-2 control-label">Empresa</label><div class="col-sm-10"><input type="text" class="form-control" id="empresaUsuario" placeholder="Empresa" value="'+empresa+'"></div></div></form><a href="#" id="preliminarReg" class="btn btn-danger"><i class="fa fa-trash"></i> Eliminar el usuario</a>';
            $('#ventanaModal .modal-title').html('Editar un usuario');
            $('#ventanaModal .modal-body').html(contenido);
            $('#ventanaModal #guardarRegistro').show();
            $('#ventanaModal').modal();
            $('#ventanaModal #guardarRegistro').click(function(e){
                $(this).unbind();
                e.preventDefault();
                var data = {'id': id, 'nombre': $('#ventanaModal .modal-body #nombreUsuario').val(), 'cedula': $('#ventanaModal .modal-body #cedulaUsuario').val(), 'empresa': $('#ventanaModal .modal-body #empresaUsuario').val(), 'accion': 'editar', 'tabla': 'usuarios'};
                $.getJSON('php/editar.php', data, function(datos){
                    $('#ventanaModal .modal-body').html(datos.mensaje);
                    if (datos.resultado) {
                        $('#ventanaModal #guardarRegistro').hide();
                        $('#ventanaModal #cancelarForm').html('Cerrar');
                        actualizaTablas();
                    }
                });
            });
            $('#ventanaModal #preliminarReg').click(function(e){
                $(this).unbind();
                e.preventDefault();
                $('#ventanaModal .modal-body').html('¿Seguro que quiere eliminar al usuario con la cédula '+$('#ventanaModal .modal-body #cedulaUsuario').val()+'?<br><a href="#" id="eliminarReg" class="btn btn-danger btn-block"><i class="fa fa-trash"></i> Eliminar el usuario</a>');
                $('#ventanaModal #guardarRegistro').hide();
                $('#ventanaModal #eliminarReg').click(function(e){
                    $(this).unbind();
                    e.preventDefault();
                    var data = {'id': id, 'accion': 'eliminar', 'tabla': 'usuarios'};
                    $.getJSON('php/editar.php', data, function(datos){
                        $('#ventanaModal .modal-body').html(datos.mensaje);
                        if (datos.resultado) {
                            actualizaTablas();
                            $('#ventanaModal #cancelarForm').html('Cerrar');
                        }
                    });
                });
            });
        }
        function activaEdicionTablaCursos(objeto) {
            var fila = $(objeto).parent();
            var id = $(fila).children('td:nth-child(1)').html();
            var nombre = $(fila).children('td:nth-child(2)').html();
            var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreCurso" class="col-sm-2 control-label">Nombre del curso</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreCurso" placeholder="Nombre del curso" value="'+nombre+'"></div></div></form><a href="#" id="preliminarReg" class="btn btn-danger"><i class="fa fa-trash"></i> Eliminar el curso</a>';
            $('#ventanaModal .modal-title').html('Editar un curso');
            $('#ventanaModal .modal-body').html(contenido);
            $('#ventanaModal #guardarRegistro').show();
            $('#ventanaModal').modal();
            $('#ventanaModal #guardarRegistro').click(function(e){
                $(this).unbind();
                e.preventDefault();
                var data = {'id': id, 'nombre': $('#ventanaModal .modal-body #nombreCurso').val(), 'accion': 'editar', 'tabla': 'cursos'};
                $.getJSON('php/editar.php', data, function(datos){
                    $('#ventanaModal .modal-body').html(datos.mensaje);
                    if (datos.resultado) {
                        $('#ventanaModal #guardarRegistro').hide();
                        $('#ventanaModal #cancelarForm').html('Cerrar');
                        actualizaTablas();
                    }
                });
            });
            $('#ventanaModal #preliminarReg').click(function(e){
                $(this).unbind();
                e.preventDefault();
                $('#ventanaModal .modal-body').html('¿Seguro que quiere eliminar el curso '+nombre+'?<br><a href="#" id="eliminarReg" class="btn btn-danger btn-block"><i class="fa fa-trash"></i> Eliminar el curso</a>');
                $('#ventanaModal #guardarRegistro').hide();
                $('#ventanaModal #eliminarReg').click(function(e){
                    $(this).unbind();
                    e.preventDefault();
                    var data = {'id': id, 'accion': 'eliminar', 'tabla': 'cursos'};
                    $.getJSON('php/editar.php', data, function(datos){
                        $('#ventanaModal .modal-body').html(datos.mensaje);
                        if (datos.resultado) {
                            actualizaTablas();
                            $('#ventanaModal #cancelarForm').html('Cerrar');
                        }
                    });
                });
            });
        }
    }
    function limpiarAdmin() {
        $('#tablaRegistros').html('');
        $('#tablaUsuarios').html('');
        $('#tablaCurs').html('');
        $('.filaAdmin').hide();
        $('.filaUsuarios').show();
    }
    function actualizaTablas() {
        tablaCurs.update(function(e){}, true);
        tablaUsuarios.update(function(e){}, true);
        tablaRegistros.update(function(e){}, true);
    }
    $('#cuerpoUsuarios').on('show.bs.collapse', function () {
        $('#colapsaUsuarios i').removeClass('fa-caret-right').addClass('fa-caret-down');
    });
    $('#cuerpoUsuarios').on('hide.bs.collapse', function () {
        $('#colapsaUsuarios i').removeClass('fa-caret-down').addClass('fa-caret-right');
    });
    $('#cuerpoCursos').on('show.bs.collapse', function () {
        $('#colapsaCursos i').removeClass('fa-caret-right').addClass('fa-caret-down');
    });
    $('#cuerpoCursos').on('hide.bs.collapse', function () {
        $('#colapsaCursos i').removeClass('fa-caret-down').addClass('fa-caret-right');
    });
    $('#ventanaModal').on('hide.bs.modal', function (e) {
        $('#ventanaModal #cancelarForm').html('Cancelar');
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        $('#ventanaModal .modal-title').html('');
        $('#ventanaModal .modal-body').html('');
    });
});
