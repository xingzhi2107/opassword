import React from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';

interface OwnProps {
  legend?: string;
}

interface Props extends WithStylesProps<typeof styles>, OwnProps {}

interface State {}

const styles = {
  fieldset: {},
  legend: {},
};

@observer
class FieldSetClass extends PureComponent<Props, State> {
  state = {};

  render() {
    const { classes, children } = this.props;
    return (
      <fieldset className={classes.fieldset}>
        {this.renderLegend()}
        {children}
      </fieldset>
    );
  }

  renderLegend() {
    const { legend: legendText, classes } = this.props;
    if (!legendText) {
      return;
    }

    return <legend className={classes.legend}>{legendText}</legend>;
  }
}

export const FieldSet = withStyles(styles)(FieldSetClass);
