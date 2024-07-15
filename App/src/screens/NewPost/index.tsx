import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import NewPostScreenView from './view';
import {BottomTabsStackParamList} from '@src/screens/Root';
import {useActions} from '@src/hooks/useActions';
import {createPostAction} from '@appRedux/actions/postAction';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {currentAccountSelector} from '@src/redux/selectors';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import Navigator from '@navigators';

type DetailsScreenRouteProp = RouteProp<BottomTabsStackParamList, 'NEW_POST'>;

export type NewPostScreenProps = {
  route: DetailsScreenRouteProp;
  navigation: NavigationProp<ParamListBase>;
};

const NewPostScreen = () => {
  const userInfo = useSelectorShallow(currentAccountSelector);
  const actions = useActions({
    createPostAction,
  });
  const createPost = (textContent: string) => {
    const callback: Callback = ({success}) => {
      if (success) {
        Navigator.goBack();
      }
    };
    actions.createPostAction(userInfo.user_id, textContent, callback);
  };
  return <NewPostScreenView createPost={createPost} />;
};

export default NewPostScreen;
