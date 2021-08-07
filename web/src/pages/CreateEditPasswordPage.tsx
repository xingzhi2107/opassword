import React from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';
import { TextInput, FieldSet, Form, Button } from '../components/ui';
import { makeObservable, observable } from 'mobx';
import { passwordApis } from '../ApiClient';
import { PasswordInfoPlainData } from '@xingzhi2107/opassword-js-sdk';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

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
    loading: true,
    submitting: false,
  };

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
    const { loading, submitting } = this.state;
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
              name="encryptedPassword"
              value={this.formData.encryptedPassword}
              label="加密密码"
              onTextChange={this.handleEncryptedPasswordChanged}
              required
              multipleLine
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

  handleSubmit = async (e: Event) => {
    const { passwordId, history } = this.props;
    this.setState({
      submitting: true,
    });
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
    authStore: stores.authStore,
  };
}

export default connMobx(mapStoresToInjects)(
  withStyles(styles)(withRouter(CreateEditPasswordPage)),
);
