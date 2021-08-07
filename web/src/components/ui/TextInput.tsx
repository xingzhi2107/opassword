import React, { ChangeEvent } from 'react';
import { PureComponent } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { observer } from 'mobx-react';
import { MiscUtils } from '../../utils/MiscUtils';
import FieldContainer from './FieldContainer';

interface OwnProps {
  id?: string;
  name: string;
  value: string | number;
  onTextChange?: (text: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  multipleLine?: boolean;
  rows?: number;
  readOnly?: boolean;
  autoComplete?: string;
}

interface Props extends WithStylesProps<typeof styles>, OwnProps {}

interface State {}

const styles = {
  input: {
    color: 'rgb(36, 41, 46)',
    padding: [5, 7],
  },
};

@observer
class TextInputClass extends PureComponent<Props, State> {
  state = {};

  private readonly inputId: string;

  constructor(props: Props) {
    super(props);
    this.inputId = props.id || MiscUtils.uniqId('text-input-');
  }

  render() {
    const { label } = this.props;
    return (
      <FieldContainer label={label} fieldId={this.inputId}>
        {this.renderInput()}
      </FieldContainer>
    );
  }

  renderInput() {
    const {
      multipleLine,
      rows,
      type,
      classes,
      name,
      value,
      required,
      placeholder,
      autoFocus,
      readOnly,
      autoComplete,
    } = this.props;

    const commonProps = {
      id: this.inputId,
      name: name,
      value: value,
      className: classes.input,
      required: required,
      placeholder: placeholder,
      autoFocus: autoFocus,
      onChange: this.handleOnChange,
      readOnly,
      autoComplete,
    };

    if (multipleLine) {
      return <textarea {...commonProps} rows={rows || 5} />;
    } else {
      return <input {...commonProps} type={type} />;
    }
  }

  handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (this.props.onTextChange) {
      this.props.onTextChange(text);
    }
  };
}

export const TextInput = withStyles(styles)(TextInputClass);
