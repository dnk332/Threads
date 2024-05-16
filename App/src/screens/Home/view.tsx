import {FlatList} from 'react-native';
import React, {useCallback} from 'react';
import PostItem from '@components/PostItem';
import AppContainer from '@components/AppContainer';

import {dummyPost} from '@constants/dummyData';

const HomeScreenView = () => {
  const _renderItem = useCallback(({item}) => {
    let data = item.postData[0];

    return <PostItem postData={data.post} userData={data.userData} />;
  }, []);

  return (
    <AppContainer statusBarProps={{barStyle: 'light-content'}}>
      <FlatList
        // refreshControl={}
        data={dummyPost}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem}
      />
    </AppContainer>
  );
};

export default HomeScreenView;
