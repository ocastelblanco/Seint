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
$tbl = $_GET['tabla'];
$accion = $_GET['accion'];
$tabla = $TABLA[$tbl];
$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'FechaReg', 'activo'];
//$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'Empresa', 'FechaReg', 'activo'];
$columnas['cursos'] = ['id', 'NombreCurso', 'FechaReg', 'activo'];
$columnas['registros'] = ['id', 'CodigoCarta', 'NumCert', 'Factura', 'Consecutivo', 'ServExamen', 'FechaExp', 'EjecutivoCuenta', 'CodUsuario', 'CodCurso', 'FechaReg', 'activo'];
$data['usuarios'] = $database->select($TABLA['usuarios'], $columnas['usuarios']);
$data['cursos'] = $database->select($TABLA['cursos'], $columnas['cursos']);
$data['registros'] = $database->select($TABLA['registros'], $columnas['registros']);
if ($accion == 'leer') {
    $salida = [];
    foreach($data[$tbl] as $llave => $dato) {
        if($dato['activo']) {
            array_pop($dato);
            array_push($salida, $dato);
        }
    }
    echo json_encode($salida, JSON_UNESCAPED_UNICODE);
}
function obtenerID($id, $tabla, $campo){
    foreach($tabla as $dato) {
        if ($dato['id'] == $id) {
            return $dato[$campo];
        }
    }
}
?>