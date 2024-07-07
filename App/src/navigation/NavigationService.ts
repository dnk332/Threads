import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {NavigationStackParamList, ScreenNameKeys} from './Stack';

const navigationRef = createNavigationContainerRef<NavigationStackParamList>();

type NavigationParams = {
  [K in ScreenNameKeys]: NavigationStackParamList[K];
};

const navigateTo = <T extends ScreenNameKeys>(
  routeName: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
};

const navigatePush = <T extends ScreenNameKeys>(
  name: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

const navigateAndReset = (routes: ScreenNameKeys[] = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({name: route})),
      }),
    );
  }
};

const navigateAndSimpleReset = <T extends ScreenNameKeys>(
  name: T,
  index = 0,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
};

const navigateReplace = <T extends ScreenNameKeys>(
  name: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};

const Navigator = {
  navigateTo,
  navigatePush,
  navigateAndReset,
  navigateAndSimpleReset,
  navigateReplace,
  goBack,
  popToTop,
  navigationRef,
};

export default Navigator;
