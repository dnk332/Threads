import React from 'react';
import {View} from 'react-native';

import {colors} from '@themes/color';
import layout from '@themes/layout';
import {AppStyleSheet} from '@themes/responsive';
import SvgComponent from '@svg/index';
import {AppButton, AppGroupButton, AppBottomSheet} from '@components';

const ActiveBottomSheet = ({sheetRef}) => {
  return (
    <AppBottomSheet
      backgroundStyle={{backgroundColor: colors.bottom_sheet_background}}
      snapPoints={['50%']}
      ref={sheetRef}>
      <View style={styles.bottomSheetContainer}>
        <AppButton
          text="Create with tag"
          buttonColor={colors.dark_gray}
          buttonStyle={[
            layout.row,
            styles.bottomSheetButton,
            styles.buttonContainer,
            styles.button,
          ]}
          rightIcon={<SvgComponent name={'HASHTAG'} />}
        />
        <AppGroupButton
          containerStyle={styles.buttonContainer}
          data={[
            {
              text: 'Save',
              buttonColor: colors.dark_gray,
              buttonStyle: [
                layout.row,
                styles.bottomSheetButton,
                styles.button,
              ],
              rightIcon: <SvgComponent name={'SAVE'} />,
            },
            {
              text: 'Hide',
              buttonColor: colors.dark_gray,
              buttonStyle: [
                layout.row,
                styles.bottomSheetButton,
                styles.button,
              ],
              rightIcon: <SvgComponent name={'EYE_OFF'} />,
            },
          ]}
        />
        <AppGroupButton
          containerStyle={styles.buttonContainer}
          data={[
            {
              text: 'Mute',
              buttonColor: colors.dark_gray,
              buttonStyle: [
                layout.row,
                styles.bottomSheetButton,
                styles.button,
              ],
              rightIcon: <SvgComponent name={'NOTIFY_OFF'} />,
            },
            {
              text: 'Unfollow',
              buttonColor: colors.dark_gray,
              buttonStyle: [
                layout.row,
                styles.bottomSheetButton,
                styles.button,
              ],
              rightIcon: <SvgComponent name={'USER_MINUS'} />,
            },
            {
              text: 'Report',
              buttonColor: colors.dark_gray,
              buttonStyle: [
                layout.row,
                styles.bottomSheetButton,
                styles.button,
              ],
              rightIcon: <SvgComponent name={'ALERT'} />,
            },
          ]}
        />
      </View>
    </AppBottomSheet>
  );
};

export default ActiveBottomSheet;

const styles = AppStyleSheet.create({
  bottomSheetContainer: {
    marginHorizontal: 16,
  },
  bottomSheetButton: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});
