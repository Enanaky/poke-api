const getPokemon = (idOrName) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    .then(response => response.json());
}

const getResource = (url) => {
  return fetch(url)
    .then(response => response.json());
}

const getSpeciesData = (pokemonId) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
    .then(response => response.json());
}

export default {
  getPokemon,
  getResource,
  getSpeciesData,
};
