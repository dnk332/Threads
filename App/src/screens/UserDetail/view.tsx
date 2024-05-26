import React from 'react';
import AppContainer from '@components/AppContainer';
import AppText from '@components/AppText';
import {SvgComponent} from '@assets/svg';
import {Pressable, View} from 'react-native';
import {layout, layoutValue} from '@themes/index';
import {AppStyleSheet} from '@themes/responsive';
import Avatar from '@components/Avatar';

const UserDetailView = () => {
  return (
    <AppContainer>
      <View
        style={[
          layout.row,
          layout.alignItemsCenter,
          layout.justifyContentBetween,
        ]}>
        <Pressable style={styles.headerBtn}>
          <SvgComponent name="GLOBE" />
        </Pressable>
        <View
          style={[layout.row, layout.alignItemsCenter, styles.leftHeaderBtn]}>
          <Pressable style={styles.headerBtn}>
            <SvgComponent name="INSTAGRAM" />
          </Pressable>
          <Pressable style={styles.headerBtn}>
            <SvgComponent name="LINE_2" />
          </Pressable>
        </View>
      </View>
      <View>
        <AppText fontSize={24} fontWeight={700}>
          Brian
        </AppText>
        <View style={[layout.row, layout.alignItemsCenter, layoutValue(8).gap]}>
          <AppText>brian_dn</AppText>
          <AppText>Brian</AppText>
        </View>
        <AppText>Brian</AppText>
        <Avatar
          source={{
            uri: 'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
          }}
        />
      </View>
    </AppContainer>
  );
};

export default UserDetailView;

const styles = AppStyleSheet.create({
  headerBtn: {},
  leftHeaderBtn: {
    gap: 16,
  },
});
