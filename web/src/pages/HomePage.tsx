import React from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

interface Props extends WithStylesProps<typeof styles> {}

interface State {}

const styles = {
  myButton: {
    color: 'green',
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem',
    },
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold', // jss-plugin-camel-case turns this into 'font-weight'
    },
  },
  myLabel: {
    fontStyle: 'italic',
  },
};

class HomePage extends PureComponent<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>{'Home page'}</h1>
        <button className={classes.myButton} type="button">
          {'Button'}
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
