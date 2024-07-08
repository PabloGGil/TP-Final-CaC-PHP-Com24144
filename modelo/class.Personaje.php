<?php
require_once "class.DAO.php";

class Personaje{

    
    private $Nombre; 
    private $Tipo; 
    private $imagen;
    private $peso;
    private $altura;

    public function __construct($nombre,$imagen="",$peso=0,$altura=0)
    {
       $this->setNombre($nombre);
       $this->setImagen($imagen);
       $this->setPeso($peso);
       $this->setAltura($altura);
    }

    // public function __construct(private $Nombre,private $imagen="", private $peso="", private $altura="")
    // {
    // /*funcion sin codigo 
    // ver  Properties Promotion o Promoted Properties  https://stitcher.io/blog/constructor-promotion-in-php-8
    // Que hace este tipo de constructor?
    //     * crea las propiedades afuera
    //     * le dices que son privadas (pueden ser tambien public o protected)
    //     * hace la asignacion incial
    //  */
    // private $Nombre,private $imagen="", private $peso="", $this $altura
    // }
    /*-----------getters------------------*/
    public function getNombre (){
        return $this->Nombre;
    }



    public function getImagen (){
        return $this->imagen;
    }

    public function getPeso (){
        return $this->peso;
    }

    public function getAltura (){
        return $this->altura;
    }
  
    public function getID(){
        $daousr=new DAO();
        $res=$daousr->ejecutarSQL("SELECT ID from personaje where nombre='{$this->getNombre()}'");
        return $res['info'][0]['ID'];


    }

    /*-----------setters------------------*/

    public function setNombre ($aux){
        $this->Nombre=$aux;
    }


    public function setPeso ($aux){
        $this->peso=$aux;
    }

    public function setImagen ($aux){
        $this->imagen=$aux;
    }

    public function setAltura ($aux){
        $this->altura=$aux;
    }
    /*-----------metodos------------------*/
    public function consultar(){
        $strSQL="SELECT nombre,tipo,categoria,puntos_peso,puntos_altura FROM PERSONAJE";
    }

    public function existe($nombre){
        $strSQL=" SELECT count(nombre) AS cuenta FROM PERSONAJE where nombre='{$nombre}'";
        $dao=new DAO();
        $data=$dao->ejecutarSQL($strSQL);
        // var_dump($data['info'][0]);
        if($data['info'][0]['cuenta']!="0"){
            return true;
        }else{
            return false;
        }
    }

    public function insertarReg(){
        if(!($this->existe($this->getNombre()))){
            $strSQL="INSERT INTO personaje(nombre,imagen,peso,altura) 
            VALUES('{$this->getNombre()}','{$this->getImagen()}',{$this->getPeso()},{$this->getAltura()})";
            //echo $strSQL;
            $dao=new DAO();
            $resultado=$dao->ejecutarSQL($strSQL);
        }else{
            $resultado['errmsg']="el personaje ya esta registrado";
            $resultado['rc']=1;
            $resultado['info'] =null;
        }
        return $resultado;
    }
   
}