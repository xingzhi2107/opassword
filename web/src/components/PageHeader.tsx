import React from 'react';
import { PureComponent } from 'react';
import withStyles, { Styles, WithStylesProps } from 'react-jss';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects> {}

interface State {}

const styles: Styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [10, 16],
    borderBottom: [1, 'solid', '#eee'],
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navItem: {
    margin: [0, 10],
  },
};

@observer
class PageHeader extends PureComponent<Props, State> {
  render() {
    const { classes, authStore } = this.props;
    return (
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link className={classes.navItem} to="/">
            {'Home'}
          </Link>
          <Link className={classes.navItem} to="/passwords">
            {'Passwords'}
          </Link>
          <Link className={classes.navItem} to="/sign-up">
            {'Sign Up'}
          </Link>
          <Link className={classes.navItem} to="/login">
            {'Login'}
          </Link>
        </nav>
        <div>{authStore.currentUser?.email}</div>
      </header>
    );
  }
}

function mapStoresToInjects(stores: Stores) {
  return {
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(withStyles(styles)(PageHeader));
