// import valida from "./login.js";

const alta = document.getElementById("botonalta");
alta.addEventListener("click",validarRegistro);

function validarRegistro(e){
    let valideta=datosAltaOk()
    if (!valideta.rs) {
        // Muestra un mensaje en la consola indicando que el formulario no es válido
        console.log('El formulario no es válido. Por favor, corrige los errores.');
        // Evita que el formulario se envíe
        e.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
        alert(valideta.error)
   } else {
        // Si la validación del formulario es exitosa, muestra un mensaje en la consola
        console.log('El formulario es válido. Enviar datos...');
        alert("el formulario pudo enviar los datos")
    }
}

function datosAltaOk(){
     let rta=[];
    
    //  rta[1]= validarTexto('id_nombrelet rta=[];
   
     rta[1]= validarTexto('id_nombre'); // Validar campo de contraseña
     rta[2]= validarTexto('id_tipo');
     rta[2]= validarTexto('id_precio');
     rta[2]= validarTexto('id_descripcion');
     let estado={rs:true,error:""};
     for (let i=0;i<4;i++){
        estado.rs=estado.rs && rta[i].rs;
        estado.error=estado.error + rta[i].error + "\n" ;
     }
 
     return estado;
 }

  function validarCorreo(campo){
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    let rta={rs:true,error:""};
    if(!/\w+@\w+.\w+/.test(value))
    {
        rta.rs=false;
        rta.error="correo invalido";
    }
    return rta;
}

 function validarFecha(campo){
    let rta={rs:false,error:"fecha invalida"};
    if(/[0-9]+\/[0-9]+\[0-9]/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}


 function validarTexto(campo){
    let rta={rs:false,error:"correo invalido"};
    if(/\w+/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}