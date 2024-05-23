// import {StyleSheet} from 'react-native';
import React from 'react';
import NewPostView from './view';
import {BottomTabsStackParamList} from '@screens/Root';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

type DetailsScreenRouteProp = RouteProp<BottomTabsStackParamList, 'NEW_POST'>;

export type NewPostProps = {
  route: DetailsScreenRouteProp;
  navigation: NavigationProp<ParamListBase>;
};

const NewPost = ({route, navigation}: NewPostProps) => {
  // const sheetRef = useRef<any>();

  // useEffect(() => {
  //   sheetRef.current?.snapTo(0);
  // }, []);

  return <NewPostView route={route} navigation={navigation} />;
};

export default NewPost;

// const styles = StyleSheet.create({});
