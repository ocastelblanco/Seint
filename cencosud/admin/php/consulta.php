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
$item = $_GET['item'];
$tabla = $TABLA['usuarios'];
$where = ['OR'=>['Nombre[~]'=>$item, 'Cedula[~]'=>$item]];
//$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'Empresa', 'FechaReg', 'activo'];
$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'FechaReg', 'activo'];
$data = $database->select($TABLA['usuarios'], $columnas['usuarios'], $where);
foreach ($data as $llave => $valor) {
    $data[$llave]['Usuario'] = $data[$llave]['Cedula'].' '.$data[$llave]['Nombre'];
}
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>