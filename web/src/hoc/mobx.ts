import { ComponentType } from 'react';
import { inject } from 'mobx-react';
import { Stores } from '../stores';

export function connMobx<InjectProps>(
  mapStoresToInjected: (stores: Stores, ownProps: any) => InjectProps,
) {
  return <Props>(WrappedComponent: ComponentType<Props>) => {
    type ReturnType = ComponentType<Omit<Props, keyof InjectProps>>;
    return inject(mapStoresToInjected)(
      WrappedComponent as any,
    ) as unknown as ReturnType;
  };
}
