<?php
require('inc.php');
header('Content-Type: application/json');
$id = $_GET['id'];
$palabra = substr($_GET['tabla'],0,-1);
$accion = substr($_GET['accion'],0,-1).'do';
if ($_GET['tabla'] == "usuarios") {
    $tabla = $TABLA_USUARIOS;
    $query = "UPDATE `$tabla` SET `Nombre` = '".$_GET['nombre']."', `Cedula` = '".$_GET['cedula']."', `Empresa` = '".$_GET['empresa']."', `activo` = '1' WHERE `$TABLA_USUARIOS`.`id` = $id;";
}
if ($_GET['tabla'] == "cursos") {
    $tabla = $TABLA_CURSOS;
    $query = "UPDATE `$tabla` SET `NombreCurso` = '".$_GET['nombre']."', `activo` = '1' WHERE `$TABLA_CURSOS`.`id` = $id;";
}
if ($_GET['tabla'] == "registros") {
    $tabla = $TABLA_REGISTRO;
    $fechaExp = substr($_GET['fechaExp'],6,4)."-".substr($_GET['fechaExp'],3,2)."-".substr($_GET['fechaExp'],0,2);
    $query = "UPDATE `$tabla` SET `CodigoCarta` = '".$_GET['codigoCarta']."', `NumCert` = '".$_GET['qr']."', `Factura` = '".$_GET['factura']."', `Consecutivo` = '".$_GET['consecutivo']."', `ServExamen` = '".$_GET['examen']."', `FechaExp` = '$fechaExp', `EjecutivoCuenta` = '".$_GET['ejecutivoCuenta']."', `CodUsuario` = '".$_GET['idUsuario']."', `CodCurso` = '".$_GET['idCurso']."', `activo` = '1' WHERE `$TABLA_REGISTRO`.`id` = $id;";
}
if ($_GET['accion'] == 'eliminar') {
    $query = "UPDATE `$tabla` SET `activo` = '0' WHERE `$tabla`.`id` = $id;";
}
$mysqli = new mysqli($SERVIDOR, $USUARIO, $CLAVE, $DB);
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
if (!$mysqli->query($query)) {
    $salida = array("resultado"=>false, "mensaje"=>"Error al ".$_GET['accion']." el $palabra. ".$query);
} else {
    $salida = array("resultado"=>true, "mensaje"=>"El $palabra ha sido $accion con éxito.");
}
$mysqli->close();
echo json_encode($salida);
?>