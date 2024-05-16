import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppImage} from '@components/index';

const PostItem = () => {
  return (
    <View>
      <AppImage
        source={{
          uri: 'https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-anh-sang-dan-ong-nh-ng-ng-i-ngh-thu-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        containerStyle={styles.container}
      />
      <Text>LOL</Text>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {width: 36, height: 36},
  image: {},
});
