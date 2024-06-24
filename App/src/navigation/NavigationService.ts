import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {NavigationStackParamList, ScreenNameKeys} from './Stack';

export const navigationRef =
  createNavigationContainerRef<NavigationStackParamList>();

type NavigationParams = {
  [K in ScreenNameKeys]: NavigationStackParamList[K];
};

export const navigateTo = <T extends ScreenNameKeys>(
  routeName: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
};

export const navigatePush = <T extends ScreenNameKeys>(
  name: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const navigateAndReset = (routes: ScreenNameKeys[] = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({name: route})),
      }),
    );
  }
};

export const navigateAndSimpleReset = <T extends ScreenNameKeys>(
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

export const navigateReplace = <T extends ScreenNameKeys>(
  name: T,
  params?: NavigationParams[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};
