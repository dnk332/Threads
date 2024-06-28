import React from 'react';

import UserDetailScreenView from '@screens/UserDetail/view';
import {
  currentAccountSelector,
  currentUserProfileSelector,
} from '@src/redux/selectors';
import {useSelector} from 'react-redux';

const UserDetailScreen = () => {
  let currentUser = useSelector(currentUserProfileSelector);
  let currentAccount = useSelector(currentAccountSelector);
  return (
    <UserDetailScreenView
      currentUser={currentUser}
      currentAccount={currentAccount}
    />
  );
};

export default UserDetailScreen;
