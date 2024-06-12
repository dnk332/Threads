import React from 'react';
import {View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

import {AppText} from '@components';

const RepliesTab = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height: 100, flex: 1}}>
        <AppText>RepliesTab</AppText>
      </View>
    </Tabs.ScrollView>
  );
};

export default RepliesTab;

// const styles = StyleSheet.create({});
