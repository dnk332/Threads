import {View} from 'react-native';
import React, {ReactElement} from 'react';
import {AppText, Avatar} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet} from '@themes/responsive';
import {SVGName} from '@assets/svg';
import {User, Post} from '../types/index';
import TimeFromNow from '@hooks/TimeAgo';

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

const StatusItem = ({icon, value}: StatusItemProps): ReactElement => {
  return (
    <View style={[layout.row, layout.alignItemsCenter, styles.status]}>
      <View style={styles.statusIcon}>{icon}</View>
      {value && (
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
  return (
    <View
      style={[
        layout.row,
        styles.container,
        layout.fill,
        !haveReplies && styles.borderBottom,
        isReplies && styles.repliesContainer,
        isRootPost && styles.rootPost,
      ]}>
      <View>
        <Avatar
          source={{
            uri: userData.avatar,
          }}
        />
        {haveReplies && !lastReplies && <View style={styles.line} />}
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            layout.row,
            layout.justifyContentBetween,
            layout.alignItemsCenter,
          ]}>
          <View style={[layout.row, layout.alignItemsCenter]}>
            <AppText style={styles.userName} fontSize={16} fontWeight={600}>
              {userData.username}
            </AppText>
            <TimeFromNow date={new Date(postData.time)} />
          </View>
          <SVGName title={'three_dot'} />
        </View>
        <AppText fontSize={16} fontWeight={400}>
          {postData.content}
        </AppText>
        <View style={[layout.row, styles.feature]}>
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
    </View>
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
  },
  status: {
    marginRight: 8,
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
});
