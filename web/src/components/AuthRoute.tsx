import React from 'react';
import { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';
import { RouteComponentProps } from 'react-router';
import { withRouter, Route } from 'react-router-dom';

interface OwnProps {}

interface Props
  extends ReturnType<typeof mapStoresToInjects>,
    RouteComponentProps<Record<string, never>>,
    OwnProps {}

interface State {}

@observer
class AuthPageContainer extends PureComponent<Props, State> {
  state = {};

  componentDidMount() {
    const { authStore, history } = this.props;
    if (!authStore.currentUser) {
      history.push('/login');
    }
  }

  render() {
    const { authStore, children, ...rest } = this.props;
    if (!authStore.currentUser) {
      return null;
    }
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return children;
        }}
      />
    );
  }
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(withRouter(AuthPageContainer));
