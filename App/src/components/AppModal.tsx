import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modalbox';
import {width} from '@src/utils/DeviceInfo';
import AppText from './AppText';

const AppModal = () => {
  return (
    <Modal
      position="center"
      //   onClosed={onClosed}
      isOpen={true}
      style={styles.containerModal}>
      <View>
        <AppText>AppModal</AppText>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  containerModal: {
    height: 'auto',
    backgroundColor: 'red',
    borderRadius: 5,
    width: width - 64,
    paddingBottom: 16,
  },
});
