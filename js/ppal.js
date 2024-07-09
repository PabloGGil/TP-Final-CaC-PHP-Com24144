const btnalgo=document.getElementById("algo");
btnalgo.addEventListener("click",mostrarUsuarios);

// const registro = document.getElementById("botonLogin");
// registro.addEventListener("click",validarRegistro);
function mostrarUsuarios(){
    q="consulta";
    Dato_enviar={
        q
    }
    ajaxReq(Dato_enviar,"vista/usuario.php");

}

const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

// Función para obtener los datos de un Pokémon por su URL
function getPokemonData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extraer el nombre, imagen y peso del Pokémon
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        weight: data.weight,
        height: data.height
      };
      return pokemon;
    })
    .catch(error => {
      console.error('Error al obtener los datos del Pokémon:', error);
    });
}


function getAllPokemon() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      const pokemonDetailsPromises = pokemonList.map(pokemon => getPokemonData(pokemon.url));

     
      Promise.all(pokemonDetailsPromises)
        .then(pokemonDetailsArray => {
          console.log('Detalles de los Pokémon:', pokemonDetailsArray);
          displayPokemonDetails(pokemonDetailsArray);
        });
    })
    .catch(error => {
      console.error('Error al obtener la lista de Pokémon:', error);
    });
}

//  mostrar los detalles de los Pokémon en el DOM
// No encontré los puntos de ataque y defensa, entonces me traigo peso y altura
function displayPokemonDetails(pokemonDetailsArray) {
  const container = document.getElementById('cardPokemon-container');
  pokemonDetailsArray.forEach(pokemon => {
    const pokemonElement = document.createElement('div');
    pokemonElement.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <p>Peso: ${pokemon.weight}</p>
      <p>Altura: ${pokemon.height}</p>
      <div >
        <input id="btnAgregar" class="boton" onclick="agregar('${pokemon.name}','${pokemon.weight}','${pokemon.height}','${pokemon.image}')" value="Agregar">
        <input id="btnQuitar"  class="boton" onclick="quitar('${pokemon.name}')" value="quitar">
      </div>
      
    `;
    container.appendChild(pokemonElement);
  });
}

// consulto a la api
getAllPokemon();

// btnAgregar=document.getElementById("btnAgregar");
// btnAgregar.addEventListener("click",agregar,false);
function agregar(nombre,peso,altura,imagen ){
  console.log("aprete boton" + nombre)
  username=document.getElementById("username").outerText;
  q="alta";
  Dato_enviar={
      q,username,nombre,peso,altura,imagen
  }
  ajaxReq(Dato_enviar,"vista/equipo.php");

}

function quitar(nombre){
  console.log("aprete boton quitar"+ nombre)
  username=document.getElementById("username").outerText;
  q="baja";
  Dato_enviar={
      q,username,nombre
  }
  ajaxReq(Dato_enviar,"vista/equipo.php");
}
  function ajaxReq(data,form) {
    
    const jsonString = JSON.stringify(data);
    const xhr = new XMLHttpRequest();

//   let selec = document.getElementById("selected").innerText;
    xhr.open("POST", form);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonString);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          let respuesta =JSON.parse( this.responseText);
          if (respuesta.rc==0){
              // estado.innerHTML = respuesta.msgerror;
              console.log(respuesta.info);
          }else{
              alert(respuesta.errmsg);
              
          }
        }
    }
    
 
}