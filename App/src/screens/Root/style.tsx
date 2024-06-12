import {ViewStyle, StyleSheet} from 'react-native';
import {colors} from '@themes/color';

interface Style {
  container: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
