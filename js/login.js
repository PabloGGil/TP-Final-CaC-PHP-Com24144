const CANT_MIN_CARACT=8;
const CANT_MIN_LETRAS=5;
const CANT_MIN_NUMEROS=3;



/*-- objeto para devolver el estado de la validacion y los errores
---- rs(Return Status) true -->ok  false-->error 
---- error : descripcion del error(Return Code

{
  rs:0,
  error:"0"
}
*/

const form = document.getElementById("botonLogin");
form.addEventListener("click",validarDatos);

// const registro = document.getElementById("botonLogin");
// registro.addEventListener("click",validarRegistro);



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
        console.log('El formulario es válido. Enviar datos...');
        alert("el formulario pudo enviar los datos")
    }
};

function validarForm(){
    rta=[{rs:true,error:""}];
    rta[0]= validarPass('password'); // Validar campo de contraseña
    rta[1]= validarCorreo('correo');
    let estado={};
    estado.rs=rta[0].rs && rta[1].rs;
    estado.error=rta[0].error + "\n" + rta[1].error;
    

    return estado;
}

export function validarCorreo(campo){
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

export function validarFecha(campo){
    let rta={rs:false,error:"fecha invalida"};
    if(/[0-9]+\/[0-9]+\[0-9]/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}


export function validarTexto(campo){
    let rta={rs:false,error:"correo invalido"};
    if(/\w+/.test(value))
    {
            rta.rs=true;
            rta.error="";
    }
    return rta;

}

export function validarPass(campo) {
    const field = document.getElementById(campo); // Obtiene el elemento del campo mediante su ID
    const value = field.value
    result=PoliticaPassOK(value);
    return result; // Devuelve false indicando que la validación ha fallado
    
};

export function PoliticaPassOK(valor){
    // let salida=rta;
    let salida={rs:true,error:""};
    // --- verificar cantidad de caracteres .... 8 caracteres minimo
    if (valor.length<CANT_MIN_CARACT ){
        salida.rs=false;
        salida.error="la cantidad de minima de caracteres es " + CANT_MIN_CARACT;
    }  
// --- verificar cantidad de letras ... 6 letras como minimo
// --- verificar cantidad DE NUMEROS ...2 MINIMO
    letras=0;
    nros=0; 
   for(let i=0; i<valor.length; i++){
        
        letra=valor[i];
        console.log(typeof letra);
        if(/[0-9]/.test(letra)){
                nros++;
        }
        if(/[a-zA-Z]/.test(letra)){
            letras++;
        }
    }
    if(nros<CANT_MIN_NUMEROS){
        salida.rs=false
        salida.error = salida.error + "\n"+"la cantidad de minima de numeros es " + CANT_MIN_NUMEROS;

    }
    if(letras<CANT_MIN_LETRAS){
        salida.rs=false;
        salida.error =salida.error +"\n"+"la cantidad de minima de letras es " + CANT_MIN_LETRAS;
    }

    return salida;
        
    
}

