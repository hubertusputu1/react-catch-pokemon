import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapDispatch, mapState } from './pokemonDetail.controller';

class PokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div />;
  }
}

export default connect(
  mapState,
  mapDispatch
)(PokemonDetail);
