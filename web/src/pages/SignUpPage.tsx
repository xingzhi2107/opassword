import React from 'react';
import { PureComponent } from 'react';
import { WithStylesProps, Styles } from 'react-jss';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';
import { connJss } from '../hoc/jss';
import { Button, FieldSet, Form, TextInput } from '../components/ui';
import { makeObservable, observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface OwnProps {}

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects>,
    RouteComponentProps<Record<string, never>>,
    OwnProps {}

interface State {
  submitting: boolean;
}

const styles: Styles = {
  form: {
    marginTop: 50,
  },
  btnContainer: {
    display: 'flex',
  },
};

@observer
class SignUpPage extends PureComponent<Props, State> {
  @observable
  formData = {
    email: '',
    password: '',
    verifyPassword: '',
  };

  constructor(props: Props) {
    super(props);
    makeObservable(this);
    this.state = {
      submitting: false,
    };
  }

  render() {
    const { classes } = this.props;
    const { submitting } = this.state;
    return (
      <div>
        <Form className={classes.form}>
          <FieldSet legend="注册">
            <TextInput
              name="email"
              value={this.formData.email}
              type="email"
              label="邮箱"
              onTextChange={this.handleEmailChanged}
              autoFocus
              autoComplete="off"
            />
            <TextInput
              name="password"
              type="password"
              value={this.formData.password}
              label="密码"
              onTextChange={this.handlePasswordChanged}
              autoComplete="off"
            />
            <TextInput
              name="verifyPassword"
              type="password"
              value={this.formData.verifyPassword}
              label="验证密码"
              onTextChange={this.handleVerifyPasswordChanged}
              autoComplete="off"
            />
            <div className={classes.btnContainer}>
              <Button
                text="注册"
                onClick={this.handleClickLogin}
                disabled={submitting}
              />
            </div>
          </FieldSet>
        </Form>
      </div>
    );
  }

  private handleClickLogin = async () => {
    const { authStore, history } = this.props;
    const { email, password } = this.formData;
    if (this.state.submitting) {
      return;
    }
    this.setState({
      submitting: true,
    });
    await authStore.signUp({
      email: email.trim(),
      password,
    });
    this.setState({
      submitting: false,
    });
    history.push('/passwords');
  };

  handleEmailChanged = (text: string) => (this.formData.email = text);

  handlePasswordChanged = (text: string) => (this.formData.password = text);

  handleVerifyPasswordChanged = (text: string) =>
    (this.formData.verifyPassword = text);
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(
  connJss(styles)(withRouter(SignUpPage)),
);
