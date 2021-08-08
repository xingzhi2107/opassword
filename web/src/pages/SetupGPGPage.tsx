import React from 'react';
import { PureComponent } from 'react';
import { WithStylesProps, Styles } from 'react-jss';
import { connJss } from '../hoc/jss';
import { Button, FieldSet, Form, TextInput } from '../components/ui';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Stores } from '../stores';
import { connMobx } from '../hoc/mobx';

interface OwnProps {}

interface Props
  extends WithStylesProps<typeof styles>,
    ReturnType<typeof mapStoresToInjects>,
    RouteComponentProps<Record<string, never>>,
    OwnProps {}

interface State {
  publicKey: string;
  privateKey: string;
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
class SetupGPGPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const gpgKey = props.gpgStore.gpgKey;
    this.state = {
      publicKey: (gpgKey?.publicKey as string) || '',
      privateKey: (gpgKey?.privateKey as string) || '',
    };
  }

  render() {
    const { classes } = this.props;
    const { privateKey, publicKey } = this.state;
    return (
      <div>
        <Form className={classes.form}>
          <FieldSet legend="GPG管理">
            <TextInput
              name="publicKey"
              value={publicKey}
              label="公钥"
              onTextChange={this.handlePublicKeyChanged}
              autoFocus
              autoComplete="off"
              multipleLine
            />
            <TextInput
              name="privateKey"
              value={privateKey}
              label="密钥"
              onTextChange={this.handlePrivateKeyChanged}
              autoFocus
              autoComplete="off"
              multipleLine
            />
            <div className={classes.btnContainer}>
              <Button text="保存" onClick={this.handleClickSave} />
            </div>
          </FieldSet>
        </Form>
      </div>
    );
  }

  private handleClickSave = async () => {
    const { publicKey, privateKey } = this.state;
    const { gpgStore } = this.props;

    gpgStore.setGPGKey(publicKey.trim(), privateKey.trim());
  };

  handlePublicKeyChanged = (text: string) => this.setState({ publicKey: text });

  handlePrivateKeyChanged = (text: string) =>
    this.setState({ privateKey: text });
}

function mapStoresToInjects(stores: Stores, ownProps: OwnProps) {
  return {
    gpgStore: stores.gpgStore,
  };
}

export default connMobx(mapStoresToInjects)(
  connJss(styles)(withRouter(SetupGPGPage)),
);
