import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  useScrollTrigger,
  Slide,
  MenuItem,
  Menu,
  Button,
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { MoreVert, ExpandMore } from '@material-ui/icons';

import { mapDispatch, mapState } from './myPokemon.controller';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
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
  titleDescription: {
    marginBottom: theme.spacing(2),
  },
  cardEmpty: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(6),
    flexGrow: '1',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  pokemonOwn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
});

const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

class MyPokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      expanded: false,
    };
  }

  handleChangePanel = panel => {
    this.setState({ expanded: this.state.expanded !== panel ? panel : false });
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = url => {
    this.setState({ open: false, anchorEl: null }, () => {
      if (url) this.props.history.push(url);
    });
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
              onClick={e => this.handleClick(e)}
            >
              <MoreVert />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              My Pokemon
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  };

  renderNavOptions = () => {
    const { open, anchorEl } = this.state;
    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
        onClose={() => this.handleClose()}
      >
        <MenuItem onClick={() => this.handleClose('/')}>Pokemon List</MenuItem>
        <MenuItem selected onClick={() => this.handleClose(null)}>
          My Pokemon
        </MenuItem>
      </Menu>
    );
  };

  renderNoPokemons = classes => {
    return (
      <Card className={classes.cardEmpty}>
        <CardContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            className={classes.titleDescription}
          >
            Hmmmmm, Please catch your favorite pokemon first!
          </Typography>
        </CardContent>
      </Card>
    );
  };

  renderPokemonList = (classes, pokemons) => {
    return (
      <div>
        {pokemons.map(pokemon => {
          return (
            <ExpansionPanel
              key={pokemon.name}
              expanded={this.state.expanded === pokemon.name}
              onChange={() => this.handleChangePanel(pokemon.name)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls={pokemon.name}
                id={pokemon.name}
              >
                <Typography className={classes.heading}>
                  {pokemon.name}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  owned: {pokemon.owns.length}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                {pokemon.owns.map(own => {
                  return (
                    <div key={own} className={classes.pokemonOwn}>
                      <Typography variant="body1">{own}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.releasePokemon(pokemon.name, own)}
                      >
                        Release
                      </Button>
                    </div>
                  );
                })}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  };

  releaseAllPokemon = () => {
    const { releaseAllPokemon } = this.props;

    releaseAllPokemon();
  };

  releasePokemon = (name, own) => {
    const { releasePokemon, pokemons } = this.props;
    let releasedPokemon = pokemons.map(poke => {
      if (poke.name === name) {
        poke.owns = poke.owns.filter(o => {
          return o === own ? false : true;
        });
      }
      return poke;
    });

    releasedPokemon = releasedPokemon.filter(poke => {
      return poke.owns.length > 0 ? true : false;
    });

    releasePokemon({ pokemons: releasedPokemon });
  };

  renderBottomAppBar = classes => {
    return (
      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolbar}>
          <Button color="inherit" onClick={() => this.releaseAllPokemon()}>
            Release All Pokemon
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

  render() {
    const { classes, pokemons } = this.props;
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        {this.renderNavOptions()}
        <Paper square className={classes.paper}>
          {pokemons.length > 0
            ? this.renderPokemonList(classes, pokemons)
            : this.renderNoPokemons(classes)}
        </Paper>
        {pokemons.length > 0 ? this.renderBottomAppBar(classes) : null}
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(MyPokemonList));
