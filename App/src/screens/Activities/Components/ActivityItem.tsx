import React from 'react';
import {Pressable, View} from 'react-native';

import layout from '@themes/layout';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import TimeFromNow from '@hooks/TimeAgo';
import {AppText, Avatar, AppButton} from '@src/components';

const ActivityItem = () => {
  return (
    <Pressable style={[layout.row, styles.container]}>
      <Avatar
        source={{
          uri: 'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
        }}
        container={styles.avatar}
      />
      <View
        style={[
          layout.row,
          layout.scrollSpaceBetween,
          styles.contentContainer,
        ]}>
        <View>
          <View style={[layout.row, layout.alignItemsCenter]}>
            <AppText style={styles.userName} fontSize={16} fontWeight={600}>
              Brian
            </AppText>
            <TimeFromNow date={new Date()} />
          </View>
          <AppText fontSize={14} color={colors.text_secondary}>
            Followed you
          </AppText>
        </View>
        <AppButton
          borderRadius={8}
          buttonStyle={styles.followBtn}
          text="Follow"
          textStyle={styles.followTxtBtn}
        />
      </View>
    </Pressable>
  );
};

export default ActivityItem;

const styles = AppStyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 9,
  },
  avatar: {
    marginRight: 16,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  followTxtBtn: {
    fontWeight: '700',
  },
  contentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 9,
  },
  userName: {
    marginRight: 8,
  },
});
