import React, {Fragment, useCallback} from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {dummyPost} from '@constants/dummyData';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, PostItem, AppButton} from '@components';
import {useDispatch} from 'react-redux';
import {authActions} from '@actions';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const HomeScreenView = () => {
  const dispatch = useDispatch();

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

  const onSignUp = () => {
    dispatch(
      authActions.onRegister(
        {username: 'Fang0100', password: '123123'},
        () => {},
      ),
    );
  };

  return (
    <AppContainer>
      <AppButton text="SIGN_UP" onPress={onSignUp} />
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
