import {
  fetchSinglePokemon,
  removeSelectedPokemon,
} from '../../redux/action/action.poke';

import { catchPokemon } from '../../redux/action/action.ownedPoke';

export const mapState = state => {
  return {
    selectedPokemon: state.pokemon.selectedPokemon,
    loading: state.pokemon.loading,
    message: state.pokemon.message,
    ownedPokemons: state.ownedPokemon.pokemons,
  };
};

export const mapDispatch = dispatch => {
  return {
    fetchSinglePokemon: data => dispatch(fetchSinglePokemon(data)),
    removeSelectedPokemon: () => dispatch(removeSelectedPokemon()),
    catchPokemon: data => dispatch(catchPokemon(data)),
  };
};
