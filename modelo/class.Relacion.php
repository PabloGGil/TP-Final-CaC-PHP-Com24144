<?php
require_once "class.DAO.php";

class Relacion{

    private $id;
    private $id_poke;
    private $id_usr;
    

    public function __construct()
    {
       
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
        $strSQL="select u.username ,p.nombre, p.puntos_ataque ,p.puntos_defensa,p.imagen 
                from pokemon.usuario u ,pokemon.personaje p ";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        return $data;
    }

    public function insertar($id_usr,$id_poke){
        
        $strSQL="INSERT INTO GRUPOS(id_poke,id_usr) VALUES({$this->getid_poke()},{$this->getid_usr()})";
        
        $dao=new DAO();
        $dao->ejecutarSQL($strSQL);
    }
    public function eliminar($id_usr,$id_poke){
        
        $strSQL="DELETE FROM GRUPOS WHERE ID_PERSONAJE='{$this->getid_poke()}' AND ID_USUARIO='{$this->getid_usr()}')";
        
        $dao=new DAO();
        $dao->ejecutarSQL($strSQL);
    }
    
}