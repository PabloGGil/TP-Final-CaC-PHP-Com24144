<?php
require_once "../modelo/class.Personaje.php";
require_once "../modelo/class.Usuario.php";

if($_POST){

    if(isset($_POST['user'])&&isset($_POST['nombre'])&&isset($_POST['imagen'])&&isset($_POST['puntosAtaque'])&&isset($_POST['puntosDefensa'])){
        $xprod= new Producto($_POST['nombre'],$_POST['tipo'] , $_POST['descripcion'],$_POST['precio'] );
        $xprod->insertarBD();

    }
}