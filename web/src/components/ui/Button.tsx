import React, { MouseEventHandler } from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import classNames from 'classnames';

interface OwnProps {
  className?: string;
  text: string;
  onClick?: (e: Event) => void;
  disabled?: boolean;
}

interface Props extends WithStylesProps<typeof styles>, OwnProps {}

interface State {}

const styles = {
  button: {
    flex: 1,
    padding: [10, 16],
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: '#dddddd',
    },
  },
};

@observer
class ButtonClass extends PureComponent<Props, State> {
  state = {};

  render() {
    const { classes, className, text, disabled } = this.props;
    return (
      <button
        type="button"
        className={classNames(classes.button, className)}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }

  handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e as any);
    }
  };
}

export const Button = withStyles(styles)(ButtonClass);
