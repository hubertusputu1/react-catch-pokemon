import { fetchPokemons } from '../../redux/action/action.poke';

export const mapState = state => {
  return {
    pokemons: state.pokemon.pokemons,
    nextUrl: state.pokemon.nextUrl,
    prevUrl: state.pokemon.prevUrl,
    total: state.pokemon.total,
    loading: state.pokemon.loading,
    message: state.pokemon.message,
    url: state.pokemon.url,
    currentPage: state.pokemon.currentPage,
  };
};

export const mapDispatch = dispatch => {
  return {
    fetchPokemons: data => dispatch(fetchPokemons(data)),
  };
};
