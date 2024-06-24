import React from 'react';

import UserDetailScreenView from '@screens/UserDetail/view';
import {
  currentAccountSelector,
  currentUserSelector,
} from '@src/redux/selectors';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';

const UserDetailScreen = () => {
  let currentUser = useSelectorShallow(currentUserSelector);
  let currentAccount = useSelectorShallow(currentAccountSelector);
  return (
    <UserDetailScreenView
      currentUser={currentUser}
      currentAccount={currentAccount}
    />
  );
};

export default UserDetailScreen;
