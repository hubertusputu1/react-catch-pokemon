import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core';

import PokemonList from './containers/pokemonList';
import PokemonDetail from './containers/pokemonDetail';
import MyPokemon from './containers/myPokemon';
import NotFoundPage from './containers/notFoundPage';

const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  // },
  typography: { useNextVariants: true },
});

class App extends Component {
  renderPokemonList = props => {
    return <PokemonList {...props} />;
  };

  renderPokemonDetail = props => {
    return <PokemonDetail {...props} />;
  };

  renderMyPokemonList = props => {
    return <MyPokemon {...props} />;
  };

  renderNotFoundPage = () => {
    return <NotFoundPage />;
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props => this.renderPokemonList(props)}
              />
              <Route
                exact
                path="/:id"
                render={props => this.renderPokemonDetail(props)}
              />
              <Route
                exact
                path="/my-pokemon"
                render={props => this.renderMyPokemonList(props)}
              />
              <Route render={props => this.renderNotFoundPage()} />
            </Switch>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  dispatchEvent => {
    return {};
  }
)(App);
