<?php
require_once "../modelo/class.Personaje.php";
require_once "../modelo/class.Usuario.php";

$data = json_decode(file_get_contents('php://input'), true);
if($data){

    // if(isset($data['user'])&&isset($data['nombre'])&&isset($data['imagen'])&&isset($data['puntosAtaque'])&&isset($_POST['puntosDefensa'])){
        $xprod= new Usuario( );
        $retorno=$xprod->consultar();

    // }
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($retorno, JSON_UNESCAPED_UNICODE);
}