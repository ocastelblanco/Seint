<?php
require_once('medoo.php');
require_once('../../php/inc.php');
$database = new medoo([
	'database_type' => 'mysql',
	'database_name' => $DB,
	'server' => $SERVIDOR,
	'username' => $USUARIO,
	'password' => $CLAVE,
	'charset' => 'utf8'
]);
$params = json_decode(file_get_contents('php://input'),true);
$tbl = $params['tabla'];
$accion = $params['accion'];
$tabla = $TABLA[$tbl];
$datos = $params['datos'];
$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'Empresa', 'FechaReg', 'activo'];
$columnas['cursos'] = ['id', 'NombreCurso', 'FechaReg', 'activo'];
$columnas['registros'] = ['id', 'CodigoCarta', 'NumCert', 'Factura', 'Consecutivo', 'ServExamen', 'FechaExp', 'EjecutivoCuenta', 'CodUsuario', 'CodCurso', 'FechaReg', 'activo'];
if ($accion == 'guardar') {
    if ($datos['id']){
        $database->update($tabla,$datos,['id'=>$datos['id']]);
    } else {
        $datos['activo'] = 1;
        $datos['FechaReg'] = date('Y-m-d');
        $database->insert($tabla,$datos);
    }
}
if ($accion == 'eliminar') {
    if ($datos['id']){
        $database->update($tabla,['activo'=>0],['id'=>$datos['id']]);
    }
}
?>