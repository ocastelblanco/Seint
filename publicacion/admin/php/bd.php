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
$columnas['usuarios'] = ['id', 'Nombre', 'Cedula', 'Empresa', 'FechaReg', 'activo'];
$columnas['cursos'] = ['id', 'NombreCurso', 'FechaReg', 'activo'];
$columnas['registros'] = ['id', 'CodigoCarta', 'NumCert', 'Factura', 'Consecutivo', 'ServExamen', 'FechaExp', 'EjecutivoCuenta', 'CodUsuario', 'CodCurso', 'FechaReg', 'activo'];
$data['usuarios'] = $database->select($TABLA['usuarios'], $columnas['usuarios']);
$data['cursos'] = $database->select($TABLA['cursos'], $columnas['cursos']);
//$data['registros'] = $database->select($TABLA['registros'], $columnas['registros']);
if ($accion == 'leer') {
    $salida = [];
    if ($tbl != 'registros') {
        foreach($data[$tbl] as $llave => $dato) {
            /*
            if($tbl == 'registros'){
                $usuario = obtenerID($dato['CodUsuario'], $data['usuarios'], 'Nombre');
                $curso = obtenerID($dato['CodCurso'], $data['cursos'], 'NombreCurso');
                $dato['CodUsuario'] = $usuario;
                $dato['CodCurso'] = $curso;
            }
            */
            if($dato['activo']) {
                array_pop($dato);
                array_push($salida, $dato);
            }
        }
        print_r(json_encode($salida, JSON_UNESCAPED_UNICODE));
    } else {
        $dataReg = $database->select($TABLA['registros'], $columnas['registros']);
        echo "[";
        foreach($dataReg as $llave => $dato) {
            if($dato['activo']) {
                //array_push($salida, $dato);
                echo json_encode($dato, JSON_UNESCAPED_UNICODE);
            }
            if ($llave < (count($dataReg)-1) && $dataReg[$llave+1]['activo']) {
                echo ',';
            }
        }
        echo "]";
    }
    //print_r(json_encode($salida, JSON_UNESCAPED_UNICODE));
}
function obtenerID($id, $tabla, $campo){
    foreach($tabla as $dato) {
        if ($dato['id'] == $id) {
            return $dato[$campo];
        }
    }
}
?>
