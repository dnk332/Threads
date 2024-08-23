import {View, ViewStyle} from 'react-native';
import React from 'react';
import {AppText} from '@src/components/index';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import _ from 'lodash';
import {getRandomString} from '@utils/Random';
import {stringToColor} from '@utils/StringToColor';

interface TempAvatarProps {
  username?: string;
  style?: ViewStyle;
  fontSize?: number;
}

const TempAvatar: React.FC<TempAvatarProps> = ({username, style, fontSize}) => {
  if (_.isEmpty(username)) {
    username = getRandomString(6);
  }

  const color = username ? stringToColor(username) : colors.white;
  return (
    <View style={[styles.item, {backgroundColor: color}, style]}>
      <AppText style={[styles.text, {fontSize: fontSize}]}>
        {username ? username.trim().charAt(0).toUpperCase() : ''}
      </AppText>
    </View>
  );
};

export default TempAvatar;

const styles = AppStyleSheet.create({
  item: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
  },
});
