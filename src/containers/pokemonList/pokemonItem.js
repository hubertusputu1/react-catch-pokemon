import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { mapDispatch, mapState } from './pokemonItem.controller';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, pokemon } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h6"
          >
            {pokemon.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            owned : 0
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(PokemonList));
