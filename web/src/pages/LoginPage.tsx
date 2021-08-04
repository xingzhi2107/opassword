import React, { ChangeEvent, MouseEvent } from 'react';
import { PureComponent } from 'react';
import { WithStylesProps, Styles } from 'react-jss';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';
import { connJss } from '../hoc/jss';

interface OwnProps {
  testId: string;
}

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects>,
    OwnProps {}

interface State {
  email: string;
  password: string;
}

const styles: Styles = {
  loginBtn: {
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
};

@observer
class LoginPage extends PureComponent<Props, State> {
  state = {
    email: '',
    password: '',
  };

  render() {
    const { classes, authStore } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <h1>{'登录'}</h1>
        <form>
          <div>
            <label>{'邮箱'}</label>
            <input
              type="email"
              value={email}
              placeholder="example@mail.com"
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label>{'密码'}</label>
            <input
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={this.handleClickLogin}
              disabled={authStore.inProgress}
              className={classes.loginBtn}
            >
              {'登录'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  private handleClickLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { authStore } = this.props;
    const { email, password } = this.state;
    authStore.login({
      email: email.trim(),
      password,
    });
  };

  private handleInputChange = (
    key: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [key]: e.target.value,
    } as any);
  };

  private handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.handleInputChange('email', e);
  };

  private handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.handleInputChange('password', e);
  };
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(connJss(styles)(LoginPage));
