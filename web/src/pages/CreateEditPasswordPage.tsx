import React from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import { TextInput, FieldSet, Form, Button } from '../components/ui';
import { makeObservable, observable } from 'mobx';
import { passwordApis } from '../ApiClient';
import { PasswordInfoPlainData } from 'opass-js-sdk';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';

interface OwnProps {
  passwordId?: number;
}

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects>,
    RouteComponentProps<Record<string, never>>,
    OwnProps {}

interface State {
  loading: boolean;
  submitting: boolean;
  password: string;
  focusPassword: boolean;
}

const styles = {
  form: {
    marginTop: 50,
  },
  btnContainer: {
    display: 'flex',
  },
};

@observer
class CreateEditPasswordPage extends PureComponent<Props, State> {
  state = {
    password: 'fakepassword',
    focusPassword: false,
    loading: true,
    submitting: false,
  };
  isFirstFocus = true;
  originPassword = '';

  @observable
  formData = {
    name: '',
    account: '',
    encryptedPassword: '',
    webSite: '',
    note: '',
  };

  originData?: PasswordInfoPlainData;

  constructor(props: Props) {
    super(props);
    makeObservable(this);
  }

  get isEditMode() {
    const { passwordId } = this.props;
    return !!passwordId;
  }

  get hasModified(): boolean {
    const changes = Object.keys(this.formData).map(
      (key) => (this.formData as any)[key] !== (this.originData as any)[key],
    );

    return changes.some((x) => x);
  }

  async componentDidMount() {
    const { passwordId } = this.props;
    if (passwordId) {
      const res = await passwordApis.fetchPasswordInfos({
        ids: [passwordId],
        cols: ['id', 'name', 'account', 'encryptedPassword', 'webSite', 'note'],
      });
      this.originData = res.data.items[0] as any;
      this.formData = { ...this.originData } as any;
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { loading, submitting, password, focusPassword } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div>
        <Form className={classes.form}>
          <FieldSet legend={this.isEditMode ? '修改密码' : '新建密码'}>
            {this.renderIdField()}
            <TextInput
              name="name"
              value={this.formData.name}
              label="名称"
              onTextChange={this.handleNameChanged}
              autoFocus
            />
            <TextInput
              name="account"
              value={this.formData.account}
              label="账号"
              onTextChange={this.handleAccountChanged}
            />
            <TextInput
              name="webSite"
              value={this.formData.webSite}
              label="登录网址"
              onTextChange={this.handleWebSiteChanged}
            />
            <TextInput
              name="password"
              type={focusPassword ? 'text' : 'password'}
              value={password}
              label="密码"
              onTextChange={this.handlePasswordChanged}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
            />
            <TextInput
              name="encryptedPassword"
              value={this.formData.encryptedPassword}
              label="加密密码"
              onTextChange={this.handleEncryptedPasswordChanged}
              required
              multipleLine
              readOnly
            />
            <TextInput
              name="note"
              value={this.formData.note}
              label="备注"
              onTextChange={this.handleNoteChanged}
              multipleLine
            />
            <div className={classes.btnContainer}>
              <Button
                text={this.isEditMode ? '保存' : '新建'}
                onClick={this.handleSubmit}
                disabled={submitting || (this.isEditMode && !this.hasModified)}
              />
            </div>
          </FieldSet>
        </Form>
      </div>
    );
  }

  renderIdField() {
    const { passwordId } = this.props;
    if (!this.isEditMode) {
      return null;
    }

    return <TextInput name="id" value={passwordId!} label="ID" />;
  }

  handleNameChanged = (text: string) => (this.formData.name = text);

  handleAccountChanged = (text: string) => (this.formData.account = text);

  handleEncryptedPasswordChanged = (text: string) =>
    (this.formData.encryptedPassword = text);

  handleWebSiteChanged = (text: string) => (this.formData.webSite = text);

  handleNoteChanged = (text: string) => (this.formData.note = text);

  handlePasswordChanged = (text: string) => {
    this.setState({
      password: text,
    });
  };

  handlePasswordFocus = async () => {
    const { gpgStore } = this.props;
    if (this.isFirstFocus) {
      this.isFirstFocus = false;
      const password = await gpgStore.decryptText(
        this.formData.encryptedPassword,
      );
      if (password === null) {
        // eslint-disable-next-line no-alert
        window.alert('解密失败！请检查gpg key是否配置正确');
      } else {
        this.originPassword = password;
        this.setState({
          password,
        });
      }
    } else {
      this.originPassword = this.state.password;
    }
    this.setState({
      focusPassword: true,
    });
  };

  handlePasswordBlur = async () => {
    if (this.originPassword !== this.state.password) {
      await this.syncPasswordToEncryptedPassword();
    }
    this.setState({
      focusPassword: false,
    });
  };

  syncPasswordToEncryptedPassword = async () => {
    const { gpgStore } = this.props;
    const encryptedPassword = await gpgStore.encryptText(this.state.password);
    if (encryptedPassword === null) {
      // TODO: 提示没有配置gpg key
      return;
    } else {
      this.formData.encryptedPassword = encryptedPassword;
    }
  };

  handleSubmit = async (e: Event) => {
    const { passwordId, history, gpgStore } = this.props;
    if (!gpgStore.gpgKey) {
      // TODO: 提示没有配置gpg key
      this.setState({
        submitting: false,
      });
      return;
    }
    this.setState({
      submitting: true,
    });
    await this.syncPasswordToEncryptedPassword();

    if (passwordId) {
      const res = await passwordApis.patchUpdatePasswordInfo({
        ...this.formData,
        id: passwordId,
      });
      this.originData = res.data.passwordInfo;
      this.formData = {
        ...this.originData,
      };
    } else {
      const res = await passwordApis.createPasswordInfo(this.formData);
      this.originData = res.data.passwordInfo;
      this.formData = {
        ...this.originData,
      };
    }
    this.setState({
      submitting: false,
    });
    history.push('/passwords');
  };
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    gpgStore: stores.gpgStore,
  };
}

export default connMobx(mapStoresToInjects)(
  withStyles(styles)(withRouter(CreateEditPasswordPage)),
);
