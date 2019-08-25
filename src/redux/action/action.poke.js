import { FETCH_POKEMON, FETCH_SINGLE_POKEMON } from '../type/type.poke';

export const fetchPokemons = data => {
  return {
    type: FETCH_POKEMON,
    payload: data,
  };
};

export const fetchSinglePokemon = data => {
  return {
    type: FETCH_SINGLE_POKEMON,
    payload: data,
  };
};
