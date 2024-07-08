<?php
require_once "class.DAO.php";
require_once "class.Relacion.php";
class Usuario{

    const MAXPOKE=5;
    private $Username; 
    private $Correo; 
    private $Password;
    private $FechaRegistro;
    private $cant="";

    public function __construct($nombre="",$apellido="",$correo="",$password="",$fecha="")
    {
       if($apellido!=""){
        $username=$nombre."-".$apellido;
       }else{
        $username=$nombre;
       }

       $this->setUsername($username);
       $this->setCorreo($correo);
       $this->setPassword($password);
       $this->setFechaRegistro($fecha);
       $this->cant=0;
    }

    /*-----------getters------------------*/
    public function getUsername (){
        return $this->Username;
    }

    public function getCorreo (){
        return $this->Correo;
    }

    public function getPassword (){
        return $this->Password;
    }

    public function getFechaRegistro (){
        return $this->FechaRegistro;
    }

  

    /*-----------setters------------------*/

    public function setUsername ($aux){
        $this->Username=$aux;
    }

    public function setCorreo ($aux){
        $this->Correo=$aux;
    }

    public function setPassword ($aux){
        $this->Password=$aux;
    }

    public function setFechaRegistro ($fecha){
      
        $this->FechaRegistro=$fecha;
    }

    /*-----------metodos------------------*/
    public function consultar(){
        $filtro="";
        $strSQL=" SELECT username,correo,password,fechaRegistro FROM USUARIO ";
        //echo $strSQL;
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        return $data;
    }

    public function existe($username){
        $strSQL=" SELECT count(username) as cuenta FROM USUARIO where username='{$username}'";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        if($data['info'][0]['cuenta']!=0){
            return true;
        }else{
            return false;
        }
    }

    public function insertarReg(){
        if(!$this->existe($this->getUsername())){
            $strSQL="INSERT INTO USUARIO(username,correo,password,fechaRegistro) VALUES('{$this->getUsername()}','{$this->getCorreo()}','{$this->getPassword()}',CURDATE())";
            //echo $strSQL;
            $dao=new DAO();
            $array=$dao->ejecutarSQL($strSQL);
        }else{
            $array['info'] = "";
            $array['rc']=1;
            $array['errmsg']=" el username ya existe";
        }
        return $array;
    }

    public function actualizarReg(){
       
        $strSQL="UPDATE USUARIO SET ";
        //echo $strSQL;
        $dao=new DAO();
        $dao->ejecutarSQL($strSQL);
    }

    public function BorrarReg(){
      
        if(isset($nombreUsr)){
            //  aca borrar primero todos los registros de la tabla grupos
            
            $strSQL="DELETE FROM USUARIO WHERE username='{$this->getUsername()}'";
           // echo $strSQL;
            $dao=new DAO();
            $dao->ejecutarSQL($strSQL);
        }
    }

    public function LoginOK($usuario,$password){
        $dao=new DAO();
        $login=$dao->ejecutarSQL("select count(username) as cuenta from usuario where correo='{$usuario}' and password='{$password}'");
        if($login['rc']==0){
            if($login['info'][0]['cuenta']>=1){
                // login exitoso
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function getID(){
        $daousr=new DAO();
        $res=$daousr->ejecutarSQL("SELECT ID from usuario where username='{$this->getUsername()}'");
        // var_dump($res);
        return $res['info'][0]['ID'];
    }
    Public function VincularPoke($nombrepoke){
       
        $poke=new personaje($nombrepoke);
        $id_usr=$this->getID();
        $id_personaje=$poke->getID();
        $trel=new Relacion($id_personaje,$id_usr);
        if($trel->CantPoke()>self::MAXPOKE-1){
            $rta['rc']=1;
            $rta['errmsg']= "Supero la cantidad de 5 poke asociados";
            $rta['info']=null;
            return $rta;
        }else{
        // if ($this->Username)){
            
            $rta=$trel->insertar( );
            
            return $rta;
        }
       
        


    }

    Public function DesvincularPoke($nombrepoke){
       
        $poke=new personaje($nombrepoke);
        // if (isset($this->Username)){
            $id_usr=$this->getID();
            $id_personaje=$poke->getID();
            $trel=new Relacion($id_personaje,$id_usr);
            $trel->eliminar( );
           
        // }


    }
    
}