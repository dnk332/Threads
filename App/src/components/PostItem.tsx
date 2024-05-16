import {View} from 'react-native';
import React from 'react';
import {AppImage, AppText} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet, ResponsiveWidth} from '@themes/responsive';
import {SVGName} from '@assets/svg';

const PostItem = () => {
  return (
    <View style={[layout.row, styles.container, layout.fill]}>
      <AppImage
        source={{
          uri: 'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        containerStyle={styles.imageContainer}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View
          style={[
            layout.row,
            layout.justifyContentBetween,
            layout.alignItemsCenter,
          ]}>
          <AppText style={styles.userName} fontSize={16} fontWeight={600}>
            Ruchi_shah
          </AppText>
          <View style={[layout.row, layout.alignItemsCenter]}>
            <AppText style={styles.time} fontSize={12} fontWeight={400}>
              49m
            </AppText>
            <SVGName title={'three_dot'} />
          </View>
        </View>
        <AppText fontSize={16} fontWeight={400}>
          Failures are stepping stones to success. Embrace them, learn from
          them, and keep moving forward
        </AppText>
        <View
          style={[layout.row, layout.justifyContentBetween, styles.feature]}>
          <SVGName title={'red_heart'} />
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
  imageContainer: {width: 40, height: 40},
  container: {
    padding: 16,
    borderBottomColor: colors.border_dark,
    borderBottomWidth: 1,
  },
  image: {
    borderRadius: 40,
  },
  contentContainer: {
    flexShrink: 1,
    marginLeft: 8,
  },
  userName: {
    marginVertical: 4,
  },
  time: {
    marginRight: 8,
  },
  feature: {
    maxWidth: ResponsiveWidth(132),
    marginVertical: 8,
  },
});
