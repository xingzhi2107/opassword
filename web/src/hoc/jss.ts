import { ComponentType } from 'react';
import withStyles, { Styles } from 'react-jss';

export function connJss(styles: Styles) {
  return <Props>(WrappedComponent: ComponentType<Props>) => {
    type ReturnType = ComponentType<Omit<Props, 'classes'>>;
    return withStyles(styles)(WrappedComponent as any) as unknown as ReturnType;
  };
}
