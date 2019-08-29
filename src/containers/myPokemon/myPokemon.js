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
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import { mapDispatch, mapState } from './myPokemon.controller';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
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
    };
  }

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

  renderNoPokemons = () => {
    return <div>empty</div>;
  };

  renderPokemonList = pokemons => {
    return <div>rendering pokemons</div>;
  };

  render() {
    const { classes, pokemons } = this.props;
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        {this.renderNavOptions()}
        <Paper square className={classes.paper}>
          {pokemons.length > 0
            ? this.renderPokemonList(pokemons)
            : this.renderNoPokemons()}
        </Paper>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(MyPokemonList));
