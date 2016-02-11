$(function(){
    $('.resultadoCursos').hide();
    $('.noResultados').hide();
    $('.filaAdmin').hide();
    $('#nuevoUsuario').click(function(e){
        e.preventDefault();
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        var contenido = '<form class="form-horizontal"><div class="form-group"><label for="nombreUsuario" class="col-sm-2 control-label">Nombre</label><div class="col-sm-10"><input type="text" class="form-control" id="nombreUsuario" placeholder="Nombres y apellidos"></div></div><div class="form-group"><label for="cedulaUsuario" class="col-sm-2 control-label">Cédula</label><div class="col-sm-10"><input type="number" class="form-control" id="cedulaUsuario" placeholder="Cédula"></div></div> <div class="form-group"><label for="empresaUsuario" class="col-sm-2 control-label">Empresa</label><div class="col-sm-10"><input type="text" class="form-control" id="empresaUsuario" placeholder="Empresa"></div></div></form>';
        $('#ventanaModal .modal-title').html('Registrar un nuevo usuario');
        $('#ventanaModal .modal-body').html(contenido);
        $('#ventanaModal').modal();
        guardarRegistro(contenido);
    });
    function guardarRegistro(contenido) {
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
        $('#ventanaModal .modal-body #nombreUsuario').val(data.nombre);
        $('#ventanaModal .modal-body #cedulaUsuario').val(data.cedula);
        $('#ventanaModal .modal-body #empresaUsuario').val(data.empresa);
        $('#ventanaModal #guardarRegistro').html('Guardar cambios');
        guardarRegistro(contenido);
    }
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
});
