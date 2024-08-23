import React from 'react';

import PostDetailView from './view';
import {RouteProp} from '@react-navigation/native';
import {NavigationStackParamList} from '@navigation/Stack';
import SCREEN_NAME from '@navigation/ScreenName';

type PostDetailScreenRouteProp = RouteProp<
  NavigationStackParamList,
  typeof SCREEN_NAME.POST_DETAIL
>;

type PostDetailProps = {
  route: PostDetailScreenRouteProp;
};

const PostDetail = ({route}: PostDetailProps) => {
  const {postData, interaction, authorData} = route.params;

  return (
    <PostDetailView
      postData={postData}
      interaction={interaction}
      authorData={authorData}
    />
  );
};

export default PostDetail;
