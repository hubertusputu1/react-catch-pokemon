import {
  fetchSinglePokemon,
  removeSelectedPokemon,
} from '../../redux/action/action.poke';

export const mapState = state => {
  return {
    selectedPokemon: state.pokemon.selectedPokemon,
    loading: state.pokemon.loading,
    message: state.pokemon.message,
  };
};

export const mapDispatch = dispatch => {
  return {
    fetchSinglePokemon: data => dispatch(fetchSinglePokemon(data)),
    removeSelectedPokemon: () => dispatch(removeSelectedPokemon()),
  };
};
