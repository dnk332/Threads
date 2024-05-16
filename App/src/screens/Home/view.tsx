import {FlatList} from 'react-native';
import React, {Fragment, useCallback} from 'react';
import PostItem from '@components/PostItem';
import AppContainer from '@components/AppContainer';

import {dummyPost} from '@constants/dummyData';

const HomeScreenView = () => {
  const _renderItem = useCallback(({item}) => {
    let isDualPost = item.postData.length > 1;

    if (isDualPost) {
      return (
        <Fragment>
          <PostItem
            postData={item.postData[0].post}
            userData={item.postData[0].userData}
            dualPost={true}
          />
          <PostItem
            lastPostOfDual={true}
            postData={item.postData[0].post}
            userData={item.postData[0].userData}
          />
        </Fragment>
      );
    } else {
      return (
        <PostItem
          postData={item.postData[0].post}
          userData={item.postData[0].userData}
        />
      );
    }
  }, []);

  return (
    <AppContainer statusBarProps={{barStyle: 'light-content'}}>
      <FlatList
        data={dummyPost}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem}
      />
    </AppContainer>
  );
};

export default HomeScreenView;
