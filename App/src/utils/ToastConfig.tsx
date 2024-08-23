import React from 'react';
import {ActivityIndicator, Pressable, View, ViewStyle} from 'react-native';

import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {AppText} from '@components';
import {creatingPostStatusSelector} from '@selectors';
import SvgComponent from '@svg/index';
import useSelectorShallow from '@hooks/useSelectorShallowEqual';

interface RenderToastProps {
  title: string;
  style?: ViewStyle;
  backgroundColor: string;
  borderColor: string;
  header?: string;
  onPress?: () => void;
  posting?: boolean;
}

interface ToastConfigProps {
  props: RenderToastProps;
}

const RenderToast: React.FC<{props: RenderToastProps}> = ({props}) => {
  const {title, style, backgroundColor, borderColor, header, onPress} = props;

  const postingStatus = useSelectorShallow(creatingPostStatusSelector);

  return (
    <View
      style={[styles.toastContainer, style, {backgroundColor, borderColor}]}>
      <View style={styles.rowCenter}>
        {postingStatus ? (
          <ActivityIndicator />
        ) : (
          <SvgComponent name={'NOTIFY'} />
        )}
        <View style={styles.txtContainer}>
          {header && (
            <AppText numberOfLines={2} style={styles.textHeader}>
              {header}
            </AppText>
          )}
          <AppText
            numberOfLines={2}
            style={[styles.textMessage, {color: colors.white}]}>
            {title}
          </AppText>
        </View>
        <Pressable onPress={onPress}>
          <AppText fontWeight={700}>View</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export const toastConfig = {
  posting: ({props}: ToastConfigProps) => {
    const defaultProps: RenderToastProps = {
      backgroundColor: colors.dark_gray,
      borderColor: colors.dark_gray,
      posting: true,
      ...props,
    };
    return <RenderToast props={defaultProps} />;
  },
};

const styles = AppStyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 12,
    paddingRight: 16,
  },
  textMessage: {
    fontSize: 14,
    color: colors.white,
  },
  textHeader: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  toastContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
    borderWidth: 0.2,
  },
  txtContainer: {
    paddingLeft: 10,
    flex: 1,
  },
});
