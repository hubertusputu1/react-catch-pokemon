import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { CATCH_POKEMON, RELEASE_POKEMON } from '../type/type.ownedPoke';

const initialState = {
  loading: true,
  message: null,
  pokemons: [],
};

const persistConfig = {
  key: 'ownedPokemon',
  storage,
  whitelist: ['pokemons'],
};

export default persistReducer(persistConfig, (state = initialState, action) => {
  switch (action.type) {
    case CATCH_POKEMON:
      return {
        ...state,
        message: 'pokemon caught',
        pokemons: action.payload.pokemons,
      };
    case RELEASE_POKEMON:
      return {
        ...state,
        message: 'pokemon released',
        pokemons: action.payload.pokemons,
      };
    default:
      return state;
  }
});
