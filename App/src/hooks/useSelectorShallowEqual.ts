import {useSelector, shallowEqual} from 'react-redux';

import {RootState} from '@store';

type Selector<TState = RootState, TSelected = unknown> = (
  state: TState,
) => TSelected;
type EqualityFn<TSelected = unknown> = (
  left: TSelected,
  right: TSelected,
) => boolean;

export default function useSelectorShallow<
  TState = RootState,
  TSelected = unknown,
>(selector: Selector<TState, TSelected>, equalityFn?: EqualityFn<TSelected>) {
  return useSelector(selector, equalityFn || shallowEqual);
}
