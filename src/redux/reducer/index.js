import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import pokemon from './reducer.poke';
import ownedPokemon from './reducer.ownedPoke';

export default history =>
  combineReducers({
    router: connectRouter(history),
    pokemon: pokemon,
    ownedPokemon: ownedPokemon,
  });
