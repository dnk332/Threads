export interface IUser {
  username: string;
  avatar: string;
  user_id: number;
  is_frozen: boolean;
  password_changed_at: string;
  created_at: string;
}

export interface IUserProfile {
  user_id: number;
  name: string;
  email: string;
  bio: string;
  avatar_url: string;
  created_at: string;
  updatedAt: string;
}
