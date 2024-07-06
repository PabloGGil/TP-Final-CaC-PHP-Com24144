<?php


require_once "../modelo/class.Usuario.php";
$data = json_decode(file_get_contents('php://input'), true);

// $username = $data['username'];
// $password = $data['password'];

require_once "..\\modelo\\class.usuario.php";

// --- verificar que los datos necesarios no esten vacios

if(isset($data['valueEmail'])&&isset($data['valuepass'])){
    $correo=$data['valueEmail'];
    $password=$data['valuepass'];
    $usuario=new Usuario( );
    if($usuario->LoginOK($correo,$password)){
        $retorno['rc']=0;
        $retorno['msgerror']="";
        $retorno['info']=true;
    }
    else{
        $retorno['rc']=1;
        $retorno['msgerror']="login fallido";
        $retorno['info']=null;
       
    }
}else{
    $retorno['rc']=1;
    $retorno['msgerror']="Datos insuficientes, por favor vuelva a cargar";
    $retorno['info']=null;
    
}
header('Content-Type: application/json');
http_response_code(200);
echo json_encode($retorno,JSON_PARTIAL_OUTPUT_ON_ERROR);

