import React, {Fragment, memo, ReactElement, useRef} from 'react';
import {Pressable, View} from 'react-native';

import {Avatar, AppText} from '@components';
import layout from '@themes/layout';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {IUser} from '@localTypes/user';
import {IPostText} from '@localTypes/post';
import TimeFromNow from '@hooks/TimeAgo';
import ActiveBottomSheet from '@src/screens/Home/Components/ActiveBottomSheet';
import ContentHandelArea from '@src/components/PostContent/ContentHandelArea';
import SvgComponent from '@svg/index';

interface PostItemProps {
  userData: IUser;
  postData: IPostText;
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
  isReplies,
  isRootPost,
}: PostItemProps) => {
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
              uri: userData.avatar,
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
                    {userData.username}
                  </AppText>
                  <TimeFromNow date={new Date(postData.createAt)} />
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
          <StatusItem icon={<SvgComponent name={'HEART'} />} value={10} />
          <StatusItem icon={<SvgComponent name={'MESSAGE'} />} value={10} />
          <StatusItem icon={<SvgComponent name={'REPEAT'} />} value={10} />
          <StatusItem icon={<SvgComponent name={'SEND'} />} />
        </View>
      </View>
      <ActiveBottomSheet sheetRef={sheetRef} />
    </Fragment>
  );
};

export default memo(PostItem);

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
