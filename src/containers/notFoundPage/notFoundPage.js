import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mapDispatch, mapState } from './notFoundPage.controller';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (<div>404 - page not found</div>);
  }
}

export default connect(
  mapState,
  mapDispatch
)(NotFound);
