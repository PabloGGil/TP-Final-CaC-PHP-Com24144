// traigo solo 10 pokemones, en caso de querer mas cambiar el valor limit
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
    `;
    container.appendChild(pokemonElement);
  });
}

// consulto a la api
getAllPokemon();