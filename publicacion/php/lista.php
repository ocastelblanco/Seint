<?php
require('inc.php');
header('Content-Type: application/json');
if (count($_GET) == 0) {
    $tabla = "";
} else {
    $tabla = $_GET['tabla'];
}
$cursos = array();
$mysqli = new mysqli($SERVIDOR, $USUARIO, $CLAVE, $DB);
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
    exit();
}
// Si se pidió una tabla de usuarios
if ($tabla == 'usuarios') {
    $usuarios = array();
    if ($resultUsers = $mysqli->query("SELECT * FROM $TABLA_USUARIOS")) {
        while ($linea = $resultUsers->fetch_row()) {
            if ($linea[5]) {
                array_push($usuarios, array(
                    'id'=>$linea[0],
                    'Nombre'=>$linea[1],
                    'Cédula'=>$linea[2],
                    'Empresa'=>$linea[3],
                    'Fecha de registro'=>$linea[4]
                ));
            }
        }
        $resultUsers->close();
    }
    $salida = array('cols'=>array(
        'id'=>array('index'=>1,'type'=>'number','unique'=>true),
        'Nombre'=>array('index'=>2,'type'=>'string'),
        'Cédula'=>array('index'=>3,'type'=>'number'),
        'Empresa'=>array('index'=>4,'type'=>'string'),
        'Fecha de registro'=>array('index'=>5,'type'=>'date', 'dataFormat'=>'dd-MM-yyyy')
    ),'rows'=>$usuarios);
} elseif ($tabla == 'cursos') {
    $cursos = array();
    if ($resultCursos = $mysqli->query("SELECT * FROM $TABLA_CURSOS")) {
        while ($fila = $resultCursos->fetch_row()) {
            if ($fila[3]) {
                array_push($cursos, array(
                    'id'=>$fila[0],
                    'Curso'=>$fila[1]
                ));
            }
        }
        $resultCursos->close();
    }
    $salida = array('cols'=>array(
        'id'=>array('index'=>1,'type'=>'number','unique'=>true),
        'Curso'=>array('index'=>2,'type'=>'string')
    ),'rows'=>$cursos);
} else { // Si no se pidió ningún tipo de tabla, se genera una completa
    if ($result = $mysqli->query("SELECT * FROM $TABLA_REGISTRO")) {
        while ($row = $result->fetch_row()) {
            $datosCurso = $row;
            if ($resultCursos = $mysqli->query("SELECT * FROM $TABLA_CURSOS")) {
                while ($fila = $resultCursos->fetch_row()) {
                    if ($fila[0] == $row[9]) {
                        array_splice($datosCurso, 9, 1, $fila[1]);
                    }
                }
            }
            $resultCursos->close();
            if ($resultUsers = $mysqli->query("SELECT * FROM $TABLA_USUARIOS")) {
                while ($linea = $resultUsers->fetch_row()) {
                    if ($linea[0] == $row[8]) {
                        array_splice($datosCurso, 8, 1, array($linea[1], $linea[2], $linea[3]));
                    }
                }
            }
            $resultUsers->close();
            if ($row[11] != 0) {
                array_push($cursos, array(
                    'id'=>$datosCurso[0],
                    'Codigo de Carta'=>$datosCurso[1],
                    'Número de Serie'=>$datosCurso[2],
                    'Factura'=>$datosCurso[3],
                    'Consecutivo'=>$datosCurso[4],
                    'Examen'=>$datosCurso[5],
                    'Nombre'=>$datosCurso[8],
                    'Cédula'=>$datosCurso[9],
                    'Empresa'=>$datosCurso[10],
                    'Curso'=>$datosCurso[11],
                    'Fecha'=>$datosCurso[6],
                    'Ejecutivo de cuenta'=>$datosCurso[7]
                ));
            }
        }
        $result->close();
    }
    $salida = array('cols'=>array(
        'id'=>array('index'=>1,'type'=>'number','unique'=>true),
        'Codigo de Carta'=>array('index'=>2,'type'=>'string'),
        'Número de Serie'=>array('index'=>3,'type'=>'string'),
        'Factura'=>array('index'=>4,'type'=>'string'),
        'Consecutivo'=>array('index'=>5,'type'=>'string'),
        'Examen'=>array('index'=>6,'type'=>'string'),
        'Nombre'=>array('index'=>7,'type'=>'string'),
        'Cédula'=>array('index'=>8,'type'=>'number'),
        'Empresa'=>array('index'=>9,'type'=>'string'),
        'Curso'=>array('index'=>10,'type'=>'string'),
        'Fecha'=>array('index'=>11,'type'=>'string'),
        'Ejecutivo de cuenta'=>array('index'=>12,'type'=>'string')
    ),'rows'=>$cursos);
}
echo json_encode($salida);
$mysqli->close();
?>
