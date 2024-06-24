export type User = {
  username: string;
  avatar: string;
  user_id: number;
  is_frozen: boolean;
  password_changed_at: string;
  created_at: string;
};

export type UserProfile = {
  name: string;
  email: string;
  bio: string;
};
