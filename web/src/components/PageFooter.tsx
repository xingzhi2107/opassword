import React from 'react';
import { PureComponent } from 'react';
import { WithStylesProps } from 'react-jss';
import { connJss } from '../hoc/jss';

interface Props extends WithStylesProps<typeof styles> {}

interface State {}

const styles = {
  footer: {
    borderTop: [1, 'solid', '#eee'],
    height: 50,
  },
};

class PageFooter extends PureComponent<Props, State> {
  render() {
    const { classes } = this.props;
    return <footer className={classes.footer} />;
  }
}

export default connJss(styles)(PageFooter);
