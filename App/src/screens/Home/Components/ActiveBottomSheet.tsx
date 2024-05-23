import {View} from 'react-native';
import React from 'react';
import {AppBottomSheet, AppButton, AppGroupButton} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet} from '@themes/responsive';
import {SvgComponent} from '@assets/svg';
// import {SVGName} from '@assets/svg';

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
          ]}
          rightIcon={<SvgComponent name={'hashtag'} />}
        />
        <AppGroupButton
          containerStyle={styles.buttonContainer}
          data={[
            {
              text: 'Save',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SvgComponent name={'save'} />,
            },
            {
              text: 'Hide',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SvgComponent name={'eye_off'} />,
            },
          ]}
        />
        <AppGroupButton
          containerStyle={styles.buttonContainer}
          data={[
            {
              text: 'Mute',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SvgComponent name={'notify_off'} />,
            },
            {
              text: 'Unfollow',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SvgComponent name={'user_minus'} />,
            },
            {
              text: 'Report',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SvgComponent name={'alert'} />,
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
});
