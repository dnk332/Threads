import {Pressable, View} from 'react-native';
import React, {useCallback} from 'react';
import {AppStyleSheet} from '@src/themes/responsive';
import {AppContainer, AppText} from '@src/components';
import settings from './constants/SettingOptions';
import SvgComponent from '@src/assets/svg';
import {colors} from '@themes/color';

type SettingScreenViewProps = {
  HandelOptionSetting: any;
};

const SettingsScreenView = ({HandelOptionSetting}: SettingScreenViewProps) => {
  const SettingItem = useCallback(
    ({setting}) => {
      return (
        <Pressable
          onPress={() => {
            HandelOptionSetting(setting.title);
          }}>
          <View style={styles.settingItemWrapper}>
            <SvgComponent name={setting.icon} />
            <AppText>{setting.title}</AppText>
          </View>
        </Pressable>
      );
    },
    [HandelOptionSetting],
  );

  return (
    <AppContainer
      haveBackButton={true}
      haveTitle={true}
      title={'Settings'}
      headerLine={true}>
      <View style={styles.settingsWrapper}>
        {settings.map((setting, index) => (
          <View key={index}>
            <SettingItem setting={setting} />
          </View>
        ))}
      </View>
      <Pressable
        onPress={() => {
          HandelOptionSetting('Switch account');
        }}
        style={styles.settingItemWrapper}>
        <AppText fontSize={16} color={colors.blue}>
          Switch profiles
        </AppText>
      </Pressable>
      <Pressable
        onPress={() => {
          HandelOptionSetting('Logout');
        }}
        style={styles.settingItemWrapper}>
        <AppText fontSize={16} color={colors.red}>
          Log out
        </AppText>
      </Pressable>
    </AppContainer>
  );
};

export default SettingsScreenView;

const styles = AppStyleSheet.create({
  settingItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  settingsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
