import { fetchSinglePokemon } from '../../redux/action/action.poke';

export const mapState = state => {
  return {
    ownedPokemons: state.ownedPokemon.pokemons,
  };
};

export const mapDispatch = dispatch => {
  return {
    fetchSinglePokemon: data => dispatch(fetchSinglePokemon(data)),
  };
};
