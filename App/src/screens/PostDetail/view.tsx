import React from 'react';
import {AppStyleSheet} from '@src/themes/responsive';
import {AppContainer, AppText, Avatar} from '@src/components';
import {IAuthor, IInteraction, IPost} from '@src/types/post';
import {Pressable, View} from 'react-native';
import _ from 'lodash';

import TempAvatar from '../../components/TempAvatar';
import layout from '@themes/layout';
import TimeFromNow from '@hooks/hookTime/TimeAgo';
import SvgComponent from '@svg/index';
import ContentHandelArea from '@src/components/PostContent/ContentHandelArea';
import MediaContent from '@src/components/PostContent/MediaContent';
import {StatusItem} from '@src/components/PostItem/PostItem';
import {useToggleLike} from '@hooks/useToggleLike';
import {colors} from '@themes/color';
import {width} from '@utils/DeviceInfo';

type PostDetailViewProps = {
  postData?: IPost;
  authorData?: IAuthor;
  interaction?: IInteraction;
};

const PostDetailView = ({
  postData,
  authorData,
  interaction,
}: PostDetailViewProps) => {
  const {likeStatus, handleLike} = useToggleLike({
    postId: postData.id,
    currentLikeStatus: interaction.likeStatus,
  });

  return (
    <AppContainer haveBackButton={true} haveTitle={true} title={'Thread'}>
      <View style={styles.container}>
        <View
          style={[layout.row, layout.alignItemsCenter, styles.headerContainer]}>
          {_.isEmpty(authorData.authorAvatar) ? (
            <TempAvatar username={authorData.userName} fontSize={14} />
          ) : (
            <Avatar
              source={{
                uri: authorData.authorAvatar,
              }}
            />
          )}
          <View
            style={[
              layout.row,
              layout.justifyContentBetween,
              layout.alignItemsCenter,
              layout.fill,
            ]}>
            <View style={[layout.row, layout.alignItemsCenter]}>
              <AppText style={styles.userName} fontSize={16} fontWeight={600}>
                {authorData.userName}
              </AppText>
              <TimeFromNow date={new Date(postData.createdAt)} />
            </View>
            <Pressable onPress={() => {}}>
              <SvgComponent name={'THREE_DOT'} />
            </Pressable>
          </View>
        </View>
        <ContentHandelArea textContent={postData.textContent} />
      </View>
      {postData.imageContent.length > 0 && (
        <MediaContent haveSpacer={false} content={postData.imageContent} />
      )}
      <View
        style={[
          layout.row,
          styles.feature,
          postData.imageContent.length === 0 && styles.space,
        ]}>
        <StatusItem
          onPress={handleLike}
          icon={<SvgComponent name={likeStatus ? 'HEART_FILL' : 'HEART'} />}
          value={interaction.countLikes}
        />
        <StatusItem icon={<SvgComponent name={'MESSAGE'} />} value={10} />
        <StatusItem icon={<SvgComponent name={'REPEAT'} />} value={10} />
        <StatusItem icon={<SvgComponent name={'SEND'} />} />
      </View>
      <View style={styles.line} />
      <View
        style={[
          layout.row,
          layout.justifyContentBetween,
          layout.alignItemsCenter,
          styles.replies,
        ]}>
        <AppText fontSize={16} fontWeight={700}>
          Replies
        </AppText>
        <View
          style={[
            layout.row,
            layout.justifyContentBetween,
            layout.alignItemsCenter,
          ]}>
          <AppText color={colors.text_gray} fontSize={16}>
            View activity
          </AppText>
          <Pressable onPress={() => {}}>
            <SvgComponent
              color={colors.text_gray}
              name={'ARROW_RIGHT'}
              size={18}
            />
          </Pressable>
        </View>
      </View>
    </AppContainer>
  );
};

export default PostDetailView;

const styles = AppStyleSheet.create({
  container: {
    padding: 16,
  },
  userName: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  headerContainer: {
    marginBottom: 16,
  },
  feature: {
    marginTop: 16,
    paddingBottom: 8,
    marginLeft: 16,
  },
  space: {
    marginTop: 8,
  },
  line: {
    height: 1,
    width: width - 32,
    backgroundColor: colors.border_dark,
    alignSelf: 'center',
    marginTop: 4,
  },
  replies: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_dark,
  },
});
