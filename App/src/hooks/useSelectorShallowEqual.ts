import {useSelector, shallowEqual} from 'react-redux';

export default function useSelectorShallow(
  selector,
  equalityFn = shallowEqual,
) {
  return useSelector(selector, equalityFn);
}

export function selectorWithProps(selector, props) {
  return state => selector(state, props);
}
