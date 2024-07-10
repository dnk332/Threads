import React, {Fragment, memo, ReactElement, useRef} from 'react';
import {Pressable, View} from 'react-native';
import _ from 'lodash';

import {AppText, Avatar} from '@components';
import layout from '@themes/layout';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import TimeFromNow from '@hooks/hookTime/TimeAgo';
import ActiveBottomSheet from '@screens/Home/Components/ActiveBottomSheet';
import ContentHandelArea from '@src/components/PostContent/ContentHandelArea';
import SvgComponent from '@svg/index';

import {IAuthor, IInteraction, IPostText} from '@src/types/post';

interface PostTextViewProps {
  userData: IAuthor;
  postData: IPostText;
  interaction: IInteraction;
  haveReplies?: boolean;
  lastReplies?: boolean;
  isReplies?: boolean;
  isRootPost?: boolean;
  handleLike?: () => void;
  likeStatus?: boolean;
}

interface StatusItemProps {
  icon: ReactElement;
  value?: number;
  onPress?: () => void;
}

const StatusItem = ({
  icon,
  value = 0,
  onPress,
}: StatusItemProps): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={[layout.row, layout.alignItemsCenter, styles.status]}>
      <View style={styles.statusIcon}>{icon}</View>
      {value !== 0 && (
        <AppText fontSize={12} color={colors.text_secondary}>
          {value}
        </AppText>
      )}
    </Pressable>
  );
};

const PostText = ({
  userData,
  postData,
  isReplies,
  isRootPost,
  handleLike,
  interaction,
  likeStatus,
}: PostTextViewProps) => {
  const sheetRef = useRef<any>();
  return (
    <Fragment>
      <View>
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
              uri: '',
            }}
          />
          <View style={styles.contentContainer}>
            <View>
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
                    {userData.name}
                  </AppText>
                  {!_.isEmpty(postData.createdAt) && (
                    <TimeFromNow date={new Date(postData.createdAt)} />
                  )}
                </View>
                <Pressable onPress={() => sheetRef.current?.snapTo(0)}>
                  <SvgComponent name={'THREE_DOT'} />
                </Pressable>
              </View>
              <ContentHandelArea textContent={postData.textContent} />
            </View>
          </View>
        </View>

        <View style={[layout.row, styles.feature]}>
          <StatusItem
            onPress={handleLike}
            icon={<SvgComponent name={likeStatus ? 'HEART_FILL' : 'HEART'} />}
            value={interaction.countLikes}
          />
          <StatusItem icon={<SvgComponent name={'MESSAGE'} />} value={10} />
          <StatusItem icon={<SvgComponent name={'REPEAT'} />} value={10} />
          <StatusItem icon={<SvgComponent name={'SEND'} />} />
        </View>
      </View>
      <ActiveBottomSheet sheetRef={sheetRef} />
    </Fragment>
  );
};

export default memo(PostText);

const styles = AppStyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 8,
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
    zIndex: -1,
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
  overlay: {zIndex: 3},
});
