import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapDispatch, mapState } from './myPokemon.controller';

class MyPokemon extends Component {
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
)(MyPokemon);
