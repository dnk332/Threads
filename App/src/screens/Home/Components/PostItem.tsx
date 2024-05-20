import {Pressable, View} from 'react-native';
import React, {Fragment, ReactElement, useRef, useState} from 'react';
import {AppText, Avatar} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet} from '@themes/responsive';
import {SVGName} from '@assets/svg';
import {User, Post} from '@local_types/index';
import TimeFromNow from '@hooks/TimeAgo';
import ActiveBottomSheet from '@screens/Home/Components/ActiveBottomSheet';
import ContentHandelArea from '@components/PostContent/ContentHandelArea';
import MediaContent from '@components/PostContent/MediaContent';
import {imageHeight} from '@constants/index';

interface PostItemProps {
  userData: User;
  postData: Post;
  haveReplies?: boolean;
  lastReplies?: boolean;
  isReplies?: boolean;
  isRootPost?: boolean;
}

interface StatusItemProps {
  icon: ReactElement;
  value?: number;
}

const StatusItem = ({icon, value = 0}: StatusItemProps): ReactElement => {
  return (
    <View style={[layout.row, layout.alignItemsCenter, styles.status]}>
      <View style={styles.statusIcon}>{icon}</View>
      {value !== 0 && (
        <AppText fontSize={12} color={colors.text_secondary}>
          {value}
        </AppText>
      )}
    </View>
  );
};

const PostItem = ({
  userData,
  postData,
  haveReplies,
  lastReplies,
  isReplies,
  isRootPost,
}: PostItemProps) => {
  const sheetRef = useRef<any>();

  const [contentViewHeight, setContentViewHeight] = useState<number>(0);

  return (
    <Fragment>
      <View style={!haveReplies && styles.borderBottom}>
        <View
          style={[
            layout.row,
            styles.container,
            layout.fill,
            isReplies && styles.repliesContainer,
            isRootPost && styles.rootPost,
          ]}>
          <Avatar
            source={{
              uri: userData.avatar,
            }}
          />
          <View style={styles.contentContainer}>
            <View
              style={[
                styles.lineWrapper,
                {
                  height:
                    postData.mediaContent.length !== 0
                      ? imageHeight + contentViewHeight + 8
                      : contentViewHeight,
                },
              ]}>
              {haveReplies && !lastReplies && <View style={[styles.line]} />}
            </View>
            <View
              onLayout={({nativeEvent}) => {
                const {height} = nativeEvent.layout;
                setContentViewHeight(height);
              }}>
              <View
                style={[
                  layout.row,
                  layout.justifyContentBetween,
                  layout.alignItemsCenter,
                ]}>
                <View style={[layout.row, layout.alignItemsCenter]}>
                  <AppText
                    style={styles.userName}
                    fontSize={16}
                    fontWeight={600}>
                    {userData.username}
                  </AppText>
                  <TimeFromNow date={new Date(postData.time)} />
                </View>
                <Pressable onPress={() => sheetRef.current?.snapTo(0)}>
                  <SVGName title={'three_dot'} />
                </Pressable>
              </View>
              <ContentHandelArea textContent={postData.textContent} />
            </View>
          </View>
        </View>
        {postData.mediaContent.length > 0 && (
          <MediaContent content={postData.mediaContent} />
        )}
        <View
          style={[
            layout.row,
            styles.feature,
            postData.mediaContent.length === 0 && styles.space,
          ]}>
          <StatusItem
            icon={<SVGName title={'red_heart'} />}
            value={postData.liked}
          />
          <StatusItem
            icon={<SVGName title={'message'} />}
            value={postData.comment}
          />
          <StatusItem
            icon={<SVGName title={'report'} />}
            value={postData.reported}
          />
          <StatusItem icon={<SVGName title={'send'} />} />
        </View>
      </View>
      <ActiveBottomSheet sheetRef={sheetRef} />
    </Fragment>
  );
};

export default PostItem;

const styles = AppStyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 8,
  },
  borderBottom: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  contentContainer: {
    flexShrink: 1,
    marginLeft: 8,
    width: '100%',
  },
  userName: {
    marginVertical: 4,
    marginRight: 8,
  },
  time: {
    marginRight: 8,
  },
  feature: {
    marginTop: 16,
    paddingBottom: 8,
    marginLeft: 64,
  },
  status: {
    marginRight: 16,
  },
  line: {
    width: 2,
    backgroundColor: colors.border,
    flex: 1,
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
  },
  statusIcon: {
    marginRight: 2,
  },
  repliesContainer: {
    paddingTop: 0,
  },
  rootPost: {
    paddingBottom: 8,
    paddingTop: 16,
  },
  lineWrapper: {
    position: 'absolute',
    top: 40,
    left: -30,
    zIndex: 2,
  },
  space: {
    marginTop: 8,
  },
});
