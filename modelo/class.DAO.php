<?php


require_once "class.conexionDAO.php";
class DAO{

    private $conn;
    private $strSQL;

    public function __construct(){
        $this->conn=conectar();
    }

    public function ejecutarSQL($sql){
        $array=array();
        $resultado= $this->conn->query($sql);
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
            $array['info'] = $resultado->fetch_all(  );
            $array['rc']=0;
            $array['errmsg']="";
        }
        return $array;

    }
}