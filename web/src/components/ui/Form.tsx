import React from 'react';
import { PureComponent } from 'react';
import { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import { connJss } from '../../hoc/jss';
import classNames from 'classnames';

interface OwnProps {
  className?: string;
}

interface Props extends WithStylesProps<typeof styles>, OwnProps {}

interface State {}

const styles = {
  form: {
    margin: '0 auto',
    maxWidth: 550,
    padding: [0, 16],
  },
};

@observer
class FormClass extends PureComponent<Props, State> {
  state = {};

  render() {
    const { classes, children, className } = this.props;
    return (
      <form className={classNames(classes.form, className)}>{children}</form>
    );
  }
}

export const Form = connJss(styles)(FormClass);
