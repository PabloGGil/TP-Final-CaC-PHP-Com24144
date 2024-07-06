
/*-- objeto para devolver el estado de la validacion y los errores
---- rs(Return Status) true -->ok  false-->error 
---- error : descripcion del error(Return Code

{
  rs:0,
  error:"0"
}
*/

const btnlogin = document.getElementById("botonLogin");
btnlogin.addEventListener("click",validarDatos);
// const btnalgo=document.getElementById("algo");
// btnalgo.addEventListener("click",mostrarUsuarios);
// // const registro = document.getElementById("botonLogin");
// // registro.addEventListener("click",validarRegistro);
// function mostrarUsuarios(){
//     q="consulta";
//     Dato_enviar={
//         q
//     }
//     ajaxReq(Dato_enviar);

// }


function validarDatos(e) {
    let valideta=validarForm()
    if (!valideta.rs) {
        // Muestra un mensaje en la consola indicando que el formulario no es válido
        console.log('El formulario no es válido. Por favor, corrige los errores.');
        // Evita que el formulario se envíe
        e.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
        alert(valideta.error)
   } else {
        // Si la validación del formulario es exitosa, muestra un mensaje en la consola
        const field=document.getElementById("email");
        const valueEmail = field.value ;//'pablog62@gmail.com' //
        const fieldP=document.getElementById("password");
        const valuepass = fieldP.value ;//'lapastrona22' //
        Dato_enviar={
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({
             valueEmail, valuepass
            //  })
        }
        ajaxReq(Dato_enviar);
        //alert("el formulario pudo enviar los datos")
    }
}


function validarForm(){
    rta=[{rs:false,error:""}];
    rta[0]= validarTexto('password'); // Validar campo de contraseña
    rta[1]= validarCorreo('email');
    let estado={};
    estado.rs=rta[0].rs && rta[1].rs;
    estado.error=rta[0].error + "\n" + rta[1].error;
    

    return estado;
}

 function validarCorreo(campo){
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    let rta={rs:false,error:"correo invalido"};
    if(/\w+@\w+.\w+/.test(value))
    {
        rta.rs=true;
        rta.error="";
    }
    return rta;
}

 
 function validarTexto(campo){
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    let rta={rs:false,error:"entrada invalida"};
    if(/\w+/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}

function ajaxReq(data) {
    
    const jsonString = JSON.stringify(data);
    const xhr = new XMLHttpRequest();

//   let selec = document.getElementById("selected").innerText;
    xhr.open("POST", "vista/login.php");
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
                alert("login exitoso");
                
            }
        }
    }
    
 
}
