import {FlatList} from 'react-native';
import React, {useCallback} from 'react';
import PostItem from '@components/PostItem';
import AppContainer from '@components/AppContainer';

const HomeScreenView = () => {
  const _renderItem = useCallback(({}) => {
    return <PostItem />;
  }, []);

  return (
    <AppContainer statusBarProps={{barStyle: 'light-content'}}>
      <FlatList
        // refreshControl={}
        data={['1', '2', '3', '4', '5']}
        keyExtractor={item => item}
        renderItem={_renderItem}
      />
    </AppContainer>
  );
};

export default HomeScreenView;
