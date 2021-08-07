import React from 'react';
import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Stores } from './stores';
import { connMobx } from './hoc/mobx';
import PageHeader from './components/PageHeader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';
import PageFooter from './components/PageFooter';
import { Styles, WithStylesProps } from 'react-jss';
import { connJss } from './hoc/jss';

interface OwnProps {}

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects>,
    OwnProps {}

interface State {}

const styles: Styles = {
  appRoot: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  pageMainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      flex: 1,
      minHeight: 0,
    },
  },
};

@observer
class App extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { appStore, authStore } = this.props;
    if (appStore.authToken) {
      await authStore.pullCurrUser();
    }
    appStore.setAppLoaded();
  }

  render() {
    const { appStore, classes } = this.props;
    if (!appStore.appLoaded) {
      return null;
    }

    return (
      <div id="app-root" className={classes.appRoot}>
        <BrowserRouter>
          <PageHeader />
          <main className={classes.pageMainContent}>
            {renderRoutes(routes)}
          </main>
          <PageFooter />
        </BrowserRouter>
      </div>
    );
  }
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    authStore: stores.authStore,
    appStore: stores.appStore,
  };
}

export default connMobx(mapStoresToInjects)(connJss(styles)(App));
