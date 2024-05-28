import {View} from 'react-native';
import React from 'react';
import AppText from '@components/AppText';
// import {layout} from '@themes/index';
import {Tabs} from 'react-native-collapsible-tab-view';

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
