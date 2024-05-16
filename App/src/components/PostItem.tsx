import {View} from 'react-native';
import React from 'react';
import {AppText, Avatar} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet, ResponsiveWidth} from '@themes/responsive';
import {SVGName} from '@assets/svg';
import {User, Post} from '../types/index';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

interface PostItemProps {
  userData: User;
  postData: Post;
}

const PostItem = ({userData, postData}: PostItemProps) => {
  TimeAgo.addDefaultLocale(en)

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')

  return (
    <View style={[layout.row, styles.container, layout.fill]}>
      <View>
        <Avatar
          source={{
            uri: userData.avatar,
          }}
        />
        <View style={styles.line} />
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
            <AppText style={styles.time} fontSize={12} fontWeight={400}>
              {timeAgo.format(postData.time)}
            </AppText>
          </View>
          <SVGName title={'three_dot'} />
        </View>
        <AppText fontSize={16} fontWeight={400}>
          Failures are stepping stones to success. Embrace them, learn from
          them, and keep moving forward
        </AppText>
        <View
          style={[layout.row, layout.justifyContentBetween, styles.feature]}>
          <View>
            <SVGName title={'red_heart'} />
          </View>
          <SVGName title={'message'} />
          <SVGName title={'report'} />
          <SVGName title={'send'} />
        </View>
        <AppText fontSize={16} color={colors.text_secondary}>
          1 like
        </AppText>
      </View>
    </View>
  );
};

export default PostItem;

const styles = AppStyleSheet.create({
  container: {
    padding: 16,
    borderBottomColor: colors.border_dark,
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
    maxWidth: ResponsiveWidth(132),
    marginVertical: 8,
  },
  line: {
    width: 2,
    height: '100%',
    backgroundColor: colors.border,
    flex: 1,
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 2,
  },
});
