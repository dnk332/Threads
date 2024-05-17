import {FlatList} from 'react-native';
import React, {Fragment, useCallback} from 'react';
import PostItem from '@screens/Home/Components/PostItem';
import AppContainer from '@components/AppContainer';

import {dummyPost} from '@constants/dummyData';

const HomeScreenView = () => {
  const _renderItem = useCallback(({item}) => {
    let isRepliesPost = item.replies.length > 0;
    if (isRepliesPost) {
      return (
        <Fragment>
          <PostItem
            postData={item.rootPost.post}
            userData={item.rootPost.userData}
            haveReplies={true}
            isRootPost={true}
          />
          {item.replies.map((replies, index) => {
            let isLastReplies =
              item.replies[item.replies.length - 1].id === replies.id;
            return (
              <PostItem
                key={index}
                postData={replies.post}
                userData={replies.userData}
                haveReplies={!isLastReplies}
                isReplies={true}
              />
            );
          })}
        </Fragment>
      );
    } else {
      return (
        <PostItem
          postData={item.rootPost.post}
          userData={item.rootPost.userData}
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
