<?php
header('Content-Type: application/json');
require('inc.php');
$mysqli = new mysqli($SERVIDOR, $USUARIO, $CLAVE, $DB);
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
$query = "SELECT * FROM `$TABLA_USUARIOS` WHERE `Cedula` = '".$_GET['cedula']."'";
if ($result = $mysqli->query($query)) {
    if($result->num_rows) {
        $salida = array('resultado'=>false, 'mensaje'=>'La cédula '.$_GET['cedula'].' ya ha sido registrada. Por favor, verifique los datos.');
    } else {
        $query = "INSERT INTO `$TABLA_USUARIOS` (`id`, `Nombre`, `Cedula`, `Empresa`, `FechaReg`) VALUES (NULL, '".$_GET['nombre']."', '".$_GET['cedula']."', '".$_GET['empresa']."', CURRENT_DATE());";
        if (!$mysqli->query($query)) {
            $salida = array('resultado'=>false, 'mensaje'=>'Error al registrar el usuario. Revise los datos e intente de nuevo.');
        } else {
            $salida = array('resultado'=>true, 'mensaje'=>'Usuario guardado con éxito.<br><br>¿Desea ingresar un nuevo usuario?');
        }
    }
    $result->close();
}
$mysqli->close();
echo json_encode($salida);
?>
