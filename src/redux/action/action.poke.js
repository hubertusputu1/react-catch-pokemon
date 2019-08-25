import { FETCH_POKEMON } from '../type/type.poke';

export const fetchPokemon = data => {
  return {
    type: FETCH_POKEMON,
    payload: data,
  };
};
