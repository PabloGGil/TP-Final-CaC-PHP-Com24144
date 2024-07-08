<?php
require_once "class.DAO.php";

class Relacion{

    private $id;
    private $id_poke;
    private $id_usr;
    

    public function __construct($id_poke,$id_usr)
    {
       $this->id_poke = $id_poke;
       $this->id_usr = $id_usr;
    }

    /*-----------getters------------------*/
    public function getid (){
        return $this->id;
    }

    public function getid_poke (){
        return $this->id_poke;
    }

    public function getid_usr (){
        return $this->id_usr;
    }


  

    /*-----------setters------------------*/

    public function setid ($aux){
        $this->id=$aux;
    }

    public function setid_poke ($aux){
        $this->id_poke=$aux;
    }

    public function setid_usr ($aux){
        $this->id_usr=$aux;
    }

 
    

    /*-----------metodos------------------*/
    public function consultarBD(){
        $strSQL="select u.username ,p.nombre, p.alto ,p.peso,p.imagen 
                from pokemon.usuario u ,pokemon.personaje p ";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        return $data;
    }
    public function ExisteRel(){
        $strSQL=" SELECT count(id) as cuenta FROM GRUPOS where id_personaje={$this->getid_poke()} AND id_usuario={$this->getid_usr()}";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        if($data['info'][0]['cuenta']!=0){
            return true;
        }else{
            return false;
        }

    }

    public function CantPoke(){
        $strSQL="SELECT count(id) as cuenta FROM GRUPOS where id_usuario={$this->getid_usr()}";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        return $data['info'][0]['cuenta'];

    }
    public function insertar(){
        
        if(!$this->ExisteRel()){
            $strSQL="INSERT INTO GRUPOS(id_personaje,id_usuario) VALUES({$this->getid_poke()},{$this->getid_usr()})";
            
            $dao=new DAO();
            $resultado=$dao->ejecutarSQL($strSQL);
        }else{
            $resultado['rc']=1;
            $resultado['errmsg']="el usuario ya tiene este pokemon asociado";
        }
        return $resultado;
    }
    public function eliminar(){
        if(!$this->ExisteRel()){
            $strSQL="DELETE FROM GRUPOS WHERE ID_PERSONAJE='{$this->getid_poke()}' AND ID_USUARIO='{$this->getid_usr()}')";
            
            $dao=new DAO();
            $resultado=$dao->ejecutarSQL($strSQL);
        }
        else{
            $resultado['rc']=1;
            $resultado['errmsg']="No se pudo eliminar  este pokemon";
        }
        return $resultado;
    }
    
}