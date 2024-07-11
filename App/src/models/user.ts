import {IUser, IUserProfile} from '@src/types/user';

export function userModel(user: any): IUser & Record<string, any> {
  const transformed: IUser = {
    username: user.username,
    avatar: user.avatar,
    user_id: user.user_id,
    is_frozen: user.is_frozen,
    password_changed_at: user.password_changed_at,
    created_at: user.created_at,
  };
  return {...transformed, ...user};
}

export function userProfileModel(
  userProfile: any,
): IUserProfile & Record<string, any> {
  const transformed: IUserProfile = {
    user_id: userProfile.user_id,
    name: userProfile.name,
    email: userProfile.email,
    bio: userProfile.bio,
    created_at: userProfile.created_at,
    UpdatedAt: userProfile.UpdatedAt,
  };
  return {...transformed, ...userProfile};
}
