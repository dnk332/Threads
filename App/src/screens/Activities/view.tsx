import React, {useCallback} from 'react';
import AppContainer from '@components/AppContainer';

import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';
import colors from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import AppText from '@components/AppText';
import {layout} from '@themes/index';
import ActivityItem from './Components/ActivityItem';
import ActivityFilterList from './Components/ActivityFilterList';

const ActivitiesScreenView = () => {
  const _renderItem = useCallback(({}) => {
    return <ActivityItem />;
  }, []);

  return (
    <AppContainer statusBarProps={{barStyle: 'light-content'}}>
      <View style={styles.header}>
        <AppText style={styles.title} fontSize={32} fontWeight={700}>
          Activity
        </AppText>
        <ActivityFilterList />
      </View>
      <View style={[layout.fill]}>
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={item => item.toString()}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={10}
          onEndReachedThreshold={0.5}
        />
      </View>
    </AppContainer>
  );
};

export default ActivitiesScreenView;

const styles = AppStyleSheet.create({
  header: {},
  searchContainer: {
    borderRadius: 10,
    backgroundColor: colors.dark_gray,
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
  animatedSearchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
  },
  title: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    fontSize: 16,
    marginLeft: 4,
    width: '100%',
    alignSelf: 'flex-start',
    maxWidth: '90%',
    paddingVertical: 8,
  },
});
