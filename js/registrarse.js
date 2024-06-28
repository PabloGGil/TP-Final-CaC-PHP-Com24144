// import valida from "./login.js";

const registro = document.getElementById("botonRegistro");
registro.addEventListener("click",validarRegistro);

function validarRegistro(e){
    let valideta=datosRegOk()
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

function datosRegOk(){
     let rta=[];
     rta[0]= validarCorreo('id_correo');
     rta[1]= validarTexto('id_nombre'); // Validar campo de contraseña
     rta[2]= validarTexto('id_apellido');
     rta[3]= validarFecha('id_fecha');
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
    let rta={rs:false,error:"Correo Inválido"};
    if(/\w+@\w+.\w+/.test(value))
    {
        rta.rs=true;
        rta.error="";
    }
    return rta;
}

 function validarFecha(campo){
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    let rta={rs:false,error:"fecha invalida"};
    if(/[0-9]+\-[0-9]+\-[0-9]+/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}


 function validarTexto(campo){
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    let rta={rs:false,error:"valor del campo inválido"};
    if(/\w+/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}