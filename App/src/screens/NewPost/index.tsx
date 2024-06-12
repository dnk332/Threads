// import {StyleSheet} from 'react-native';
import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import NewPostScreenView from './view';
import {BottomTabsStackParamList} from '@src/screens/Root';

type DetailsScreenRouteProp = RouteProp<BottomTabsStackParamList, 'NEW_POST'>;

export type NewPostScreenProps = {
  route: DetailsScreenRouteProp;
  navigation: NavigationProp<ParamListBase>;
};

const NewPostScreen = () => {
  // const sheetRef = useRef<any>();

  // useEffect(() => {
  //   sheetRef.current?.snapTo(0);
  // }, []);

  return <NewPostScreenView />;
};

export default NewPostScreen;

// const styles = StyleSheet.create({});
