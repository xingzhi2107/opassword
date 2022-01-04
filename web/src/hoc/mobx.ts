import { ComponentType } from 'react';
import { Stores } from '../stores';
import { inject } from 'mobx-react';

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
