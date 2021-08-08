import React from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { PasswordInfoPlainData } from '@xingzhi2107/opassword-js-sdk';
import { passwordApis } from '../ApiClient';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { MiscUtils } from '../utils/MiscUtils';

interface Props extends WithStylesProps<typeof styles> {}

interface State {
  loading: boolean;
  passwords: Partial<PasswordInfoPlainData>[];
}

const styles = {
  myButton: {
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
  myLabel: {
    fontStyle: 'italic',
  },
};

class PasswordListPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      passwords: [],
    };
  }

  async componentDidMount() {
    const idsRes = await passwordApis.fetchPasswordInfoIds({
      'per-page': 100,
    });

    const infosRes = await passwordApis.fetchPasswordInfos({
      ids: idsRes.data.ids,
      cols: ['id', 'name', 'account', 'encryptedPassword', 'webSite', 'note'],
    });

    this.setState({
      loading: false,
      passwords: infosRes.data.items,
    });
  }

  render() {
    const { passwords, loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div>
        <div>{passwords.map((x) => this.renderPasswordItem(x))}</div>
      </div>
    );
  }

  renderPasswordItem(item: Partial<PasswordInfoPlainData>) {
    return (
      <div key={item.id}>
        <span>{item.id}</span>
        <span>{item.name}</span>
        <span>{item.account}</span>
        <span>{item.webSite}</span>
        <span>{item.note}</span>
        <span>
          <Button
            text="获取密码"
            onClick={() => this.handlePressGetPassword(item)}
          />
          <Link to={`/passwords/${item.id}`}>{'修改'}</Link>
          <Button
            text="删除"
            onClick={() => this.handlePressDeletePassword(item)}
          />
        </span>
      </div>
    );
  }

  handlePressGetPassword = async (item: Partial<PasswordInfoPlainData>) => {
    if (item.encryptedPassword) {
      await MiscUtils.setClipboard(item.encryptedPassword);
    }
  };

  handlePressDeletePassword = async (item: Partial<PasswordInfoPlainData>) => {
    await passwordApis.softDeletePasswordInfo(item.id!);
    this.setState({
      passwords: this.state.passwords.filter((x) => x.id === item.id),
    });
  };
}

export default withStyles(styles)(PasswordListPage);
