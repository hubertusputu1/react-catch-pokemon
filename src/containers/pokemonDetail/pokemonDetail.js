import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  TextField,
  CardContent,
  useScrollTrigger,
  Slide,
  Button,
  Avatar,
  Paper,
  Snackbar,
} from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';

import { mapDispatch, mapState } from './pokemonDetail.controller';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleDescription: {
    marginBottom: theme.spacing(2),
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  card: {
    display: 'flex',
    width: '100%',
    flexGrow: '1',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
    backgroundColor: blue[50],
  },
});

const PokeDetailLoader = () => (
  <ContentLoader
    height={400}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
    <rect x="5" y="71" rx="5" ry="5" width="400" height="120" />
    <rect x="5" y="199" rx="0" ry="0" width="398" height="66" />
    <rect x="14" y="246" rx="0" ry="0" width="0" height="0" />
    <rect x="5" y="274" rx="0" ry="0" width="479" height="111" />
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

class PokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCaught: false,
      open: false,
      nickName: '',
      message: 'Oooooppssss. Pokemon broke the pokeball!',
    };
  }

  handleClick = event => {
    this.props.history.push('/');
  };

  fetchPokemonDetail = () => {
    const { name } = this.props.match.params;
    const { fetchSinglePokemon } = this.props;
    fetchSinglePokemon({ name });
  };

  removePokemonDetail = () => {
    const { removeSelectedPokemon } = this.props;
    removeSelectedPokemon();
  };

  componentDidMount = () => {
    this.fetchPokemonDetail();
  };

  renderLoader = () => {
    return (
      <div>
        <PokeDetailLoader />
      </div>
    );
  };

  renderTopAppBar = (classes, pokemonName, isCaught) => {
    return (
      <HideOnScroll {...this.props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="back"
              disabled={isCaught ? true : false}
              onClick={e => this.handleClick(e)}
            >
              <NavigateBefore />
            </IconButton>
            <Typography className={classes.title} variant="h5" noWrap>
              {pokemonName}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  throwPokeBall = () => {
    if (this.state.open) return;
    this.setState({ open: true });
    if (this.getRandomInt(2) === 1) {
      this.setState({
        isCaught: true,
        message: 'Gotcha! You caught the Pokemon!',
      });
    }
    setTimeout(() => {
      this.setState({ open: false });
    }, 2000);
  };

  savePokemon = () => {
    const { catchPokemon, selectedPokemon, ownedPokemons } = this.props;
    const { nickName } = this.state;
    const { name } = selectedPokemon;

    let foundPokemon =
      ownedPokemons.length > 0
        ? ownedPokemons.filter(poke => {
            if (poke.name === name) {
              let owned = poke.owns.filter(own => {
                return own === nickName ? true : false;
              });
              if (owned.length > 0) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        : false;

    if (foundPokemon.length > 0) {
      this.setState({ open: true, message: 'That Nickname already exist!' });
      setTimeout(() => {
        this.setState({ open: false });
      }, 2000);
    } else {
      let newPokemons =
        ownedPokemons.length > 0
          ? ownedPokemons.map(poke => {
              if (poke.name === name) {
                poke.owns.push(nickName);
              }
              return poke;
            })
          : [{ name, owns: [nickName] }];
      catchPokemon({ pokemons: newPokemons });
      this.props.history.push('/');
    }
  };

  renderBottomAppBar = (classes, isCaught) => {
    return (
      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolbar}>
          {!isCaught ? (
            <Button color="inherit" onClick={() => this.throwPokeBall()}>
              Throw a Pokeball
            </Button>
          ) : (
            <Button color="inherit" onClick={() => this.savePokemon()}>
              Save Pokemon
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };

  renderPokemonDetail = (classes, pokemon) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="pokemon sprite"
          src={pokemon.sprites.front_default}
          className={classes.bigAvatar}
        />

        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleDescription}
            >
              Types
            </Typography>
            {pokemon.types.map(type => (
              <Typography
                key={type.type.name}
                style={{ fontSize: '1.7em' }}
                variant="body2"
              >
                {type.type.name}
              </Typography>
            ))}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleDescription}
            >
              Abilities
            </Typography>

            {pokemon.abilities.map(abilities => (
              <Typography
                key={abilities.ability.name}
                style={{ fontSize: '1.7em' }}
                variant="body2"
              >
                {abilities.ability.name}
              </Typography>
            ))}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent style={{ width: '100%' }}>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleDescription}
            >
              Stats
            </Typography>

            {pokemon.stats.map(stats => (
              <div
                key={stats.stat.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography style={{ fontSize: '1.7em' }} variant="body2">
                  {stats.stat.name}
                </Typography>
                <Typography style={{ fontSize: '1.5em' }} variant="body1">
                  {stats.base_stat}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  renderSnackbar = () => {
    const { open, message } = this.state;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={`vertical: top, horizontal: center`}
        open={open}
        ContentProps={{
          'aria-describedby': 'pokemon-catch',
        }}
        message={<span id="pokemon-catch">{message}</span>}
      />
    );
  };

  renderPokemonCaught = (classes, pokemon) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 50,
        }}
      >
        <Avatar
          alt="pokemon sprite"
          src={pokemon.sprites.front_default}
          className={classes.bigAvatar}
        />

        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleDescription}
            >
              Give Your Pokemon a Nickname
            </Typography>
            <TextField
              required
              id="standard-required"
              label="Nickname"
              defaultValue={this.state.nickName}
              className={classes.textField}
              margin="normal"
              onChange={e => this.setState({ nickName: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  render() {
    const { classes, loading, selectedPokemon } = this.props;
    const { isCaught } = this.state;
    const { name } = this.props.match.params;
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes, name, isCaught)}
        {!isCaught ? (
          <Paper square className={classes.paper}>
            {loading || !selectedPokemon
              ? this.renderLoader()
              : this.renderPokemonDetail(classes, selectedPokemon)}
          </Paper>
        ) : (
          this.renderPokemonCaught(classes, selectedPokemon)
        )}
        {this.renderSnackbar()}
        {this.renderBottomAppBar(classes, isCaught)}
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(PokemonDetail));
