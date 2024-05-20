import {View} from 'react-native';
import React from 'react';
import {AppBottomSheet, AppButton, AppGroupButton} from '@components/index';
import {layout, colors} from '@themes/index';
import {AppStyleSheet} from '@themes/responsive';
import {SVGName} from '@assets/svg';

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
          rightIcon={<SVGName title={'hash_tag'} />}
        />
        <AppGroupButton
          containerStyle={styles.buttonContainer}
          data={[
            {
              text: 'Save',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SVGName title={'save'} />,
            },
            {
              text: 'Hide',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SVGName title={'eye_off'} />,
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
              rightIcon: <SVGName title={'notify_off'} />,
            },
            {
              text: 'Unfollow',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SVGName title={'user_minus'} />,
            },
            {
              text: 'Report',
              buttonColor: colors.dark_gray,
              buttonStyle: [layout.row, styles.bottomSheetButton],
              rightIcon: <SVGName title={'report_circle'} />,
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
