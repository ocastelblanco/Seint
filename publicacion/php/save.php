<?php
header('Content-Type: application/json');
require('inc.php');
if (array_key_exists('cedula',$_GET)) {
    $palabra = "usuario";
    $llaveBuscar = "Cedula";
    $valorBuscar = $_GET['cedula'];
    $msgError = "La cédula $valorBuscar ya ha sido registrada.";
    $llaveInsertar = "`Nombre`, `Cedula`, `Empresa`,";
    $valorInsertar = "'".$_GET['nombre']."', '".$_GET['cedula']."', '".$_GET['empresa']."',";
    $tabla = $TABLA_USUARIOS;
} elseif (array_key_exists('nombre',$_GET)) {
    $palabra = "curso";
    $llaveBuscar = "NombreCurso";
    $valorBuscar = $_GET['nombre'];
    $msgError = "El curso $valorBuscar ya ha sido registrado.";
    $llaveInsertar = "`NombreCurso`,";
    $valorInsertar = "'".$_GET['nombre']."',";
    $tabla = $TABLA_CURSOS;
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
$query = "SELECT * FROM `$tabla` WHERE `$llaveBuscar` = '$valorBuscar'";
if ($result = $mysqli->query($query)) {
    if($result->num_rows) {
        $salida = array("resultado"=>false, "mensaje"=>"$msgError Por favor, verifique los datos.");
    } else {
        $query = "INSERT INTO `$tabla` (`id`, $llaveInsertar `FechaReg`) VALUES (NULL, $valorInsertar CURRENT_DATE());";
        if (!$mysqli->query($query)) {
            $salida = array("resultado"=>false, "mensaje"=>"Error al guardar el $palabra. Revise los datos e intente de nuevo.");
        } else {
            $salida = array("resultado"=>true, "mensaje"=>"El $palabra ha sido guardado con éxito.<br><br>¿Desea ingresar un nuevo $palabra?");
        }
    }
    $result->close();
}
$mysqli->close();
echo json_encode($salida);
?>
