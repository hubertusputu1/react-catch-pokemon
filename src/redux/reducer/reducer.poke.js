import {
  FETCH_POKEMON,
  FETCH_POKEMON_FAILED,
  FETCH_POKEMON_SUCCESS,
  FETCH_SINGLE_POKEMON,
  FETCH_SINGLE_POKEMON_SUCCESS,
  FETCH_SINGLE_POKEMON_FAILED,
} from '../type/type.poke';

const initialState = {
  loading: true,
  message: null,
  pokemons: [],
  selectedPokemon: {},
  nextUrl: null,
  prevUrl: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'Pokemons Loaded',
        pokemons: action.payload.pokemons,
      };
    case FETCH_POKEMON_FAILED:
      return {
        ...state,
        loading: false,
        message: 'Failed to load Pokemons',
      };

    case FETCH_SINGLE_POKEMON:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        pokemons: 'Pokemon Loaded',
      };
    case FETCH_SINGLE_POKEMON_FAILED:
      return {
        ...state,
        loading: false,
        message: 'Failed to load Pokemon',
      };
    default:
      return state;
  }
};
