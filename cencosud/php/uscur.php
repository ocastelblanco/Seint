<?php
require('inc.php');
header('Content-Type: application/json');
$cursos = array();
$usuarios = array();
$mysqli = new mysqli($SERVIDOR, $USUARIO, $CLAVE, $DB);
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
if ($resultUsers = $mysqli->query("SELECT * FROM $TABLA_USUARIOS")) {
    while ($linea = $resultUsers->fetch_row()) {
        array_push($usuarios, array(
            'id'=>$linea[0],
            'nombre'=>$linea[1],
            'cedula'=>$linea[2]
        ));
    }
    $resultUsers->close();
}
if ($resultCursos = $mysqli->query("SELECT * FROM $TABLA_CURSOS")) {
    while ($fila = $resultCursos->fetch_row()) {
        array_push($cursos, array(
            'id'=>$fila[0],
            'curso'=>$fila[1]
        ));
    }
    $resultCursos->close();
}
$salida = array('usuarios'=>$usuarios,'cursos'=>$cursos);
echo json_encode($salida);
$mysqli->close();
?>
