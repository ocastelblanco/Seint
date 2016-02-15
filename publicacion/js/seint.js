$(function(){
    $('.resultadoCursos').hide();
    $('.noResultados').hide();
    $('.filaAdmin').hide();
    //---------------------> Registro de cursos nuevos
    $('#nuevoCurso').click(function(e){
        e.preventDefault();
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreCurso" class="col-sm-2 control-label">Nombre del curso</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreCurso" placeholder="Nombre del curso"></div></div></form>';
        $('#ventanaModal .modal-title').html('Registrar un nuevo curso');
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal').modal();
        guardarRegistroCurso(contenido);
    });
    function guardarRegistroCurso(contenido) {
        $('#ventanaModal #guardarRegistro').click(function(e){
            $(this).unbind();
            e.preventDefault();
            var data = {'nombre': $('#ventanaModal .modal-body #nombreCurso').val()};
            $.getJSON('php/save.php', data, function(datos){
                $('#ventanaModal .modal-body').html(datos.mensaje);
                if (datos.resultado) {
                    iniciaListaAdmin();
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
                    iniciaListaAdmin();
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
            $('#ventanaModal').modal();
            $('#fechaExp').datetimepicker({
                locale: 'es'
            });
            guardarRegistro(contenido, $('#ventanaModal form .form-control'));
        });
    });
    function guardarRegistro(contenido, formulario) {
        $('#ventanaModal #guardarRegistro').click(function(e){
            $(this).unbind();
            e.preventDefault();
            var data = {};
            $(formulario).each(function(){
                if($(this).attr('id') !== undefined) {
                    data[$(this).attr('id')] = $(this).val();
                }
            });
            console.log(data);
            /*
            $.getJSON('php/save.php', data, function(datos){
                $('#ventanaModal .modal-body').html(datos.mensaje);
                if (datos.resultado) {
                    iniciaListaAdmin();
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
            */
        });
    }
    function iniciarContenido(contenido, data){
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal .modal-body #nombreCurso').val(data.nombre);
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        guardarRegistro(contenido);
    }
    // ---------------------------------------------> Ingreso de cédula por usuario normal
    $('#formLogin').on('submit', function(e){
        e.preventDefault();
        $('#menuLogin').dropdown('toggle');
        var usuario = $('#formLogin #admin').val();
        var clave = $('#formLogin #claveAdmin').val();
        $.getJSON('php/md5.php?usuario='+usuario+'&clave='+clave, function(datos){
            // usuario: admin
            // clave: S31nt!
            if (datos.usuario == '21232f297a57a5a743894a0e4a801fc3' &&
                datos.clave == '661341e8ff3955bf75bd2204bbd30b7b') {
                $('.filaAdmin').show();
                $('.filaUsuarios').hide();
                iniciaListaAdmin();
            }
        });
    });
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
    function iniciaListaAdmin() {
        // Carga la tabla de listado general de registros de curso
        $.getJSON('php/lista.php', function(datos){
            $('#tablaRegistros').html('');
            $('#tablaRegistros').WATable({
                columnPicker: true,
                data: datos
            });
        });
        // Carga la tabla de listado general de usuarios
        $.getJSON('php/lista.php?tabla=usuarios', function(datos){
            $('#tablaUsuarios').html('');
            $('#tablaUsuarios').WATable({
                data: datos
            });
        });
        // Carga la tabla de listado general de cursos
        $.getJSON('php/lista.php?tabla=cursos', function(datos){
            $('#tablaCurs').html('');
            $('#tablaCurs').WATable({
                data: datos
            });
        });
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
});
