import React from 'react';
import {ScrollView, View} from 'react-native';

import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {AppText} from '@src/components';

const activityFilter = [
  {id: 1, title: 'All'},
  {id: 2, title: 'Follows'},
  {id: 3, title: 'Replies'},
  {id: 4, title: 'Mentions'},
  {id: 5, title: 'Quotes'},
  {id: 6, title: 'Verified'},
];

const ActivityFilterList = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      horizontal>
      {activityFilter.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <AppText fontSize={15} fontWeight={700}>
            {item.title}
          </AppText>
        </View>
      ))}
    </ScrollView>
  );
};

export default ActivityFilterList;

const styles = AppStyleSheet.create({
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  container: {
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
