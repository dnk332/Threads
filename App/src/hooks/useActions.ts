import {
  bindActionCreators,
  ActionCreator,
  ActionCreatorsMapObject,
} from 'redux';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {AppDispatch} from '@src/redux/store';

type Actions = ActionCreator<any> | ActionCreatorsMapObject<any>;

export function useActions<T extends Actions>(actions: T, deps?: any[]): T {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(
    () => bindActionCreators(actions as any, dispatch),
    /* eslint-disable react-hooks/exhaustive-deps */
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
