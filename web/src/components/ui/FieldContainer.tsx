import React, { ReactElement } from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';

interface OwnProps {
  fieldId?: string;
  label?: string;
  children: ReactElement;
}

interface Props extends WithStylesProps<typeof styles>, OwnProps {}

interface State {}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 5,
  },
  label: {
    color: 'rgb(36, 41, 46)',
    marginBottom: 5,
  },
};

@observer
class FieldContainerClass extends PureComponent<Props, State> {
  state = {};

  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.container}>
        {this.renderLabel()}
        {children}
      </div>
    );
  }

  renderLabel() {
    const { label: labelText, classes, fieldId } = this.props;
    if (!labelText) return;

    return (
      <label htmlFor={fieldId} className={classes.label}>
        {labelText}
      </label>
    );
  }
}

export default withStyles(styles)(FieldContainerClass);
