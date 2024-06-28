import React from 'react';
import {View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

import {AppText} from '@components';
import {AppStyleSheet} from '@src/themes/responsive';

const RepliesTab = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.title}>
        <AppText>RepliesTab</AppText>
      </View>
    </Tabs.ScrollView>
  );
};

export default RepliesTab;

const styles = AppStyleSheet.create({
  title: {height: 100, flex: 1},
});
