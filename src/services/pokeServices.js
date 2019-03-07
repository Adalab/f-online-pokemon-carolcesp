const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25';

const getApipokemon = () => fetch(ENDPOINT).then(response => response.json());

export {getApipokemon};