import React from 'react';
import { PureComponent } from 'react';
import withStyles, { Styles, WithStylesProps } from 'react-jss';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';
import { Button } from './ui';
import { RouteComponentProps } from 'react-router';

interface Props
  extends WithStylesProps<typeof styles>,
    RouteComponentProps<Record<string, never>>,
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
            {'首页'}
          </Link>
          {this.renderAuthLinks()}
        </nav>
        <div>{authStore.currentUser?.email}</div>
      </header>
    );
  }

  renderAuthLinks() {
    const { classes, authStore } = this.props;
    if (authStore.currentUser) {
      return (
        <>
          <Link className={classes.navItem} to="/passwords">
            {'密码列表'}
          </Link>
          <Link className={classes.navItem} to="/passwords/new">
            {'新建密码'}
          </Link>
          <Button onClick={this.handleClickLogout} text="退出" />
        </>
      );
    } else {
      return (
        <>
          <Link className={classes.navItem} to="/sign-up">
            {'注册'}
          </Link>
          <Link className={classes.navItem} to="/login">
            {'登录'}
          </Link>
        </>
      );
    }
  }

  handleClickLogout = async () => {
    const { authStore, history } = this.props;
    await authStore.logout();
    history.push('/login');
  };
}

function mapStoresToInjects(stores: Stores) {
  return {
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(
  withStyles(styles)(withRouter(PageHeader)),
);
