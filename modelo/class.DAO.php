<?php


require_once "class.conexionDAO.php";
class DAO{

    private $conn;
    private $strSQL;

    public function __construct(){
        // $this->conn=conectar();
        $connexion = new mysqli("localhost", "root", "", "pokemon");
        if ($connexion->connect_errno) {
            echo "Falló la conexión con MySQL: (" . $connexion->connect_errno . ") " . $connexion->connect_error;
        }
        $this->conn = $connexion;
    }

    
    public function ejecutarSQL($sql){
        // if ($this->conn->execute_query($sql)) {
        //     echo "Error en la ejecución de la consulta: " . $this->conn->error;
        //     return false;
        // }
        // $this->conn->execute_query($sql);
        // Obtener resultados
        $resultado = $this->conn->query($sql);
        if ($resultado === false) {
            return $this->conn->affected_rows; // Si no hay resultados, devolver el número de filas afectadas
        }
    
        // return $resultado->fetch_all(MYSQLI_ASSOC);
        // $array=array();
        // $resultado= $this->conn->query($sql);
        if(!$resultado){
            $array['errmsg']=mysqli_error($this->conn);
            $array['rc']=1;
            $array['info'] =null;
        }else{
            
            $array['errmsg']="";
            $array['rc']=0;
            $array['info'] =$resultado;
        }
        if ($resultado instanceof mysqli_result){
            $array['info'] = $resultado->fetch_all(MYSQLI_ASSOC);
            $array['rc']=0;
            $array['errmsg']="";
        }
        return $array;

    }
}