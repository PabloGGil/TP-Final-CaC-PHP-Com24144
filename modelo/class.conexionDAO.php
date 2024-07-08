<?php
//phpinfo();
 function conectar(){
    $mysqli = new mysqli("localhost", "root", "", "pokemon");
    if ($mysqli->connect_error) {
        die("Conexión fallida: " . $mysqli->connect_error);
    }
    return $mysqli;
    // $mysqli = mysqli("localhost", "root", "", "pokemon");
    // if ($mysqli->connect_errno) {
    //     //echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    // }

    // //echo $mysqli->host_info . "\n";
    // return $mysqli;
}

