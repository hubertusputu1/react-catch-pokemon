import { CATCH_POKEMON, RELEASE_POKEMON } from '../type/type.ownedPoke';

export const catchPokemon = data => {
  return {
    type: CATCH_POKEMON,
    payload: data,
  };
};

export const releasePokemon = data => {
  return {
    type: RELEASE_POKEMON,
    payload: data,
  };
};
