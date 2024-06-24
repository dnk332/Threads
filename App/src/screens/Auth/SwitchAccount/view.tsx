import React, {useCallback} from 'react';
import {ListRenderItemInfo, FlashList} from '@shopify/flash-list';

import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, AppImage, AppText} from '@components';
import {colors} from '@themes/color';
import {Pressable, View} from 'react-native';
import SvgComponent from '@src/assets/svg';
import {User} from '@src/types/user';

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

interface SwitchAccountViewProps {
  listAccountInfo: User[];
  onLogin: (username: string) => void;
  onAddAccount: () => void;
}

const SwitchAccountView = ({
  listAccountInfo,
  onLogin,
  onAddAccount,
}: SwitchAccountViewProps) => {
  const AccountItem = useCallback(
    ({item: user}: ListRenderItemInfo<User>) => {
      return (
        <Pressable
          onPress={() => onLogin(user.username)}
          style={styles.loginButton}>
          <View style={styles.buttonContent}>
            <AppImage
              containerStyle={styles.buttonIcon}
              source={require('@assets/image/instagram-logo.png')}
            />
            <View style={styles.buttonText}>
              <AppText fontSize={12} color={colors.text_gray}>
                Log in with Instagram
              </AppText>
              <AppText fontSize={14} fontWeight={600}>
                {user.username}
              </AppText>
            </View>
          </View>
          <SvgComponent color={colors.text_gray} name={'ARROW_RIGHT'} />
        </Pressable>
      );
    },
    [onLogin],
  );
  return (
    <AppContainer haveBackButton containerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <AppText fontSize={24} fontWeight={700} align={'center'}>
          Switch accounts
        </AppText>
        <AppText color={colors.text_gray} align={'center'}>
          {`Add or create a Threads profile by login in with an\nInstagram account`}
        </AppText>
      </View>
      <FlashList
        contentContainerStyle={styles.accountsInfoWrapper}
        style={styles.accountsInfo}
        keyExtractor={user => user.username.toString()}
        data={listAccountInfo}
        renderItem={AccountItem}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={10}
        onEndReachedThreshold={16}
        ItemSeparatorComponent={ItemSeparator}
      />
      <Pressable onPress={onAddAccount} style={styles.addAccountButton}>
        <AppText color={colors.text_gray} fontSize={12} fontWeight={600}>
          Log in with another Instagram account
        </AppText>
      </Pressable>
    </AppContainer>
  );
};

export default SwitchAccountView;

const styles = AppStyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    gap: 10,
    marginVertical: 16,
  },
  loginButton: {
    marginHorizontal: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background_secondary,
  },
  buttonContent: {
    flexDirection: 'row',
  },
  buttonText: {
    gap: 4,
    marginLeft: 16,
    alignSelf: 'center',
  },
  buttonIcon: {
    width: 46,
    height: 46,
  },
  addAccountButton: {
    alignSelf: 'center',
    bottom: 0,
    position: 'absolute',
    paddingBottom: 40,
    backgroundColor: colors.background,
    width: '100%',
    alignItems: 'center',
    height: 86,
    paddingTop: 16,
  },
  registerAccountButton: {
    alignSelf: 'center',
    paddingVertical: 40,
    backgroundColor: colors.background,
    width: '100%',
    alignItems: 'center',
  },
  accountsInfo: {
    justifyContent: 'center',
  },
  separator: {
    height: 8,
    width: 8,
  },
  accountsInfoWrapper: {
    flex: 1,
    paddingBottom: 90,
  },
});
