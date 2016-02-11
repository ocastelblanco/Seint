<?php
header('Content-Type: application/json');
require('inc.php');
$numCedula = $_GET["cedula"];
$curso = array();
$listadoCursos = array();
$mysqli = new mysqli($SERVIDOR, $USUARIO, $CLAVE, $DB);
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
if ($result = $mysqli->query("SELECT * FROM $TABLA_USUARIOS")) {
    while ($row = $result->fetch_row()) {
        if ($row[2] == $numCedula) {
            $idUsuario = $row[0];
            $nombre = $row[1];
        }
    }
    $result->close();
}
if ($result = $mysqli->query("SELECT * FROM $TABLA_CURSOS")) {
    while ($row = $result->fetch_row()) {
        array_push($listadoCursos, $row[0], $row[1]);
    }
    $result->close();
}
if ($result = $mysqli->query("SELECT * FROM $TABLA_REGISTRO")) {
    while ($row = $result->fetch_row()) {
        if ($row[8] == $idUsuario) {
            $datosCurso = $row;
            if ($resultCursos = $mysqli->query("SELECT * FROM $TABLA_CURSOS")) {
                while ($fila = $resultCursos->fetch_row()) {
                    if ($fila[0] == $row[9]) {
                        array_splice($datosCurso, 9, 1, $fila[1]);
                    }
                }
            }
            $resultCursos->close();
            array_push($curso, $datosCurso);
        }
    }
    $result->close();
}
$salida = array('nombre' => $nombre, 'cedula' => $numCedula, "cursos" => $curso);
echo json_encode($salida);
$mysqli->close();
?>
