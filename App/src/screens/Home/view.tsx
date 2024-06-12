import React, {Fragment, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {dummyPost} from '@constants/dummyData';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, PostItem} from '@components';

import {tokenSelector, userInfoSelector} from '@selectors';
import useSelectorShallow from '@hooks/useSelectorShallowEqual';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const HomeScreenView = () => {
  const token = useSelectorShallow(tokenSelector);
  const userInfo = useSelectorShallow(userInfoSelector);

  useEffect(() => {
    console.log('token', token);
    console.log('userInfo', userInfo);
  }, [token, userInfo]);

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
              /* eslint-disable-next-line react/no-array-index-key */
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
    <AppContainer>
      <FlashList
        data={dummyPost}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={10}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={0.5}
      />
    </AppContainer>
  );
};

export default HomeScreenView;

const styles = AppStyleSheet.create({
  separator: {borderBottomColor: colors.border, borderBottomWidth: 1},
});
