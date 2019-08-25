import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  useScrollTrigger,
  Slide,
  Button,
} from '@material-ui/core';
import { Menu, NavigateBefore, NavigateNext } from '@material-ui/icons';

import { mapDispatch, mapState } from './pokemonList.controller';
import PokemonItem from './pokemonItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
});

const PokeListLoader = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="46" y="28" rx="0" ry="0" width="0" height="0" />
    <rect x="8" y="4" rx="0" ry="0" width="383" height="59" />
    <rect x="8" y="79" rx="0" ry="0" width="383" height="34" />
    <rect x="41" y="85" rx="0" ry="0" width="0" height="18" />
  </ContentLoader>
);

const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchPokemonList = isNext => {
    const { fetchPokemons, nextUrl, prevUrl } = this.props;
    if (isNext) {
      return fetchPokemons({ url: nextUrl });
    }
    return fetchPokemons({ url: prevUrl });
  };

  componentDidMount = () => {
    const { fetchPokemons, url } = this.props;
    fetchPokemons({ url });
  };

  renderLoader = () => {
    return (
      <div>
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
      </div>
    );
  };

  renderTopAppBar = classes => {
    return (
      <HideOnScroll {...this.props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <Menu />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Pokemon List
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  };

  renderBottomAppBar = classes => {
    return (
      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolbar}>
          <Button color="inherit" onClick={() => this.fetchPokemonList(false)}>
            <NavigateBefore />
          </Button>
          <Button color="inherit" onClick={() => this.fetchPokemonList(true)}>
            <NavigateNext />
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

  render() {
    const { classes, pokemons, loading } = this.props;

    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        <Paper square className={classes.paper}>
          {loading
            ? this.renderLoader()
            : pokemons.map(pokemon => (
                <PokemonItem pokemon={pokemon} key={pokemon.name} />
              ))}
        </Paper>
        {this.renderBottomAppBar(classes)}
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(PokemonList));
