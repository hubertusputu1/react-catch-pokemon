import axios from 'axios';

export const fetchPokemons = payload => {
  const { query } = payload;
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon?${query}`)
    .then(res => res.data);
};

export const fetchSinglePokemon = payload => {
  const { name } = payload;
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.data);
};


