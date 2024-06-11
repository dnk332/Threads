import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigateTo(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

const navigatePush = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({name: route})),
      }),
    );
  }
};

const navigateAndSimpleReset = (name, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
};

export function navigateReplace(name, param) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, {
        param,
      }),
    );
  }
}

export const goBack = () => {
  navigationRef.goBack();
};

function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export default {
  navigationRef,
  navigateTo,
  navigatePush,
  goBack,
  navigateReplace,
  navigateAndSimpleReset,
  navigateAndReset,
  popToTop,
};
