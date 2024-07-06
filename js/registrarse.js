// import valida from "./login.js";

const registro = document.getElementById("botonRegistro");
registro.addEventListener("click",validarRegistro);


function validarRegistro(e){
    let correo = document.getElementById("email").value; 
    let nombre = document.getElementById("nombre").value; 
    let apellido = document.getElementById("apellido").value; 
    let fecha = document.getElementById("fechaNac").value; 
    let password = document.getElementById("contraseña").value; 
    let valideta=datosRegOk()
    if (!valideta.rs) {
        // Muestra un mensaje en la consola indicando que el formulario no es válido
        console.log('El formulario no es válido. Por favor, corrige los errores.');
        // Evita que el formulario se envíe
        e.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
        alert(valideta.error)
   } else {
        // Si la validación del formulario es exitosa, muestra un mensaje en la consola
        q="alta";
        Dato_enviar={
            q,correo,nombre,apellido,fecha,password
        }
        ajaxReq(Dato_enviar);
        q="consulta";
        Dato_enviar={
            q
        }
        ajaxReq(Dato_enviar);
        //alert("el formulario pudo enviar los datos")
    }
}

function datosRegOk(){
     let rta=[];
     rta[0]= validarCorreo('email');
     rta[1]= validarTexto('nombre'); // Validar campo de contraseña
     rta[2]= validarTexto('apellido');
     rta[3]= validarFecha('fechaNac');
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

function ajaxReq(data) {
    
    
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    const xhr = new XMLHttpRequest();

//   let selec = document.getElementById("selected").innerText;
    xhr.open("POST", "vista/registro.php");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
            let respuesta =JSON.parse( this.responseText);
            if (respuesta.rc){
                // estado.innerHTML = respuesta.msgerror;
                alert(respuesta.msgerror);
            }else{
                alert("alta exitosa");
                
            }
        }
    }
   }