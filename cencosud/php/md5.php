<?php
header('Content-Type: application/json');
echo json_encode(array('usuario'=>md5($_GET['usuario']), 'clave'=>md5($_GET['clave'])));
?>
